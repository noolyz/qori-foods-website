import { Globe } from "lucide-react";
import { exportMarkets } from "@/lib/site";
import { Stagger, StaggerItem } from "@/components/ui/motion";

/**
 * Export markets display. Uses a stylized list of destinations rather than a
 * heavy interactive map to keep the page fast and dependency-free.
 * TODO: swap for a real map graphic with pinned destinations if desired.
 */
export function MarketsList({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Stagger className="flex flex-wrap gap-2.5">
      {exportMarkets.map((market) => (
        <StaggerItem key={market}>
          <span
            className={
              tone === "dark"
                ? "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-bone-100 ring-1 ring-white/15"
                : "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-sm ring-1 ring-ink-200"
            }
          >
            <Globe
              className={tone === "dark" ? "h-4 w-4 text-field-400" : "h-4 w-4 text-field-600"}
            />
            {market}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
