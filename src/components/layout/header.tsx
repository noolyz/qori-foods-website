"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { ButtonLink } from "@/components/ui/button";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const ta = useTranslations("a11y");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change + lock scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}`;
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
        solid
          ? "border-b border-ink-200/70 bg-bone-50/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label={ta("home")} className="shrink-0 py-2">
          <Logo variant={solid ? "dark" : "light"} />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  solid
                    ? active
                      ? "text-field-700"
                      : "text-ink-700 hover:text-field-700"
                    : active
                      ? "text-white"
                      : "text-bone-100/90 hover:text-white",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <LanguageSwitcher tone={solid ? "dark" : "light"} />
          </div>
          <ButtonLink
            href="/contact"
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            {tc("requestQuote")}
          </ButtonLink>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? ta("closeMenu") : ta("openMenu")}
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-ink-900 hover:bg-ink-100" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden"
          >
            <div className="border-t border-ink-200/70 bg-bone-50 px-5 pb-8 pt-4 sm:px-6">
              <nav className="flex flex-col" aria-label="Mobile">
                {primaryNav.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={closeMenu}
                    className="border-b border-ink-100 py-3.5 text-lg font-medium text-ink-800"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="border-b border-ink-100 py-3.5 text-lg font-medium text-ink-800"
                >
                  {t("contact")}
                </Link>
              </nav>
              <div className="mt-6 flex items-center justify-between gap-3">
                <LanguageSwitcher tone="dark" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-field-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  {tc("whatsapp")}
                </a>
              </div>
              <ButtonLink href="/contact" className="mt-4 w-full" size="lg" onClick={closeMenu}>
                {tc("requestQuote")}
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
