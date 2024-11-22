import React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full  z-50 px-4 py-6">
      <div className="flex items-center justify-between md:mx-16">
        <img
          className="text-neutral-100 text-2xl font-bold"
          src="/logo-white.svg"
        />
        <div className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center justify-center gap-8 flex-grow">
            <a href="#pilares" className="text-neutral-100 hover:text-gray-300">
              Pilares
            </a>
            <a
              href="#nossos-clientes"
              className="text-neutral-100 hover:text-gray-300"
            >
              Clientes
            </a>
            <a
              href="#quem-somos"
              className="text-neutral-100 hover:text-gray-300"
            >
              Quem somos
            </a>
          </div>

          {/* Botão no canto direito */}
          <Button
            variant="outline"
            className="bg-transparent text-white border-secondary-500 hover:bg-emerald-500 hover:text-white"
          >
            Entre em contato
          </Button>
        </div>
        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-secondary-500 hover:bg-emerald-500 hover:text-white"
          >
            Entre em contato
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-emerald-500">
                <Menu className="h-10 w-10 text-secondary-500" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black/95 border-emerald-500/20"
            >
              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="#pilares"
                  className="text-neutral-100 hover:text-emerald-500 transition-colors px-4 py-2 text-lg"
                >
                  Pilares
                </a>
                <a
                  href="#nossos-clientes"
                  className="text-neutral-100 hover:text-emerald-500 transition-colors px-4 py-2 text-lg"
                >
                  Clientes
                </a>
                <a
                  href="#quem-somos"
                  className="text-neutral-100 hover:text-emerald-500 transition-colors px-4 py-2 text-lg"
                >
                  Quem somos
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
