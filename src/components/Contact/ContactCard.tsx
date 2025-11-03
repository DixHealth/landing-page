import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { handleEmailButtonClick } from "@/utils";
import Image from "next/image";

const buttonStyle =
  "w-full md:w-96 transition ease-in-out hover:scale-105 flex flex-col items-start md:w-[244px] h-[94px] rounded-[8px] shadow-[4px_4px_10px_rgba(0,0,0,0.3)] border-none bg-[#242424]";

export const ContactCard: React.FC = () => {
  const handleChatButtonClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
    const whatsappURL = `https://wa.me/${phoneNumber}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <Card className="space-y-8 bg-[#181818] py-10 px-4 md:p-10 border-none md:[400px] lg:w-[912px]">
      <div>
        <h2 className="text-title-medium md:text-heading text-white mb-2">
          Gostaria de saber mais?
        </h2>
        <span className="gradient-text text-[40px] font-semibold md:font-normal md:text-[64px] ">
          Entre em contato!
        </span>
      </div>

      <div className="flex flex-col items-center md:flex-row gap-8">
        <Card className="w-full md:w-[264px] bg-[#242424] border-none backdrop-blur-sm p-6 rounded-lg">
          <Image
            width={32}
            height={32}
            alt="icon"
            src="/icon/Phone.svg"
            quality={100}
          />
          <h3 className="flex items-center gap-2 text-subtitle-medium font-normal mt-2 mb-4">
            Telefones para contato:
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>(27) 3441 2622</p>
            <p>(51) 9 8598 0078</p>
            <p>(55) 9 9698 0112</p>
          </div>
        </Card>

        <div className="md:w-80 w-[95%] items-center h-[220px] flex flex-col justify-between z-10">
          <Button
            variant="outline"
            className={buttonStyle}
            onClick={handleChatButtonClick}
          >
            <Image
              width={32}
              height={32}
              alt="icon"
              src={"/icon/Whatsapp.svg"}
              quality={100}
            />
            WhatsApp
          </Button>

          <Button
            variant="outline"
            className={buttonStyle}
            onClick={handleEmailButtonClick}
          >
            <Image
              width={32}
              height={32}
              alt="icon"
              src={"/icon/Email.svg"}
              quality={100}
            />
            Email
          </Button>
        </div>
      </div>
    </Card>
  );
};
