import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Base surface card. Set `interactive` for hover elevation. */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-ink-200/70 bg-white shadow-card",
        interactive &&
          "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
