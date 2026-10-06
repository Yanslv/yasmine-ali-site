import type { MetadataRoute } from "next";
import { isPublicationBlocked } from "@/content/publication-guard";
import { absoluteUrl } from "@/lib/site";

/*
 * seo.json: permitir indexação de / e /insights somente quando o conteúdo
 * final estiver validado. Até lá, a trava de publicação bloqueia tudo.
 */
export default function robots(): MetadataRoute.Robots {
  if (isPublicationBlocked) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: ["/", "/insights"], disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
