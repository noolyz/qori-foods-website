import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "bone" | "white" | "field" | "ink";

const tones: Record<SectionTone, string> = {
  bone: "bg-bone-50 text-ink-900",
  white: "bg-white text-ink-900",
  field: "bg-field-900 text-bone-100",
  ink: "bg-ink-950 text-bone-100",
};

/** Vertical rhythm wrapper. `tone` sets the background band. */
export function Section({
  children,
  className,
  tone = "bone",
  id,
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        compact ? "py-section-sm" : "py-section",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-[88rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small overline label used above section headings. */
export function Eyebrow({
  children,
  className,
  tone = "field",
}: {
  children: ReactNode;
  className?: string;
  tone?: "field" | "clay" | "bone";
}) {
  const color =
    tone === "clay"
      ? "text-clay-600"
      : tone === "bone"
        ? "text-bone-300"
        : "text-field-600";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        color,
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  );
}

/** Section heading block: eyebrow + title + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "field",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "field" | "clay" | "bone";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className={cn("text-display-md text-balance", tone === "bone" && "text-white")}>
        {title}
      </h2>
      {lead ? (
        <p className="max-w-2xl text-lg leading-relaxed opacity-80 text-pretty">{lead}</p>
      ) : null}
    </div>
  );
}
