"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { type Product, t } from "@/data/types";
import { type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/** Single-product month strip (used on product detail pages). */
export function AvailabilityStrip({ product }: { product: Product }) {
  const tm = useTranslations("months");
  const td = useTranslations("products.detail");

  return (
    <div>
      <div className="grid grid-cols-12 gap-1.5">
        {MONTHS.map((m) => {
          const available = product.months.includes(m);
          const peak = product.peakMonths.includes(m);
          return (
            <div key={m} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "h-10 w-full rounded-md transition-colors",
                  peak
                    ? "bg-field-600"
                    : available
                      ? "bg-field-300"
                      : "bg-ink-100",
                )}
                title={tm(String(m))}
              />
              <span className="text-[0.65rem] font-medium text-ink-400">{tm(String(m))}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-field-600" /> {td("peak")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-field-300" /> {td("available")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-ink-100" /> {td("notAvailable")}
        </span>
      </div>
    </div>
  );
}

/** Multi-product availability matrix (used on home + products index). */
export function SeasonalityMatrix({
  products,
  cta,
}: {
  products: Product[];
  cta?: boolean;
}) {
  const locale = useLocale() as Locale;
  const tm = useTranslations("months");
  const th = useTranslations("home.seasonality");

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[minmax(140px,1.4fr)_repeat(12,1fr)] items-center gap-1.5 border-b border-ink-200 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-400" />
          {MONTHS.map((m) => (
            <span key={m} className="text-center text-[0.7rem] font-medium text-ink-400">
              {tm(String(m))}
            </span>
          ))}
        </div>
        <div className="divide-y divide-ink-100">
          {products.map((p) => (
            <div
              key={p.slug}
              className="grid grid-cols-[minmax(140px,1.4fr)_repeat(12,1fr)] items-center gap-1.5 py-2"
            >
              <Link
                href={`/products/${p.slug}`}
                className="truncate pr-3 text-sm font-medium text-ink-800 hover:text-field-700"
              >
                {t(p.name, locale)}
              </Link>
              {MONTHS.map((m) => {
                const available = p.months.includes(m);
                const peak = p.peakMonths.includes(m);
                return (
                  <div key={m} className="px-0.5">
                    <div
                      className={cn(
                        "h-5 rounded",
                        peak ? "bg-field-600" : available ? "bg-field-200" : "bg-transparent",
                      )}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {cta ? (
        <div className="mt-6">
          <Link
            href="/products"
            className="text-sm font-semibold text-field-700 underline-offset-4 hover:underline"
          >
            {th("cta")} &rarr;
          </Link>
        </div>
      ) : null}
    </div>
  );
}
