import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ui } from "@/content/site-content";
import { isExternal } from "@/lib/site";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "rel"> & {
  href: string;
  children: ReactNode;
};

/**
 * Link único do site:
 * - externo → nova aba com rel="noopener noreferrer" e aviso para leitores de tela;
 * - âncora (#) → <a> simples;
 * - rota interna → next/link.
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only"> ({ui.newTab})</span>
      </a>
    );
  }

  if (href.startsWith("#") || href.includes("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
