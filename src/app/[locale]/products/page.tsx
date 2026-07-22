import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { ProductsGrid } from "@/components/sections/products-grid";
import { SeasonalityMatrix } from "@/components/sections/seasonality";
import { FinalCta } from "@/components/sections/final-cta";
import { PageSeo } from "@/components/seo/page-seo";
import { ProductListJsonLd } from "@/components/seo/json-ld";
import { products } from "@/data/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return pageMetadata({
    locale,
    path: "/products",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsContent locale={locale} />;
}

function ProductsContent({ locale }: { locale: Locale }) {
  const t = useTranslations("products");
  const th = useTranslations("home.seasonality");
  const tn = useTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("products") }]}
      />
      <PageSeo
        locale={locale}
        path="/products"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("products") },
        ]}
      />
      <ProductListJsonLd locale={locale} products={products} />

      <Section tone="bone">
        <Container>
          <ProductsGrid products={products} />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={th("eyebrow")}
              title={th("title")}
              lead={th("lead")}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-3xl border border-ink-200/70 bg-white p-6 shadow-card sm:p-8">
            <SeasonalityMatrix products={products} />
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
