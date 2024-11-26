import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Modal } from "../Modal";
import Image from "next/image";

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
      className="w-full flex justify-center flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <Image
        width={100}
        height={100}
        src={client.logo}
        alt={`${client.name} logo`}
        onClick={handleImageClick}
        className="cursor-pointer"
        quality={100}
      />
      <span className="text-subtitle-medium">{client.name}</span>
      {isModalOpen && (
        <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
          <div className="p-4 flex justify-center items-center">
            <Image
              width={300}
              height={300}
              src={client.logo}
              alt={client.name}
              quality={100}
              className="max-w-full max-h-screen rounded-md"
            />
          </div>
        </Modal>
      )}
    </motion.div>
  );
};
