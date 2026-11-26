"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { omnixExtras, omnixSkills, whatsappLink, whatsappMessages } from "@/data";
import { smoothScroll } from "@/utils";
import { cn } from "@/lib/utils";

/**
 * OMNIX, a IA da Dix. A seção usa a identidade dos vídeos de lançamento
 * (teal escuro, verde-água, Figtree) em qualquer tema do site.
 * A mascote é um render do mesmo modelo 3D dos vídeos (public/omnix).
 */

/** Mascote flutuando, com piscada (troca de quadro por CSS). */
export const OmnixMascot = ({
  size = 220,
  pose = "neutral",
  shadow = true,
  className,
}: {
  size?: number;
  pose?: "neutral" | "happy" | "curious";
  shadow?: boolean;
  className?: string;
}) => (
  <span
    aria-hidden
    className={cn("relative inline-block", className)}
    style={{ width: size, height: size * (shadow ? 1.12 : 1) }}
  >
    <span className="omnix-float absolute left-0 top-0 block" style={{ width: size, height: size }}>
      <Image
        src={`/omnix/omnix-${pose}.png`}
        alt=""
        width={460}
        height={460}
        className="h-full w-full drop-shadow-[0_0_28px_rgba(31,225,167,0.35)]"
      />
      {pose === "neutral" && (
        <Image
          src="/omnix/omnix-blink.png"
          alt=""
          width={460}
          height={460}
          className="omnix-blink absolute inset-0 h-full w-full"
        />
      )}
    </span>
    {shadow && (
      <span
        className="omnix-shadow absolute bottom-0 left-1/2 block rounded-[50%] bg-[#1fe1a7]/40 blur-md"
        style={{ width: size * 0.5, height: size * 0.07, marginLeft: -size * 0.25 }}
      />
    )}
  </span>
);

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <p className="font-display text-[13px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#1fe1a7]">
    {children}
  </p>
);

export const Omnix: React.FC = () => {
  return (
    <section
      id="omnix"
      className="omnix-bg relative w-full overflow-hidden border-y border-[#7ef0d4]/15 py-20 text-white md:py-28"
    >
      {/* Linha de batimento dos vídeos */}
      <svg
        aria-hidden
        viewBox="0 0 1920 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-24 h-[300px] w-full opacity-20 [mask-image:linear-gradient(90deg,transparent_0%,transparent_30%,#000_45%,#000_100%)]"
      >
        <path
          d="M0 150 H700 L740 150 L765 80 L790 250 L815 10 L845 210 L870 150 H1060 L1090 150 L1112 90 L1135 230 L1158 40 L1185 195 L1205 150 H1920"
          fill="none"
          stroke="#1fe1a7"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="container relative">
        {/* Apresentação */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-end gap-4">
              <OmnixMascot size={132} />
              <div className="pb-5">
                <span className="inline-flex items-center rounded-full bg-[#1fe1a7] px-3 py-1 font-display text-[12px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#061c23]">
                  Novidade
                </span>
              </div>
            </div>

            <h2 className="mt-2 font-display font-extrabold">
              <span className="omnix-grad block text-[72px] leading-none tracking-[-0.01em] md:text-[112px]">
                OMNIX
              </span>
              <span className="mt-2 block text-[26px] font-semibold leading-tight text-[#e6f4f1] md:text-[34px]">
                A IA da Dix
              </span>
            </h2>

            <p className="mt-6 max-w-md font-display text-[22px] font-bold leading-snug text-white md:text-[26px]">
              Uma nova colega vai trabalhar com você.
            </p>
            <p className="mt-3 max-w-md text-body-medium-regular text-[#c9e2de]">
              Ela fica no cantinho da tela, em qualquer módulo, e cuida do que
              se repete: resume, procura, sugere e avisa. Quem decide é sempre
              você.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={whatsappLink(whatsappMessages.omnix)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1fe1a7] px-6 text-base font-bold text-[#061c23] transition-colors hover:bg-[#7ef0d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2e38]"
              >
                Quero conhecer a OMNIX <ArrowRight className="h-4 w-4" />
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
              <span className="text-body-small-regular text-[#8aaaac]">
                No OMNIDIX e em todos os sistemas Dix.
              </span>
            </div>
          </motion.div>

          {/* Vídeo de lançamento */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="omnix-card overflow-hidden rounded-[18px] bg-[#061c23]">
              <video
                controls
                playsInline
                preload="none"
                poster="/omnix/omnix-lancamento-poster.jpg"
                className="block aspect-video w-full"
                aria-label="Vídeo de lançamento da OMNIX, a IA da Dix"
              >
                <source src="/omnix/omnix-lancamento.mp4" type="video/mp4" />
                <track
                  kind="captions"
                  src="/omnix/omnix-lancamento.pt-BR.vtt"
                  srcLang="pt-BR"
                  label="Português"
                  default
                />
              </video>
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-caption-regular text-[#8aaaac]">
              <span>Assista à apresentação da OMNIX (1 min 37 s, com som e legendas).</span>
              <span>Imagens ilustrativas. Dados fictícios.</span>
            </figcaption>
          </motion.figure>
        </div>

        {/* O que ela faz */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {omnixSkills.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col"
            >
              <div className="omnix-card overflow-hidden rounded-[18px] bg-[#f3f5f7]">
                <Image
                  src={s.image}
                  alt={s.alt}
                  width={720}
                  height={450}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="mt-5">
                <Kicker>{s.kicker}</Kicker>
                <h3 className="mt-2 font-display text-[22px] font-extrabold leading-[1.15] text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-body-small-regular text-[#c9e2de]">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Mais */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[18px] bg-[#7ef0d4]/15 ring-1 ring-[#7ef0d4]/15 md:grid-cols-3">
          {omnixExtras.map((e, i) => (
            <div key={e.title} className="flex gap-4 bg-[#0b2e38] p-6">
              {i === 2 && (
                <OmnixMascot size={56} pose="happy" shadow={false} className="shrink-0" />
              )}
              <div>
                <h3 className="font-display text-[18px] font-extrabold leading-tight text-white">
                  {e.title}
                </h3>
                <p className="mt-2 text-body-small-regular text-[#c9e2de]">{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * A OMNIX "no cantinho da tela": aparece depois do hero e leva à seção.
 * Pode ser fechada, como no produto.
 */
export const OmnixCorner: React.FC = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const section = document.getElementById("omnix");
    const end = section ? section.offsetTop + section.offsetHeight - 200 : 600;
    setVisible(y > end);
  });

  if (closed) return null;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group fixed bottom-4 right-4 z-[55] hidden md:block",
        !visible && "pointer-events-none"
      )}
    >
      <button
        onClick={() => smoothScroll("omnix")}
        tabIndex={visible ? 0 : -1}
        aria-label="Conheça a OMNIX, a IA da Dix"
        className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="pointer-events-none rounded-xl border border-[#c9efe1] bg-[#eefaf5] px-3 py-2 text-body-small-semibold text-[#0b2e38] opacity-0 shadow-menu transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          Oi! Eu sou a OMNIX.
        </span>
        <OmnixMascot size={72} shadow={false} />
      </button>
      <button
        onClick={() => setClosed(true)}
        tabIndex={visible ? 0 : -1}
        aria-label="Fechar a OMNIX"
        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0b2e38] text-white opacity-0 shadow-menu transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
};
