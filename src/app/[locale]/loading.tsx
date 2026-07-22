import { Container } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

/** Lightweight route transition placeholder. */
export default function Loading() {
  return (
    <div className="pt-24">
      <div className="bg-field-900 py-16">
        <Container>
          <Skeleton className="h-4 w-40 bg-white/10" />
          <Skeleton className="mt-6 h-12 w-2/3 bg-white/10" />
          <Skeleton className="mt-4 h-5 w-1/2 bg-white/10" />
        </Container>
      </div>
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
