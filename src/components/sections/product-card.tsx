import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { type Product, t } from "@/data/types";
import { type Locale } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const tc = useTranslations("common");

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-field-600",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        <Image
          src={product.image.src}
          alt={t(product.image.alt, locale)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.featured ? (
            <Badge tone="berry" className="bg-white/90 backdrop-blur">
              {tc("flagship")}
            </Badge>
          ) : null}
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge
            tone={product.availability === "year-round" ? "success" : "clay"}
            className="bg-white/90 backdrop-blur"
            dot
          >
            {product.availability === "year-round" ? tc("yearRound") : tc("seasonal")}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start justify-between gap-2 text-xl">
          <span className="transition-colors group-hover:text-field-700">
            {t(product.name, locale)}
          </span>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-field-600" />
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {t(product.tagline, locale)}
        </p>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-400">
          {t(product.region, locale)}
        </p>
      </div>
    </Link>
  );
}
