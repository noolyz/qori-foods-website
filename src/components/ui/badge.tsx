import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "field" | "clay" | "berry" | "neutral" | "success" | "muted";

const tones: Record<BadgeTone, string> = {
  field: "bg-field-100 text-field-800 ring-field-600/20",
  clay: "bg-clay-100 text-clay-800 ring-clay-600/20",
  berry: "bg-berry-100 text-berry-800 ring-berry-600/20",
  neutral: "bg-ink-100 text-ink-700 ring-ink-600/15",
  success: "bg-field-100 text-field-700 ring-field-600/25",
  muted: "bg-ink-100 text-ink-500 ring-ink-500/15",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
