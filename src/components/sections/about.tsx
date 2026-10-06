import Image from "next/image";
import { about, person } from "@/content/site-content";
import { splitWords } from "@/lib/site";
import { SmartLink } from "@/components/ui/smart-link";
import { SectionIntro } from "@/components/ui/section-intro";

export function About({ index }: { index: number }) {
  const words = splitWords(about.reveal);

  return (
    <section id={about.anchor} aria-labelledby="sobre-title" className="bg-surface py-24 md:py-32">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8 lg:col-start-5">
          <SectionIntro index={index} eyebrow={about.eyebrow} heading={about.heading} headingId="sobre-title" />

          <p className="mt-8 font-display text-2xl italic text-accent md:text-3xl" data-anim="fade">
            {about.statement}
          </p>

          <p data-anim="words" className="type-h3 mt-10 max-w-[30ch] text-ink">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} data-word>
                {word}
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </p>

          <p className="mt-8 max-w-[58ch] text-muted" data-anim="fade">
            {about.body}
          </p>
        </div>

        {/* Retrato em formato pequeno: a única foto disponível tem 150 px. */}
        <aside className="lg:col-span-4 lg:row-start-1" aria-label={person.name}>
          <div className="flex items-center gap-5 lg:flex-col lg:items-start">
            <div
              data-anim="scale-mask"
              data-anim-radius="999px"
              className="relative size-24 shrink-0 overflow-hidden rounded-full border border-line bg-surface-alt md:size-28"
            >
              <Image
                data-anim-media
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={about.portrait.width}
                height={about.portrait.height}
                sizes="112px"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-2xl font-medium tracking-[-0.03em] text-ink">{person.name}</p>
              <p className="text-muted">{person.role}</p>
            </div>
          </div>

          <dl className="mt-10 divide-y divide-line border-y border-line" data-anim="fade">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="eyebrow text-muted">{fact.label}</dt>
                <dd className="text-right font-medium text-ink">
                  {fact.href ? (
                    <SmartLink href={fact.href} className="link-underline text-primary">
                      {fact.value}
                    </SmartLink>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
