import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/Modal";
import { formSchema } from "./schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { initialValues } from "./initialValues";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

export const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSending(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
        process.env.NEXT_KEY!
      );
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Em breve entraremos em contato.",
      });
      form.reset();
    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ops algo deu errado!",
        description: error,
      });
    } finally {
      setIsSending(false);
    }
  }
  const { errors } = form.formState;

  return (
    <Card className="w-400 bg-[#181818] backdrop-blur-sm p-8 rounded-lg border-none">
      <h3 className="text-white text-xl mb-6">Envie uma mensagem.</h3>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informe o seu nome"
                    {...field}
                    className={`
            bg-neutral-800/60 rounded-lg text-white placeholder:text-neutral-500
            ${
              errors.name
                ? "border border-danger-400 focus:border-danger-400 focus:ring-danger-400"
                : ""
            }
          `}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu melhor e-mail"
                    className={`
                      bg-neutral-800/60 rounded-lg text-white placeholder:text-neutral-500
                      ${
                        errors.email
                          ? "border border-danger-400 focus:border-danger-400 focus:ring-danger-400"
                          : ""
                      }
                    `}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Assunto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informe o assunto da mensagem"
                    className={`
                      bg-neutral-800/60 rounded-lg text-white placeholder:text-neutral-500
                      ${
                        errors.subject
                          ? "border border-danger-400 focus:border-danger-400 focus:ring-danger-400"
                          : ""
                      }
                    `}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte um pouco sobre como podemos te ajudar"
                    className={`
                      bg-neutral-800/60 rounded-lg text-white placeholder:text-neutral-500 min-h-[120px]
                      ${
                        errors.message
                          ? "border border-danger-400 focus:border-danger-400 focus:ring-danger-400"
                          : ""
                      }
                    `}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-neutral-300">
                    Afirmo que li e concordo com a{" "}
                    <a
                      onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
                      className="text-secondary-400 hover:underline cursor-pointer"
                    >
                      Política de Privacidade
                    </a>{" "}
                    da DixHealth
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end">
            {isSending ? (
              <div className="flex items-center">
                <div className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-secondary-500 mr-2"></div>
              </div>
            ) : (
              <Button
                type="submit"
                variant="outline"
                className="bg-transparent"
              >
                Enviar mensagem
              </Button>
            )}
          </div>
        </form>
      </Form>

      <Modal
        title="Política de Privacidade"
        open={showPrivacyPolicy}
        onOpenChange={setShowPrivacyPolicy}
      >
        <PrivacyPolicy />
      </Modal>
    </Card>
  );
};
