import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/motion";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { PageSeo } from "@/components/seo/page-seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ product?: string }>;
}) {
  const { locale } = await params;
  const { product } = await searchParams;
  setRequestLocale(locale);
  return <ContactContent locale={locale} defaultProduct={product} />;
}

function ContactContent({
  locale,
  defaultProduct,
}: {
  locale: Locale;
  defaultProduct?: string;
}) {
  const t = useTranslations("contact");
  const tn = useTranslations("nav");
  const { contact } = siteConfig;
  const addr = contact.address;
  const mapQuery = encodeURIComponent(`${addr.street}, ${addr.city}, ${addr.country}`);

  const channels = [
    {
      icon: MessageCircle,
      title: t("whatsappTitle"),
      value: contact.phoneDisplay,
      href: `https://wa.me/${contact.whatsapp}`,
      external: true,
    },
    {
      icon: Mail,
      title: t("emailTitle"),
      value: contact.emailCommercial,
      href: `mailto:${contact.emailCommercial}`,
      external: true,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        breadcrumbs={[{ label: tn("home"), href: "/" }, { label: tn("contact") }]}
      />
      <PageSeo
        locale={locale}
        path="/contact"
        title={t("title")}
        description={t("lead")}
        breadcrumbs={[
          { name: tn("home"), path: "/" },
          { name: tn("contact") },
        ]}
      />

      <Section tone="bone">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            {/* Info column */}
            <div className="space-y-6">
              <Reveal>
                <h2 className="text-display-sm">{t("infoTitle")}</h2>
                <div className="mt-6 space-y-3">
                  {channels.map((c) => (
                    <a
                      key={c.title}
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-ink-200/70 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-field-100 text-field-700">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wide text-ink-400">
                          {c.title}
                        </span>
                        <span className="font-medium text-ink-800 group-hover:text-field-700">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <Card className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-100 text-clay-600">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                        {t("officeTitle")}
                      </p>
                      <p className="mt-1 text-sm text-ink-700">
                        {addr.street}
                        <br />
                        {addr.city}, {addr.postalCode}, {addr.region}
                        <br />
                        {addr.country}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-4 border-t border-ink-100 pt-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-berry-100 text-berry-700">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                        {t("hoursTitle")}
                      </p>
                      <p className="mt-1 text-sm text-ink-700">{t("hoursBody")}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-ink-200/70 shadow-card">
                  <iframe
                    title={t("officeTitle")}
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    className="h-56 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>

            {/* Form column */}
            <Reveal delay={0.1}>
              <Card className="p-6 sm:p-8">
                <h2 className="text-display-sm">{t("form.title")}</h2>
                <div className="mt-6">
                  <ContactForm defaultProduct={defaultProduct} />
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
