import "server-only";

/**
 * Trava interna de publicação. Nunca é renderizada nem enviada ao navegador.
 *
 * Enquanto qualquer flag estiver `true`, o site pede aos buscadores que não
 * indexem as páginas (ver `robots.ts` e `metadata.robots` no layout).
 * Mude para `false` somente depois da autorização das mídias e da revisão humana.
 */
export const publicationGuard = {
  mediaAuthorizationPending: true,
  humanReviewRequired: true,
};

export const isPublicationBlocked =
  publicationGuard.mediaAuthorizationPending || publicationGuard.humanReviewRequired;
