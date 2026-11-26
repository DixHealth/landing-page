"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { OmnixMascot } from "./Omnix";

/**
 * OMNIX interativa da seção de lançamento, no modelo 3D dos vídeos
 * (src/components/omnix3d/engine.js, o mesmo do provador "OMNIX 3D"):
 * - os olhos acompanham o mouse (só os olhos; o corpo não se inclina);
 * - um clique sorteia um visual da paleta do provador: estilo de olho,
 *   detalhes do rosto, acessório e expressão;
 * - pode ser arrastada para qualquer lugar do site e, ao ser solta,
 *   quica e faz uma ação (comemora, confirma, pula ou bate o coração).
 *
 * O three.js só é baixado quando a seção chega perto da tela. Até lá (e se
 * o WebGL não estiver disponível) aparece o render estático da mascote.
 */

type Look = { eye: string; skin: string; expr: string; extras: string[] };
type Bot = {
  render: (t: number) => void;
  set: (e: Partial<Look> & { act?: string }) => void;
  dispose: () => void;
};
type Palette = { eyes: string[]; skins: string[]; exprs: string[] };

const START: Look = { eye: "pupila", skin: "none", expr: "neutral", extras: [] };
const EXTRAS = ["contorno", "sobrancelha", "bochecha", "cilios"];
const DROP_ACTS = ["comemorando", "sucesso", "pulinho", "batimento"];
const DROP_ACT_MS = 2600;

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

const randomLook = (p: Palette, current: Look): Look => {
  let next: Look;
  do {
    next = {
      eye: pick(p.eyes),
      skin: pick(p.skins),
      expr: pick(p.exprs),
      extras: EXTRAS.filter(() => Math.random() < 0.3),
    };
  } while (next.eye === current.eye && next.skin === current.skin && next.expr === current.expr);
  return next;
};

/** A cruz ocupa ~46% do quadro 3D; a folga é o espaço dos efeitos (confete, balões). */
const CANVAS_SCALE = 2;
const DRAG_THRESHOLD = 5;
const KEY_STEP = 24;

export const OmnixBuddy = ({ size = 132 }: { size?: number }) => {
  const reduceMotion = useReducedMotion();
  const homeRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const botRef = useRef<Bot | null>(null);
  const paletteRef = useRef<Palette | null>(null);
  const lookRef = useRef<Look>(START);
  const actTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Relógio do motor: só anda enquanto a mascote está sendo desenhada.
  const clock = useRef(0);
  // Valores lidos pelo motor a cada quadro.
  const live = useRef({ lookTX: 0, lookTY: 0, lookX: 0, lookY: 0, squash: 0, squashV: 0, wiggle: 0 });

  // O botão vive num elemento próprio, que muda de lugar (seção -> <body>) sem
  // remontar: assim o canvas e o contexto WebGL sobrevivem ao arraste.
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [ready, setReady] = useState(false);
  // Posição na página (coordenadas do documento). null = no lugar original.
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ px: number; py: number; x: number; y: number; moved: boolean } | null>(null);

  const height = size * 1.12;
  const canvasSize = size * CANVAS_SCALE;

  useEffect(() => {
    const el = document.createElement("span");
    el.style.display = "block";
    homeRef.current?.appendChild(el);
    setHost(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    if (!host || !pos) return;
    if (host.parentElement !== document.body) document.body.appendChild(host);
    Object.assign(host.style, {
      position: "absolute",
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      zIndex: "60",
    });
  }, [host, pos]);

  // Liga o 3D (e o laço de desenho) só quando a mascote está perto da tela.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setWanted(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [host]);

  useEffect(() => {
    if (!wanted || !canvasRef.current) return;
    let cancelled = false;
    const canvas = canvasRef.current;
    (async () => {
      try {
        const engine = await import("./omnix3d/engine");
        const font =
          getComputedStyle(document.body).getPropertyValue("--font-figtree").trim() || "Figtree";
        const bot = (await engine.createOmnix({
          canvas,
          px: Math.round(canvasSize * Math.min(window.devicePixelRatio || 1, 2)),
          seed: 11,
          eye: START.eye,
          font,
          ctrl: () => ({
            lookX: live.current.lookX,
            lookY: live.current.lookY,
            squash: live.current.squash,
            wiggle: live.current.wiggle,
          }),
        })) as Bot;
        if (cancelled) return bot.dispose();
        paletteRef.current = {
          eyes: Object.keys(engine.EYE_STYLES),
          skins: engine.SKIN_KEYS,
          exprs: Object.keys(engine.EX),
        };
        botRef.current = bot;
        bot.render(0);
        setReady(true);
      } catch {
        // Sem WebGL (ou falha ao baixar): fica o render estático.
      }
    })();
    return () => {
      cancelled = true;
      botRef.current?.dispose();
      botRef.current = null;
    };
  }, [wanted, canvasSize]);

  // Laço de desenho: olhos suavizados na direção do cursor + mola do "quique".
  useEffect(() => {
    if (!ready || !near) return;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const d = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock.current += d;
      const l = live.current;
      const k = 1 - Math.exp(-d * 8);
      l.lookX += (l.lookTX - l.lookX) * k;
      l.lookY += (l.lookTY - l.lookY) * k;
      l.squashV += (-220 * l.squash - 14 * l.squashV) * d;
      l.squash += l.squashV * d;
      botRef.current?.render(clock.current);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [ready, near]);

  // Olhos acompanham o mouse em qualquer lugar da página.
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const el = boxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.width / 2);
      const reach = 320;
      live.current.lookTX = Math.max(-1, Math.min(1, dx / reach)) * 0.14;
      live.current.lookTY = Math.max(-1, Math.min(1, dy / reach)) * 0.1;
    };
    const onLeave = () => {
      live.current.lookTX = 0;
      live.current.lookTY = 0;
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion]);

  useEffect(
    () => () => {
      if (actTimer.current) clearTimeout(actTimer.current);
    },
    [],
  );

  const bounce = (strength: number) => {
    if (!reduceMotion) live.current.squashV = strength;
  };

  const stopAct = () => {
    if (actTimer.current) clearTimeout(actTimer.current);
    actTimer.current = null;
  };

  const changeLook = () => {
    const bot = botRef.current;
    const palette = paletteRef.current;
    if (!bot || !palette) return;
    stopAct();
    lookRef.current = randomLook(palette, lookRef.current);
    bot.set({ ...lookRef.current, act: "none" });
    bounce(2.2);
  };

  /** Ao soltar: quica e faz uma ação por alguns segundos, depois volta ao visual atual. */
  const land = () => {
    const bot = botRef.current;
    live.current.wiggle = 0;
    if (!bot) return;
    stopAct();
    if (reduceMotion) {
      bot.set({ expr: lookRef.current.expr });
      return;
    }
    bounce(4);
    bot.set({ act: pick(DROP_ACTS), expr: "happy" });
    actTimer.current = setTimeout(() => {
      botRef.current?.set({ act: "none", expr: lookRef.current.expr });
    }, DROP_ACT_MS);
  };

  const clamp = useCallback(
    (x: number, y: number) => {
      const doc = document.documentElement;
      const maxX = doc.clientWidth - size;
      const maxY = doc.scrollHeight - height;
      return { x: Math.max(0, Math.min(maxX, x)), y: Math.max(0, Math.min(maxY, y)) };
    },
    [size, height],
  );

  const currentPagePos = () => {
    if (pos) return pos;
    const r = boxRef.current!.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const start = currentPagePos();
    drag.current = { px: e.pageX, py: e.pageY, x: start.x, y: start.y, moved: false };

    const onMove = (ev: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = ev.pageX - d.px;
      const dy = ev.pageY - d.py;
      if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      if (!d.moved) {
        d.moved = true;
        setDragging(true);
        stopAct();
        // No ar: cara de surpresa e um balancinho.
        botRef.current?.set({ act: "none", expr: "surprised" });
        if (!reduceMotion) live.current.wiggle = 0.35;
      }
      setPos(clamp(d.x + dx, d.y + dy));
    };
    const onUp = () => {
      const d = drag.current;
      drag.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      setDragging(false);
      if (!d) return;
      if (d.moved) land();
      else changeLook();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // Teclado: Enter/Espaço trocam o visual, setas movem a OMNIX.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    };
    const m = moves[e.key];
    if (m) {
      e.preventDefault();
      const p = currentPagePos();
      setPos(clamp(p.x + m[0], p.y + m[1]));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      changeLook();
    }
  };

  const buddy = (
    <button
      ref={boxRef}
      type="button"
      aria-label="OMNIX, a mascote. Clique para trocar o visual, arraste ou use as setas para levá-la a outro lugar do site."
      title="Clique para trocar o visual · arraste para levar a OMNIX pelo site"
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={
        "relative block touch-none select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2e38] " +
        (dragging ? "cursor-grabbing" : "cursor-grab")
      }
      style={{ width: size, height }}
    >
      <span
        aria-hidden
        className="omnix-float absolute left-0 top-0 block"
        style={{
          width: size,
          height: size,
          scale: dragging ? "1.1" : "1",
          transition: "scale 0.2s ease",
        }}
      >
        <span
          className="absolute inset-0 block"
          style={{ opacity: ready ? 0 : 1, transition: "opacity 0.25s ease" }}
        >
          <OmnixMascot size={size} shadow={false} />
        </span>
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute block max-w-none"
          style={{
            width: canvasSize,
            height: canvasSize,
            left: (size - canvasSize) / 2,
            top: (size - canvasSize) / 2,
            opacity: ready ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        />
      </span>
      <span
        aria-hidden
        className="omnix-shadow absolute bottom-0 left-1/2 block rounded-[50%] bg-[#1fe1a7]/40 blur-md"
        style={{
          width: size * 0.5,
          height: size * 0.07,
          marginLeft: -size * 0.25,
          opacity: dragging ? 0 : undefined,
        }}
      />
    </button>
  );

  return (
    <span ref={homeRef} className="block" style={{ width: size, height }}>
      {host ? createPortal(buddy, host) : <OmnixMascot size={size} />}
    </span>
  );
};
