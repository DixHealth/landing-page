"use client";

import { useEffect, useState } from "react";
import { smoothScroll } from "@/utils";
import { contactLinks, contactPhones, pillars } from "@/data";
import { Logo } from "../Logo";
import { Modal } from "../Modal";
import { PrivacyPolicy } from "../PrivacyPolicy";
import { OPEN_COOKIES_EVENT, OPEN_PRIVACY_EVENT } from "../CookieConsent";

const link = "transition-colors hover:text-fg";

const Column = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-body-small-semibold text-fg">{title}</h3>
    <ul className="mt-4 space-y-2 text-body-small-regular text-fg-muted">
      {children}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // O aviso de cookies pede para abrir a política daqui.
  useEffect(() => {
    const open = () => setPrivacyOpen(true);
    window.addEventListener(OPEN_PRIVACY_EVENT, open);
    return () => window.removeEventListener(OPEN_PRIVACY_EVENT, open);
  }, []);

  return (
    <footer className="w-full border-t border-border bg-bg pb-24 pt-16">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-body-small-regular text-fg-muted">
              Software house, cloud e produtos próprios para quem faz a saúde
              funcionar.
            </p>
            <p className="mt-3 text-body-small-regular text-fg-muted">
              Uma empresa do{" "}
              <button className={link} onClick={() => smoothScroll("grupo")}>
                Grupo QA
              </button>
              .
            </p>
          </div>

          <Column title="Soluções">
            {pillars.map((p) => (
              <li key={p.link}>
                <button className={link} onClick={() => smoothScroll(p.link)}>
                  {p.label}
                </button>
              </li>
            ))}
          </Column>

          <Column title="Empresa">
            <li>
              <button className={link} onClick={() => smoothScroll("about")}>
                Sobre a DIX
              </button>
            </li>
            <li>
              <button className={link} onClick={() => smoothScroll("clients")}>
                Clientes
              </button>
            </li>
            <li>
              <a
                className={link}
                href="https://www.linkedin.com/company/dixhealth/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className={link}
                href="https://www.instagram.com/dixhealth/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </Column>

          <Column title="Contato">
            {contactPhones.map((p) => (
              <li key={p}>
                <a className={link} href={`tel:+55${p.replace(/\D/g, "")}`}>
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a
                className={link}
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a className={link} href={contactLinks.email}>
                E-mail
              </a>
            </li>
            <li className="pt-2">
              Rod. do Sol, 2780, Sala 908 — Praia de Itaparica, Vila Velha – ES
            </li>
          </Column>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-caption-regular text-fg-subtle sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} Dixhealth Desenvolvimento e Manutenção de Sistemas de Tecnologia LTDA · CNPJ 39.336.761/0001-54
            <span className="mt-1 block">
              Encarregado de dados (DPO): HDPO - Consultoria LTDA, representada por João Gonçalves ·{" "}
              <a className={link} href="mailto:joaogoncalves@hdpo.com.br">
                joaogoncalves@hdpo.com.br
              </a>
            </span>
          </span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <button
              className={link}
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))}
            >
              Preferências de cookies
            </button>
            <button className={link} onClick={() => setPrivacyOpen(true)}>
              Privacidade e Termos de Uso
            </button>
          </span>
        </div>
      </div>

      <Modal
        title="Privacidade e Termos de Uso"
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
      >
        <div className="text-fg-muted">
          <PrivacyPolicy />
        </div>
      </Modal>
    </footer>
  );
};
