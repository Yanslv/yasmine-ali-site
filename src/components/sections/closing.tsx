import { closing } from "@/content/site-content";
import { splitWords } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";

/*
 * Composição tipográfica sem imagem (a foto horizontal não está disponível).
 * Desktop: seção pinada com scrub; o painel se revela por clip-path.
 */
export function Closing() {
  const words = splitWords(closing.heading);

  return (
    <section
      id={closing.anchor}
      aria-labelledby="fechamento-title"
      data-anim="closing"
      className="relative flex min-h-[85svh] items-stretch lg:min-h-[100svh]"
    >
      <div
        data-closing-panel
        className="texture-noise relative isolate flex w-full items-center overflow-hidden bg-primary py-24 text-primary-contrast"
      >
        <div
          data-closing-glow
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgb(163_93_72/0.55),transparent_45%),radial-gradient(circle_at_15%_85%,rgb(168_168_154/0.25),transparent_40%)]"
        />
        <div data-closing-content className="container-editorial text-center">
          <h2 id="fechamento-title" className="type-h2 mx-auto max-w-[16ch]">
            {words.map((word, i) => {
              const last = i === words.length - 1;
              return (
                <span key={`${word}-${i}`} className={last ? "italic" : undefined}>
                  {word}
                  {last ? null : " "}
                </span>
              );
            })}
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-lg text-surface-alt">{closing.subtitle}</p>
          <div className="mt-10">
            <ButtonLink link={closing.cta} variant="inverse" magnetic />
          </div>
        </div>
      </div>
    </section>
  );
}
