import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Newspaper } from "lucide-react";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return pageMetadata({
    locale,
    path: "/news",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NewsContent />;
}

function NewsContent() {
  const t = useTranslations("news");
  const tn = useTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("news") }]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/en" },
          { name: "News", url: "/en/news" },
        ]}
      />

      <Section tone="bone">
        <Container size="narrow">
          <Reveal>
            <EmptyState
              icon={<Newspaper className="h-6 w-6" />}
              title={t("emptyTitle")}
              description={t("emptyBody")}
              action={
                <ButtonLink href="/contact" variant="primary">
                  {t("emptyCta")}
                </ButtonLink>
              }
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
