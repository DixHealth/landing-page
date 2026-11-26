"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  FileText,
  FlaskConical,
  Stethoscope,
  Zap,
} from "lucide-react";
import { products, whatsappLink, whatsappMessages } from "@/data";
import { LoopVideo } from "./LoopVideo";

/* ---------- Mini ilustrações (dados fictícios) ---------- */

const HubMock = () => (
  <ol aria-hidden className="relative space-y-3 border-l border-border pl-5">
    {[
      { icon: FlaskConical, t: "Hemograma completo", s: "Laboratório · hoje" },
      { icon: Stethoscope, t: "Consulta cardiologia", s: "Clínica · 12 out" },
      { icon: FileText, t: "Guia TISS enviada", s: "Operadora · 03 out" },
    ].map(({ icon: Icon, t, s }) => (
      <li key={t} className="relative">
        <span className="absolute -left-[27px] top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-surface bg-accent" />
        <p className="flex items-center gap-2 text-body-small-semibold text-fg">
          <Icon className="h-3.5 w-3.5 text-accent" /> {t}
        </p>
        <p className="text-caption-regular text-fg-subtle">{s}</p>
      </li>
    ))}
  </ol>
);

const FlowMock = () => (
  <div aria-hidden className="flex flex-wrap items-center gap-2">
    {[
      { icon: Zap, t: "Gatilho" },
      { icon: Bot, t: "IA" },
      { icon: Check, t: "Processo concluído" },
    ].map(({ icon: Icon, t }, i, arr) => (
      <React.Fragment key={t}>
        <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface-raised px-2.5 py-1.5 text-caption-bold text-fg">
          <Icon className="h-3.5 w-3.5 text-accent" /> {t}
        </span>
        {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-fg-subtle" />}
      </React.Fragment>
    ))}
  </div>
);

const MOCKS: Record<string, React.ReactNode> = {
  DIXHub: <HubMock />,
  DIXFlow: <FlowMock />,
};

const KnowMore = ({ name, onDark = false }: { name: string; onDark?: boolean }) => (
  <a
    href={whatsappLink(whatsappMessages.produto(name))}
    target="_blank"
    rel="noopener noreferrer"
    className={
      onDark
        ? "inline-flex items-center gap-2 self-start text-link-medium text-white underline decoration-[#1fe1a7] decoration-2 underline-offset-[6px] hover:text-[#7ef0d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4]"
        : "inline-flex items-center gap-2 self-start text-link-medium text-fg underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    }
  >
    Conhecer o {name} <ArrowRight className="h-4 w-4" />
    <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
  </a>
);

/* ---------- Seção ---------- */

export const Products: React.FC = () => {
  const [main, ...others] = products;

  return (
    <section id="products" className="section-y w-full bg-bg">
      <div className="container">
        <span className="tag text-fg">Produtos</span>
        <h2 className="display mt-4 max-w-3xl text-[34px] leading-[1.08] text-fg md:text-[48px]">
          Três produtos, uma operação conectada
        </h2>
        <p className="mt-4 max-w-xl text-body-medium-regular text-fg-muted">
          Use um, dois ou os três. Eles conversam entre si e com os sistemas
          que você já tem.
        </p>

        {/* Produto principal: texto curto + demonstração em vídeo */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="panel-deep mt-12 grid items-center gap-8 overflow-hidden rounded-[28px] p-6 text-white md:p-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-14"
        >
          <div className="flex flex-col">
            <span className="tag self-start text-secondary-300">{main.name}</span>
            <h3 className="display mt-4 max-w-md text-[30px] leading-[1.08] text-white md:text-[40px]">
              {main.tagline}
            </h3>
            <p className="mt-4 max-w-md text-body-medium-regular text-primary-100/85">
              {main.body}
            </p>

            <ul className="mt-6 flex max-w-md flex-wrap gap-2">
              {main.modules.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-body-small-semibold text-white"
                >
                  {m}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <KnowMore name={main.name} onDark />
            </div>
          </div>

          <LoopVideo
              src="/produtos/omnidix-demo.mp4"
              poster="/produtos/omnidix-demo-poster.jpg"
              label="Demonstração do OMNIDIX"
              description="Vídeo sem som, de 15 segundos, em loop. Mostra seis telas do OMNIDIX em sequência: responder o paciente pelo WhatsApp, ligar e atender o telefone, agendar e encaixar consultas, atender por vídeo, registrar no prontuário e acompanhar cada paciente."
              className="omnix-card aspect-square rounded-[22px] bg-[#061c23]"
            />
        </motion.article>

        {/* Os outros dois: cartões compactos */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {others.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col rounded-[28px] border border-border bg-surface p-6 shadow-omni md:p-8"
            >
              <span className="tag self-start text-accent">{p.name}</span>
              <h3 className="display mt-4 text-[24px] leading-[1.12] text-fg md:text-[28px]">
                {p.tagline}
              </h3>
              <p className="mt-3 max-w-md text-body-medium-regular text-fg-muted">
                {p.body}
              </p>
              <div className="mt-6 flex-1">{MOCKS[p.name]}</div>
              <div className="mt-6">
                <KnowMore name={p.name} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
