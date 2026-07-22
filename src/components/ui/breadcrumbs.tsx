import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  className,
  tone = "light",
}: {
  items: Crumb[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm",
          tone === "dark" ? "text-bone-300" : "text-ink-500",
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors hover:underline underline-offset-4",
                    tone === "dark" ? "hover:text-white" : "hover:text-field-700",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(
                    last && (tone === "dark" ? "text-white" : "text-ink-800"),
                  )}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-50" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
