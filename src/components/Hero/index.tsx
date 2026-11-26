"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { CtaButton } from "../CtaButton";
import { clients, cloudProviders, whatsappMessages } from "@/data";
import { smoothScroll } from "@/utils";
import { cn } from "@/lib/utils";

/** Célula do mosaico: um botão grande que leva à seção do pilar. */
const Cell = ({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={() => smoothScroll(to)}
    className={cn(
      "group relative isolate flex flex-col items-start overflow-hidden rounded-[28px] p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      className
    )}
  >
    {children}
  </button>
);

const Go = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-900 transition-transform duration-200 group-hover:translate-y-1 motion-reduce:transition-none",
      className
    )}
  >
    <ArrowDown className="h-[18px] w-[18px]" />
  </span>
);

const Kicker = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("z-10 text-caption-bold uppercase tracking-[0.1em]", className)}>
    {children}
  </span>
);

const cellTitle = "display z-10 mt-3 block max-w-[13em] text-[22px] leading-[1.12] md:text-[26px]";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="bg-hero relative w-full pb-20 pt-32 md:pt-36">
      <div className="container">
        {/* Novidade: OMNIX */}
        <button
          onClick={() => smoothScroll("omnix")}
          className="group mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#1fe1a7]/40 bg-[#0b2e38] py-1.5 pl-1.5 pr-4 text-left text-body-small-semibold text-white shadow-menu transition-colors hover:border-[#1fe1a7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image src="/omnix/omnix-neutral.png" alt="" width={28} height={28} />
          <span className="rounded-full bg-[#1fe1a7] px-2.5 py-0.5 text-caption-bold uppercase tracking-[0.08em] text-[#061c23]">
            Novidade
          </span>
          <span>Conheça a OMNIX, a IA da DIX</span>
          <ArrowRight className="h-4 w-4 text-[#1fe1a7] transition-transform group-hover:translate-x-0.5" />
        </button>

        <h1 className="max-w-[11em] text-[44px] font-light leading-[0.98] tracking-[-0.04em] text-primary-900 dark:text-fg md:text-[92px]">
          <span className="text-brand font-extrabold">Fôlego</span> para quem faz{" "}
          <strong className="font-extrabold">a saúde funcionar.</strong>
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-14 gap-y-7">
          <p className="max-w-xl text-subtitle-medium font-normal text-fg-muted">
            A DIX entra onde a sua equipe de tecnologia não dá conta:
            desenvolve junto, cuida da nuvem ou entrega o sistema pronto.
          </p>
          <CtaButton size="lg" whatsapp={whatsappMessages.hero}>
            Fale com um especialista
          </CtaButton>
        </div>

        {/* Mosaico dos três pilares */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 grid gap-3.5 lg:grid-cols-12 lg:grid-rows-[270px_236px]"
        >
          <Cell
            to="dev"
            className="photo-fade min-h-[320px] justify-end bg-primary-900 text-white lg:col-span-5 lg:row-span-2"
          >
            <Image
              src="/site/equipe.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
            />
            <Go className="absolute right-5 top-5" />
            <Kicker className="text-secondary-300">Software house</Kicker>
            <span className={cellTitle}>
              O braço de desenvolvimento que falta na sua empresa
            </span>
          </Cell>

          <Cell
            to="products"
            className="bg-secondary-100 text-primary-900 dark:bg-surface-raised dark:text-fg lg:col-span-7"
          >
            <Kicker className="text-secondary-800 dark:text-accent">Produtos DIX</Kicker>
            <span className={cn(cellTitle, "max-w-[8em]")}>OMNIDIX, DIXHub e DIXFlow</span>
            <Go className="mt-auto hidden lg:flex" />
            <span
              aria-hidden
              className="relative z-0 mt-6 block w-full overflow-hidden rounded-t-xl shadow-menu transition-transform duration-500 motion-reduce:transition-none lg:absolute lg:-right-6 lg:top-8 lg:mt-0 lg:w-[52%] lg:rounded-xl lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-1.5"
            >
              <Image
                src="/produtos/omnidix-demo-poster.jpg"
                alt=""
                width={720}
                height={720}
                sizes="(min-width: 1024px) 380px, 100vw"
                className="block h-auto w-full"
              />
            </span>
          </Cell>

          <Cell to="cloud" className="panel-deep text-white lg:col-span-5">
            <Go className="absolute right-5 top-5" />
            <Kicker className="text-secondary-300">Cloud</Kicker>
            <span className={cellTitle}>Infraestrutura em nuvem, da migração à operação</span>
            <span className="z-10 mt-7 flex flex-wrap gap-2 lg:mt-auto">
              {cloudProviders.map((c) => (
                <span
                  key={c.name}
                  className="flex h-[46px] items-center rounded-xl bg-white px-3.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={c.name}
                    style={{ height: Math.round(c.h * 0.45) }}
                    className="block w-auto"
                  />
                </span>
              ))}
            </span>
          </Cell>

          <Cell
            to="clients"
            className="border border-border bg-surface text-fg lg:col-span-2"
          >
            {/* brilho verde-água no canto, como nos vídeos */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(31,225,167,0.28),rgba(31,225,167,0))]"
            />
            <span className="flex items-center">
              {clients.slice(0, 4).map((c, i) => (
                <Image
                  key={c.name}
                  src={c.logo}
                  alt=""
                  width={44}
                  height={44}
                  className={cn(
                    "h-11 w-11 rounded-full bg-white object-contain ring-2 ring-surface",
                    i > 0 && "-ml-3"
                  )}
                />
              ))}
            </span>
            <span className="mt-2 text-caption-regular text-fg-subtle lg:mt-3">
              Quem confia na DIX
            </span>
            <b className="display mt-6 block text-[44px] leading-none tracking-[-0.05em] md:text-[58px] lg:mt-auto">
              +250
            </b>
            <span className="mt-1.5 text-body-small-regular text-fg-muted">projetos entregues</span>
          </Cell>
        </motion.div>
      </div>
    </section>
  );
};
