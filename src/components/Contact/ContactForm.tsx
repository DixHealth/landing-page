import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "../ui/card";
import { Modal } from "../Modal";

export const ContactForm: React.FC = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    privacyPolicy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Card className="bg-[#181818] backdrop-blur-sm p-8 rounded-lg border-none">
      <h3 className="text-white text-xl mb-6">Envie uma mensagem.</h3>
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Nome
          </Label>
          <Input
            id="name"
            placeholder="Informe o seu nome"
            className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu melhor e-mail"
            className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-gray-300">
            Assunto
          </Label>
          <Input
            id="subject"
            placeholder="Informe o assunto da mensagem"
            className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-300">
            Mensagem
          </Label>
          <Textarea
            id="message"
            placeholder="Conte um pouco sobre como podemos te ajudar"
            className="bg-gray-800/60 border-gray-700 rounded-lg text-white placeholder:text-gray-500 min-h-[120px]"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={formData.privacyPolicy}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                privacyPolicy: checked as boolean,
              })
            }
            className="border-gray-700 data-[state=checked]:bg-emerald-400"
          />
          <Label htmlFor="privacy" className="text-sm text-gray-300">
            Afirmo que li e concordo com a{" "}
            <a
              onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Política de Privacidade
            </a>{" "}
            da DixHealth
          </Label>
          <Modal
            title="Política de Privacidade"
            open={showPrivacyPolicy}
            onOpenChange={setShowPrivacyPolicy}
          >
            <p className="text-body-small-regular">
              Lorem ipsum dolor sit amet consectetur. Orci est lorem id
              vulputate. Malesuada sodales sed non pellentesque penatibus quam
              eget.
              <br />
              <br />
              Id in at ipsum euismod molestie. Tortor venenatis molestie risus
              mattis risus ornare. Feugiat orci nibh lorem et rhoncus
              ullamcorper nunc. Quis id bibendum sed risus. Metus feugiat
              pulvinar sapien ut tempus sem. Condimentum duis volutpat morbi ut
              suspendisse fames scelerisque mi. Lorem nunc consectetur pharetra
              aliquam. Sem lectus sed nisl tellus donec orci vitae mattis. Sem
              orci et aliquet nibh elit purus integer sit. Facilisis nascetur
              sed felis penatibus. Massa vehicula sit amet laoreet nibh. Iaculis
              interdum a ipsum pulvinar sapien. Lobortis porta sollicitudin id
              id sed. Pretium tempor tortor donec diam scelerisque diam bibendum
              vulputate dignissim. Egestas mattis quisque tempor vestibulum
              metus. Tempus euismod in laoreet feugiat. Auctor massa placerat
              orci vitae fames vitae mattis sociis. Et arcu laoreet tincidunt
              leo eget arcu lacus. Lacus in integer quis nunc proin viverra est.
              Sit pellentesque semper purus iaculis consequat. Risus egestas
              curabitur eget velit facilisi purus. Scelerisque volutpat quam
              luctus enim tellus mi praesent. Aliquet sit dui et cursus arcu
              sollicitudin. Elit maecenas enim pulvinar libero feugiat etiam
              nec. Orci magna nunc dignissim donec sit diam. Praesent ipsum
              tellus cursus sociis iaculis eleifend et. Dolor in egestas in amet
              egestas ornare iaculis. Tincidunt leo dolor sed enim massa in
              diam. Augue velit pellentesque nibh pellentesque et facilisis.
              Hendrerit leo tellus non vitae. Eu massa diam lorem a massa
              pellentesque lobortis risus. Id feugiat in imperdiet sit fames sed
              luctus platea dictumst. Nibh sagittis tristique et viverra nulla.
              Libero nunc leo at in mattis sit. In pretium volutpat vulputate
              tellus massa egestas. Aliquet massa pulvinar lacinia viverra
              vitae. Amet aenean pharetra orci egestas egestas eu senectus
              egestas.
            </p>
          </Modal>
        </div>

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            variant="outline"
            className="bg-emerald-400 hover:bg-emerald-500 "
          >
            Enviar mensagem
          </Button>
        </div>
      </form>
    </Card>
  );
};
