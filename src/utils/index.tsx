import { animate } from "framer-motion";
import { FormData } from "../components/Contact/Form/FormData";
import emailjs from "@emailjs/browser";

export const handleEmailButtonClick = () => {
  const emailAddress = "contato@example.com";
  const emailSubject = "Gostaria de mais informações";
  const emailBody = "Olá, gostaria de mais informações sobre seus serviços.";

  const mailtoURL = `outlookmail:${emailAddress}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoURL;
};

export const smoothScroll = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    const offsetTop = section.offsetTop;

    animate(window.scrollY, offsetTop, {
      duration: 0.8,
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }
};

export async function submitForm(values: FormData) {
  return emailjs.send(
    process.env.NEXT_PUBLIC_SERVICE_ID!,
    process.env.NEXT_PUBLIC_TEMPLATE_ID!,
    {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    },
    process.env.NEXT_PUBLIC_KEY!
  );
}
