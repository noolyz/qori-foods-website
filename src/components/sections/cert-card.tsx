import { useLocale } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { certLabel, type Certification } from "@/data/certifications";
import { type Locale } from "@/i18n/routing";
import { t as tr, type Localized } from "@/data/types";

const categoryTone: Record<Certification["category"], "field" | "clay" | "berry" | "neutral"> = {
  "food-safety": "field",
  agriculture: "field",
  social: "clay",
  manufacturing: "berry",
};

export function CertCard({ cert }: { cert: Certification }) {
  const locale = useLocale() as Locale;
  return (
    <Card interactive className="flex h-full flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-field-100 text-field-700">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg leading-tight">{cert.name}</h3>
          <Badge tone={categoryTone[cert.category]} className="mt-1">
            {certLabel(cert.category, locale)}
          </Badge>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-500">
        {tr(cert.summary as Localized, locale)}
      </p>
    </Card>
  );
}
