import { faq, media, person } from "@/content/site-content";
import { absoluteUrl, siteUrl } from "@/lib/site";

/*
 * Baseado em 05_seo/jsonld.json. ProfessionalService fica de fora enquanto
 * localização, oferta e contato não estiverem confirmados.
 */
const personId = `${siteUrl}/#yasmine-ali`;

export const personJsonLd = () => ({
  "@type": "Person",
  "@id": personId,
  name: person.name,
  alternateName: person.username,
  jobTitle: "Mentora de Oratória",
  description: person.description,
  image: absoluteUrl(media.ogProfile.src),
  url: `${siteUrl}/`,
  sameAs: [person.instagramUrl],
});

export const websiteJsonLd = () => ({
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: person.name,
  url: `${siteUrl}/`,
  inLanguage: person.lang,
  publisher: { "@id": personId },
  about: { "@id": personId },
});

export const faqJsonLd = () => ({
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});
