"use client";

import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  // Variantes de animação para os elementos
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="about"
      className="bg-black min-h-screen w-full py-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Grid Principal */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.img src="/QUEMSOMOS.png" className="lg:mb-0 mb-5" />
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

        {/* Cards Section */}
        <motion.div
          className="grid md:grid-cols-3 justify-center gap-6"
          variants={containerVariants}
        >
          <motion.img src="/text/missao.svg" variants={itemVariants} />
          <motion.img src="/text/visao.svg" variants={itemVariants} />
          <motion.img src="/text/valores.svg" variants={itemVariants} />
        </motion.div>
      </div>
    </motion.section>
  );
};

// "use client";

// import React from "react";

// export const About: React.FC = () => {
//   return (
//     <section id="about" className="bg-black min-h-screen w-full py-16 px-4">
//       <div className="container mx-auto max-w-7xl">
//         <div className="grid lg:grid-cols-2 gap-8 mb-16 ">
//           <div className="space-y-6">
//             <img src="/QUEMSOMOS.png" className="lg:mb-0 mb-5" />

//             <h1 className="text-heading">Conheça nossa essência</h1>
//             <div className="space-y-4 text-gray-300">
//               <p className="text-body-medium-regular">
//                 Somos especialistas em cloud computing, infraestrutura,
//                 outsourcing de TI e desenvolvimento de sistemas.
//               </p>
//               <p className="text-body-medium-regular">
//                 Entendemos o ambiente e os objetivos da sua empresa, encontrando
//                 as melhores soluções para impulsionar o seu negócio e dar
//                 segurança às operações tecnológicas.
//               </p>
//             </div>
//           </div>
//           <div className="relative h-[300px] lg:h-auto ">
//             <img
//               src="/images/pexels.svg"
//               alt="Ambiente de trabalho colaborativo"
//               className="object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Cards Section */}
//         <div className="grid md:grid-cols-3 justify-center gap-6">
//           <img src="/text/missao.svg" />
//           <img src="/text/visao.svg" />
//           <img src="/text/valores.svg" />
//         </div>
//       </div>
//     </section>
//   );
// };
