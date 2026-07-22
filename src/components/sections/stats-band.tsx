import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/section";
import { StatCounter } from "@/components/ui/stat-counter";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { products } from "@/data/products";
import { exportMarkets, siteConfig } from "@/lib/site";

/**
 * Home proof-point band. Values are derived from real data where possible.
 * TODO: confirm hectares figure with the client (placeholder based on the
 * 80 ha blueberry program referenced on the current site).
 */
export function StatsBand() {
  const t = useTranslations("home.stats");
  const years = new Date().getFullYear() - siteConfig.foundedYear;

  const stats = [
    { value: years, suffix: "+", label: t("years") },
    { value: 80, suffix: " ha", label: t("hectares") },
    { value: products.length, suffix: "", label: t("crops") },
    { value: exportMarkets.length, suffix: "+", label: t("markets") },
  ];

  return (
    <Section tone="white" compact className="border-y border-ink-200/60">
      <Container>
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center lg:text-left">
              <div className="font-serif text-display-md text-field-700">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium text-ink-500">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
