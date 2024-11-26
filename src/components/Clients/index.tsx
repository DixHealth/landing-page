"use client";

import { clients } from "@/data";
import React from "react";
import { ClientCard } from "./ClientCard";
import { motion } from "framer-motion";

export const Clients: React.FC = () => {
  return (
    <motion.section
      id="#clients"
      className="bg-black min-h-screen w-full common-padding flex flex-col justify-center items-center md:flex-row relative"
      initial="hidden"
      whileInView="visible"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(
            40.6% 40.6% at 28.4% 46.87%,
            rgba(0, 0, 0, 0) 0%,
            #070707 100%
          ), url('/images/37.png') center/cover no-repeat`,
          opacity: 0.95,
        }}
      ></div>

      <div className=" mx-auto max-w-7xl px-4 md:px-6 flex flex-col items-center md:flex-row relative z-10">
        <motion.div className="w-full md:w-[50%] md:h-[70vh] md:px-20 flex flex-col justify-center md:items-start text-white">
          <span className="gradient-text text-subtitle-medium font-normal md:font-semibold ">
            NOSSOS CLIENTES
          </span>
          <h2
            className="text-heading md:text-[64px] md:font-normal leading-tight"
            id="title"
          >
            +200 <br /> projetos de sucesso
          </h2>
        </motion.div>

        <div className="w-full md:w-[50%] h-auto flex flex-col items-start">
          <h3 className="text-subtitle-medium text-neutral-500 mb-4 mt-4">
            Principais Clientes
          </h3>
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center">
            {clients.map((client, idx) => (
              <ClientCard client={client} index={idx} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
