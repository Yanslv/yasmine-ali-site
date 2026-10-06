"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { InstagramLogo, List, X } from "@phosphor-icons/react";
import { navigation, ui } from "@/content/site-content";
import { createHeaderAnimations } from "@/lib/gsap-animations";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const ICON = 20;

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scrolled: false, hidden: false });
  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!headerRef.current) return;
    const ctx = createHeaderAnimations(headerRef.current, barRef.current, setState);
    return () => ctx.revert();
  }, []);

  const unlockScroll = () => {
    document.documentElement.style.removeProperty("overflow");
  };

  const close = useCallback((restoreFocus = true) => {
    unlockScroll();
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [open, close]);

  const hidden = state.hidden && !open;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-accent/20"
      >
        <div ref={barRef} className="progress-bar h-full w-full bg-accent" />
      </div>

      <header
        ref={headerRef}
        className="site-header fixed inset-x-0 top-0 z-50"
        data-scrolled={state.scrolled}
        data-hidden={hidden}
      >
        <div aria-hidden="true" className="site-header__bg glass absolute inset-0 border-b border-line/70" />
        <div className="site-header__inner container-editorial relative flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-[1.375rem] font-medium tracking-[-0.03em] text-ink"
            aria-label={ui.homeLink}
          >
            {navigation.brand}
          </Link>

          <nav aria-label={ui.primaryNav} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-surface-alt"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={navigation.social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex size-11 items-center justify-center rounded-full border border-line text-primary transition-colors hover:bg-surface-alt"
                >
                  <InstagramLogo size={ICON} weight="duotone" aria-hidden="true" />
                  <span className="sr-only">
                    {navigation.social.label} ({ui.newTab})
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/70 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(true)}
          >
            <List size={ICON} weight="duotone" aria-hidden="true" />
            <span className="sr-only">{ui.menuOpen}</span>
          </button>
        </div>
      </header>

      <div
        ref={dialogRef}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label={ui.menuTitle}
        data-open={open}
        inert={!open}
        className="mobile-menu aurora fixed inset-0 z-[80] flex flex-col md:hidden"
      >
        <div className="container-editorial flex h-[72px] items-center justify-between">
          <span className="font-display text-[1.375rem] font-medium tracking-[-0.03em]">{navigation.brand}</span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink"
            onClick={() => close()}
          >
            <X size={ICON} weight="duotone" aria-hidden="true" />
            <span className="sr-only">{ui.menuClose}</span>
          </button>
        </div>

        <nav aria-label={ui.primaryNav} className="container-editorial flex flex-1 flex-col justify-center pb-16">
          <ul className="flex flex-col gap-2">
            {navigation.links.map((link, index) => (
              <li key={link.href} className="mobile-menu__item" style={{ "--i": index } as CSSProperties}>
                <Link
                  href={link.href}
                  onClick={() => close(false)}
                  className="flex min-h-14 items-center font-display text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="mobile-menu__item mt-10 border-t border-line pt-6"
            style={{ "--i": navigation.links.length } as CSSProperties}
          >
            <a
              href={navigation.social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 text-base font-medium text-primary"
            >
              <InstagramLogo size={ICON} weight="duotone" aria-hidden="true" />
              {navigation.social.label}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
