"use client";

import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { DrawerNavigation } from "./DrawerNavigation";
import { CtaButton } from "./CtaButton";
import { Logo } from "./Logo";
import { smoothScroll } from "@/utils";
import { navItems, whatsappMessages } from "@/data";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "bg-bg/80 backdrop-blur-md"
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <button
          onClick={() => smoothScroll("hero")}
          aria-label="Dix Health — início"
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo className="h-9 w-auto" />
        </button>

        {/* Menu flutuante em caixa */}
        <div className="hidden items-center gap-1 rounded-full border border-border bg-surface/85 p-1.5 pl-2 shadow-menu backdrop-blur-md md:flex">
          <nav className="flex items-center">
            {navItems.map((item) => (
              <button
                key={item.link}
                onClick={() => smoothScroll(item.link)}
                className="rounded-full px-4 py-2 text-link-small text-fg transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          <CtaButton size="sm" whatsapp={whatsappMessages.geral}>
            Fale conosco
          </CtaButton>
        </div>

        <DrawerNavigation />
      </div>
    </motion.header>
  );
};
