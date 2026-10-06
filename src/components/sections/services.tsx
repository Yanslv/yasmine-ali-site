import { services } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionIntro } from "@/components/ui/section-intro";

/* Linha única e discreta: sem preço, formato, duração ou método. */
export function Services({ index }: { index: number }) {
  return (
    <section id={services.anchor} aria-labelledby="servicos-title" className="py-20 md:py-28">
      <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:items-center">
        <SectionIntro
          index={index}
          eyebrow={services.eyebrow}
          heading={services.heading}
          headingId="servicos-title"
          className="lg:col-span-5"
        />

        <ul data-anim="stagger" className="lg:col-span-7">
          {services.items.map((service) => (
            <li
              key={service.id}
              data-anim-item
              className="glass relative isolate overflow-hidden rounded-card border border-line p-7 shadow-card md:p-10"
            >
              <div aria-hidden="true" className="aurora absolute inset-0 -z-10 opacity-70" />
              <h3 className="type-h3 max-w-[18ch] text-ink">{service.name}</h3>
              <p className="mt-4 max-w-[46ch] text-muted">{service.description}</p>
              <div className="mt-8">
                <ButtonLink link={service.cta} magnetic />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
