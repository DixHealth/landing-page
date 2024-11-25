import { animate } from "framer-motion";

export const handleEmailButtonClick = () => {
  const emailAddress = "contato@example.com"; // Email do destinatário
  const emailSubject = "Gostaria de mais informações"; // Assunto
  const emailBody = "Olá, gostaria de mais informações sobre seus serviços."; // Corpo do email

  const mailtoURL = `outlookmail:${emailAddress}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoURL; // Abre o cliente de email padrão
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
