import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { LinkItem } from "@/content/site-content";
import { isExternal } from "@/lib/site";
import { SmartLink } from "./smart-link";
import { defaultIconSize } from "./icon";

type Variant = "primary" | "secondary" | "inverse";

export function ButtonLink({
  link,
  variant = "primary",
  magnetic = false,
  className = "",
}: {
  link: LinkItem;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
}) {
  const external = isExternal(link.href);
  const IconComponent = external ? ArrowUpRight : link.href.includes("#") ? ArrowDown : ArrowRight;

  return (
    <SmartLink
      href={link.href}
      className={`btn btn-${variant} ${className}`}
      {...(magnetic ? { "data-magnetic": "" } : {})}
    >
      <span>{link.label}</span>
      <IconComponent size={defaultIconSize} weight="duotone" aria-hidden="true" />
    </SmartLink>
  );
}
