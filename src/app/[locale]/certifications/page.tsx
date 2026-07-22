import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { CertCard } from "@/components/sections/cert-card";
import { FinalCta } from "@/components/sections/final-cta";
import { PageSeo } from "@/components/seo/page-seo";
import { certifications } from "@/data/certifications";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return pageMetadata({
    locale,
    path: "/certifications",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CertificationsContent locale={locale} />;
}

function CertificationsContent({ locale }: { locale: Locale }) {
  const t = useTranslations("certifications");
  const tn = useTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("certifications") }]}
      />
      <PageSeo
        locale={locale}
        path="/certifications"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("certifications") },
        ]}
      />

      <Section tone="bone">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <StaggerItem key={cert.id} className="h-full">
                <CertCard cert={cert} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12">
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink-600 text-pretty">
              {t("closing")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
