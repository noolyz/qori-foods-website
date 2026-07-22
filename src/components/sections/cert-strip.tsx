import { certifications } from "@/data/certifications";

/** Horizontal, dependency-free logo/name strip used as a home trust bar. */
export function CertStrip() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
      {certifications.map((c) => (
        <li
          key={c.id}
          className="font-serif text-lg font-medium text-ink-400 transition-colors hover:text-field-700"
        >
          {c.name}
        </li>
      ))}
    </ul>
  );
}
