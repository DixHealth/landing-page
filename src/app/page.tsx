import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import React from "react";

const Home = () => {
  return (
    <main
      className="relative w-screen opacity-95 h-dvh flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url('/images/28.svg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 bg-wh"></div>
      <Navigation />
      <Hero />
    </main>
  );
};

export default Home;
