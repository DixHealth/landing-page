"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Seletor do protótipo: alterna as propostas na mesma página.
 * Também aceita `?opcao=1`, `?opcao=3` ou `?opcao=v` na URL.
 */
const OPTIONS = [
  { theme: "video", q: "v", label: "Vídeos", hint: "Identidade OMNIX" },
  { theme: "light", q: "1", label: "Opção 1", hint: "Omni puro" },
  { theme: "dark", q: "3", label: "Opção 3", hint: "Híbrido" },
] as const;

export const PrototypeSwitcher = () => {
  const { theme: current, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const opcao = new URLSearchParams(window.location.search).get("opcao");
    const match = OPTIONS.find((o) => o.q === opcao);
    if (match) setTheme(match.theme);
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Proposta do protótipo"
      className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-lg border border-border bg-surface/90 p-1 shadow-menu backdrop-blur-md"
    >
      <span className="hidden px-2 text-caption-bold uppercase tracking-wider text-fg-subtle sm:inline">
        Protótipo
      </span>
      {OPTIONS.map((o) => {
        const active = current === o.theme;
        return (
          <button
            key={o.theme}
            role="radio"
            aria-checked={active}
            onClick={() => {
              setTheme(o.theme);
              const url = new URL(window.location.href);
              url.searchParams.set("opcao", o.q);
              window.history.replaceState(null, "", url);
            }}
            className={cn(
              "flex items-baseline gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-body-small-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-cta text-cta-fg"
                : "text-fg-muted hover:bg-surface-raised hover:text-fg"
            )}
          >
            {o.label}
            <span
              className={cn(
                "hidden text-caption-regular sm:inline",
                active ? "opacity-80" : "text-fg-subtle"
              )}
            >
              {o.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
};
