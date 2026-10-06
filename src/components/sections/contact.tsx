import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { contact, ui } from "@/content/site-content";
import { Icon } from "@/components/ui/icon";
import { SectionIntro } from "@/components/ui/section-intro";

/* Somente canais confirmados. Sem formulário, e-mail ou WhatsApp. */
export function Contact({ index }: { index: number }) {
  return (
    <section id={contact.anchor} aria-labelledby="contato-title" className="bg-surface py-24 md:py-32">
      <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:items-end">
        <SectionIntro
          index={index}
          eyebrow={contact.eyebrow}
          heading={contact.heading}
          headingId="contato-title"
          className="lg:col-span-7"
        >
          <p className="mt-5 max-w-[46ch] text-muted">{contact.intro}</p>
        </SectionIntro>

        <ul data-anim="stagger" data-anim-preset="contact" className="grid gap-4 lg:col-span-5">
          {contact.channels.map((channel) => (
            <li key={channel.id} data-anim-item>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-6 rounded-card border border-line bg-background p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-card md:p-8"
              >
                <span className="flex items-center gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-contrast">
                    <Icon name={channel.icon} size={24} />
                  </span>
                  <span className="eyebrow text-muted">{channel.label}</span>
                </span>
                <span>
                  <span className="block font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-medium tracking-[-0.03em] text-ink">
                    {channel.handle}
                  </span>
                  <span className="mt-3 block text-[0.9375rem] text-muted">{channel.description}</span>
                </span>
                <span className="inline-flex min-h-11 items-center gap-2 self-start border-t border-line pt-4 font-semibold text-primary">
                  {channel.cta}
                  <ArrowUpRight
                    size={20}
                    weight="duotone"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
