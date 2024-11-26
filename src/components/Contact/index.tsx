"use client";

import { motion } from "framer-motion";
import { ContactCard } from "./ContactCard";
import { ContactForm } from "./Form/ContactForm";

export const Contact: React.FC = () => {
  return (
    <motion.section
      id="contact"
      className="bg-black min-h-screen overflow-hidden w-full bg-[url('/images/teste.png')] bg-cover flex flex-col justify-center items-center bg-center bg-no-repeat"
    >
      <div className=" mx-auto px-1 md:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
          <div>
            <ContactCard />
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
