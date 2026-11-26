"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Aviso de cookies (LGPD).
 *
 * - Três caminhos com o mesmo peso: aceitar todos, só os essenciais, personalizar.
 * - Nada opcional roda antes da escolha: a medição de acessos só é carregada
 *   depois do consentimento.
 * - A escolha pode ser revista a qualquer momento em "Preferências de cookies",
 *   no rodapé.
 *
 * Categorias refletem o que o site realmente usa. Ao adicionar uma ferramenta
 * nova (pixel, chat, mapa), crie a categoria aqui e condicione o carregamento.
 */

const STORAGE_KEY = "dix-cookie-consent";
const VERSION = 1; // mude para perguntar de novo quando as categorias mudarem

export const OPEN_COOKIES_EVENT = "dix:open-cookies";
export const OPEN_PRIVACY_EVENT = "dix:open-privacy";

type Consent = { v: number; analytics: boolean; date: string };

const read = (): Consent | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    return c.v === VERSION ? c : null;
  } catch {
    return null;
  }
};

const Switch = ({
  checked,
  onChange,
  disabled,
  labelledBy,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  labelledBy: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={cn(
      "relative h-7 w-12 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60",
      checked ? "border-cta bg-cta" : "border-border-strong bg-surface-raised"
    )}
  >
    <span
      className={cn(
        "absolute left-0.5 top-0.5 h-[22px] w-[22px] rounded-full transition-transform motion-reduce:transition-none",
        checked ? "translate-x-5 bg-cta-fg" : "bg-fg-subtle"
      )}
    />
  </button>
);

export const CookieConsent: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  // true enquanto a medição de acessos está carregada nesta página
  const wasMeasuring = useRef(false);

  useEffect(() => {
    const saved = read();
    setConsent(saved);
    wasMeasuring.current = saved?.analytics ?? false;
    setAnalytics(saved?.analytics ?? false);
    setReady(true);

    const open = () => {
      setAnalytics(read()?.analytics ?? false);
      setPrefsOpen(true);
    };
    window.addEventListener(OPEN_COOKIES_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIES_EVENT, open);
  }, []);

  const save = useCallback((allowAnalytics: boolean) => {
    const next: Consent = {
      v: VERSION,
      analytics: allowAnalytics,
      date: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // sem armazenamento (aba privada): vale só para esta visita
    }
    // Retirou o consentimento com a medição já carregada: recarrega a página
    // para a medição parar de verdade, e não só na próxima visita.
    if (wasMeasuring.current && !allowAnalytics) {
      window.location.reload();
      return;
    }
    wasMeasuring.current = allowAnalytics;
    setConsent(next);
    setAnalytics(allowAnalytics);
    setPrefsOpen(false);
  }, []);

  if (!ready) return null;

  const showBanner = !consent && !prefsOpen;

  return (
    <>
      {consent?.analytics && <Analytics />}

      {showBanner && (
        <section
          aria-label="Aviso de cookies"
          className="cookie-banner fixed inset-x-0 bottom-0 z-[70] p-3 md:p-5"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-[22px] border border-border bg-surface p-5 text-fg shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="min-w-0">
              <h2 className="text-body-medium-semibold font-bold text-fg">
                Este site usa cookies
              </h2>
              <p className="mt-1.5 text-body-small-regular text-fg-muted">
                Os essenciais mantêm o site funcionando. Com a sua
                permissão, usamos também os de análise para entender como o
                site é usado. Você escolhe, e pode mudar depois no rodapé.{" "}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_EVENT))}
                  className="text-fg underline decoration-accent underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Política de Privacidade
                </button>
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <Button variant="outline" className="rounded-full" onClick={() => setPrefsOpen(true)}>
                Personalizar
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => save(false)}>
                Só os essenciais
              </Button>
              <Button className="rounded-full" onClick={() => save(true)}>
                Aceitar todos
              </Button>
            </div>
          </div>
        </section>
      )}

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg">
          <DialogHeader>
            <DialogTitle>Preferências de cookies</DialogTitle>
            <DialogDescription>
              Escolha o que este site pode guardar no seu navegador.
            </DialogDescription>
          </DialogHeader>

          <ul className="divide-y divide-border">
            <li className="flex items-start justify-between gap-5 py-4">
              <div>
                <p id="ck-essenciais" className="text-body-medium-semibold font-bold text-fg">
                  Essenciais
                </p>
                <p className="mt-1 text-body-small-regular text-fg-muted">
                  Guardam a sua escolha de cookies e mantêm o site
                  funcionando. Ficam sempre ativos.
                </p>
              </div>
              <Switch checked disabled labelledBy="ck-essenciais" />
            </li>
            <li className="flex items-start justify-between gap-5 py-4">
              <div>
                <p id="ck-analise" className="text-body-medium-semibold font-bold text-fg">
                  Análise
                </p>
                <p className="mt-1 text-body-small-regular text-fg-muted">
                  Contam visitas e páginas mais vistas, de forma agregada,
                  para a gente melhorar o site.
                </p>
              </div>
              <Switch checked={analytics} onChange={setAnalytics} labelledBy="ck-analise" />
            </li>
          </ul>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" className="rounded-full" onClick={() => save(false)}>
              Só os essenciais
            </Button>
            <Button className="rounded-full" onClick={() => save(analytics)}>
              Salvar escolhas
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
