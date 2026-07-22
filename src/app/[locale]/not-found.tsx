import { useTranslations } from "next-intl";
import { Sprout } from "lucide-react";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-field-900 text-bone-100">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.12]" />
      <Container className="relative py-24 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-field-300">
          <Sprout className="h-8 w-8" />
        </span>
        <p className="mt-8 font-serif text-display-lg text-white">404</p>
        <h1 className="mt-4 text-display-sm text-white">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-bone-200">{t("lead")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="secondary" size="lg">
            {t("home")}
          </ButtonLink>
          <ButtonLink
            href="/products"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
          >
            {t("products")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
