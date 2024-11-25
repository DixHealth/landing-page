"use client";

import React from "react";
import { Button } from "./ui/button";
import { DrawerNavigation } from "./DrawerNavigation";
import { smoothScroll } from "@/utils";
import { navItems } from "@/data";
import { useToast } from "@/hooks/use-toast";

export const Navigation: React.FC = () => {
  const { toast } = useToast();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[rgba(7,7,7,0.64)] backdrop-blur-md px-4 py-6">
      <div className="flex items-center justify-between md:mx-16">
        <a href="#hero">
          <img
            className="text-neutral-100 text-2xl font-bold cursor-pointer"
            src="/logo-white.png"
            alt="Logo"
          />
        </a>
        <div className="hidden md:flex flex-1 items-center justify-between">
          <nav className="flex items-center justify-center gap-8 flex-grow">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => smoothScroll(item.link)}
                className="text-neutral-100 hover:text-gray-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botão no canto direito */}
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              });
            }}
            className="bg-transparent hover:text-white"
          >
            Entre em contato
          </Button>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => smoothScroll("contact")}
            className="bg-transparent text-white border-secondary-500 hover:bg-emerald-500 hover:text-white"
          >
            Entre em contato
          </Button>
          <DrawerNavigation />
        </div>
      </div>
    </header>
  );
};
