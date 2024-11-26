"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import { PillarCard } from "./PillarCard";
import { pillarCards } from "@/data";
import { animateWithGsap } from "@/lib/animations";
import { Separator } from "../ui/separator";

export const Pillars: React.FC = () => {
  useGSAP(() => {
    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section
      className="bg-black min-h-screen flex flex-col justify-center items-center md:flex-row w-screen overflow-hidden "
      id="#pillars"
    >
      <div className="mx-auto px-1 md:px-6 ">
        <div className="gap-4 flex flex-col mb-6">
          <span className="gradient-text text-subtitle-medium font-normal md:font-semibold ">
            PILARES
          </span>
          <h2 className="text-white text-heading font-normal md:text-[64px] ">
            Como podemos te ajudar
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 g_fadeIn">
          {pillarCards.map((pillar, index) => (
            <PillarCard
              index={index}
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              subtitle={pillar.subtitle}
              image={pillar.image}
              gradientText={pillar.gradientText}
            />
          ))}
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="my-2 md:hidden bg-gradient-to-r from-[#3AA0EA] to-[#44F17F] w-full mx-auto mt-16"
      />
    </section>
  );
};
