import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { navItems } from "@/data";
import { smoothScroll } from "@/utils";
import Image from "next/image";

export const DrawerNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-emerald-500 ">
          <Image
            alt="Menu"
            width={30}
            height={30}
            src="/icon/menu.svg"
            quality={100}
            className=" text-secondary-500"
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[200px] h-44 bg-neutral-900 flex items-center justify-center"
      >
        <nav className="flex flex-col gap-4 ">
          {navItems.map((item, idx) => (
            <div className="" key={idx}>
              <a
                href={item.link}
                onClick={() => smoothScroll(item.link)}
                className="w-[200px]  text-neutral-100  hover:text-neutral-500 flex items-center justify-center transition-colors px-4 text-lg"
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
