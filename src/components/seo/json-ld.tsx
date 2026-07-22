import { siteConfig, exportMarkets } from "@/lib/site";
import { sitelinkNav, globalKeywords, sitelinkUrl } from "@/lib/seo-config";
import { type Product, t as tr } from "@/data/types";
import { type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const orgId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

/**
 * Global structured data graph: Organization + WebSite + SiteNavigationElement.
 * Helps search engines understand brand identity, site structure and sitelink
 * candidates (Products, Contact, Certifications, etc.).
 */
export async function GlobalJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const { contact } = siteConfig;
  const siteUrl = `${siteConfig.url}/${locale}`;

  const navigationElements = sitelinkNav.map((item, index) => ({
    "@type": "SiteNavigationElement",
    "@id": `${siteConfig.url}${sitelinkUrl(locale, item.path)}#nav`,
    position: index + 1,
    name: item.name[locale],
    description: item.description[locale],
    url: `${siteConfig.url}${sitelinkUrl(locale, item.path)}`,
  }));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": orgId,
            name: siteConfig.legalName,
            alternateName: ["Qori Foods", "QORI", "Qori", "Qori Foods SAC"],
            url: siteConfig.url,
            logo: `${siteConfig.url}/icon.svg`,
            foundingDate: String(siteConfig.foundedYear),
            description: t("description"),
            knowsAbout: globalKeywords[locale].slice(0, 12),
            address: {
              "@type": "PostalAddress",
              streetAddress: contact.address.street,
              addressLocality: contact.address.city,
              addressRegion: contact.address.region,
              postalCode: contact.address.postalCode,
              addressCountry: "PE",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "sales",
                telephone: contact.phoneE164,
                email: contact.emailCommercial,
                areaServed: exportMarkets,
                availableLanguage: ["English", "Spanish"],
              },
            ],
            sameAs: Object.values(siteConfig.social),
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: siteConfig.name,
            alternateName: ["QORI", "Qori Foods SAC"],
            url: siteUrl,
            description: t("description"),
            inLanguage: [locale === "es" ? "es-PE" : "en-US"],
            publisher: { "@id": orgId },
            hasPart: navigationElements.map((nav) => ({
              "@type": "WebPage",
              "@id": nav["@id"],
              name: nav.name,
              description: nav.description,
              url: nav.url,
            })),
          },
          ...navigationElements,
        ],
      }}
    />
  );
}

export function WebPageJsonLd({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const clean = path === "/" ? "" : path;
  const url = `${siteConfig.url}/${locale}${clean}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale === "es" ? "es-PE" : "en-US",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
      }}
    />
  );
}

export function ProductJsonLd({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const url = `${siteConfig.url}/${locale}/products/${product.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${url}#product`,
        name: tr(product.name, locale),
        description: tr(product.summary, locale),
        image: product.image.src,
        category: product.category,
        url,
        brand: {
          "@type": "Brand",
          name: siteConfig.name,
        },
        manufacturer: { "@id": orgId },
        countryOfOrigin: {
          "@type": "Country",
          name: "Peru",
        },
      }}
    />
  );
}

export function ProductListJsonLd({
  locale,
  products,
}: {
  locale: Locale;
  products: Product[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: locale === "es" ? "Productos Qori Foods" : "Qori Foods Products",
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: tr(p.name, locale),
          url: `${siteConfig.url}/${locale}/products/${p.slug}`,
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path?: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.path
            ? `${siteConfig.url}/${locale}${item.path === "/" ? "" : item.path}`
            : undefined,
        })),
      }}
    />
  );
}

/** @deprecated Use GlobalJsonLd — kept for type compatibility during migration. */
export function OrganizationJsonLd() {
  return null;
}
