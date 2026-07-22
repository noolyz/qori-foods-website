import { type Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  FlaskConical,
  Droplets,
  Sparkles,
  Beaker,
  Leaf,
  Boxes,
  Microscope,
  TestTubes,
  ClipboardCheck,
  ShieldCheck,
  Rocket,
  ArrowDown,
  TrendingUp,
  Gem,
  Globe2,
  Handshake,
} from "lucide-react";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { CtaBand } from "@/components/sections/cta-band";
import { PageSeo } from "@/components/seo/page-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "valueAdded" });
  return pageMetadata({
    locale,
    path: "/value-added",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ValueAddedPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ValueAddedContent locale={locale} />;
}

/* Placeholder imagery (Unsplash) — replace with Qori Foods R&D photography. */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581093458791-9d42e3c7e2f9?auto=format&fit=crop&w=1920&q=80";

const areaVisuals = [
  { icon: Sparkles, image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80" },
  { icon: Droplets, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80" },
  { icon: Gem, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80" },
  { icon: FlaskConical, image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80" },
  { icon: Leaf, image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80" },
  { icon: Boxes, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=900&q=80" },
];

const processIcons = [Microscope, TestTubes, ClipboardCheck, ShieldCheck, Rocket];
const commitmentIcons = [TrendingUp, Gem, Leaf, Globe2, Beaker, Handshake];

type Area = { name: string; description: string; status: "rd" | "development" };
type Step = { title: string; body: string };
type Commitment = { title: string; body: string };

function ValueAddedContent({ locale }: { locale: Locale }) {
  const t = useTranslations("valueAdded");
  const tn = useTranslations("nav");

  const intro = t.raw("introBody") as string[];
  const areas = t.raw("areas") as Area[];
  const steps = t.raw("processSteps") as Step[];
  const commitments = t.raw("commitments") as Commitment[];

  return (
    <>
      <PageSeo
        locale={locale}
        path="/value-added"
        title={t("title")}
        description={t("subtitle")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("valueAdded") },
        ]}
      />

      {/* Hero */}
      <header className="relative overflow-hidden bg-field-900 text-bone-100">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-field-950 via-field-900/80 to-field-900/40"
        />
        <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.12]" />
        <div
          aria-hidden
          className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-clay-500/20 blur-3xl"
        />
        <Container className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
          <Breadcrumbs
            items={[{ label: tn("home"), href: "/" }, { label: tn("valueAdded") }]}
            tone="dark"
            className="mb-8"
          />
          <Reveal immediate>
            <Eyebrow tone="bone" className="mb-5">
              {t("eyebrow")}
            </Eyebrow>
            <h1 className="max-w-4xl text-display-xl text-balance text-white">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-bone-200 text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>
        </Container>
      </header>

      {/* Introduction */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow={t("introEyebrow")} title={t("introTitle")} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-qori space-y-5 text-lg">
                {intro.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Innovation areas */}
      <Section tone="bone">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow={t("areasEyebrow")}
              title={t("areasTitle")}
              lead={t("areasLead")}
              align="center"
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => {
              const visual = areaVisuals[i % areaVisuals.length];
              const Icon = visual.icon;
              const isRd = area.status === "rd";
              return (
                <StaggerItem key={area.name} className="h-full">
                  <Card interactive className="flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                      <Image
                        src={visual.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out-expo hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent"
                      />
                      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-field-700 shadow-sm backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Badge tone={isRd ? "berry" : "clay"} dot className="self-start">
                        {isRd ? t("statusRd") : t("statusDevelopment")}
                      </Badge>
                      <h3 className="mt-4 text-xl">{area.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">
                        {area.description}
                      </p>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Research process timeline */}
      <Section tone="ink">
        <Container size="narrow">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow={t("processEyebrow")}
              title={t("processTitle")}
              lead={t("processLead")}
              align="center"
              tone="bone"
            />
          </Reveal>
          <ol className="mt-16 space-y-4">
            {steps.map((step, i) => {
              const Icon = processIcons[i % processIcons.length];
              const last = i === steps.length - 1;
              return (
                <li key={step.title}>
                  <Reveal delay={i * 0.08}>
                    <div className="flex items-start gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
                      <div className="flex flex-col items-center">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-field-500 text-field-950 shadow-lg">
                          <Icon className="h-6 w-6" />
                        </span>
                      </div>
                      <div className="pt-1">
                        <span className="font-serif text-sm uppercase tracking-[0.18em] text-field-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 text-xl text-white">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-bone-300">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                  {!last ? (
                    <Reveal delay={i * 0.08 + 0.04} className="flex justify-center py-1.5">
                      <ArrowDown aria-hidden className="h-5 w-5 text-field-400/70" />
                    </Reveal>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Commitment */}
      <Section tone="white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t("commitmentEyebrow")}
              title={t("commitmentTitle")}
              lead={t("commitmentBody")}
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item, i) => {
              const Icon = commitmentIcons[i % commitmentIcons.length];
              return (
                <StaggerItem key={item.title} className="h-full">
                  <Card className="h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-field-100 text-field-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Final CTA */}
      <CtaBand
        title={t("ctaTitle")}
        lead={t("ctaLead")}
        primaryLabel={t("ctaPrimary")}
        secondaryLabel={t("ctaSecondary")}
      />
    </>
  );
}
