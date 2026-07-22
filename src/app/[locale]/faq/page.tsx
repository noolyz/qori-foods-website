import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return pageMetadata({
    locale,
    path: "/faq",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqContent />;
}

type Item = { q: string; a: string };

function FaqContent() {
  const t = useTranslations("faq");
  const tn = useTranslations("nav");
  const items = t.raw("items") as Item[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("faq") }]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/en" },
          { name: "FAQ", url: "/en/faq" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <Section tone="bone">
        <Container size="narrow">
          <Reveal>
            <FaqAccordion items={items} />
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
