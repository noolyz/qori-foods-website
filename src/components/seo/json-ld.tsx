import { siteConfig, exportMarkets } from "@/lib/site";
import { type Product, t as tr } from "@/data/types";
import { type Locale } from "@/i18n/routing";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Controlled, static data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const { contact } = siteConfig;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        foundingDate: String(siteConfig.foundedYear),
        description:
          "Peruvian grower and exporter of fresh, certified fruits and vegetables.",
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: "PE",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: contact.phoneE164,
          email: contact.emailCommercial,
          areaServed: exportMarkets,
          availableLanguage: ["en", "es"],
        },
        sameAs: Object.values(siteConfig.social),
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
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: tr(product.name, locale),
        description: tr(product.summary, locale),
        image: product.image.src,
        category: product.category,
        brand: {
          "@type": "Brand",
          name: siteConfig.name,
        },
        countryOfOrigin: "PE",
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
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
          item: `${siteConfig.url}${item.url}`,
        })),
      }}
    />
  );
}
