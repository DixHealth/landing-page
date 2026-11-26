import { cn } from "@/lib/utils";

/** Título de seção: só tipografia, sem eyebrow nem enfeite. */
export const SectionHeading = ({
  title,
  lead,
  className,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("max-w-3xl", className)}>
    <h2 className="text-large text-fg md:text-display">{title}</h2>
    {lead && (
      <p className="mt-4 max-w-2xl text-body-medium-regular text-fg-muted md:text-subtitle-medium md:font-normal">
        {lead}
      </p>
    )}
  </div>
);
