import * as React from "react";

import { cn } from "@/lib/utils";

/** Input — Omni: 40px, radius-lg, borda neutra, erro via aria-invalid. */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border-strong bg-field px-3 py-2 text-body-small-regular text-fg transition-colors placeholder:text-fg-subtle hover:border-fg-subtle focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger-500 aria-[invalid=true]:focus-visible:ring-danger-500/25",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
