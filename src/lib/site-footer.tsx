import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="bg-forest-deep text-beige">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 pt-16 md:pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12 pb-16">
          <div className="md:col-span-5">
            <Link to="/" className="font-serif text-3xl md:text-4xl hover:text-gold transition-colors">
              Casa D'Arte
            </Link>
            <p className="mt-4 text-sm text-beige/60">{t("Italian decorative finishes · Supplied & Applied")}</p>
            <p className="mt-2 text-sm text-beige/60">{t("Macedonia · Balkans")}</p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow text-gold mb-5">{t("Contact")}</p>
            <div className="flex flex-col items-start gap-3 text-sm text-beige/80">
              <a href={SITE.phoneHref} className="hover:text-gold transition-colors">{t("Phone")}: {SITE.phoneDisplay}</a>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">{t("Email")}: {SITE.email}</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-5">{t("Social")}</p>
            <div className="flex flex-col items-start gap-3 text-sm text-beige/80">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" aria-hidden="true" /> {SITE.social.instagramHandle}
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Facebook className="h-4 w-4" aria-hidden="true" /> CasaDarteMacedonia
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-beige/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-beige/45">
          <p>© {new Date().getFullYear()} Casa D'Arte</p>
        </div>
      </div>
    </footer>
  );
}