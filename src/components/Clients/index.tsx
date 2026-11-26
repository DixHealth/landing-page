"use client";

import React from "react";
import Image from "next/image";
import { clients } from "@/data";

export const Clients: React.FC = () => {
  return (
    <section id="clients" className="w-full bg-bg pb-6">
      <div className="container">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-omni md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="tag text-fg">Clientes</span>
              <h2 className="display mt-4 text-[34px] leading-[1.08] text-fg md:text-[48px]">
                Quem confia na Dix
              </h2>
            </div>
            <p>
              <span className="display block text-[44px] leading-none text-primary-900 dark:text-fg md:text-[56px]">
                +250
              </span>
              <span className="mt-2 block text-body-small-regular text-fg-muted">projetos entregues</span>
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-5">
            {clients.map((client) => (
              <li
                key={client.name}
                className="flex flex-col items-center gap-2 bg-surface px-3 py-5"
              >
                <Image
                  width={64}
                  height={64}
                  src={client.logo}
                  alt=""
                  className="h-14 w-14 object-contain"
                />
                <span className="text-caption-regular text-fg-subtle">{client.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
