import { type Locale } from "@/i18n/routing";
import { type Localized } from "./types";

export interface Certification {
  id: string;
  name: string;
  abbr: string;
  category: "food-safety" | "agriculture" | "social" | "manufacturing";
  summary: Localized;
}

/** Certifications carried over from the current qorifoods.com site. */
export const certifications: Certification[] = [
  {
    id: "brc",
    name: "BRCGS Global Standards",
    abbr: "BRCGS",
    category: "food-safety",
    summary: {
      en: "Guarantees food safety across every stage of production, handling and export, meeting strict international retail standards.",
      es: "Garantiza la seguridad alimentaria en cada etapa de producción, manipulación y exportación, cumpliendo estrictos estándares internacionales de retail.",
    },
  },
  {
    id: "haccp",
    name: "HACCP",
    abbr: "HACCP",
    category: "food-safety",
    summary: {
      en: "A preventive system that identifies, evaluates and controls hazards throughout the production process to ensure product safety.",
      es: "Sistema preventivo que identifica, evalúa y controla peligros a lo largo del proceso productivo para asegurar la inocuidad del producto.",
    },
  },
  {
    id: "globalgap",
    name: "GLOBALG.A.P.",
    abbr: "G.A.P.",
    category: "agriculture",
    summary: {
      en: "Certifies good agricultural practices — food safety, environmental protection and worker well-being — in the field.",
      es: "Certifica buenas prácticas agrícolas —inocuidad, protección ambiental y bienestar del trabajador— en el campo.",
    },
  },
  {
    id: "grasp",
    name: "GLOBALG.A.P. GRASP",
    abbr: "GRASP",
    category: "social",
    summary: {
      en: "A social add-on assessing labor conditions on our farms, ensuring workers' rights and fair working conditions.",
      es: "Módulo social que evalúa las condiciones laborales en nuestras fincas, garantizando los derechos y condiciones justas de los trabajadores.",
    },
  },
  {
    id: "gmp",
    name: "Good Manufacturing Practices",
    abbr: "GMP",
    category: "manufacturing",
    summary: {
      en: "Ensures cleanliness, control and quality at every stage of processing in our packing facilities.",
      es: "Asegura limpieza, control y calidad en cada etapa del proceso en nuestras plantas de empaque.",
    },
  },
  {
    id: "smeta",
    name: "SMETA (Sedex)",
    abbr: "SMETA",
    category: "social",
    summary: {
      en: "An ethical audit validating our commitment to labor rights, health & safety, the environment and business integrity.",
      es: "Auditoría ética que valida nuestro compromiso con los derechos laborales, la salud y seguridad, el medio ambiente y la integridad empresarial.",
    },
  },
];

export function getCertification(id: string): Certification | undefined {
  return certifications.find((c) => c.id === id);
}

export function certLabel(cat: Certification["category"], locale: Locale): string {
  const map: Record<Certification["category"], Localized> = {
    "food-safety": { en: "Food safety", es: "Inocuidad" },
    agriculture: { en: "Agriculture", es: "Agricultura" },
    social: { en: "Social & ethics", es: "Social y ética" },
    manufacturing: { en: "Manufacturing", es: "Manufactura" },
  };
  return map[cat][locale] ?? map[cat].en;
}
