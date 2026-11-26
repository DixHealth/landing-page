"use client";

import React from "react";
import Image from "next/image";
import { essence } from "@/data";

const RichText = ({ parts }: { parts: (string | { em: string })[] }) => (
  <>
    {parts.map((p, i) =>
      typeof p === "string" ? (
        <React.Fragment key={i}>{p}</React.Fragment>
      ) : (
        <strong key={i} className="font-bold text-fg">
          {p.em}
        </strong>
      )
    )}
  </>
);

export const About: React.FC = () => {
  const items = [
    { label: "Missão", body: <RichText parts={essence.mission.parts} /> },
    { label: "Visão", body: <RichText parts={essence.vision.parts} /> },
    {
      label: "Valores",
      body: <>{essence.values.items.join(", ").replace(/, ([^,]*)$/, " e $1")}.</>,
    },
  ];

  return (
    <section id="about" className="section-y w-full bg-bg">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <span className="tag text-fg">Sobre a Dix</span>
          <h2 className="display mt-4 text-[34px] leading-[1.08] text-fg md:text-[48px]">
            Conheça nossa essência
          </h2>
          <div className="mt-6 max-w-lg space-y-4 text-body-medium-regular text-fg-muted">
            <p>
              Somos especialistas em cloud computing, infraestrutura,
              outsourcing de TI e desenvolvimento de sistemas.
            </p>
            <p>
              Entendemos o ambiente e os objetivos da sua empresa, encontrando
              as melhores soluções para impulsionar o seu negócio e dar
              segurança às operações tecnológicas.
            </p>
          </div>
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src="/images/pexels.png"
              alt="Equipe reunida em torno de uma mesa com notebooks e tablets"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid content-start gap-4">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={
                i === 0
                  ? "rounded-xl panel-deep p-6 text-white md:p-8"
                  : "rounded-xl border border-border bg-surface p-6 shadow-omni md:p-8"
              }
            >
              <p
                className={
                  i === 0
                    ? "text-caption-bold uppercase tracking-[0.08em] text-primary-200"
                    : "text-caption-bold uppercase tracking-[0.08em] text-accent"
                }
              >
                {it.label}
              </p>
              <p
                className={
                  i === 0
                    ? "mt-3 text-subtitle-medium font-normal text-primary-100 [&_strong]:text-white"
                    : "mt-3 text-subtitle-small font-normal text-fg-muted"
                }
              >
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
