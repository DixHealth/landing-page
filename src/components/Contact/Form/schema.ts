import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  subject: z.string().min(2, {
    message: "O assunto deve ter pelo menos 2 caracteres.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com a Política de Privacidade.",
  }),
});
