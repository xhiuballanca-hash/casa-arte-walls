import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { products } from "@/lib/products-data";
import { SITE, whatsappLink } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-beige">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 pt-24 md:pt-32 pb-10">
        <div className="grid gap-16 md:grid-cols-12 mb-24">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-6">Start a project</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6 text-balance">
              From sample to <em className="italic">finished surface.</em>
            </h2>
            <p className="text-beige/70 max-w-md mb-10 leading-relaxed">
              Premium Italian decorative finishes, supplied and applied by our own team. Share
              your project and we will arrange samples, a quotation and a plan for execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" search={{ intent: "project" }} className="btn btn-gold">
                Discuss Your Project
              </Link>
              <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline-light">
                Request a Sample
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <p className="eyebrow text-gold mb-6">Finishes</p>
            <ul className="space-y-3 text-sm text-beige/80">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-gold transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-gold mb-6">Studio</p>
            <ul className="space-y-3 text-sm text-beige/80">
              <li><Link to="/portfolio" className="hover:text-gold transition-colors">Projects</Link></li>
              <li><Link to="/architects" className="hover:text-gold transition-colors">Architects &amp; Designers</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-6">Contact</p>
            <address className="not-italic text-sm text-beige/80 space-y-3 leading-relaxed">
              <p>Casa D'Arte<br />Skopje, North Macedonia</p>
              <p>
                <a href={SITE.phoneHref} className="hover:text-gold block transition-colors">{SITE.phoneDisplay}</a>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold block transition-colors">{SITE.email}</a>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-gold block transition-colors">WhatsApp</a>
              </p>
            </address>
            <div className="mt-6 flex gap-5 text-beige/70">
              <a href={SITE.social.instagram} aria-label="Instagram" className="hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SITE.social.facebook} aria-label="Facebook" className="hover:text-gold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={SITE.social.linkedin} aria-label="LinkedIn" className="hover:text-gold transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-beige/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-beige/40">
          <p>© {new Date().getFullYear()} Casa D'Arte · Skopje, North Macedonia</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Italian decorative finishes · Est. 2012</span>
            <Link to="/auth" className="hover:text-gold transition-colors">
              Studio login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
