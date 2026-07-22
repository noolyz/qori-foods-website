import { type Locale } from "@/i18n/routing";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

/** Resolve a localized value for the active locale. */
export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}
export function tList(value: LocalizedList, locale: Locale): string[] {
  return value[locale] ?? value.en;
}

export type ProductCategory = "berry" | "fruit" | "vegetable" | "pepper" | "specialty";

export type Availability = "year-round" | "seasonal";

export interface Product {
  slug: string;
  name: Localized;
  category: ProductCategory;
  featured: boolean;
  /** One-line hook shown on cards. */
  tagline: Localized;
  /** Short paragraph for card + meta description. */
  summary: Localized;
  /** Body paragraphs for the product detail page. */
  body: LocalizedList;
  /** Nutrition / value highlights. */
  highlights: LocalizedList;
  varieties: LocalizedList;
  packaging: LocalizedList;
  /** Growing / sourcing region. */
  region: Localized;
  availability: Availability;
  /** 1-12 month numbers when the product is available for shipment. */
  months: number[];
  /** Subset of `months` that are peak harvest. */
  peakMonths: number[];
  /** Certification ids (see data/certifications.ts). */
  certifications: string[];
  image: {
    src: string;
    alt: Localized;
  };
}
