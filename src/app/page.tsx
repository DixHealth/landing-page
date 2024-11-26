import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Footer } from "@/components/Footer";
import { Pillars } from "@/components/Pillars";
import { Contact } from "@/components/Contact";
import React from "react";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";

const Home = () => {
  return (
    <main className="relative w-screen  flex justify-center items-center flex-col overflow-hidden mx-auto md:px-0  ">
      <Header />
      <Hero />
      <Pillars />
      <Clients />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
