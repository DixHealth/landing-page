import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo DIX: versão colorida no tema claro, branca nos temas escuros.
 * Recortadas em alta resolução do PNG original da marca (994×438).
 * Troca por CSS (sem depender do tema no JS) para não piscar na hidratação.
 */
export const Logo = ({
  className,
  forceWhite = false,
}: {
  className?: string;
  forceWhite?: boolean;
}) => (
  <span className="inline-flex">
    {!forceWhite && (
      <Image
        src="/logo/dix.png"
        alt="DIX Health"
        width={166}
        height={73}
        priority
        className={cn("dark:hidden", className)}
      />
    )}
    <Image
      src="/logo/dix-white.png"
      alt="DIX Health"
      width={166}
      height={73}
      priority
      className={cn(forceWhite ? "" : "hidden dark:block", className)}
    />
  </span>
);
