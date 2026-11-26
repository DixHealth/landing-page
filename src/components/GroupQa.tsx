"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { groupCompanies } from "@/data";

/** Fecho institucional: a Dix como parte do Grupo QA e as empresas do grupo. */
export const GroupQa: React.FC = () => {
  return (
    <section id="grupo" className="w-full bg-bg pb-20 md:pb-28">
      <div className="container">
        <span className="tag text-fg">Grupo QA</span>
        <h2 className="display mt-4 max-w-2xl text-[30px] leading-[1.08] text-fg md:text-[40px]">
          A Dix faz parte do Grupo QA
        </h2>
        <p className="mt-3 max-w-xl text-body-medium-regular text-fg-muted">
          Conheça as outras empresas do grupo.
        </p>

        <ul className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {groupCompanies.map((c) => (
            <li key={c.name}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[22px] border border-[#7ef0d4]/15 bg-[#0b2e38] p-6 text-white transition-colors hover:border-[#1fe1a7]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span className="flex h-16 items-center">
                  <Image
                    src={c.logo}
                    alt=""
                    width={c.w}
                    height={c.h}
                    sizes="180px"
                    className="h-auto max-h-14 w-auto max-w-[170px] object-contain"
                  />
                </span>
                <span className="mt-5 flex items-start justify-between gap-3">
                  <span className="text-body-medium-semibold font-bold">{c.name}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#1fe1a7] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </span>
                <span className="mt-1.5 text-body-small-regular text-[#c9e2de]">{c.body}</span>
                <span className="sr-only"> (abre o site em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
