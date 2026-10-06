import Image from "next/image";
import { PlayCircle, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { contentGrid, ui, type ContentItem, type MediaAsset } from "@/content/site-content";
import { formatLongDate } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionIntro } from "@/components/ui/section-intro";
import { ContentFilters, type FilterOption } from "./content-filters";

/*
 * Variante C: masonry editorial com cards de tamanhos variados.
 *
 * Ritmo por posição (8 cards), calculado simulando o auto-placement do CSS Grid:
 * as colunas fecham sem buracos e sem emendas alinhadas entre si.
 * Mobile/tablet (2 colunas): 3, 4, 3, 3, 3, 3, 5, 4 · Desktop (3 colunas): 4, 5, 6, 4, 4, 7, 5, 4.
 * Classes estáticas porque o Tailwind não gera spans dinâmicos.
 */
const rhythm = [
  "row-span-3 lg:row-span-4",
  "row-span-4 lg:row-span-5",
  "row-span-3 lg:row-span-6",
  "row-span-3 lg:row-span-4",
  "row-span-3 lg:row-span-4",
  "row-span-3 lg:row-span-7",
  "row-span-5 lg:row-span-5",
  "row-span-4 lg:row-span-4",
];
const fallbackSpan = "row-span-4 lg:row-span-5";

const compactSurfaces = [
  "bg-surface-alt texture-lines text-ink",
  "bg-secondary texture-noise text-ink",
  "glass border border-line text-ink",
  "bg-surface-alt texture-noise text-ink",
];

const MIN_ITEMS_PER_FILTER = 3;

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:outline-offset-4";

function cardTitle(item: ContentItem) {
  return item.title ?? (item.date ? formatLongDate(item.date) : ui.badges[item.type]);
}

function CardTitle({ item, className }: { item: ContentItem; className: string }) {
  const title = cardTitle(item);
  return <h3 className={className}>{item.date && !item.title ? <time dateTime={item.date}>{title}</time> : title}</h3>;
}

function CardCta({ item }: { item: ContentItem }) {
  const cta = item.type === "reel" ? ui.watchOnInstagram : ui.viewOnInstagram;
  return (
    <p className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold md:text-sm">
      {/* Mobile: rótulo curto na tela, completo para leitores de tela. */}
      <span aria-hidden="true" className="md:hidden">
        {ui.instagram}
      </span>
      <span className="max-md:sr-only">{cta}</span>
      <ArrowUpRight size={16} weight="duotone" aria-hidden="true" />
    </p>
  );
}

/*
 * Card com capa: a foto fica livre (as capas já trazem o título do Reel escrito),
 * só com selo e play nos cantos; data/título vão numa legenda abaixo da imagem.
 */
function ImageCard({ item, image }: { item: ContentItem; image: MediaAsset }) {
  const featured = Boolean(item.title);
  const caption = featured
    ? "bg-primary texture-noise text-primary-contrast"
    : "border-x border-b border-line bg-surface text-ink";

  return (
    <a href={item.permalink} target="_blank" rel="noopener noreferrer" className={`${cardBase} bg-ink`}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div data-anim-zoom className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 380px, 50vw"
            style={image.focus ? { objectPosition: image.focus } : undefined}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgb(41_37_34/0.5),transparent)]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 md:p-4">
          <span className="eyebrow rounded-full bg-ink/60 px-2.5 py-1 text-primary-contrast backdrop-blur-sm">
            {ui.badges[item.type]}
          </span>
          {item.type === "reel" && (
            <PlayCircle size={32} weight="duotone" aria-hidden="true" className="shrink-0 text-primary-contrast" />
          )}
        </div>
      </div>

      <div className={`relative rounded-b-card p-3 md:p-4 ${caption}`}>
        <CardTitle
          item={item}
          className={
            featured
              ? "font-display text-[1.125rem] leading-[1.1] font-medium tracking-[-0.02em] md:text-2xl"
              : "font-display text-[0.9375rem] leading-[1.2] font-medium tracking-[-0.01em] md:text-[1.1875rem]"
          }
        />
        {item.excerpt && (
          <p className="mt-2 hidden max-w-[40ch] text-[0.9375rem] leading-snug text-surface-alt lg:block">
            {item.excerpt}
          </p>
        )}
        <CardCta item={item} />
      </div>
      <span className="sr-only"> ({ui.newTab})</span>
    </a>
  );
}

/* Card sem capa: composição tipográfica (fallback). */
function TextCard({ item, compactIndex }: { item: ContentItem; compactIndex: number }) {
  const featured = Boolean(item.title);
  const surface = featured
    ? "bg-primary texture-noise text-primary-contrast"
    : compactSurfaces[compactIndex % compactSurfaces.length];

  return (
    <a href={item.permalink} target="_blank" rel="noopener noreferrer" className={`${cardBase} ${surface}`}>
      <div className="relative flex items-start justify-between gap-2 p-3 md:p-5">
        <span
          className={`eyebrow rounded-full px-2.5 py-1 ${
            featured ? "bg-ink/40 text-primary-contrast" : "bg-surface/80 text-ink"
          }`}
        >
          {ui.badges[item.type]}
        </span>
        {item.type === "reel" && <PlayCircle size={28} weight="duotone" aria-hidden="true" className="shrink-0" />}
      </div>
      <div className="relative mt-auto p-3 pt-0 md:p-5 md:pt-0">
        {item.theme && featured && <p className="eyebrow mb-3 hidden text-surface-alt md:block">{item.theme}</p>}
        <CardTitle
          item={item}
          className={
            featured
              ? "type-h3"
              : "font-display text-[1.0625rem] leading-[1.15] font-medium tracking-[-0.015em] md:text-[1.375rem]"
          }
        />
        {item.excerpt && featured && (
          <p className="mt-3 hidden max-w-[40ch] text-[0.9375rem] text-surface-alt md:block">{item.excerpt}</p>
        )}
        <CardCta item={item} />
      </div>
      <span className="sr-only"> ({ui.newTab})</span>
    </a>
  );
}

export function ContentMasonry({ index }: { index: number }) {
  const items = [...contentGrid.items].sort((a, b) => a.order - b.order).slice(0, 12);

  const counts = { reel: 0, post: 0 };
  items.forEach((item) => counts[item.type]++);
  const showFilters = counts.reel >= MIN_ITEMS_PER_FILTER && counts.post >= MIN_ITEMS_PER_FILTER;
  const filterOptions: FilterOption[] = [
    { value: "all", label: ui.filters.all },
    { value: "reel", label: ui.filters.reel },
    { value: "post", label: ui.filters.post },
  ];

  const usesRhythm = items.length === rhythm.length;
  const compactOrder = new Map(
    items.filter((item) => !item.image && !item.title).map((item, position) => [item.id, position]),
  );

  return (
    <section id={contentGrid.anchor} aria-labelledby="conteudos-title" className="py-24 md:py-32">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionIntro
            index={index}
            eyebrow={contentGrid.eyebrow}
            heading={contentGrid.heading}
            headingId="conteudos-title"
            className="lg:col-span-8"
          >
            <p className="mt-5 max-w-[48ch] text-muted">{contentGrid.subtitle}</p>
          </SectionIntro>
          <div className="lg:col-span-4 lg:justify-self-end" data-anim="fade">
            <ButtonLink link={contentGrid.cta} variant="secondary" />
          </div>
        </div>

        {showFilters && (
          <ContentFilters gridId="grid-conteudos" label={ui.filters.label} options={filterOptions} />
        )}

        <ul
          id="grid-conteudos"
          data-anim="stagger"
          data-anim-preset="grid"
          className={`content-grid mt-12 grid auto-rows-[72px] grid-cols-2 gap-3 md:auto-rows-[104px] md:gap-5 lg:grid-cols-3 ${
            usesRhythm ? "" : "grid-flow-dense"
          }`}
        >
          {items.map((item, i) => (
            <li key={item.id} data-anim-item data-type={item.type} className={usesRhythm ? rhythm[i] : fallbackSpan}>
              {item.image ? (
                <ImageCard item={item} image={item.image} />
              ) : (
                <TextCard item={item} compactIndex={compactOrder.get(item.id) ?? 0} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
