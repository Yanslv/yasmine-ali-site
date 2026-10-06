import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { isPublicationBlocked } from "@/content/publication-guard";
import { media, person, seo, ui } from "@/content/site-content";
import { tokenCssVariables, tokens } from "@/design/tokens";
import { hasSiteUrl, siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const shareImage = seo.openGraph.image;
const ogImages = [
  {
    url: shareImage.src,
    width: shareImage.width,
    height: shareImage.height,
    alt: shareImage.alt,
    type: "image/jpeg",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.home.title,
  description: seo.home.description,
  applicationName: person.name,
  authors: [{ name: person.name, url: person.instagramUrl }],
  creator: person.name,
  keywords: seo.keywords,
  alternates: hasSiteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: person.name,
    title: seo.openGraph.title,
    description: seo.openGraph.description,
    images: ogImages,
  },
  twitter: {
    // Imagem quadrada: "summary" evita o corte 2:1 do card grande.
    card: "summary",
    title: seo.twitter.title,
    description: seo.twitter.description,
    images: [{ url: shareImage.src, alt: shareImage.alt }],
  },
  icons: {
    icon: [{ url: media.profile.fallbackSrc, type: "image/jpeg" }],
    apple: [{ url: media.profile.fallbackSrc }],
  },
  robots: isPublicationBlocked
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: tokens.colors.background,
  colorScheme: "light",
};

/*
 * Roda antes da primeira pintura: marca que há JS (permite o estado inicial
 * das animações do hero) e libera o conteúdo se o GSAP não iniciar a tempo.
 */
const motionBootScript = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.hasAttribute('data-motion-ready')&&!d.hasAttribute('data-hero-done')){d.classList.add('motion-fallback')}},2500)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={person.lang}
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${dmSans.variable} ${plexMono.variable}`}
      style={tokenCssVariables({
        display: "--font-fraunces",
        body: "--font-dm-sans",
        detail: "--font-plex-mono",
      })}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body id="top">
        <a href="#conteudo" className="skip-link">
          {ui.skipLink}
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
