import { type ReactNode } from "react";
import { Container } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/section";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";

/**
 * Shared interior page header: dark field band with breadcrumbs, eyebrow,
 * title and optional lead. Reused across all non-home pages for consistency.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-field-900 text-bone-100">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.15]" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-field-700/40 blur-3xl"
      />
      <Container className="relative pb-14 pt-28 sm:pb-20 sm:pt-36">
        <Breadcrumbs items={breadcrumbs} tone="dark" className="mb-8" />
        {eyebrow ? (
          <Eyebrow tone="bone" className="mb-4">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h1 className="max-w-4xl text-display-lg text-balance text-white">{title}</h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-200 text-pretty">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
