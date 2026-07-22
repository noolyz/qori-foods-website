import { type Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { PageSeo } from "@/components/seo/page-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return pageMetadata({
    locale,
    path: "/gallery",
    title: t("title"),
    description: t("lead"),
  });
}

/** TODO: replace placeholder imagery with real Qori Foods photography. */
const gallery = [
  { src: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=900&q=80", span: "row-span-2", alt: "Blueberries" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80", span: "", alt: "Farmland" },
  { src: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80", span: "", alt: "Avocado" },
  { src: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80", span: "row-span-2", alt: "Farm team" },
  { src: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=900&q=80", span: "", alt: "Snow peas" },
  { src: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80", span: "", alt: "Ginger" },
  { src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80", span: "row-span-2", alt: "Andean landscape" },
  { src: "https://images.unsplash.com/photo-1622957461168-202e611f2bb2?auto=format&fit=crop&w=900&q=80", span: "", alt: "Limes" },
  { src: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80", span: "", alt: "Corn" },
];

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalleryContent locale={locale} />;
}

function GalleryContent({ locale }: { locale: Locale }) {
  const t = useTranslations("gallery");
  const tn = useTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("gallery") }]}
      />
      <PageSeo
        locale={locale}
        path="/gallery"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("gallery") },
        ]}
      />

      <Section tone="bone">
        <Container>
          <Stagger className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3">
            {gallery.map((img, i) => (
              <StaggerItem key={i} className={img.span}>
                <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-ink-100 shadow-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-xs text-ink-400">{t("note")}</p>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
