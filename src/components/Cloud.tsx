"use client";

import React from "react";
import { Activity, ArrowRight, Box, CloudUpload, Database, type LucideIcon } from "lucide-react";
import { cloudItems, cloudProviders, whatsappLink, whatsappMessages } from "@/data";

const ICONS: LucideIcon[] = [CloudUpload, Box, Database, Activity];

/** Cloud: painel escuro com os quatro serviços, as nuvens e a prova. */
export const Cloud: React.FC = () => {
  return (
    <section id="cloud" className="w-full bg-bg pb-4">
      <div className="container">
        <div className="panel-deep rounded-[28px] p-7 text-white md:rounded-[36px] md:p-14 lg:p-[76px]">
          <div className="grid items-end gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <span className="tag text-secondary-300">Cloud</span>
              <h2 className="display mt-4 max-w-[13em] text-[34px] leading-[1.04] md:text-[56px]">
                Infraestrutura em nuvem,{" "}
                <span className="font-light text-primary-100/85">
                  com alguém cuidando dela todos os dias.
                </span>
              </h2>
            </div>
            <p className="max-w-lg text-subtitle-small font-normal text-primary-100/85 md:text-[19px] md:leading-[1.5]">
              A DIX leva a sua operação para a nuvem e continua lá depois da
              migração, para que a infraestrutura deixe de ser preocupação da
              sua equipe.
            </p>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cloudItems.map((c, i) => {
              const Icon = ICONS[i];
              return (
                <li
                  key={c.title}
                  className="rounded-[22px] border border-white/15 bg-white/[0.06] p-[22px]"
                >
                  <Icon className="h-6 w-6 text-secondary-400" aria-hidden />
                  <h3 className="display mt-4 text-[21px] leading-tight">{c.title}</h3>
                  <p className="mt-1.5 text-body-medium-regular text-primary-100/85">{c.body}</p>
                </li>
              );
            })}
          </ul>

          <h3 className="mt-11 text-body-medium-semibold font-bold">
            Nuvens com que trabalhamos
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {cloudProviders.map((c) => (
              <li
                key={c.name}
                className="flex h-[100px] items-center justify-center rounded-[22px] bg-white px-5 py-3 md:h-[124px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt={c.name} style={{ height: c.h }} className="block w-auto max-w-full" />
              </li>
            ))}
          </ul>

          <p className="mt-11 max-w-[25em] border-t border-white/15 pt-9 text-[22px] font-light leading-[1.22] tracking-[-0.02em] md:text-[32px]">
            É a mesma infraestrutura que mantém os produtos da DIX no ar.{" "}
            <strong className="font-extrabold text-secondary-400">
              O que oferecemos para você, usamos em casa.
            </strong>
          </p>

          <a
            href={whatsappLink(whatsappMessages.cloud)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-link-medium font-bold text-white underline decoration-[#1fe1a7] decoration-2 underline-offset-[6px] hover:text-[#7ef0d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4]"
          >
            Falar sobre a sua nuvem <ArrowRight className="h-4 w-4" />
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
