import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Modal } from "../Modal";

interface Props {
  client: {
    name: string;
    logo: string;
  };
  index: number;
}

export const ClientCard: React.FC<Props> = ({ client, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <motion.div
      ref={ref}
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <img
        src={client.logo}
        alt={`${client.name} logo`}
        onClick={handleImageClick}
      />
      {isModalOpen && (
        <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
          <div className="p-4 flex justify-center items-center">
            <img
              src={client.logo}
              alt={client.name}
              className="max-w-full max-h-screen rounded-md"
            />
          </div>
        </Modal>
      )}
    </motion.div>
  );
};
