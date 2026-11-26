import { ArrowUpRight } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";
import { whatsappLink } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Botão principal em pílula, com a seta num círculo que gira no hover.
 * Com `whatsapp`, vira um link que abre a conversa com a mensagem já escrita.
 */
export const CtaButton = ({
  children,
  className,
  whatsapp,
  ...props
}: ButtonProps & { whatsapp?: string }) => {
  const content = (
    <>
      {children}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:rotate-45 motion-reduce:transition-none">
        <ArrowUpRight />
      </span>
    </>
  );
  const classes = cn("group gap-3 rounded-full pl-5 pr-1.5", className);

  if (whatsapp) {
    return (
      <Button asChild className={classes} {...props}>
        <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer">
          {content}
          <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
        </a>
      </Button>
    );
  }
  return (
    <Button className={classes} {...props}>
      {content}
    </Button>
  );
};
