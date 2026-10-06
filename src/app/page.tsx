import type { ComponentType } from "react";
import { homeSections, type HomeSectionId } from "@/content/site-content";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { MotionRoot } from "@/components/motion-root";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/sections/hero";
import { FeaturedContent } from "@/components/sections/featured-content";
import { ContentMasonry } from "@/components/sections/content-masonry";
import { Pillars } from "@/components/sections/pillars";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Expertise } from "@/components/sections/expertise";
import { Closing } from "@/components/sections/closing";
import { Contact } from "@/components/sections/contact";

/* Ordem narrativa E, na sequência da aba Layout. */
const sections: Record<HomeSectionId, ComponentType<{ index: number }>> = {
  hero: Hero,
  destaque: FeaturedContent,
  grid: ContentMasonry,
  pilares: Pillars,
  sobre: About,
  servicos: Services,
  autoridade: Expertise,
  fechamento: Closing,
  contato: Contact,
};

export default function HomePage() {
  // Numeração editorial das seções com eyebrow (hero e fechamento não levam número).
  const numbered: HomeSectionId[] = homeSections.filter((id) => id !== "hero" && id !== "fechamento");

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [personJsonLd(), websiteJsonLd()] }} />
      <MotionRoot>
        {homeSections.map((id) => {
          const Section = sections[id];
          return <Section key={id} index={numbered.indexOf(id) + 1} />;
        })}
      </MotionRoot>
    </>
  );
}
