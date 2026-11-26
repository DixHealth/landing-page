import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { navItems, whatsappLink, whatsappMessages } from "@/data";
import { smoothScroll } from "@/utils";

export const DrawerNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const go = (id: string) => {
    setIsOpen(false);
    // espera o sheet fechar para não brigar com o scroll
    setTimeout(() => smoothScroll(id), 250);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="!size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-72 flex-col gap-8 p-6">
        <SheetTitle>Menu</SheetTitle>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.link}
              onClick={() => go(item.link)}
              className="rounded-md px-3 py-3 text-left text-subtitle-small text-fg transition-colors hover:bg-surface-raised hover:text-accent"
            >
              {item.label}
              {item.isNew && (
                <span className="ml-1.5 rounded-sm bg-[#1fe1a7] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-[#061c23]">
                  Novo
                </span>
              )}
            </button>
          ))}
        </nav>
        <Button asChild className="mt-auto w-full">
          <a
            href={whatsappLink(whatsappMessages.geral)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Fale com um especialista
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
};
