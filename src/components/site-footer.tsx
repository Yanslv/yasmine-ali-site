import Image from "next/image";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { footer, media, ui } from "@/content/site-content";
import { SmartLink } from "@/components/ui/smart-link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-background pt-20 pb-10 md:pt-28">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-4">
              <Image
                src={media.profile.src}
                alt=""
                width={48}
                height={48}
                sizes="48px"
                className="size-12 rounded-full border border-line object-cover"
              />
              <p className="eyebrow text-muted">{footer.role}</p>
            </div>
            <p className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.055em] text-ink">
              {footer.name}
            </p>
            <p className="mt-4 font-display text-xl italic text-primary md:text-2xl">{footer.tagline}</p>
          </div>

          <nav aria-label={ui.footerNav} className="md:col-span-4 md:justify-self-end">
            <ul className="flex flex-col gap-1">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="link-underline inline-flex min-h-11 items-center text-lg font-medium text-ink"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {footer.name}. {footer.rights}
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 font-medium text-primary">
            {ui.backToTop}
            <ArrowUp size={18} weight="duotone" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
