import { type Metadata } from "next";
import { type Locale } from "@/i18n/routing";
import { siteConfig } from "./site";

/**
 * Build consistent per-page metadata with canonical + hreflang alternates.
 * `path` is the locale-agnostic route (e.g. "/products").
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const clean = path === "/" ? "" : path;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${clean}`,
      languages: {
        en: `/en${clean}`,
        es: `/es${clean}`,
        "x-default": `/en${clean}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: `${siteConfig.url}/${locale}${clean}`,
      locale: locale === "es" ? "es_PE" : "en_US",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
