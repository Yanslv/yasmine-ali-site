import { Fragment } from "react";
import { pillars } from "@/content/site-content";
import { Icon } from "@/components/ui/icon";
import { SectionIntro } from "@/components/ui/section-intro";

export function Pillars({ index }: { index: number }) {
  // Duas cópias para o marquee não revelar o fim da faixa.
  const marqueeWords = [...pillars.marquee, ...pillars.marquee];
  // Linha extra do mobile: ordem invertida, corre no sentido oposto.
  const reverseWords = [...marqueeWords].reverse();

  return (
    <section id={pillars.anchor} aria-labelledby="pilares-title" className="overflow-hidden bg-surface-alt py-24 md:py-32">
      <div className="container-editorial">
        <SectionIntro index={index} eyebrow={pillars.eyebrow} heading={pillars.heading} headingId="pilares-title">
          <p className="mt-5 font-display text-xl italic text-primary md:text-2xl">{pillars.lead}</p>
        </SectionIntro>
      </div>

      {/* Faixa decorativa: a mesma informação está na lista abaixo. */}
      <div aria-hidden="true" className="my-14 flex flex-col gap-4 border-y border-line py-6 md:my-20 md:py-8">
        <div data-anim="marquee" className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform md:gap-12">
          {marqueeWords.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span
                className={`font-display text-[clamp(2.75rem,8vw,7rem)] leading-none font-medium tracking-[-0.045em] ${
                  i % 2 === 0 ? "text-primary" : "italic text-accent"
                }`}
              >
                {word}
              </span>
              <span className="size-3 shrink-0 rounded-full bg-secondary md:size-4" />
            </Fragment>
          ))}
        </div>

        <div
          data-anim="marquee"
          data-anim-direction="right"
          className="flex w-max items-center gap-6 whitespace-nowrap will-change-transform lg:hidden"
        >
          {reverseWords.map((word, i) => (
            <Fragment key={`${word}-r-${i}`}>
              <span className="text-outline font-display text-[clamp(2rem,6vw,3.5rem)] leading-none font-medium tracking-[-0.03em] italic">
                {word}
              </span>
              <span className="size-2 shrink-0 rounded-full bg-accent" />
            </Fragment>
          ))}
        </div>
      </div>

      <div className="container-editorial">
        <ul data-anim="stagger" className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-5">
          {pillars.items.map((pillar, i) => (
            <li key={pillar.title} data-anim-item className="flex flex-col gap-6 border-r border-b border-line p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-primary">
                  <Icon name={pillar.icon} />
                </span>
                <span className="eyebrow text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="type-h4 text-ink">{pillar.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{pillar.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
