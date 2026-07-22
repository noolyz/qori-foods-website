import { cn } from "@/lib/utils";

/** Qori Foods wordmark with a simple berry/leaf mark. */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-serif text-xl font-semibold tracking-tight",
        variant === "light" ? "text-white" : "text-ink-950",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <circle cx="16" cy="18" r="9" className="fill-berry-500" />
        <circle cx="16" cy="18" r="9" className="fill-berry-600/40" />
        <path
          d="M16 9C16 5.5 18.5 2.8 22 2.5c.2 3.2-2 6.2-5.2 6.7"
          className="fill-field-500"
        />
        <path
          d="M16 9c0-2.6-1.8-4.9-4.4-5.4C11.2 6 12.9 8.3 15.4 9"
          className="fill-field-600"
        />
      </svg>
      Qori Foods
    </span>
  );
}
