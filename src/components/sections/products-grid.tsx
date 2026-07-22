"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PackageSearch } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type Product, type ProductCategory } from "@/data/types";
import { productCategories } from "@/data/products";
import { type Locale } from "@/i18n/routing";
import { ProductCard } from "./product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Filter = ProductCategory | "all";

export function ProductsGrid({ products }: { products: Product[] }) {
  const t = useTranslations("products");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: t("filterAll") },
    ...productCategories.map((c) => ({ id: c.id as Filter, label: c.label[locale] })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        {chips.map((chip) => {
          const active = filter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-field-700 text-white shadow-sm"
                  : "bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-field-400 hover:text-field-700",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-500" aria-live="polite">
        {t("resultsCount", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <motion.div
          layout={!reduce}
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState
          className="mt-6"
          icon={<PackageSearch className="h-6 w-6" />}
          title={t("emptyTitle")}
          description={t("emptyBody")}
          action={
            <Button variant="outline" onClick={() => setFilter("all")}>
              {t("clearFilters")}
            </Button>
          }
        />
      )}
    </div>
  );
}
