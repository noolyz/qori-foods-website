import { MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { siteConfig } from "@/lib/site";

/** Recurring conversion band used at the foot of most pages. */
export function CtaBand({
  title,
  lead,
  primaryLabel,
  secondaryLabel,
}: {
  title: string;
  lead: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <Section tone="field" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-10" />
      <div
        aria-hidden
        className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-clay-500/20 blur-3xl"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-md text-balance text-white">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bone-200 text-pretty">
            {lead}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <ButtonLink href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto sm:justify-center">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              external
              size="lg"
              variant="outline"
              className="w-full border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto sm:justify-center"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
              <span>{secondaryLabel}</span>
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
