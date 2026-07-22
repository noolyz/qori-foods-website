import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, Instagram, Linkedin, Facebook } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/section";
import { Logo } from "./logo";
import { certifications } from "@/data/certifications";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();

  const columns = [
    { title: tf("explore"), links: footerNav.explore },
    { title: tf("trust"), links: footerNav.trust },
    { title: tf("company"), links: footerNav.company },
  ];

  return (
    <footer className="bg-ink-950 text-bone-200">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-bone-300">{tf("tagline")}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone-200 transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone-200 transition-colors hover:bg-white/20"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone-200 transition-colors hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-bone-400">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-bone-200 transition-colors hover:text-white"
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 text-sm"
          >
            <Phone className="mt-0.5 h-4 w-4 text-field-400" />
            <span>
              <span className="block text-bone-400">WhatsApp</span>
              <span className="text-bone-100 group-hover:text-white">{contact.phoneDisplay}</span>
            </span>
          </a>
          <a href={`mailto:${contact.emailCommercial}`} className="group flex items-start gap-3 text-sm">
            <Mail className="mt-0.5 h-4 w-4 text-field-400" />
            <span>
              <span className="block text-bone-400">{tf("contactTitle")}</span>
              <span className="text-bone-100 group-hover:text-white">{contact.emailCommercial}</span>
            </span>
          </a>
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 text-field-400" />
            <span className="text-bone-200">
              {contact.address.street}, {contact.address.city}, {contact.address.region},{" "}
              {contact.address.country}
            </span>
          </div>
        </div>

        {/* Certification strip */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bone-400">
            {tf("certifiedTitle")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone-300">
            {certifications.map((c) => (
              <li key={c.id} className="font-medium">
                {c.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-bone-400 sm:flex-row sm:items-center">
          <p>
            &copy; {year} {siteConfig.legalName}. {tf("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              {tf("privacy")}
            </Link>
            <span aria-hidden>•</span>
            <span>{tf("builtNote")}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
