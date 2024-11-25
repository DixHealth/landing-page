"use client";

import { ContactCard } from "./ContactCard";
import { ContactForm } from "./ContactForm";
import { motion } from "framer-motion";

export const Contact: React.FC = () => {
  // Variantes para animações dos itens
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="contact"
      className="min-h-screen w-full bg-[url('/images/teste.png')] bg-cover flex items-center bg-center bg-no-repeat"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          {/* ContactCard com animação */}
          <motion.div variants={itemVariants}>
            <ContactCard />
          </motion.div>

          {/* ContactForm com animação */}
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
