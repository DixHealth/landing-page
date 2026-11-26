import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Badge — Omni: radius-md, texto 12px semibold. */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-caption-bold",
  {
    variants: {
      variant: {
        default: "bg-primary-200 text-primary-800",
        secondary: "bg-secondary-200 text-secondary-900",
        outline: "border border-border-strong text-fg-muted",
        brand: "border border-accent/40 bg-accent/10 text-accent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
