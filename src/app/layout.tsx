import { type ReactNode } from "react";

/**
 * Passthrough root layout. The real document shell (html/body) lives in
 * `[locale]/layout.tsx`; this file exists only so the global `not-found.tsx`
 * has a root layout, as required by the App Router.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
