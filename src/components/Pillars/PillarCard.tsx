import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "@/lib/animations";
import { Modal } from "../Modal";

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  image: string;
  index: number;
}

export const PillarCard: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  image,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 md:w-[364px] mt-12 md:mt-0">
      <img src={icon} />
      <h3 className=" text-title-large">{title}</h3>
      <span className="text-subtitle-medium font-normal">{subtitle}</span>
      <div className="w-full">
        <img
          src={image}
          alt="Tencent Cloud"
          className="object-contain w-full h-full rounded-md cursor-pointer"
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
