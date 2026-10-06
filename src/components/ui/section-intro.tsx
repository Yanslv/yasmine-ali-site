import type { ReactNode } from "react";

/** Eyebrow numerada + H2 + texto de apoio. */
export function SectionIntro({
  index,
  eyebrow,
  heading,
  headingId,
  children,
  tone = "default",
  className = "",
}: {
  index?: number;
  eyebrow: string;
  heading: string;
  headingId: string;
  children?: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
}) {
  const muted = tone === "inverse" ? "text-surface-alt" : "text-muted";
  return (
    <div className={className} data-anim="fade">
      <p className={`eyebrow mb-5 flex items-center gap-3 ${muted}`}>
        {index !== undefined && <span className="text-accent">{String(index).padStart(2, "0")}</span>}
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={headingId} className="type-h2">
        {heading}
      </h2>
      {children}
    </div>
  );
}
