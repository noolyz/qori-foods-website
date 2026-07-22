import { type Metadata } from "next";
import { type Locale } from "@/i18n/routing";
import { mergeKeywords } from "./seo-config";
import { siteConfig } from "./site";

const OG_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

/**
 * Build consistent per-page metadata with canonical, hreflang, keywords,
 * Open Graph and Googlebot directives.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image = OG_IMAGE,
  noIndex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const clean = path === "/" ? "" : path;
  const url = `${siteConfig.url}/${locale}${clean}`;
  const keywordString = keywords ?? mergeKeywords(locale, path);
  const altLocale = locale === "es" ? "en_US" : "es_PE";

  return {
    title,
    description,
    keywords: keywordString,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    category: "agriculture",
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
      url,
      locale: locale === "es" ? "es_PE" : "en_US",
      alternateLocale: [altLocale],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    other: {
      "geo.region": "PE-LIM",
      "geo.placename": "Lima, Perú",
    },
  };
}

export { OG_IMAGE };
