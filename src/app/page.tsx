"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Omnix, OmnixCorner } from "@/components/Omnix";
import { Clients } from "@/components/Clients";
import { SoftwareHouse } from "@/components/SoftwareHouse";
import { Cloud } from "@/components/Cloud";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { FinalCta } from "@/components/FinalCta";
import { GroupQa } from "@/components/GroupQa";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <main className="relative flex w-full flex-col overflow-hidden">
      <Header />
      <Hero />
      <Omnix />
      <SoftwareHouse />
      <Cloud />
      <Products />
      <Clients />
      <About />
      <FinalCta />
      <GroupQa />
      <Footer />
      <OmnixCorner />
    </main>
  );
};

export default Home;
