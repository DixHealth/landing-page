import { Button } from "@/components/ui/button";
import React from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

export const Hero: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 pt-20 pb-32 opacity-90">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <TextGenerateEffect
              words="Vamos escalar o seu negócio?"
              className="text-center font-normal text-[40px] md:text-[96px]"
            />
          </h1>
          <p className="text-white text-title-medium md:text-title-medium max-w-2xl mx-auto">
            Desenvolvemos soluções sob medida, alinhadas às suas necessidades e
            expansões.
          </p>
          <Button className="bg-secondary-500 hover:bg-secondary-600 text-neutral-900 px-8 py-6 text-lg rounded-full">
            Entre em contato
          </Button>
        </div>
      </div>

      {/* Background Effect */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(45deg, #000 0%, #111 100%)",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0, 100, 255, 0.1) 0%, transparent 60%), radial-gradient(circle at 100% 0%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)",
        }}
      />
    </>
  );
};
