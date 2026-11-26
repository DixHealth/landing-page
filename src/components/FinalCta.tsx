"use client";

import React from "react";
import { CtaButton } from "./CtaButton";
import { contactEmail, contactLinks, contactPhones, whatsappMessages } from "@/data";

const linkClass =
  "text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-secondary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ef0d4]";

/**
 * Fechamento da página: chamada para o WhatsApp no lugar do formulário.
 * Mantém o id "contact" e os outros canais para quem não usa WhatsApp.
 */
export const FinalCta: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-bg pb-20 md:pb-28">
      <div className="container">
        <div className="ascii-bg rounded-[28px] p-7 text-white md:rounded-[36px] md:p-14">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <h2 className="display text-[36px] leading-[1.05] md:text-[56px]">
                Onde a sua equipe{" "}
                <span className="text-secondary-400">está sem fôlego?</span>
              </h2>
              <p className="mt-4 max-w-md text-body-medium-regular text-primary-100/85 md:text-subtitle-medium md:font-normal">
                Conte o que está travando a sua operação e fale com um
                especialista da Dix.
              </p>
            </div>
            <CtaButton
              size="lg"
              whatsapp={whatsappMessages.fechamento}
              className="bg-secondary-500 text-primary-900 hover:bg-secondary-400"
            >
              Fale com um especialista
            </CtaButton>
          </div>

          <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-body-small-regular text-primary-100/85">
            <span>Prefere outro canal?</span>
            <a href={contactLinks.email} className={linkClass}>
              {contactEmail}
            </a>
            {contactPhones.map((p) => (
              <a key={p} href={`tel:+55${p.replace(/\D/g, "")}`} className={linkClass}>
                {p}
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};
