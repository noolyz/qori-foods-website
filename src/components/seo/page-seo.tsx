import { type Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd, WebPageJsonLd } from "./json-ld";

/** Per-page SEO extras: WebPage schema + breadcrumb structured data. */
export function PageSeo({
  locale,
  path,
  title,
  description,
  breadcrumbs,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  breadcrumbs: { name: string; path?: string }[];
}) {
  return (
    <>
      <WebPageJsonLd locale={locale} path={path} title={title} description={description} />
      <BreadcrumbJsonLd locale={locale} items={breadcrumbs} />
    </>
  );
}
