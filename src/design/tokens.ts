import type { CSSProperties } from "react";
import tokens from "./design-tokens.json";

export { tokens };

const seconds = (value: string) => Number.parseFloat(value);

/**
 * Converte `design-tokens.json` em CSS custom properties aplicadas no <html>.
 * O Tailwind lê essas variáveis via `@theme inline` em globals.css.
 */
export function tokenCssVariables(fontVars: {
  display: string;
  body: string;
  detail: string;
}): CSSProperties {
  const { colors, gradients, typography, radii, shadows, animation } = tokens;

  const vars: Record<string, string> = {
    "--yt-background": colors.background,
    "--yt-surface": colors.surface,
    "--yt-surface-alt": colors.surfaceAlt,
    "--yt-text": colors.text,
    "--yt-text-muted": colors.textMuted,
    "--yt-primary": colors.primary,
    "--yt-primary-contrast": colors.primaryContrast,
    "--yt-secondary": colors.secondary,
    "--yt-accent": colors.accent,
    "--yt-border": colors.border,
    "--yt-overlay": colors.overlay,

    "--yt-gradient-aurora": gradients.auroraWarm,
    "--yt-gradient-glow": gradients.accentGlow,

    "--yt-font-display": `var(${fontVars.display}), ${typography.display.fallback}`,
    "--yt-font-body": `var(${fontVars.body}), ${typography.body.fallback}`,
    "--yt-font-detail": `var(${fontVars.detail}), ${typography.detail.fallback}`,

    "--yt-text-h1": typography.scale.h1,
    "--yt-text-h2": typography.scale.h2,
    "--yt-text-h3": typography.scale.h3,
    "--yt-text-body": typography.scale.body,
    "--yt-text-small": typography.scale.small,
    "--yt-leading-display": String(typography.lineHeight.display),
    "--yt-leading-heading": String(typography.lineHeight.heading),
    "--yt-leading-body": String(typography.lineHeight.body),

    "--yt-radius-card": radii.card,
    "--yt-radius-button": radii.button,
    "--yt-radius-image": radii.image,
    "--yt-radius-tag": radii.tag,

    "--yt-shadow-card": shadows.card,
    "--yt-shadow-focus": shadows.focus,

    "--yt-duration-fast": animation.durationFast,
    "--yt-duration-base": animation.durationBase,
    "--yt-duration-slow": animation.durationSlow,
  };

  tokens.spacing.scale.forEach((value, index) => {
    vars[`--yt-space-${index + 1}`] = value;
  });

  return vars as CSSProperties;
}

/** Tokens de movimento consumidos pelo GSAP. */
export const motionTokens = {
  durationFast: seconds(tokens.animation.durationFast),
  durationBase: seconds(tokens.animation.durationBase),
  durationSlow: seconds(tokens.animation.durationSlow),
  ease: tokens.animation.ease,
  scrub: tokens.animation.scrub,
  stagger: tokens.animation.stagger,
  imageRadius: tokens.radii.image,
} as const;
