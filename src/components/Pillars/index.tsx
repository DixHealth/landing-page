"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { pillarCards } from "@/data";
import { contactAbout } from "@/utils";
import { cn } from "@/lib/utils";

export const Pillars: React.FC = () => {
  const [active, setActive] = useState(0);
  const p = pillarCards[active];
  const go = (d: number) =>
    setActive((i) => (i + d + pillarCards.length) % pillarCards.length);

  return (
    <section id="pillars" className="ascii-bg w-full py-20 text-white md:py-28">
      <div className="container">
        <span className="tag text-primary-200">O que fazemos</span>
        <h2 className="display mt-4 max-w-2xl text-[36px] leading-[1.05] md:text-[56px]">
          Da infraestrutura ao software, num só parceiro
        </h2>
        <p className="mt-4 max-w-xl text-body-medium-regular text-primary-100/80">
          Três frentes que se apoiam: nuvem, dados de saúde e desenvolvimento.
        </p>

        <div className="mt-12 rounded-xl bg-surface p-4 text-fg shadow-menu md:p-8">
          <div role="tablist" aria-label="Soluções" className="flex flex-wrap gap-2">
            {pillarCards.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-md px-4 py-2 text-caption-bold uppercase tracking-[0.06em] transition-colors",
                  i === active
                    ? "bg-cta text-cta-fg"
                    : "border border-border bg-surface text-fg hover:bg-surface-raised"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.title}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={p.image}
                  alt=""
                  width={880}
                  height={612}
                  className="h-auto w-full"
                />
                <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Solução anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-surface text-fg shadow-menu hover:bg-surface-raised"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Próxima solução"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-surface text-fg shadow-menu hover:bg-surface-raised"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-caption-bold uppercase tracking-[0.08em] text-accent">
                  {p.title}
                </p>
                <h3 className="display mt-2 text-[30px] leading-[1.1] text-fg md:text-[40px]">
                  {p.gradientText}
                </h3>
                <p className="mt-4 text-body-medium-regular text-fg-muted">
                  {p.subtitle}
                </p>
                <ul className="mt-6 space-y-2">
                  {p.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-body-medium-regular text-fg">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                      {d}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => contactAbout(`Quero saber mais sobre ${p.title}`)}
                  className="mt-8 inline-flex items-center gap-2 text-link-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-accent"
                >
                  Falar sobre {p.title} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
