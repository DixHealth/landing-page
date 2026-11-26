import { animate } from "framer-motion";

const HEADER_OFFSET = 64;

export const smoothScroll = (id: string) => {
  const section = document.getElementById(id.replace(/^#/, ""));
  if (section) {
    const offsetTop =
      section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    animate(window.scrollY, offsetTop, {
      duration: 0.8,
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }
};

export const PREFILL_EVENT = "dix:prefill-subject";

/** Rola até o contato e pré-preenche o assunto do formulário. */
export const contactAbout = (subject: string) => {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: subject }));
  smoothScroll("contact");
};
