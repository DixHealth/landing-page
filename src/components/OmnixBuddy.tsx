"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { OmnixMascot } from "./Omnix";

/**
 * OMNIX interativa da seção de lançamento:
 * - se inclina e olha na direção do mouse;
 * - um clique troca para um estilo aleatório (pose + cor);
 * - pode ser arrastada para qualquer lugar do site (fica presa à página,
 *   não à tela). Recarregar a página traz a OMNIX de volta.
 */

type Pose = "neutral" | "happy" | "curious";
type Look = { pose: Pose; hue: number };

const POSES: Pose[] = ["neutral", "happy", "curious"];
// Giros de matiz a partir do verde-água original: azul, roxo, rosa, laranja, amarelo.
const HUES = [0, 45, 100, 150, 200, 250, 300];

const randomLook = (current: Look): Look => {
  let next: Look;
  do {
    next = {
      pose: POSES[Math.floor(Math.random() * POSES.length)],
      hue: HUES[Math.floor(Math.random() * HUES.length)],
    };
  } while (next.pose === current.pose && next.hue === current.hue);
  return next;
};

const DRAG_THRESHOLD = 5;
const KEY_STEP = 24;

export const OmnixBuddy = ({ size = 132 }: { size?: number }) => {
  const reduceMotion = useReducedMotion();
  const boxRef = useRef<HTMLButtonElement>(null);
  const [look, setLook] = useState<Look>({ pose: "neutral", hue: 0 });
  const [bump, setBump] = useState(0);
  // Posição na página (coordenadas do documento). null = no lugar original.
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ px: number; py: number; x: number; y: number; moved: boolean } | null>(null);

  const spring = { stiffness: 150, damping: 15, mass: 0.6 };
  const rotX = useSpring(0, spring);
  const rotY = useSpring(0, spring);
  const tx = useSpring(0, spring);
  const ty = useSpring(0, spring);

  // Acompanha o mouse: inclina e desloca levemente na direção do cursor.
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const el = boxRef.current;
      if (!el || drag.current?.moved) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const nx = Math.max(-1, Math.min(1, dx / 400));
      const ny = Math.max(-1, Math.min(1, dy / 400));
      rotY.set(nx * 28);
      rotX.set(-ny * 22);
      tx.set(nx * 10);
      ty.set(ny * 8);
    };
    const onLeave = () => {
      rotX.set(0);
      rotY.set(0);
      tx.set(0);
      ty.set(0);
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, rotX, rotY, tx, ty]);

  const clamp = useCallback(
    (x: number, y: number) => {
      const doc = document.documentElement;
      const maxX = doc.clientWidth - size;
      const maxY = doc.scrollHeight - size * 1.12;
      return { x: Math.max(0, Math.min(maxX, x)), y: Math.max(0, Math.min(maxY, y)) };
    },
    [size],
  );

  const currentPagePos = () => {
    if (pos) return pos;
    const r = boxRef.current!.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY };
  };

  const changeLook = () => {
    setLook((l) => randomLook(l));
    setBump((b) => b + 1);
  };

  // O arraste escuta a janela: ao sair do lugar original o botão vai para o
  // <body> (remonta), então capturar o ponteiro no elemento não funcionaria.
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
        rotX.set(0);
        rotY.set(0);
        tx.set(0);
        ty.set(0);
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
      if (d && !d.moved) changeLook();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // Teclado: Enter/Espaço trocam o estilo, setas movem a OMNIX.
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

  const height = size * 1.12;

  const buddy = (
    <button
      ref={boxRef}
      type="button"
      aria-label="OMNIX, a mascote. Clique para trocar o estilo, arraste ou use as setas para levá-la a outro lugar do site."
      title="Clique para trocar o estilo · arraste para levar a OMNIX pelo site"
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={
        "block touch-none select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2e38] " +
        (dragging ? "cursor-grabbing" : "cursor-grab")
      }
      style={
        pos
          ? { position: "absolute", left: pos.x, top: pos.y, zIndex: 60, width: size, height }
          : { width: size, height }
      }
    >
      <motion.span
        className="block"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          x: tx,
          y: ty,
          transformPerspective: 600,
        }}
        animate={{ scale: dragging ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <motion.span
          key={bump}
          className="block"
          initial={bump && !reduceMotion ? { scale: 0.75, rotate: -12 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 12 }}
          style={{
            filter: look.hue ? `hue-rotate(${look.hue}deg) saturate(1.15)` : undefined,
            transition: "filter 0.3s ease",
          }}
        >
          <OmnixMascot size={size} pose={look.pose} shadow={!dragging} />
        </motion.span>
      </motion.span>
    </button>
  );

  if (!pos) return buddy;

  // Fora do lugar original: vai para o <body> e o espaço na seção fica reservado.
  return (
    <>
      <span aria-hidden className="block" style={{ width: size, height }} />
      {createPortal(buddy, document.body)}
    </>
  );
};
