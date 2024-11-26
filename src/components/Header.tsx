"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { DrawerNavigation } from "./DrawerNavigation";
import { smoothScroll } from "@/utils";
import { navItems } from "@/data";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: -50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }
    }
  }, []);
  return (
    <motion.header
      initial={{
        opacity: 1,
        y: -100,
      }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
      }}
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-[rgba(7,7,7,0.64)] backdrop-blur-md px-4 py-4"
    >
      <div className="flex items-center justify-between md:mx-16">
        <a onClick={() => smoothScroll("hero")}>
          <Image
            className="text-neutral-100 text-2xl font-bold cursor-pointer"
            src="/logo/logo-white.png"
            alt="Logo"
            width={100}
            quality={100}
            height={100}
          />
        </a>
        <div className="hidden md:flex flex-1 items-center justify-between">
          <nav className="flex items-center justify-center gap-8 flex-grow">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                onClick={() => {
                  smoothScroll(item.link);
                  console.log(item.link);
                }}
                className="text-neutral-100 hover:text-primary-300 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            variant="outline"
            onClick={() => smoothScroll("contact")}
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
    </motion.header>
  );
};
