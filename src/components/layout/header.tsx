"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { ButtonLink } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const listItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease } },
};

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const ta = useTranslations("a11y");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const solid = scrolled || open;
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}`;

  const allLinks = [...primaryNav, { key: "contact" as const, href: "/contact" }];

  const menuButtonClass = cn(
    "relative z-[60] inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors",
    open || solid
      ? "text-ink-900 ring-1 ring-ink-200 hover:bg-ink-100"
      : "text-white ring-1 ring-white/30 hover:bg-white/10",
  );

  const overlay = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="site-menu"
          id="site-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-40 overflow-hidden bg-field-950"
        >
          <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.12]" />
          <div
            aria-hidden
            className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-field-700/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-clay-500/15 blur-3xl"
          />

          <motion.div
            className="relative flex h-full flex-col overflow-y-auto px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pt-28"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
          >
            <motion.nav
              variants={reduceMotion ? undefined : listStagger}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "show"}
              exit={reduceMotion ? undefined : "exit"}
              className="mx-auto grid w-full max-w-5xl gap-x-12 gap-y-1 sm:grid-cols-2 lg:gap-y-2"
              aria-label="Site"
            >
              {allLinks.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.key}
                    variants={reduceMotion ? undefined : listItem}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "group flex items-baseline gap-3 rounded-2xl px-2 py-3 transition-colors sm:py-4",
                        active ? "text-field-300" : "text-bone-100 hover:text-white",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "font-serif text-sm tabular-nums transition-colors",
                          active ? "text-field-500" : "text-field-700 group-hover:text-field-500",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-2xl tracking-tight sm:text-3xl lg:text-4xl">
                        {t(item.key)}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease, delay: 0.25 } }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 10, transition: { duration: 0.25, ease } }}
              className="mx-auto mt-auto w-full max-w-5xl border-t border-white/10 pt-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                  <LanguageSwitcher tone="light" />
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-bone-200 transition-colors hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {tc("whatsapp")}
                  </a>
                </div>
                <ButtonLink href="/contact" size="lg" variant="secondary" onClick={closeMenu}>
                  {tc("requestQuote")}
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
          solid
            ? "border-b border-ink-200/70 bg-bone-50/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? ta("closeMenu") : ta("openMenu")}
            aria-expanded={open}
            aria-controls="site-menu-panel"
            className={menuButtonClass}
          >
            {open ? (
              <>
                <X className="mr-1.5 h-4 w-4" aria-hidden />
                {t("close")}
              </>
            ) : (
              t("menu")
            )}
          </button>

          <Link
            href="/"
            aria-label={ta("home")}
            className="absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 py-2"
          >
            <Logo variant={open || solid ? "dark" : "light"} />
          </Link>

          <div className="relative z-[60] flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher tone={open || solid ? "dark" : "light"} />
            </div>
            <ButtonLink
              href="/contact"
              size="sm"
              variant="primary"
              className="hidden whitespace-nowrap md:inline-flex"
            >
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </div>
      </header>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
