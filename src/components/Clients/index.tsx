"use client";
import { clients } from "@/data";
import React from "react";
import { ClientCard } from "./ClientCard";

export const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      className="bg-black w-full min-h-screen  flex flex-col justify-center items-center  md:flex-row   md:px-20"
    >
      {/* Seção esquerda */}
      <div className="w-full md:w-[50%] md:px-20 flex flex-col justify-center items-start text-white relative p-6">
        {/* Background gradiente */}

        <div className="absolute  md:inset-0 bg-cover bg-center "></div>
        <img src="/our-clients.svg" className="lg:mb-0 mb-5" />
        <h2 className="text-heading text-[64px] font-bold leading-tight">
          +150 <br /> projetos de sucesso
        </h2>
      </div>

      {/* Seção direita */}
      <div className="w-full md:w-[50%] grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {clients.map((client, idx) => (
          <ClientCard client={client} index={idx} key={idx} />
        ))}
      </div>
    </section>
  );
};
