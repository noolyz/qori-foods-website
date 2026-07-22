import { useTranslations } from "next-intl";
import { CtaBand } from "./cta-band";

/** Standard closing CTA band using the shared home.finalCta copy. */
export function FinalCta() {
  const t = useTranslations("home.finalCta");
  return (
    <CtaBand
      title={t("title")}
      lead={t("lead")}
      primaryLabel={t("primary")}
      secondaryLabel={t("secondary")}
    />
  );
}
