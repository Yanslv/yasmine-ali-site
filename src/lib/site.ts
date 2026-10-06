/**
 * URL pública do site. Defina NEXT_PUBLIC_SITE_URL no deploy; sem ela,
 * o canonical não é emitido e as URLs absolutas usam o localhost.
 */
const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const siteUrl = envUrl || "http://localhost:3000";
export const hasSiteUrl = Boolean(envUrl);

export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

const longDate = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

/** "28 de março de 2026" */
export const formatLongDate = (iso: string) => longDate.format(new Date(`${iso}T00:00:00Z`));

/** "28.03.2026" */
export const formatShortDate = (iso: string) =>
  shortDate.format(new Date(`${iso}T00:00:00Z`)).replaceAll("/", ".");

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Divide um texto em palavras preservando a pontuação. */
export const splitWords = (text: string) => text.split(/\s+/).filter(Boolean);
