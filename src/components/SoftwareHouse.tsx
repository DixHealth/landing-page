"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, CircleMinus } from "lucide-react";
import { softwareHouse, whatsappLink, whatsappMessages } from "@/data";
import { cn } from "@/lib/utils";

/** Software house: antes/depois, três formas de trabalhar e o que já foi entregue. */
export const SoftwareHouse: React.FC = () => {
  const [active, setActive] = useState(0);
  const { before, after, modes, built } = softwareHouse;

  return (
    <section id="dev" className="section-y w-full bg-bg">
      <div className="container">
        <div className="grid items-end gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <span className="tag text-fg">Software house</span>
            <h2 className="display mt-4 max-w-[13em] text-[34px] leading-[1.04] text-fg md:text-[56px]">
              O braço de desenvolvimento{" "}
              <span className="font-light text-fg-muted">
                que a sua empresa acaba não tendo.
              </span>
            </h2>
          </div>
          <p className="max-w-lg text-subtitle-small font-normal text-fg-muted md:text-[19px] md:leading-[1.5]">
            Falta gente, o backlog cresce e a equipe interna vive apagando
            incêndio. A DIX assume parte do desenvolvimento para a sua equipe
            respirar e voltar ao que só ela sabe fazer.
          </p>
        </div>

        {/* Como costuma estar → com a DIX */}
        <div className="relative mt-12 grid gap-3.5 md:grid-cols-2">
          <div className="rounded-[26px] border border-border bg-surface px-7 pb-3.5 pt-7">
            <h3 className="text-body-medium-semibold font-bold text-fg-muted">
              Como costuma estar
            </h3>
            <ul className="mt-2.5">
              {before.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3.5 border-t border-border py-[15px] text-[18px] leading-snug text-fg-muted first:border-t-0"
                >
                  <CircleMinus className="h-5 w-5 shrink-0 text-fg-subtle" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel-deep rounded-[26px] px-7 pb-3.5 pt-7 text-white">
            <h3 className="text-body-medium-semibold font-bold text-secondary-400">
              Com a DIX
            </h3>
            <ul className="mt-2.5">
              {after.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3.5 border-t border-white/15 py-[15px] text-[18px] leading-snug first:border-t-0"
                >
                  <Check className="h-5 w-5 shrink-0 text-secondary-400" strokeWidth={2.5} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 rotate-90 items-center justify-center rounded-full bg-secondary-500 text-primary-900 ring-8 ring-bg md:rotate-0"
          >
            <ArrowRight className="h-[22px] w-[22px]" />
          </span>
        </div>

        {/* Três formas de trabalhar: painéis que expandem */}
        <h3 className="mt-16 text-body-medium-semibold font-bold text-fg">
          Três formas de trabalhar com a DIX
        </h3>
        <div className="mt-4 flex flex-col gap-3 lg:h-[460px] lg:flex-row">
          {modes.map((m, i) => {
            const open = i === active;
            return (
              <button
                key={m.title}
                type="button"
                aria-expanded={open}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "photo-fade group relative isolate flex min-h-[240px] min-w-0 flex-col justify-end overflow-hidden rounded-[28px] bg-primary-900 p-6 text-left text-white transition-[flex-grow] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none lg:basis-0",
                  open ? "lg:grow-[3.2]" : "lg:grow"
                )}
              >
                <Image
                  src={m.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  style={{ objectPosition: m.position }}
                  className={cn(
                    "object-cover transition-transform duration-700 motion-reduce:transition-none",
                    open && "lg:scale-[1.04]"
                  )}
                />
                <span className="display relative z-10 text-[26px] leading-[1.12]">
                  {m.title}
                </span>
                <span
                  className={cn(
                    "relative z-10 mt-2.5 block max-w-[26em] text-body-medium-regular text-primary-100 transition-all duration-500 motion-reduce:transition-none",
                    !open && "lg:mt-0 lg:max-h-0 lg:opacity-0",
                    open && "lg:max-h-24 lg:opacity-100"
                  )}
                >
                  {m.body}
                </span>
              </button>
            );
          })}
        </div>

        {/* O que desenvolve (a lista inclui exemplos; ver aviso em data/index.ts) */}
        <div className="mt-16 grid gap-5 border-t-2 border-fg pt-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14">
          <div>
            <h3 className="display text-[28px] leading-[1.06] text-fg md:text-[36px]">
              O que a DIX{" "}
              <span className="font-light text-fg-muted">desenvolve</span>
            </h3>
            <a
              href={whatsappLink(whatsappMessages.softwareHouse)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-link-medium font-bold text-fg underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Falar sobre o seu projeto <ArrowRight className="h-4 w-4" />
              <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
            </a>
          </div>
          <ul className="gap-x-12 sm:columns-2">
            {built.map((t) => (
              <li
                key={t}
                className="break-inside-avoid border-b border-border py-3 text-[18px] text-fg"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
