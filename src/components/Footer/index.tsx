"use client";

import { handleEmailButtonClick } from "@/utils";
import Image from "next/image";

export const Footer: React.FC = () => {
  const handleNavigate = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <footer className="bg-black w-full text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row  items-center justify-between md:items-start gap-8">
          <div className="space-y-4 flex flex-col">
            <Image
              src="/logo-white.svg"
              alt="DIX"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-body-small-regular text-neutral-500">
              CNPJ: 39.336.761/0001-54
            </p>
            <div className="flex gap-4">
              <a
                onClick={() =>
                  handleNavigate("https://www.linkedin.com/company/dixhealth/")
                }
                className=" cursor-pointer w-10 h-10 rounded-full border border-emerald-400/20 flex items-center justify-center hover:border-emerald-400 transition-colors"
              >
                <img src="/icon/linkedin.svg" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                onClick={() =>
                  handleNavigate("https://www.instagram.com/dixhealth/")
                }
                className="cursor-pointer w-10 h-10 rounded-full border border-emerald-400/20 flex items-center justify-center hover:border-emerald-400 transition-colors"
              >
                <img src="/icon/instagram.svg" />

                <span className="sr-only">Instagram</span>
              </a>
              <a
                onClick={handleEmailButtonClick}
                className="cursor-pointer w-10 h-10 rounded-full border border-emerald-400/20 flex items-center justify-center hover:border-emerald-400 transition-colors"
              >
                <img src="/icon/email-2.svg" />

                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-subtitle-medium">Faça-nos uma visita!</h3>
            <div className="flex items-start gap-2 max-w-md text-gray-400">
              <img src={"/icon/map-pin.svg"} />
              <p className="text-body-small-regular text-neutral-400">
                Ed. Itaparica Top Business - Rod. do Sol, 2780 - Sala 908- Praia
                de Itaparica, Vila Velha - ES
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 w-full flex justify-center items-center mx-auto text-body-small-regular text-neutral-500">
          <p>Desenvolvido em parceria com Owlux Company Ltda</p>
        </div>
      </div>
    </footer>
  );
};
