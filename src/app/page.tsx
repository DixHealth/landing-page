import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Pillars } from "@/components/Pillars";
import { Contact } from "@/components/Contact";
import React from "react";
import { Hero } from "@/components/Hero";

const Home = () => {
  return (
    <main
      className="relative w-screen  flex justify-center items-center flex-col overflow-hidden mx-auto md:px-0  "
      // style={{
      //   backgroundImage: "url(/images/28.svg)",
      // }}
    >
      {/* <div className="absolute inset-0 "></div> */}
      <Navigation />
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
