"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Compact EN/ES segmented switcher that preserves the current path. */
export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-xs font-semibold",
        tone === "light"
          ? "bg-white/10 text-white ring-1 ring-white/20"
          : "bg-ink-100 text-ink-600 ring-1 ring-ink-200",
      )}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            disabled={active || isPending}
            aria-current={active ? "true" : undefined}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              })
            }
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors",
              active
                ? tone === "light"
                  ? "bg-white text-ink-900"
                  : "bg-white text-ink-900 shadow-sm"
                : "hover:opacity-80",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
