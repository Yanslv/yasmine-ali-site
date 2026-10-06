import type { Metadata } from "next";
import { ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import { faq, insightsPage, media, seo } from "@/content/site-content";
import { hasSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/structured-data";
import { MotionRoot } from "@/components/motion-root";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/ui/json-ld";
import { SmartLink } from "@/components/ui/smart-link";

export const metadata: Metadata = {
  title: seo.insights.title,
  description: seo.insights.description,
  alternates: hasSiteUrl ? { canonical: "/insights" } : undefined,
  openGraph: {
    title: seo.insights.title,
    description: seo.insights.description,
    url: "/insights",
    type: "website",
    locale: "pt_BR",
    images: [{ url: media.og01.src, width: media.og01.width, height: media.og01.height, alt: media.og01.alt }],
  },
};

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd() }} />
      <MotionRoot>
        <header className="aurora pt-[120px] pb-16 md:pt-[168px] md:pb-24">
          <div className="container-editorial">
            <p className="eyebrow mb-6 text-muted">{insightsPage.eyebrow}</p>
            <h1 className="type-h2 max-w-[18ch] text-ink">{insightsPage.title}</h1>
            <p className="mt-6 max-w-[52ch] text-lg text-muted">{insightsPage.intro}</p>

            <nav aria-labelledby="indice-insights" className="mt-12 md:mt-16">
              <p id="indice-insights" className="eyebrow mb-4 text-muted">
                {insightsPage.indexLabel}
              </p>
              <ol className="grid gap-x-8 border-t border-line md:grid-cols-2">
                {insightsPage.items.map((item, i) => (
                  <li key={item.slug} className="border-b border-line">
                    <a
                      href={`#${item.slug}`}
                      className="group flex min-h-14 items-baseline gap-4 py-4 text-ink"
                    >
                      <span className="eyebrow w-7 shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="link-underline font-medium">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </header>

        <div className="container-editorial py-16 md:py-24">
          {insightsPage.items.map((item, i) => (
            <article
              key={item.slug}
              id={item.slug}
              aria-labelledby={`${item.slug}-title`}
              className="grid gap-8 border-t border-line py-16 first:border-t-0 first:pt-0 md:py-20 lg:grid-cols-12"
              data-anim="fade"
            >
              <div className="lg:col-span-4">
                <p className="eyebrow text-accent lg:sticky lg:top-28">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="lg:col-span-8">
                <h2 id={`${item.slug}-title`} className="type-h3 max-w-[24ch] text-ink">
                  {item.title}
                </h2>
                <p className="mt-4 font-display text-xl italic text-primary">{item.description}</p>

                <div className="mt-10 grid gap-8">
                  {item.sections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="type-h4 text-ink">{section.heading}</h3>
                      <p className="mt-2 max-w-[62ch] text-muted">{section.body}</p>
                    </div>
                  ))}
                </div>

                {item.related && (
                  <SmartLink
                    href={item.related.href}
                    className="mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
                  >
                    <span className="link-underline">{item.related.label}</span>
                    <ArrowUpRight size={18} weight="duotone" aria-hidden="true" />
                  </SmartLink>
                )}
              </div>
            </article>
          ))}
        </div>

        <section aria-labelledby="faq-title" className="bg-surface-alt py-20 md:py-28">
          <div className="container-editorial grid gap-10 lg:grid-cols-12">
            <h2 id="faq-title" className="type-h2 lg:col-span-5">
              {insightsPage.faqHeading}
            </h2>
            <div className="divide-y divide-line border-y border-line lg:col-span-7">
              {faq.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Plus
                      size={20}
                      weight="duotone"
                      aria-hidden="true"
                      className="shrink-0 text-primary transition-transform group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-[60ch] pb-6 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="insights-cta" className="py-20 md:py-28">
          <div className="container-editorial flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <h2 id="insights-cta" className="type-h3 max-w-[20ch] text-ink">
              {insightsPage.ctaHeading}
            </h2>
            <ButtonLink link={insightsPage.cta} />
          </div>
        </section>
      </MotionRoot>
    </>
  );
}
