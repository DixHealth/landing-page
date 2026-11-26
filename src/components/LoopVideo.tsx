"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Demonstração em vídeo curto, sem som, em loop.
 *
 * Acessibilidade (WCAG 2.2):
 *  - 2.2.2 Pausar, parar, ocultar: botão de pausa sempre visível; a escolha
 *    da pessoa vale até ela mudar de ideia (rolar a página não religa).
 *  - 2.3.3 / prefers-reduced-motion: não começa sozinho; fica no pôster até
 *    a pessoa apertar "Reproduzir".
 *  - 1.4.2 Controle de áudio: o arquivo não tem trilha de áudio.
 *  - 1.2.1 Só vídeo: `description` é a alternativa em texto, ligada ao vídeo.
 *  - Só roda enquanto está visível na tela.
 */
export const LoopVideo = ({
  src,
  poster,
  label,
  description,
  className,
}: {
  src: string;
  poster: string;
  /** Nome curto do vídeo (lido por leitores de tela). */
  label: string;
  /** Alternativa em texto: o que o vídeo mostra, em uma ou duas frases. */
  description: string;
  className?: string;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const descId = useId();
  const [playing, setPlaying] = useState(false);
  // null = a pessoa ainda não escolheu; true/false = escolha explícita
  const userWants = useRef<boolean | null>(null);
  const inView = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const wants = userWants.current ?? !reduce.matches;
      if (inView.current && wants) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.4 }
    );
    io.observe(video);
    reduce.addEventListener("change", sync);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userWants.current = true;
      video.play().catch(() => {});
    } else {
      userWants.current = false;
      video.pause();
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        aria-describedby={descId}
        className="block h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <p id={descId} className="sr-only">
        {description}
      </p>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 inline-flex h-11 items-center gap-2 rounded-full bg-[#061c23]/85 pl-3 pr-4 text-body-small-semibold text-white backdrop-blur-sm transition-colors hover:bg-[#061c23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061c23]"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden />
        ) : (
          <Play className="h-4 w-4" aria-hidden />
        )}
        {playing ? "Pausar" : "Reproduzir"}
        <span className="sr-only"> demonstração</span>
      </button>
    </div>
  );
};
