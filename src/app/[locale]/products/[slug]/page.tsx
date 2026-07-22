import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { Check, Download, MapPin, CalendarRange, Layers, Tag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AvailabilityStrip } from "@/components/sections/seasonality";
import { ProductCard } from "@/components/sections/product-card";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { products, getProduct, productCategories } from "@/data/products";
import { getCertification } from "@/data/certifications";
import { t as tr, tList, type Product } from "@/data/types";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    locale,
    path: `/products/${slug}`,
    title: tr(product.name, locale),
    description: tr(product.summary, locale),
    image: product.image.src,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("products.detail");
  const tc = useTranslations("common");
  const tcta = useTranslations("cta");
  const tn = useTranslations("nav");

  const name = tr(product.name, locale);
  const category = productCategories.find((c) => c.id === product.category);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const specs = [
    { icon: MapPin, label: tc("region"), value: tr(product.region, locale) },
    {
      icon: CalendarRange,
      label: tc("availability"),
      value: product.availability === "year-round" ? tc("yearRound") : tc("seasonal"),
    },
    { icon: Tag, label: tc("category"), value: category?.label[locale] ?? "" },
    { icon: Layers, label: t("varieties"), value: tList(product.varieties, locale).join(", ") },
  ];

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/en" },
          { name: "Products", url: "/en/products" },
          { name: tr(product.name, "en"), url: `/en/products/${product.slug}` },
        ]}
      />

      {/* Product hero */}
      <section className="relative overflow-hidden bg-field-900 text-bone-100">
        <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.12]" />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-field-700/40 blur-3xl"
        />
        <Container className="relative pb-16 pt-28 sm:pb-20 sm:pt-36">
          <Breadcrumbs
            items={[
              { label: tn("home"), href: "/" },
              { label: tn("products"), href: "/products" },
              { label: name },
            ]}
            tone="dark"
            className="mb-8"
          />
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal immediate>
              <div className="flex flex-wrap items-center gap-2">
                {product.featured ? <Badge tone="berry">{tc("flagship")}</Badge> : null}
                <Badge
                  tone={product.availability === "year-round" ? "success" : "clay"}
                  dot
                >
                  {product.availability === "year-round" ? tc("yearRound") : tc("seasonal")}
                </Badge>
              </div>
              <h1 className="mt-4 text-display-lg text-balance text-white">{name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-bone-200 text-pretty">
                {tr(product.tagline, locale)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <ButtonLink
                  href={`/contact?product=${product.slug}`}
                  size="lg"
                  variant="secondary"
                  className="w-full sm:flex-1 sm:justify-center"
                  aria-label={tcta("requestQuoteFor", { product: name })}
                >
                  {tcta("requestQuote")}
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="w-full shrink-0 border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto sm:justify-center"
                >
                  <Download className="h-5 w-5 shrink-0" aria-hidden />
                  <span>{tcta("downloadCatalog")}</span>
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-ink-800 shadow-card ring-1 ring-white/10">
                <Image
                  src={product.image.src}
                  alt={tr(product.image.alt, locale)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Body + specs */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-display-sm">{t("overview")}</h2>
                <div className="prose-qori mt-5">
                  {tList(product.body, locale).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal className="mt-12">
                <h3 className="text-display-sm">{t("highlights")}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {tList(product.highlights, locale).map((h) => (
                    <li key={h} className="flex items-start gap-3 text-ink-700">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-field-100 text-field-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-12">
                <h3 className="text-display-sm">{t("packaging")}</h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {tList(product.packaging, locale).map((pack) => (
                    <li key={pack}>
                      <span className="inline-flex rounded-full bg-bone-100 px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-200">
                        {pack}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:pt-2">
              <Reveal>
                <Card className="p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-400">
                    {t("specsTitle")}
                  </h3>
                  <dl className="mt-5 space-y-4">
                    {specs.map((s) => (
                      <div key={s.label} className="flex items-start gap-3">
                        <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-field-600" />
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">
                            {s.label}
                          </dt>
                          <dd className="text-sm font-medium text-ink-800">{s.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 border-t border-ink-200 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-400">
                      {t("certsTitle")}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {product.certifications.map((cid) => {
                        const cert = getCertification(cid);
                        if (!cert) return null;
                        return (
                          <li key={cid}>
                            <Badge tone="field">{cert.abbr}</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Availability calendar */}
      <Section tone="bone">
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow={tc("availability")} title={t("availabilityTitle")} />
          </Reveal>
          <Reveal delay={0.1} className="mt-8 rounded-3xl border border-ink-200/70 bg-white p-6 shadow-card sm:p-8">
            <AvailabilityStrip product={product} />
          </Reveal>
        </Container>
      </Section>

      {/* Product-aware CTA */}
      <Section tone="field" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grain opacity-10" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="text-display-md text-white">{t("ctaTitle", { product: name })}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-bone-200">{t("ctaBody")}</p>
              <div className="mt-8 flex justify-center">
                <ButtonLink
                  href={`/contact?product=${product.slug}`}
                  size="lg"
                  variant="secondary"
                  aria-label={tcta("requestQuoteFor", { product: name })}
                >
                  {tcta("requestQuoteFor", { product: name })}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section tone="white">
        <Container>
          <Reveal>
            <SectionHeading title={t("relatedTitle")} />
          </Reveal>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <ProductCard product={p} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
