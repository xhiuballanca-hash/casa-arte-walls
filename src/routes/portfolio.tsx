import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { projects, categories, type Category } from "@/lib/portfolio-data";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const TITLE = "Projects — Casa D'Arte Decorative Finishes in Place";
const DESCRIPTION =
  "Selected residential, hospitality and commercial projects in North Macedonia — Italian decorative finishes supplied and applied by Casa D'Arte's own team.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: "/portfolio",
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, step]);

  const active = lightbox !== null ? filtered[lightbox] : null;

  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-6">Projects</p>
            <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.02] mb-8 text-balance">
              Surfaces in place.
            </h1>
            <p className="text-forest/70 text-lg max-w-2xl leading-relaxed">
              Residences, restaurants, hotels and workplaces where the finish was selected,
              sampled, quoted and applied by Casa D'Arte. Each surface shown was executed by our
              own team.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link to="/contact" search={{ intent: "project" }} className="btn btn-outline">
              Discuss a Similar Project
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-28 md:pb-36 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap gap-x-7 gap-y-3 mb-12 text-[10px] uppercase tracking-[0.22em] border-y border-forest/15 py-5">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  setFilter(c);
                  setLightbox(null);
                }}
                className={`pb-1 border-b transition-colors ${
                  filter === c
                    ? "text-gold border-gold"
                    : "text-forest/50 border-transparent hover:text-forest"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setLightbox(i)}
                className="group mb-4 md:mb-6 block w-full break-inside-avoid overflow-hidden bg-cream text-left"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.finish}`}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-forest/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-beige translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500">
                    <p className="eyebrow text-gold mb-1">{p.category}</p>
                    <p className="font-serif text-xl leading-tight">{p.title}</p>
                    <p className="text-xs text-beige/70 mt-1">{p.finish}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-3 pb-1">
                  <p className="font-serif text-forest text-lg leading-tight">{p.title}</p>
                  <p className="eyebrow text-forest/45">{p.finish}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-20 border-t border-forest/15 pt-12 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-4xl text-forest leading-snug text-balance">
                Planning a residence, a hotel or a development? We can prepare samples in your
                tones and a quotation for material and application together.
              </h2>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link to="/contact" search={{ intent: "quote" }} className="btn btn-forest">
                Request a Quote
              </Link>
              <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline">
                Request a Sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[70] bg-forest-deep/95 flex items-center justify-center p-4 md:p-10 fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-beige hover:text-gold p-2"
          >
            <X className="h-6 w-6" />
          </button>
          {filtered.length > 1 && (
            <>
              <button
                aria-label="Previous project"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-beige/70 hover:text-gold p-2"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                aria-label="Next project"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-beige/70 hover:text-gold p-2"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.image}
              alt={`${active.title} — ${active.finish}`}
              className="w-full max-h-[78vh] object-contain"
            />
            <div className="mt-6 text-beige flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-t border-beige/15 pt-5">
              <div>
                <p className="eyebrow text-gold mb-1">{active.category}</p>
                <p className="font-serif text-2xl">{active.title}</p>
              </div>
              <p className="text-sm text-beige/70">{active.finish}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
