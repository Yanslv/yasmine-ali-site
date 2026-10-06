import { hero } from "@/content/site-content";
import { splitWords } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";

/*
 * Variante B: hero tipográfico com 3 fotos pequenas flutuando.
 * Sem fotos aprovadas para o hero, os três quadros são blocos de textura
 * neutros (decorativos, sem retrato). No primeiro scroll eles viram os
 * pilares da camada [data-pillars] (ver heroPillars em gsap-animations.ts).
 */
const tiles = [
  {
    surface: "bg-secondary texture-noise",
    word: "text-ink",
    size: "w-[30%] max-w-[150px] lg:w-[132px] aspect-[4/5]",
    position: "lg:absolute lg:left-[8%] lg:top-[16%] lg:-rotate-[5deg]",
    depth: 0.35,
  },
  {
    surface: "bg-primary texture-noise",
    word: "text-primary-contrast",
    size: "w-[34%] max-w-[176px] lg:w-[156px] aspect-[3/4]",
    position: "translate-y-6 lg:translate-y-0 lg:absolute lg:left-[40%] lg:top-0 lg:rotate-[3deg]",
    depth: 0.7,
  },
  {
    surface: "bg-surface-alt texture-lines",
    word: "text-primary",
    size: "w-[30%] max-w-[150px] lg:w-[150px] aspect-[4/5]",
    position: "lg:absolute lg:right-[4%] lg:top-[24%] lg:-rotate-[2deg]",
    depth: 0.5,
  },
];

export function Hero() {
  const words = splitWords(hero.title);
  const emphasis = new Set<string>(hero.emphasis);

  return (
    <>
      <section
        id={hero.anchor}
        aria-labelledby="hero-title"
        data-anim="hero"
        className="aurora relative isolate overflow-hidden pt-[88px] pb-16 md:pt-[128px] md:pb-20 lg:min-h-[100svh]"
      >
        <div className="container-editorial relative">
          <p data-hero-fade className="eyebrow mb-4 text-muted md:mb-8">
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="type-h1 max-w-[15ch] text-ink">
            <span className="sr-only">{hero.title}</span>
            <span aria-hidden="true">
              {words.map((word, index) => {
                const plain = word.replace(/[.,]/g, "");
                const isEmphasis = emphasis.has(plain);
                return (
                  <span key={`${word}-${index}`}>
                    <span className="word-mask">
                      <span data-hero-word className={isEmphasis ? "italic text-accent" : undefined}>
                        {word}
                      </span>
                    </span>
                    {index < words.length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          </h1>

          <div className="mt-6 grid gap-10 md:mt-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p data-hero-fade className="max-w-[34ch] text-[1.0625rem] leading-[1.55] text-muted md:text-lg">
                {hero.subtitle}
              </p>
              <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
                <ButtonLink link={hero.primaryCta} magnetic />
                <ButtonLink link={hero.secondaryCta} variant="secondary" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative flex items-start justify-between gap-3 lg:col-span-7 lg:block lg:h-[240px]"
            >
              {tiles.map((tile, index) => (
                <div key={tile.surface} data-hero-depth={tile.depth} className={`${tile.size} ${tile.position}`}>
                  <div data-hero-float className="h-full w-full">
                    <div
                      data-hero-tile
                      className="h-full w-full rounded-image border-[3px] border-double border-line bg-surface p-1.5 shadow-card"
                    >
                      <div data-hero-mask className="relative h-full w-full overflow-hidden rounded-[22px]">
                        <div className={`absolute inset-0 ${tile.surface}`} />
                        <span
                          data-hero-label
                          className={`absolute right-2 bottom-2.5 left-2.5 font-display text-[0.8125rem] leading-tight italic sm:text-[0.95rem] ${tile.word}`}
                        >
                          {hero.textures[index]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilares: camada fixa, invisível até o primeiro scroll (só com JS e movimento permitido). */}
      <div data-pillars aria-hidden="true" className="pillars-overlay">
        {tiles.map((tile, index) => (
          <div key={tile.surface} data-pillar className={`pillar ${tile.surface}`}>
            <div data-pillar-detail className="pillar-fluting" />
            <div data-pillar-detail className="pillar-capital" />
            <div data-pillar-detail className="pillar-base" />
            <span data-pillar-label className={`pillar-label ${tile.word}`}>
              {hero.textures[index]}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
