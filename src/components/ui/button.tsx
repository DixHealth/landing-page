import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button — Omni.
 * Altura 40px (sm 36 · lg 44 · icon 40×40), radius-md, texto 14px medium,
 * desabilitado com 20% de opacidade. A cor do `default` vem do token
 * semântico `cta` (primary-700 no Omni puro, secondary-500 no híbrido).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-cta text-cta-fg hover:bg-cta-hover",
        secondary:
          "bg-secondary-700 text-neutral-100 hover:bg-secondary-200 hover:text-neutral-900",
        outline:
          "border border-border-strong bg-transparent text-fg hover:border-accent hover:text-accent",
        destructive: "bg-danger-500 text-neutral-50 hover:bg-danger-600",
        ghost: "text-fg hover:bg-surface-raised",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type ?? "button"}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
