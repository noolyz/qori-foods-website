import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-field-950">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/50 to-ink-950/30"
      />
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.12]" />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-24">
        <div className="max-w-3xl">
          <Reveal immediate>
            <Eyebrow tone="bone">{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal immediate delay={0.08}>
            <h1 className="mt-5 text-display-xl text-balance text-white">{t("title")}</h1>
          </Reveal>
          <Reveal immediate delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-200 text-pretty sm:text-xl">
              {t("lead")}
            </p>
          </Reveal>
          <Reveal immediate delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <ButtonLink
                href="/contact"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto sm:justify-center"
              >
                {t("primaryCta")}
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/products"
                size="lg"
                variant="outline"
                className="w-full border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto sm:justify-center"
              >
                {t("secondaryCta")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
