import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { ButtonLink } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { CertStrip } from "@/components/sections/cert-strip";
import { ProductCard } from "@/components/sections/product-card";
import { SeasonalityMatrix } from "@/components/sections/seasonality";
import { MarketsList } from "@/components/sections/markets";
import { CtaBand } from "@/components/sections/cta-band";
import { WebPageJsonLd } from "@/components/seo/json-ld";
import { getFeaturedProducts } from "@/data/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const tm = useTranslations("meta");
  const tc = useTranslations("cta");
  const featured = getFeaturedProducts();

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path="/"
        title={tm("homeTitle")}
        description={tm("homeDescription")}
      />
      <Hero />
      <StatsBand />

      {/* Trust bar */}
      <Section tone="bone" compact>
        <Container>
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              {t("trust.title")}
            </p>
            <div className="mt-8">
              <CertStrip />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Featured products */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading
                eyebrow={t("products.eyebrow")}
                title={t("products.title")}
                lead={t("products.lead")}
              />
            </Reveal>
            <Reveal delay={0.1} className="shrink-0">
              <ButtonLink href="/products" variant="outline">
                {tc("viewAllProducts")}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <StaggerItem key={p.slug}>
                <ProductCard product={p} priority={i < 2} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Seasonality teaser */}
      <Section tone="bone">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t("seasonality.eyebrow")}
              title={t("seasonality.title")}
              lead={t("seasonality.lead")}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-3xl border border-ink-200/70 bg-white p-6 shadow-card sm:p-8">
            <SeasonalityMatrix products={featured} cta />
          </Reveal>
        </Container>
      </Section>

      {/* People & land */}
      <Section tone="white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <SectionHeading
                eyebrow={t("people.eyebrow")}
                title={t("people.title")}
              />
              <p className="prose-qori mt-6">{t("people.body")}</p>
              <div className="mt-8">
                <ButtonLink href="/about" variant="outline">
                  {t("people.cta")}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-ink-100 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1595855759920-86582396756c?auto=format&fit=crop&w=1000&q=80"
                  alt={t("people.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Markets */}
      <Section tone="ink">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={t("markets.eyebrow")}
                title={t("markets.title")}
                lead={t("markets.lead")}
                tone="bone"
              />
            </Reveal>
            <Reveal delay={0.1} className="lg:pt-4">
              <MarketsList tone="dark" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={t("finalCta.title")}
        lead={t("finalCta.lead")}
        primaryLabel={t("finalCta.primary")}
        secondaryLabel={t("finalCta.secondary")}
      />
    </>
  );
}
