import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo Dix: versão colorida no tema claro, branca nos temas escuros.
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
        src="/logo/logo.svg"
        alt="Dix Health"
        width={87}
        height={39}
        priority
        className={cn("dark:hidden", className)}
      />
    )}
    <Image
      src="/logo/logo-white.svg"
      alt="Dix Health"
      width={88}
      height={39}
      priority
      className={cn(forceWhite ? "" : "hidden dark:block", className)}
    />
  </span>
);
