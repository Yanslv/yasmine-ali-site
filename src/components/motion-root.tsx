"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { createPageAnimations } from "@/lib/gsap-animations";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * <main> da página. Recebe as seções (server components) como children e
 * inicializa todas as animações declaradas via data-anim dentro de um gsap.context().
 */
export function MotionRoot({ children, id = "conteudo" }: { children: ReactNode; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const animations = createPageAnimations(ref.current);
    return () => animations.revert();
  }, []);

  return (
    <main ref={ref} id={id} tabIndex={-1} className="outline-none">
      {children}
    </main>
  );
}
