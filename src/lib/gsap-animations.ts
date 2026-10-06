import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionTokens } from "@/design/tokens";

/* ------------------------------------------------------------------ */
/* Registro único                                                      */
/* ------------------------------------------------------------------ */

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: motionTokens.ease, duration: motionTokens.durationBase });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };

/* ------------------------------------------------------------------ */
/* Tokens de movimento por seção (aba Animacoes da planilha)           */
/* ------------------------------------------------------------------ */

export const breakpoints = {
  desktop: "(min-width: 1024px)",
  finePointer: "(pointer: fine)",
} as const;

const conditions = {
  isDesktop: `${breakpoints.desktop} and (prefers-reduced-motion: no-preference)`,
  isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
};

export const sectionMotion = {
  /* Planilha: "top -80" = 80px de rolagem a partir do topo da página. */
  header: { start: 80, duration: 0.4, ease: "power2.out" },
  heroTitle: { duration: 1.0, stagger: 0.05 },
  /* Planilha: top bottom → center center. No hero (topo da página) o
     equivalente é a saída do viewport: top top → bottom top. */
  heroImages: { start: "top top", end: "bottom top" },
  /* Cards do hero → pilares → abertura. Disparo no 1º scroll a partir do topo. */
  heroPillars: { morph: motionTokens.durationBase, hold: 0.12, open: 0.7, ease: "power3.inOut", topTolerance: 8 },
  featured: { start: "top 85%", end: "center 45%", scrub: motionTokens.scrub },
  grid: { start: "top 82%", duration: motionTokens.durationBase, stagger: motionTokens.stagger },
  /* travel = deslocamento em xPercent da faixa ao atravessar a seção. */
  pillars: { start: "top bottom", end: "bottom top", scrub: 0.3, travel: 25, mobileScrub: 0.5, mobileTravel: 35 },
  about: { start: "top 80%", end: "center 45%", scrub: 0.7, stagger: 0.02 },
  expertise: { start: "top 85%", end: "center 45%", scrub: motionTokens.scrub },
  closing: { start: "top top", end: "+=80%", scrub: 0.7 },
  contact: { start: "top 85%", duration: 0.5, ease: "power2.out", stagger: 0.08, mobileStagger: 0.04 },
  reducedFade: { duration: motionTokens.durationFast },
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const all = (scope: ParentNode, selector: string) =>
  Array.from(scope.querySelectorAll<HTMLElement>(selector));

function markHeroDone() {
  document.documentElement.setAttribute("data-hero-done", "");
}

/** Fade curto usado no modo de movimento reduzido. */
function reducedFade(targets: Element | Element[], start = "top 90%") {
  const list = Array.isArray(targets) ? targets : [targets];
  list.forEach((target) => {
    gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: sectionMotion.reducedFade.duration,
        ease: "none",
        scrollTrigger: { trigger: target, start, once: true },
      },
    );
  });
}

/* ------------------------------------------------------------------ */
/* Assinatura: image-scale-mask                                        */
/* ------------------------------------------------------------------ */

type ScaleMaskOptions = {
  intensity: number;
  start: string;
  end: string;
  scrub: number | boolean;
};

export function imageScaleMask(wrapper: HTMLElement, opts: ScaleMaskOptions) {
  const mediaEl = wrapper.querySelector<HTMLElement>("[data-anim-media]");
  const radius = wrapper.dataset.animRadius ?? motionTokens.imageRadius;
  const y = (14 * opts.intensity).toFixed(2);
  const x = (10 * opts.intensity).toFixed(2);
  const scrollTrigger = { trigger: wrapper, start: opts.start, end: opts.end, scrub: opts.scrub };

  gsap.fromTo(
    wrapper,
    { clipPath: `inset(${y}% ${x}% ${y}% ${x}% round 240px)` },
    { clipPath: `inset(0% 0% 0% 0% round ${radius})`, ease: "none", scrollTrigger },
  );
  if (mediaEl) {
    gsap.fromTo(
      mediaEl,
      { scale: 1 + 0.15 * opts.intensity },
      { scale: 1, ease: "none", scrollTrigger },
    );
  }
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function heroEntrance(hero: HTMLElement, isDesktop: boolean): gsap.core.Timeline | null {
  const root = document.documentElement;
  // O fallback CSS já mostrou o conteúdo (JS lento): não esconder de novo.
  if (root.classList.contains("motion-fallback") || root.hasAttribute("data-hero-done")) {
    markHeroDone();
    return null;
  }
  root.setAttribute("data-motion-ready", "");

  const words = all(hero, "[data-hero-word]");
  const fades = all(hero, "[data-hero-fade]");
  const tiles = all(hero, "[data-hero-tile]");

  const tl = gsap.timeline({
    defaults: { ease: motionTokens.ease },
    onComplete: () => {
      gsap.set([...words, ...fades, ...tiles], { clearProps: "transform,opacity,clipPath" });
      markHeroDone();
    },
  });

  tl.fromTo(
    words,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: sectionMotion.heroTitle.duration,
      // Mobile: sem split complexo, as palavras entram juntas.
      stagger: isDesktop ? sectionMotion.heroTitle.stagger : 0,
    },
  )
    .fromTo(
      fades,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: motionTokens.durationBase, stagger: motionTokens.stagger },
      "-=0.65",
    )
    .fromTo(
      tiles,
      { clipPath: "inset(50% 50% 50% 50% round 999px)" },
      {
        clipPath: `inset(0% 0% 0% 0% round ${motionTokens.imageRadius})`,
        duration: motionTokens.durationSlow,
        stagger: 0.12,
      },
      "-=0.8",
    );

  return tl;
}

function heroScroll(hero: HTMLElement, isDesktop: boolean) {
  if (!isDesktop) return;
  const { start, end } = sectionMotion.heroImages;

  // Parallax em camadas + flutuação suave (somente desktop).
  all(hero, "[data-hero-depth]").forEach((layer) => {
    const depth = Number(layer.dataset.heroDepth ?? 0.4);
    gsap.to(layer, { yPercent: -70 * depth, ease: "none", scrollTrigger: { trigger: hero, start, end, scrub: true } });
  });
  all(hero, "[data-hero-float]").forEach((el, index) => {
    gsap.to(el, {
      y: -10 - index * 4,
      duration: 3.2 + index * 0.7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });
}

/* ------------------------------------------------------------------ */
/* Hero → pilares: o 1º scroll (a partir do topo) dispara a transição  */
/* Os cards crescem até virar 3 pilares que cobrem a tela; com a tela  */
/* coberta a página pula para a seção seguinte, e os pilares se abrem. */
/* ------------------------------------------------------------------ */

const SCROLL_KEYS = new Set(["ArrowDown", "PageDown", " ", "Spacebar"]);

const isInteractiveTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName));

/** Retângulo do texto em si (o span ocupa a largura do card). */
const textRect = (el: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect();
};

function heroPillars(hero: HTMLElement, entrance: gsap.core.Timeline | null) {
  const overlay = document.querySelector<HTMLElement>("[data-pillars]");
  if (!overlay) return undefined;
  const sources = all(hero, "[data-hero-mask]");
  const sourceLabels = all(hero, "[data-hero-label]");
  const frames = all(hero, "[data-hero-tile]");
  const pillars = all(overlay, "[data-pillar]");
  const labels = all(overlay, "[data-pillar-label]");
  const details = all(overlay, "[data-pillar-detail]");
  if (!pillars.length || pillars.length !== sources.length) return undefined;

  const { morph, hold, open, ease, topTolerance } = sectionMotion.heroPillars;
  const atTop = () => window.scrollY <= topTolerance;
  let state: "armed" | "playing" | "done" = atTop() ? "armed" : "done";
  let timeline: gsap.core.Timeline | null = null;
  let touchStartY = 0;

  const reset = () => {
    pillars.forEach((pillar) => pillar.style.removeProperty("clip-path"));
    gsap.set([...pillars, ...labels, ...details], { clearProps: "all" });
    gsap.set(frames, { clearProps: "visibility" });
    gsap.set(overlay, { clearProps: "visibility" });
  };

  const finish = () => {
    state = "done";
    timeline = null;
    reset();
  };

  // Com a tela coberta, leva a página para o início da seção seguinte.
  const jumpPastHero = () => {
    const top = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top, behavior: "instant" });
  };

  const play = () => {
    state = "playing";
    entrance?.progress(1);

    const box = overlay.getBoundingClientRect();
    const vw = box.width;
    const vh = box.height;
    const count = pillars.length;
    const colW = vw / count;
    const px = (v: number) => `${v.toFixed(1)}px`;
    const inset = (t: number, r: number, b: number, l: number, radius: number) =>
      `inset(${px(t)} ${px(r)} ${px(b)} ${px(l)} round ${px(radius)})`;

    gsap.set(overlay, { visibility: "visible" });
    const tl = gsap.timeline({ defaults: { ease }, onComplete: finish });
    timeline = tl;
    tl.set(frames, { visibility: "hidden" }, 0);

    pillars.forEach((pillar, i) => {
      // Anima números e monta o clip-path a cada quadro: interpolar a string
      // falha porque o navegador reescreve inset() (encurta e remove "round 0").
      const r = sources[i].getBoundingClientRect();
      const clip = { t: r.top, r: vw - r.right, b: vh - r.bottom, l: r.left, rad: 22 };
      const apply = () => {
        pillar.style.clipPath = inset(clip.t, clip.r, clip.b, clip.l, clip.rad);
      };
      apply();

      // Abertura: os laterais recuam para as bordas, os do meio afinam até o centro.
      const middle = i * colW + colW / 2;
      const gone =
        i === 0
          ? { t: 0, r: vw, b: 0, l: 0, rad: 0 }
          : i === count - 1
            ? { t: 0, r: 0, b: 0, l: vw, rad: 0 }
            : { t: 0, r: vw - middle, b: 0, l: middle, rad: 0 };
      const isSide = i === 0 || i === count - 1;

      tl.to(clip, { t: 0, r: vw - (i + 1) * colW, b: 0, l: i * colW, rad: 0, duration: morph, onUpdate: apply }, 0);
      tl.to(clip, { ...gone, duration: open, onUpdate: apply }, morph + hold + (isSide ? 0.06 : 0));
    });

    labels.forEach((label, i) => {
      const source = sourceLabels[i];
      const start = source ? textRect(source) : null;
      const finalSize = Number.parseFloat(getComputedStyle(label).fontSize);
      const sourceSize = source ? Number.parseFloat(getComputedStyle(source).fontSize) : finalSize / 3;
      tl.fromTo(
        label,
        {
          xPercent: -50,
          yPercent: -50,
          x: start ? start.left + start.width / 2 : i * colW + colW / 2,
          y: start ? start.top + start.height / 2 : vh,
          scale: sourceSize / finalSize,
          rotation: 0,
          opacity: 1,
        },
        { x: i * colW + colW / 2, y: vh / 2, scale: 1, rotation: -90, duration: morph },
        0,
      );
      tl.to(label, { opacity: 0, duration: open * 0.4, ease: "power1.out" }, morph + hold);
    });

    tl.fromTo(details, { opacity: 0 }, { opacity: 1, duration: morph * 0.6, ease: "power1.out" }, morph * 0.4);
    tl.call(jumpPastHero, undefined, morph + hold / 2);
  };

  const onWheel = (event: WheelEvent) => {
    if (state === "playing") {
      event.preventDefault();
    } else if (state === "armed" && event.deltaY > 0 && atTop()) {
      event.preventDefault();
      play();
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (state === "playing") {
      event.preventDefault();
      return;
    }
    if (state !== "armed" || !atTop()) return;
    const dy = touchStartY - (event.touches[0]?.clientY ?? touchStartY);
    if (dy > 0) event.preventDefault();
    if (dy > 6) play();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!SCROLL_KEYS.has(event.key) || isInteractiveTarget(event.target)) return;
    if (state === "playing") {
      event.preventDefault();
    } else if (state === "armed" && atTop()) {
      event.preventDefault();
      play();
    }
  };

  // Rolagem sem gesto (âncora, barra de rolagem) desarma; voltar ao topo rearma.
  const onScroll = () => {
    if (state === "armed" && !atTop()) state = "done";
    else if (state === "done" && window.scrollY <= 1) state = "armed";
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("scroll", onScroll);
    timeline?.kill();
    reset();
  };
}

/* ------------------------------------------------------------------ */
/* Texto por palavras                                                  */
/* ------------------------------------------------------------------ */

function wordReveal(container: HTMLElement, isDesktop: boolean) {
  const { start, end, scrub, stagger } = sectionMotion.about;
  if (!isDesktop) {
    // Mobile: blocos inteiros.
    gsap.fromTo(
      container,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, scrollTrigger: { trigger: container, start, once: true } },
    );
    return;
  }
  const words = all(container, "[data-word]");
  gsap.fromTo(
    words,
    { opacity: 0.16 },
    { opacity: 1, stagger, ease: "none", scrollTrigger: { trigger: container, start, end, scrub } },
  );
}

/* ------------------------------------------------------------------ */
/* Entradas em stagger                                                 */
/* ------------------------------------------------------------------ */

type StaggerPreset = "grid" | "contact" | "default";

function staggerGroup(group: HTMLElement, isDesktop: boolean) {
  const preset = (group.dataset.animPreset ?? "default") as StaggerPreset;
  const items = all(group, "[data-anim-item]");
  if (!items.length) return;

  const config =
    preset === "contact"
      ? {
          start: sectionMotion.contact.start,
          duration: sectionMotion.contact.duration,
          ease: sectionMotion.contact.ease,
          stagger: isDesktop ? sectionMotion.contact.stagger : sectionMotion.contact.mobileStagger,
        }
      : {
          start: sectionMotion.grid.start,
          duration: sectionMotion.grid.duration,
          ease: motionTokens.ease,
          stagger: isDesktop ? sectionMotion.grid.stagger : sectionMotion.grid.stagger / 2,
        };

  gsap.set(items, { opacity: 0, y: isDesktop ? 40 : 20 });
  ScrollTrigger.batch(items, {
    start: config.start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger,
        overwrite: true,
      });
      // Zoom interno das capas.
      batch.forEach((item) => {
        const zoom = (item as HTMLElement).querySelector("[data-anim-zoom]");
        if (zoom) {
          gsap.fromTo(zoom, { scale: 1.12 }, { scale: 1, duration: motionTokens.durationSlow, ease: config.ease });
        }
      });
    },
  });
}

/* ------------------------------------------------------------------ */
/* Marquee ligado ao scroll                                            */
/* ------------------------------------------------------------------ */

function scrollMarquee(track: HTMLElement, isDesktop: boolean) {
  const trigger = track.closest("section") ?? track;
  const { start, end, scrub, travel, mobileScrub, mobileTravel } = sectionMotion.pillars;
  // Mobile: percurso maior (tela estreita) e scrub mais suave para o toque.
  const distance = isDesktop ? travel : mobileTravel;
  const toLeft = track.dataset.animDirection !== "right";
  gsap.fromTo(
    track,
    { xPercent: toLeft ? 0 : -distance },
    {
      xPercent: toLeft ? -distance : 0,
      ease: "none",
      scrollTrigger: { trigger, start, end, scrub: isDesktop ? scrub : mobileScrub },
    },
  );
}

/* ------------------------------------------------------------------ */
/* Temas: ativação sequencial                                          */
/* ------------------------------------------------------------------ */

function themeSteps(list: HTMLElement) {
  all(list, "[data-theme-item]").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0.28 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: item, start: "top 78%", end: "top 52%", scrub: true },
      },
    );
  });
}

/* ------------------------------------------------------------------ */
/* Fechamento: pin + revelação por clip-path                           */
/* ------------------------------------------------------------------ */

function closingReveal(section: HTMLElement, isDesktop: boolean) {
  const panel = section.querySelector<HTMLElement>("[data-closing-panel]");
  const content = section.querySelector<HTMLElement>("[data-closing-content]");
  const glow = section.querySelector<HTMLElement>("[data-closing-glow]");
  if (!panel) return;

  if (isDesktop) {
    const { start, end, scrub } = sectionMotion.closing;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: section, start, end, scrub, pin: true, anticipatePin: 1 },
    });
    tl.fromTo(
      panel,
      { clipPath: "inset(14% 12% 14% 12% round 48px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)" },
    );
    if (content) tl.fromTo(content, { scale: 0.9 }, { scale: 1 }, 0);
    if (glow) tl.fromTo(glow, { opacity: 0 }, { opacity: 1 }, 0);
    return;
  }

  // Mobile: sem pin, revelação curta.
  gsap.fromTo(
    panel,
    { clipPath: "inset(6% 5% 6% 5% round 32px)" },
    {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      ease: "none",
      scrollTrigger: { trigger: section, start: "top 85%", end: "top 30%", scrub: 0.5 },
    },
  );
}

/* ------------------------------------------------------------------ */
/* Botões magnéticos (desktop, pointer fine)                           */
/* ------------------------------------------------------------------ */

function magnetic(el: HTMLElement) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
  const move = (event: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    xTo((event.clientX - (rect.left + rect.width / 2)) * 0.2);
    yTo((event.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", leave);
  };
}

/* ------------------------------------------------------------------ */
/* Orquestração da página                                              */
/* ------------------------------------------------------------------ */

export function createPageAnimations(scope: HTMLElement) {
  registerGsap();
  let mm: gsap.MatchMedia | undefined;

  const ctx = gsap.context(() => {
    mm = gsap.matchMedia();

    mm.add(conditions, (context) => {
      const { isDesktop = false, reduceMotion = false } = context.conditions ?? {};
      const hero = scope.querySelector<HTMLElement>("[data-anim='hero']");

      if (reduceMotion) {
        // Somente fades curtos: sem parallax, pin, stagger longo ou marquee.
        markHeroDone();
        reducedFade(
          all(scope, "[data-anim='scale-mask'], [data-anim='words'], [data-anim='stagger'], [data-anim='fade']"),
        );
        return;
      }

      const cleanups: Array<() => void> = [];

      if (hero) {
        const entrance = heroEntrance(hero, isDesktop);
        heroScroll(hero, isDesktop);
        const stopPillars = heroPillars(hero, entrance);
        if (stopPillars) cleanups.push(stopPillars);
      } else {
        markHeroDone();
      }

      all(scope, "[data-anim='scale-mask']").forEach((wrapper) => {
        const preset = wrapper.dataset.animPreset === "expertise" ? sectionMotion.expertise : sectionMotion.featured;
        imageScaleMask(wrapper, {
          intensity: isDesktop ? 1 : 0.4,
          start: preset.start,
          end: preset.end,
          scrub: preset.scrub,
        });
      });

      all(scope, "[data-anim='words']").forEach((el) => wordReveal(el, isDesktop));
      all(scope, "[data-anim='stagger']").forEach((el) => staggerGroup(el, isDesktop));
      all(scope, "[data-anim='themes']").forEach((el) => themeSteps(el));
      all(scope, "[data-anim='closing']").forEach((el) => closingReveal(el, isDesktop));

      all(scope, "[data-anim='fade']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: "top 88%", once: true } },
        );
      });

      // Marquee ligado ao scroll (desktop e mobile; desligado só com movimento reduzido).
      all(scope, "[data-anim='marquee']").forEach((el) => scrollMarquee(el, isDesktop));

      if (isDesktop && window.matchMedia(breakpoints.finePointer).matches) {
        cleanups.push(...all(scope, "[data-magnetic]").map((el) => magnetic(el)));
      }

      return () => cleanups.forEach((fn) => fn());
    });
  }, scope);

  // Fontes alteram métricas de texto: recalcula posições depois do carregamento.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return {
    revert() {
      mm?.revert();
      ctx.revert();
    },
  };
}

/** Barra de progresso e estado do header (aba Animacoes, linha header). */
export function createHeaderAnimations(
  header: HTMLElement,
  bar: HTMLElement | null,
  onState: (state: { scrolled: boolean; hidden: boolean }) => void,
) {
  registerGsap();

  return gsap.context(() => {
    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );
    }

    let last = { scrolled: false, hidden: false };
    const emit = (next: typeof last) => {
      if (next.scrolled !== last.scrolled || next.hidden !== last.hidden) {
        last = next;
        onState(next);
      }
    };
    const threshold = sectionMotion.header.start;
    const update = (self: ScrollTrigger) => {
      const scrolled = self.scroll() > threshold;
      emit({ scrolled, hidden: scrolled && self.direction === 1 });
    };
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
  }, header);
}
