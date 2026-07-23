import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Route } from "lucide-react";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { MarketsList } from "@/components/sections/markets";
import { FinalCta } from "@/components/sections/final-cta";
import { PageSeo } from "@/components/seo/page-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "process" });
  return pageMetadata({
    locale,
    path: "/process",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  return <ProcessContent locale={locale} />;
}

type Step = { step: string; title: string; body: string };

function ProcessContent({ locale }: { locale: Locale }) {
  const t = useTranslations("process");
  const tn = useTranslations("nav");
  const steps = t.raw("steps") as Step[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("process") }]}
      />
      <PageSeo
        locale={locale}
        path="/process"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("process") },
        ]}
      />

      {/* Steps */}
      <Section tone="white">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("stepsTitle")} />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <StaggerItem key={s.step} className="h-full">
                <Card interactive className="h-full p-7">
                  <span className="font-serif text-display-sm text-field-300">{s.step}</span>
                  <h3 className="mt-3 text-xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-500">{s.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Traceability */}
      <Section tone="bone">
        <Container size="narrow">
          <Reveal>
            <Card className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-field-700 text-white">
                <Route className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-display-sm">{t("traceabilityTitle")}</h2>
                <p className="mt-3 leading-relaxed text-ink-600">{t("traceabilityBody")}</p>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Markets */}
      <Section tone="ink">
        <Container>
          <Reveal>
            <SectionHeading title={t("marketsTitle")} tone="bone" />
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <MarketsList tone="dark" />
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
