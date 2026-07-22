/**
 * Central site configuration — single source of truth for contact details,
 * navigation structure and company facts reused across pages and metadata.
 * Contact facts are carried over from the current qorifoods.com site.
 */

export const siteConfig = {
  name: "Qori Foods",
  legalName: "Qori Foods SAC",
  // TODO: confirm production domain
  url: "https://www.qorifoods.com",
  foundedYear: 2014,
  contact: {
    phoneDisplay: "+51 966 123 659",
    phoneE164: "+51966123659",
    whatsapp: "51966123659",
    emailCommercial: "comercial@qorifoods.com",
    emailAdmin: "administracion@qorifoods.com",
    address: {
      street: "Ca. Conde de la Monclova 315",
      city: "San Isidro",
      region: "Lima",
      postalCode: "15073",
      country: "Perú",
    },
  },
  social: {
    // TODO: replace with real profiles
    instagram: "https://instagram.com/qorifoods",
    linkedin: "https://www.linkedin.com/company/qorifoods",
    facebook: "https://facebook.com/qorifoods",
  },
} as const;

/** Export destination markets (used on home + process pages). */
export const exportMarkets = [
  "United States",
  "Canada",
  "Netherlands",
  "United Kingdom",
  "Spain",
  "Germany",
  "China",
] as const;

/** Primary navigation — keys map to message dictionary entries. */
export const primaryNav = [
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "certifications", href: "/certifications" },
  { key: "sustainability", href: "/sustainability" },
  { key: "process", href: "/process" },
  { key: "gallery", href: "/gallery" },
] as const;

/** Footer navigation columns. */
export const footerNav = {
  explore: [
    { key: "products", href: "/products" },
    { key: "about", href: "/about" },
    { key: "process", href: "/process" },
    { key: "gallery", href: "/gallery" },
  ],
  trust: [
    { key: "certifications", href: "/certifications" },
    { key: "sustainability", href: "/sustainability" },
    { key: "faq", href: "/faq" },
    { key: "news", href: "/news" },
  ],
  company: [
    { key: "contact", href: "/contact" },
    { key: "privacy", href: "/privacy" },
  ],
} as const;
