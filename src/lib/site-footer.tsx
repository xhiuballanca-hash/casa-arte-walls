import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-beige">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 pt-24 pb-10">
        <div className="grid gap-16 md:grid-cols-12 mb-20">
          <div className="md:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-balance">
              Ready to elevate <br /> your space?
            </h2>
            <p className="text-beige/70 max-w-md mb-8 leading-relaxed">
              Schedule a complimentary consultation with our specialists in Skopje. We visit, we sample, we spec.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-medium border border-gold text-gold rounded-full px-8 py-4 hover:bg-gold hover:text-forest transition-all"
            >
              Request a Consultation
            </Link>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <p className="eyebrow text-gold mb-6">Explore</p>
            <ul className="space-y-3 text-sm text-beige/80">
              <li><Link to="/products" className="hover:text-gold">Collections</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
              <li><Link to="/architects" className="hover:text-gold">Architects</Link></li>
              <li><Link to="/services" className="hover:text-gold">Services</Link></li>
              <li><Link to="/blog" className="hover:text-gold">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-6">Atelier</p>
            <address className="not-italic text-sm text-beige/80 space-y-3 leading-relaxed">
              <p>Casa D'Arte Skopje<br />bul. Partizanski Odredi<br />1000 Skopje, N. Macedonia</p>
              <p>
                <a href="tel:+38970000000" className="hover:text-gold block">+389 70 000 000</a>
                <a href="mailto:atelier@casadarte.mk" className="hover:text-gold block">atelier@casadarte.mk</a>
              </p>
            </address>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Instagram" className="size-9 rounded-full border border-beige/20 grid place-items-center hover:border-gold hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="size-9 rounded-full border border-beige/20 grid place-items-center hover:border-gold hover:text-gold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="size-9 rounded-full border border-beige/20 grid place-items-center hover:border-gold hover:text-gold transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-beige/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-beige/40">
          <p>© {new Date().getFullYear()} Casa D'Arte · North Macedonia</p>
          <p>Italian craftsmanship since 2012</p>
        </div>
      </div>
    </footer>
  );
}
