"use client";

import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="#about"
      className="bg-black min-h-screen md:pt-8 flex flex-col justify-center items-center md:flex-row w-screen overflow-hidden "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="px-1 md:px-6 mx-auto max-w-7xl">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <span className="gradient-text text-subtitle-medium font-normal md:font-semibold ">
              QUEM SOMOS
            </span>
            <motion.h1 className="text-heading" variants={itemVariants}>
              Conheça nossa essência
            </motion.h1>
            <div className="space-y-4 text-gray-300">
              <motion.p
                className="text-body-medium-regular"
                variants={itemVariants}
              >
                Somos especialistas em cloud computing, infraestrutura,
                outsourcing de TI e desenvolvimento de sistemas.
              </motion.p>
              <motion.p
                className="text-body-medium-regular"
                variants={itemVariants}
              >
                Entendemos o ambiente e os objetivos da sua empresa, encontrando
                as melhores soluções para impulsionar o seu negócio e dar
                segurança às operações tecnológicas.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[300px] lg:h-auto"
            variants={itemVariants}
          >
            <motion.img
              src="/images/pexels.svg"
              alt="Ambiente de trabalho colaborativo"
              className="object-cover rounded-lg"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 justify-center gap-6"
          variants={containerVariants}
        >
          <motion.img src="/card/missao.svg" variants={itemVariants} />
          <motion.img src="/card/visao.svg" variants={itemVariants} />
          <motion.img src="/card/valores.svg" variants={itemVariants} />
        </motion.div>
      </div>
    </motion.section>
  );
};
