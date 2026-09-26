import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Finishes" },
  { to: "/portfolio", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/** Routes whose first screen is dark, so the transparent nav needs light text. */
const DARK_HERO_ROUTES = new Set(["/architects"]);

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDark = DARK_HERO_ROUTES.has(pathname) && !scrolled && !open;
  const ink = onDark ? "text-beige" : "text-forest";
  const inkSoft = onDark ? "text-beige/80" : "text-forest/75";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled || open
          ? "bg-beige/95 backdrop-blur-sm border-b border-forest/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          className={`font-serif text-xl md:text-2xl tracking-tight font-semibold transition-colors ${ink}`}
        >
          CASA D'ARTE
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors hover:text-gold ${inkSoft}`}
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 transition-colors ${ink}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-beige border-t border-forest/10 mt-4 px-6 pt-6 pb-8 fade-in">
          <div className="flex flex-col divide-y divide-forest/10">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-4 text-sm uppercase tracking-[0.2em] text-forest/85 hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
