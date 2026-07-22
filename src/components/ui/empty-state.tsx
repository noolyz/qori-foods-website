import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Graceful empty state (used for News/Insights and filtered product results). */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-300 bg-white/60 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-field-100 text-field-700">
          {icon}
        </div>
      ) : null}
      <h3 className="text-display-sm">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-ink-500">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
