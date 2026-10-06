import Image from "next/image";
import { expertise } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionIntro } from "@/components/ui/section-intro";

/*
 * A foto com microfone é contexto visual: nenhuma legenda nomeia
 * programa, evento, palco ou credencial.
 */
export function Expertise({ index }: { index: number }) {
  return (
    <section id={expertise.anchor} aria-labelledby="temas-title" className="bg-surface-alt py-24 md:py-32">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionIntro index={index} eyebrow={expertise.eyebrow} heading={expertise.heading} headingId="temas-title">
            <p className="mt-5 max-w-[44ch] text-muted">{expertise.intro}</p>
          </SectionIntro>

          <ol data-anim="themes" className="mt-12 border-t border-line">
            {expertise.themes.map((theme, i) => (
              <li
                key={theme}
                data-theme-item
                className="flex items-baseline gap-5 border-b border-line py-5 md:gap-8 md:py-6"
              >
                <span className="eyebrow w-8 shrink-0 text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="type-h3 text-primary">{theme}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10" data-anim="fade">
            <ButtonLink link={expertise.cta} variant="secondary" />
          </div>
        </div>

        <figure className="lg:order-first lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div
              data-anim="scale-mask"
              data-anim-preset="expertise"
              className="relative aspect-[3/4] overflow-hidden rounded-image bg-secondary shadow-card"
            >
              <Image
                data-anim-media
                src={expertise.image.src}
                alt={expertise.image.alt}
                width={expertise.image.width}
                height={expertise.image.height}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
