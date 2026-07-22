import { type Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Sprout, Users, Leaf, ShieldCheck, MapPin, Globe2 } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("lead"),
  });
}

const valueIcons = [ShieldCheck, Users, Leaf, Sprout];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent locale={locale} />;
}

type ValueItem = { title: string; body: string };
type TimelineItem = { year: string; title: string; body: string };
type FairItem = { name: string; location: string };

function AboutContent({ locale }: { locale: Locale }) {
  const t = useTranslations("about");
  const tn = useTranslations("nav");

  const story = t.raw("story") as string[];
  const values = t.raw("values") as ValueItem[];
  const timeline = t.raw("timeline") as TimelineItem[];
  const fairs = t.raw("fairs") as FairItem[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("about") }]}
      />
      <PageSeo
        locale={locale}
        path="/about"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("about") },
        ]}
      />

      {/* Story */}
      <Section tone="white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-ink-100 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
                  alt="Andean farmland"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow={t("eyebrow")} title={t("storyTitle")} />
              <div className="prose-qori mt-6">
                {story.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full p-8">
                <h3 className="text-display-sm text-field-700">{t("missionTitle")}</h3>
                <p className="mt-4 leading-relaxed text-ink-600">{t("mission")}</p>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="h-full p-8">
                <h3 className="text-display-sm text-clay-600">{t("visionTitle")}</h3>
                <p className="mt-4 leading-relaxed text-ink-600">{t("vision")}</p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="white">
        <Container>
          <Reveal className="flex justify-center">
            <SectionHeading title={t("valuesTitle")} align="center" />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <StaggerItem key={v.title}>
                  <Card interactive className="h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-field-100 text-field-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.body}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="ink">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("timelineTitle")} title={t("timelineTitle")} tone="bone" />
          </Reveal>
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <StaggerItem key={item.year}>
                <div className="relative border-t border-white/15 pt-6">
                  <span className="font-serif text-display-sm text-field-400">{item.year}</span>
                  <h3 className="mt-2 text-lg text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-300">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Trade fairs & international presence */}
      <Section tone="white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t("fairsTitle")}
              title={t("fairsTitle")}
              lead={t("fairsLead")}
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fairs.map((fair) => (
              <StaggerItem key={fair.name} className="h-full">
                <Card interactive className="flex h-full items-start gap-4 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-100 text-clay-700">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-ink-900">
                      {fair.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {fair.location}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-ink-400">{t("fairsNote")}</p>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
