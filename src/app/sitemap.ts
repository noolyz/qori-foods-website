import { type MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { products } from "@/data/products";

const staticPaths = [
  "",
  "/products",
  "/about",
  "/certifications",
  "/sustainability",
  "/process",
  "/value-added",
  "/gallery",
  "/faq",
  "/news",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  const allPaths = [...staticPaths, ...products.map((p) => `/products/${p.slug}`)];

  for (const path of allPaths) {
    // One entry per path, with hreflang alternates for both locales.
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${base}/${locale}${path}`;
    }
    entries.push({
      url: `${base}/${routing.defaultLocale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
      alternates: { languages },
    });
  }

  return entries;
}
