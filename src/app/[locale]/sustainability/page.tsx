import { type Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Leaf, HeartHandshake, ShieldCheck, Sprout } from "lucide-react";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { PageSeo } from "@/components/seo/page-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sustainability" });
  return pageMetadata({
    locale,
    path: "/sustainability",
    title: t("title"),
    description: t("lead"),
  });
}

const pillarIcons = [Leaf, HeartHandshake, ShieldCheck, Sprout];

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SustainabilityContent locale={locale} />;
}

type Pillar = { title: string; body: string };

function SustainabilityContent({ locale }: { locale: Locale }) {
  const t = useTranslations("sustainability");
  const tn = useTranslations("nav");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("sustainability") }]}
      />
      <PageSeo
        locale={locale}
        path="/sustainability"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("sustainability") },
        ]}
      />

      {/* Pillars */}
      <Section tone="white">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("pillarsTitle")} />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <StaggerItem key={p.title} className="h-full">
                  <Card interactive className="flex h-full items-start gap-5 p-7">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-field-100 text-field-700">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl">{p.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-500">{p.body}</p>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* People */}
      <Section tone="bone">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-ink-100 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1000&q=80"
                  alt="Farm team at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow={t("eyebrow")} title={t("peopleTitle")} />
              <p className="prose-qori mt-6">{t("peopleBody")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Closing quote */}
      <Section tone="field">
        <Container size="narrow">
          <Reveal className="text-center">
            <p className="font-serif text-display-sm text-balance text-white">
              &ldquo;{t("closing")}&rdquo;
            </p>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
