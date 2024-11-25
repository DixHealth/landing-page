import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { handleEmailButtonClick } from "@/utils";

const buttonStyle =
  "w-96 transition ease-in-out hover:scale-105 flex flex-col items-start md:w-[244px] h-[94px] rounded-[8px] shadow-[4px_4px_10px_rgba(0,0,0,0.3)] border-none bg-[#242424]";

export const ContactCard: React.FC = () => {
  const handleChatButtonClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
    const whatsappURL = `https://wa.me/${phoneNumber}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <Card className="space-y-8 bg-[#181818] p-10 border-none md:w-[912px]">
      <div>
        <h2 className="text-title-medium md:text-heading text-white mb-2">
          Gostaria de saber mais?
        </h2>
        <img src="/text/contato.png" className="md:block hidden" />
        <img src="/text/contato-sm.png" className="md:hidden block" />
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Card className="w-96 md:w-[264px]  bg-[#242424] border-none backdrop-blur-sm p-6 rounded-lg">
          <img src="/icon/Phone.svg" />
          <h3 className="flex items-center gap-2 text-subtitle-medium font-normal mt-2 mb-4">
            Telefones para contato:
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>(51) 3303 3818</p>
            <p>(51) 9 8598 0078</p>
            <p>(55) 9 9698 0112</p>
          </div>
        </Card>

        <div className="w-96 h-[220px] flex flex-col justify-between z-10">
          <Button
            variant="outline"
            className={buttonStyle}
            onClick={handleChatButtonClick}
          >
            <img src={"/icon/Whatsapp.svg"} />
            WhatsApp
          </Button>

          <Button
            variant="outline"
            className={buttonStyle}
            onClick={handleEmailButtonClick}
          >
            <img src={"/icon/Email.svg"} />
            Email
          </Button>
        </div>
      </div>
    </Card>
  );
};
