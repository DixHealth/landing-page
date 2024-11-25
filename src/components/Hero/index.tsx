"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { smoothScroll } from "@/utils";
import { SubtitleGenerateEffect } from "../SubtitleGenerateEffect";
import { TextGenerateEffect } from "../TextGenerateEffect";

export const Hero: React.FC = () => {
  useGSAP(() => {
    // gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to("#btn", { opacity: 1, y: 0, delay: 2 });
  }, []);

  return (
    <section
      className="nav-height w-full flex items-center  "
      id="hero"
      style={{
        background: `radial-gradient(
            40.6% 40.6% at 28.4% 46.87%,
            rgba(0, 0, 0, 0) 0%,
            #070707 100%
          ), url('/images/37.png') center/cover no-repeat`,
        opacity: 0.95,
      }}
    >
      <div className="container mx-auto px-4 pt-20 pb-32 opacity-90">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <TextGenerateEffect
            words="Vamos escalar o seu negócio?"
            className="text-center font-normal text-[40px] md:text-[96px]"
          />
          <SubtitleGenerateEffect
            words="Desenvolvemos soluções sob medida, alinhadas às suas necessidades e
            expansões."
            className="text-white text-title-medium md:text-title-medium max-w-2xl mx-auto"
          />

          <div
            id="btn"
            className="flex flex-col items-center opacity-0 translate-y-20"

            // initial={{
            //   opacity: 0,
            //   y: 20,
            // }}
            // animate={{
            //   opacity: 1,
            //   y: 0,
            //   transition: {
            //     duration: 0.5,
            //     delay: 0.2,
            //     ease: "easeOut",
            //     once: true,
            //   },
            // }}
          >
            <Button
              onClick={() => smoothScroll("contact")}
              className="bg-secondary-500 hover:bg-secondary-600 text-neutral-900 px-8 py-6 text-lg rounded-full"
            >
              Entre em contato
            </Button>
          </div>
        </div>
      </div>

      {/* Background Effect */}
      {/* <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(45deg, #000 0%, #111 100%)",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0, 100, 255, 0.1) 0%, transparent 60%), radial-gradient(circle at 100% 0%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)",
        }}
      /> */}
    </section>
  );
};
