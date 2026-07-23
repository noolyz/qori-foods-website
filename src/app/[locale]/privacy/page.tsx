import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";

import { PageSeo } from "@/components/seo/page-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "privacy" });
  return pageMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageSeo
        locale={locale}
        path="/privacy"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("privacy") },
        ]}
      />
      <PrivacyContent />
    </>
  );
}

type Sec = { title: string; body: string };

function PrivacyContent() {
  const t = useTranslations("privacy");
  const tn = useTranslations("nav");
  const sections = t.raw("sections") as Sec[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("privacy") }]}
      />

      <Section tone="white">
        <Container size="narrow">
          <Reveal>
            <Badge tone="neutral">
              {t("updated")}: {t("updatedDate")}
            </Badge>
            <div className="mt-8 space-y-10">
              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="text-display-sm">{s.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
