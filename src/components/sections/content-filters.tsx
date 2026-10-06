"use client";

import { useState } from "react";
import { ScrollTrigger } from "@/lib/gsap-animations";

export type FilterOption = { value: "all" | "reel" | "post"; label: string };

/**
 * Filtros do grid. Só são renderizados quando há conteúdo suficiente por tipo.
 * Atuam via data-filter no <ul> (CSS esconde os cards), sem duplicar conteúdo no cliente.
 */
export function ContentFilters({
  gridId,
  label,
  options,
}: {
  gridId: string;
  label: string;
  options: FilterOption[];
}) {
  const [active, setActive] = useState<FilterOption["value"]>("all");

  const select = (value: FilterOption["value"]) => {
    setActive(value);
    document.getElementById(gridId)?.setAttribute("data-filter", value);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={active === option.value}
          aria-controls={gridId}
          onClick={() => select(option.value)}
          className="min-h-11 shrink-0 rounded-full border border-line px-5 text-sm font-medium text-ink transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-contrast"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
