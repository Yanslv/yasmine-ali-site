import Image from "next/image";
import { featured, ui } from "@/content/site-content";
import { formatShortDate } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionIntro } from "@/components/ui/section-intro";

export function FeaturedContent({ index }: { index: number }) {
  const { item } = featured;

  return (
    <section
      id={featured.anchor}
      aria-labelledby="destaque-title"
      className="bg-surface py-24 md:py-32"
    >
      <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionIntro index={index} eyebrow={featured.eyebrow} heading={featured.heading} headingId="destaque-title" />

          <article className="mt-10 border-t border-line pt-8" data-anim="fade">
            <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-muted">
              <span>{ui.badges[item.kind]}</span>
              <span aria-hidden="true">·</span>
              <span>{item.theme}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={item.date}>{formatShortDate(item.date)}</time>
            </p>
            <h3 className="type-h3 mt-4 text-ink">{item.title}</h3>
            <p className="mt-3 font-display text-xl italic text-primary">{item.subtitle}</p>
            <p className="mt-4 max-w-[52ch] text-muted">{item.summary}</p>
            <div className="mt-8">
              <ButtonLink link={item.cta} />
            </div>
          </article>
        </div>

        <figure className="lg:order-first lg:col-span-6">
          <div
            data-anim="scale-mask"
            className="relative aspect-square overflow-hidden rounded-image bg-secondary shadow-card"
          >
            <Image
              data-anim-media
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
