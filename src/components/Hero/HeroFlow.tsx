"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  FlaskConical,
  MessageCircle,
  NotebookPen,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { heroScenarios } from "@/data";
import { cn } from "@/lib/utils";

const SOURCE_ICONS: LucideIcon[] = [MessageCircle, FlaskConical, NotebookPen];
const INTERVAL = 5000;

/** Diagrama ilustrativo: um sistema do cliente → DIX integra, organiza e entrega. */
export const HeroFlow = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % heroScenarios.length),
      INTERVAL
    );
    return () => clearInterval(t);
  }, [paused]);

  const scenario = heroScenarios[active];

  return (
    <div
      className="dot-grid relative grid grid-cols-[15rem_1fr] gap-10 rounded-xl py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Coluna esquerda: sistemas do cliente */}
      <div>
        <p className="mb-4 flex items-center gap-2 text-caption-bold uppercase tracking-[0.08em] text-fg-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-fg-subtle" />
          Seus sistemas
        </p>
        <ul className="space-y-2">
          {heroScenarios.map((s, i) => {
            const Icon = SOURCE_ICONS[i];
            const isActive = i === active;
            return (
              <li key={s.source.name}>
                <button
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all duration-300",
                    isActive
                      ? "border-border bg-surface shadow-menu"
                      : "border-transparent opacity-50 hover:opacity-80"
                  )}
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    <span className="block text-caption-bold uppercase tracking-[0.06em] text-accent">
                      {s.source.name}
                    </span>
                    <span className="block text-body-small-semibold text-fg">
                      {s.source.detail}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex gap-1.5 pl-1">
          {heroScenarios.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-accent" : "w-1.5 bg-border-strong"
              )}
            />
          ))}
        </div>
      </div>

      {/* Fluxo DIX */}
      <div>
        <p className="mb-4 flex items-center gap-2 text-caption-bold uppercase tracking-[0.08em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Plataforma Omni ·
          <AnimatePresence mode="wait">
            <motion.span
              key={scenario.product}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-sm bg-accent px-1.5 py-0.5 text-white dark:text-neutral-900"
            >
              {scenario.product}
            </motion.span>
          </AnimatePresence>
        </p>

        <div className="relative grid grid-cols-3 gap-5">
          {/* linha de conexão */}
          <div className="absolute left-4 right-4 top-4 h-px bg-border-strong" aria-hidden />

          {scenario.steps.map((step, i) => (
            <div key={step.label} className="relative">
              <span className="relative z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-caption-bold text-fg shadow-omni">
                {i === 2 ? (
                  <Check className="h-3.5 w-3.5 text-positive-600" strokeWidth={3} />
                ) : (
                  <Zap className="h-3.5 w-3.5 text-accent" />
                )}
                {step.label}
              </span>
              <div className="ml-4 h-4 border-l border-dashed border-border-strong" />

              <div className="min-h-[148px] rounded-lg border border-border bg-surface p-4 shadow-menu">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: i * 0.12 }}
                  >
                    {step.bubble ? (
                      <p className="rounded-lg rounded-bl-sm bg-surface-raised p-3 text-body-small-regular text-fg">
                        {step.title}
                      </p>
                    ) : (
                      <>
                        <p className="text-body-small-semibold text-fg">{step.title}</p>
                        <p className="mt-1 text-body-small-regular text-fg-muted">
                          {step.body}
                        </p>
                      </>
                    )}
                    {step.foot && (
                      <p className="mt-3 text-caption-regular text-fg-subtle">{step.foot}</p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-right text-caption-regular text-fg-subtle">
          Ilustração do fluxo de dados
        </p>
      </div>
    </div>
  );
};
