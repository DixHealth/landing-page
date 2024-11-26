import React, { useState } from "react";
import { Modal } from "../Modal";

interface Props {
  icon: string;
  title: string;
  gradientText: string;
  subtitle: string;
  image: string;
  index: number;
}

export const PillarCard: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  image,
  gradientText,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="md:w-[364px] mt-12 md:mt-0 ">
      <div className="w-[56px] h-[56px] border border-black flex items-center mb-3">
        <img src={icon} />
      </div>

      <div className="mb-3">
        <h3 className="text-title-large">{title}</h3>
      </div>
      <span className="gradient-text text-subtitle-medium font-bold">
        {gradientText}
      </span>
      <div className="mb-12">
        <span className="text-subtitle-medium font-normal">{subtitle}</span>
      </div>
      <div className="w-full  flex items-start justify-start">
        <img
          src={image}
          alt="Tencent Cloud"
          className="object-contain  rounded-md cursor-pointer"
          onClick={handleImageClick}
        />
      </div>

      {isModalOpen && (
        <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
          <div className="p-4 flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-screen rounded-md"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
