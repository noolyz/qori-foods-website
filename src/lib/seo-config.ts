import { type Locale } from "@/i18n/routing";
import { products } from "@/data/products";
import { t } from "@/data/types";

/** Primary sitelink candidates — clear labels help Google surface deep links in SERPs. */
export const sitelinkNav: {
  path: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}[] = [
  {
    path: "/products",
    name: { en: "Products", es: "Productos" },
    description: {
      en: "Fresh Peruvian fruits, vegetables and Andean specialty crops for export.",
      es: "Frutas, hortalizas y cultivos andinos frescos para exportación.",
    },
  },
  {
    path: "/about",
    name: { en: "About Qori Foods", es: "Sobre Qori Foods" },
    description: {
      en: "Peruvian grower and exporter founded in Caraz, Áncash since 2014.",
      es: "Productor y exportador peruano fundado en Caraz, Áncash desde 2014.",
    },
  },
  {
    path: "/certifications",
    name: { en: "Certifications", es: "Certificaciones" },
    description: {
      en: "GLOBALG.A.P., BRCGS, HACCP, GMP, GRASP and SMETA certified operations.",
      es: "Operaciones certificadas GLOBALG.A.P., BRCGS, HACCP, GMP, GRASP y SMETA.",
    },
  },
  {
    path: "/contact",
    name: { en: "Contact & Request a Quote", es: "Contacto y cotización" },
    description: {
      en: "Request availability, specifications and pricing from our export team.",
      es: "Solicita disponibilidad, especificaciones y precios a nuestro equipo.",
    },
  },
  {
    path: "/process",
    name: { en: "Export Process", es: "Proceso de exportación" },
    description: {
      en: "Field-to-port traceability, cold chain and international logistics.",
      es: "Trazabilidad del campo al puerto, cadena de frío y logística internacional.",
    },
  },
  {
    path: "/value-added",
    name: { en: "Value Added Innovation", es: "Innovación de Valor Agregado" },
    description: {
      en: "Research, development and innovation turning agricultural excellence into new value.",
      es: "Investigación, desarrollo e innovación que transforman la excelencia agrícola en valor.",
    },
  },
  {
    path: "/sustainability",
    name: { en: "Sustainability", es: "Sostenibilidad" },
    description: {
      en: "Sustainable agriculture, ethical labor and environmental responsibility.",
      es: "Agricultura sostenible, trabajo ético y responsabilidad ambiental.",
    },
  },
  {
    path: "/faq",
    name: { en: "FAQ for Buyers", es: "Preguntas frecuentes" },
    description: {
      en: "MOQ, Incoterms, samples, lead times and export information for importers.",
      es: "MOQ, Incoterms, muestras, tiempos de entrega e información de exportación.",
    },
  },
];

/** Global keyword clusters — merged into every page (meta keywords + schema knowsAbout). */
export const globalKeywords: Record<Locale, string[]> = {
  en: [
    "Qori Foods",
    "QORI",
    "Qori",
    "Qori Foods SAC",
    "Peruvian produce exporter",
    "Peru fruit exporter",
    "Peru vegetable exporter",
    "fresh produce export Peru",
    "B2B produce supplier",
    "wholesale fresh fruits",
    "international produce importer",
    "blueberry exporter Peru",
    "fresh blueberries Peru",
    "Hass avocado exporter",
    "Peruvian avocado export",
    "snow peas exporter",
    "ginger exporter Peru",
    "Andean specialty crops",
    "Caraz Áncash agriculture",
    "Callejón de Huaylas produce",
    "GLOBALG.A.P. certified exporter",
    "BRCGS certified produce",
    "HACCP certified exporter",
    "SMETA ethical exporter",
    "cold chain produce export",
    "traceable fresh produce",
    "request quote fresh produce",
    "Peruvian agricultural exporter",
    "export fruits vegetables Lima",
    "premium produce Peru",
    "Peruvian blueberry supplier",
    "Hass avocado Peru export",
    "snow peas Peru wholesale",
    "Peruvian ginger root export",
    "rocoto pepper export",
    "ají amarillo export Peru",
    "Peruvian lime export",
    "purple corn export Peru",
    "sweet corn export",
    "cherimoya export Peru",
    "Peruvian fig export",
    "prickly pear export",
    "granadilla passion fruit export",
    "Andean superfoods export",
    "fresh produce FOB Peru",
    "CIF fresh produce importer",
    "MOQ fresh produce export",
    "Incoterms produce export",
    "GRASP ethical labor Peru",
    "SMETA audit exporter",
    "GMP certified packing house",
    "Peru agricultural export company",
    "value added produce Peru",
    "Peruvian food innovation",
    "qorifoods.com",
    "www.qorifoods.com",
  ],
  es: [
    "Qori Foods",
    "QORI",
    "Qori",
    "Qori Foods SAC",
    "exportador de frutas Perú",
    "exportador de hortalizas Perú",
    "productos frescos exportación",
    "proveedor B2B productos frescos",
    "exportador arándanos Perú",
    "arándanos frescos exportación",
    "exportador palta Hass",
    "exportador palta Perú",
    "arveja china exportación",
    "exportador jengibre Perú",
    "cultivos andinos exportación",
    "agricultura Caraz Áncash",
    "exportador certificado GLOBALG.A.P.",
    "exportador certificado BRCGS",
    "exportador HACCP",
    "cadena de frío exportación",
    "productos frescos trazables",
    "cotización productos frescos",
    "exportador agrícola peruano",
    "frutas hortalizas Lima exportación",
    "productos premium Perú",
    "proveedor arándanos Perú",
    "exportación palta Hass Perú",
    "arveja china Perú mayorista",
    "exportación jengibre Perú",
    "exportación rocoto Perú",
    "exportación ají amarillo Perú",
    "exportación limón peruano",
    "exportación maíz morado Perú",
    "exportación choclo dulce Perú",
    "exportación chirimoya Perú",
    "exportación higo Perú",
    "exportación tuna Perú",
    "exportación granadilla maracuyá",
    "superalimentos andinos exportación",
    "productos frescos FOB Perú",
    "importador productos frescos CIF",
    "MOQ exportación productos frescos",
    "Incoterms exportación agrícola",
    "GRASP trabajo ético Perú",
    "auditoría SMETA exportador",
    "planta empacadora GMP certificada",
    "empresa exportadora agrícola Perú",
    "productos de valor agregado Perú",
    "innovación alimentaria peruana",
    "qorifoods.com",
    "www.qorifoods.com",
  ],
};

/** Page-specific keyword additions keyed by locale-agnostic path. */
export const pageKeywords: Record<string, Record<Locale, string[]>> = {
  "/": {
    en: ["Peruvian fresh produce company", "export fresh fruits worldwide", "Qori Foods official"],
    es: ["empresa productos frescos Perú", "exportar frutas frescas mundo", "Qori Foods oficial"],
  },
  "/products": {
    en: ["fresh fruit catalogue", "vegetable export catalogue", "Peruvian crop list"],
    es: ["catálogo frutas frescas", "catálogo hortalizas exportación", "lista cultivos peruanos"],
  },
  "/products/blueberries": {
    en: ["Peruvian blueberries", "blueberry export Caraz", "fresh blueberry supplier"],
    es: ["arándanos peruanos", "exportación arándanos Caraz", "proveedor arándanos frescos"],
  },
  "/contact": {
    en: ["request quote produce", "contact produce exporter", "RFQ fresh produce"],
    es: ["solicitar cotización productos", "contacto exportador", "cotización productos frescos"],
  },
  "/certifications": {
    en: ["food safety certifications", "GLOBALG.A.P. GRASP", "BRCGS produce"],
    es: ["certificaciones inocuidad", "GLOBALG.A.P. GRASP", "BRCGS productos frescos"],
  },
  "/about": {
    en: ["Qori Foods story", "Caraz Áncash grower", "Peruvian agricultural company"],
    es: ["historia Qori Foods", "productor Caraz Áncash", "empresa agrícola peruana"],
  },
  "/process": {
    en: ["export process traceability", "cold chain logistics Peru", "field to port"],
    es: ["proceso exportación trazabilidad", "logística cadena de frío", "campo al puerto"],
  },
  "/sustainability": {
    en: ["sustainable agriculture Peru", "ethical labor exporter", "environmental responsibility"],
    es: ["agricultura sostenible Perú", "trabajo ético exportador", "responsabilidad ambiental"],
  },
  "/gallery": {
    en: ["Qori Foods farm photos", "Peruvian produce gallery", "packing house images"],
    es: ["fotos finca Qori Foods", "galería productos peruanos", "imágenes planta empacadora"],
  },
  "/faq": {
    en: ["produce export FAQ", "MOQ Incoterms samples", "B2B buyer questions"],
    es: ["preguntas exportación productos", "MOQ Incoterms muestras", "compradores B2B"],
  },
  "/news": {
    en: ["Qori Foods news", "Peruvian produce insights", "export industry updates"],
    es: ["noticias Qori Foods", "insights productos peruanos", "actualidad exportación"],
  },
  "/privacy": {
    en: ["Qori Foods privacy policy", "data protection RFQ form"],
    es: ["política privacidad Qori Foods", "protección datos formulario cotización"],
  },
  "/value-added": {
    en: [
      "value added agricultural products",
      "food innovation Peru",
      "functional ingredients Peru",
      "natural food extracts",
      "agricultural R&D Peru",
      "premium food solutions",
      "product development fresh produce",
      "sustainable agricultural innovation",
    ],
    es: [
      "productos agrícolas valor agregado",
      "innovación alimentaria Perú",
      "ingredientes funcionales Perú",
      "extractos naturales alimentos",
      "I+D agrícola Perú",
      "soluciones alimentarias premium",
      "desarrollo de productos frescos",
      "innovación agrícola sostenible",
    ],
  },
};

// Auto-generate product-page keyword additions from the catalogue.
for (const product of products) {
  const path = `/products/${product.slug}`;
  const existing = pageKeywords[path];
  const generated = {
    en: [
      t(product.name, "en"),
      t(product.tagline, "en"),
      "Qori Foods export",
      "Peruvian fresh produce",
    ],
    es: [
      t(product.name, "es"),
      t(product.tagline, "es"),
      "exportación Qori Foods",
      "productos frescos Perú",
    ],
  };
  pageKeywords[path] = {
    en: [...new Set([...(existing?.en ?? []), ...generated.en])],
    es: [...new Set([...(existing?.es ?? []), ...generated.es])],
  };
}

export function mergeKeywords(locale: Locale, path = ""): string {
  const global = globalKeywords[locale];
  const page = pageKeywords[path]?.[locale] ?? [];
  return [...new Set([...global, ...page])].join(", ");
}

export function sitelinkUrl(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
