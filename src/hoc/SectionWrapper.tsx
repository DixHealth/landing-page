import { StaggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import React from "react";

const SectionWrapper = (Component: React.ComponentType, idName: string) => {
  const HOC: React.FC = () => {
    return (
      <motion.section
        variants={StaggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

  return HOC;
};

export default SectionWrapper;
