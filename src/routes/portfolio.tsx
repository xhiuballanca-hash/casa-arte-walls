import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { projects, categories, type Category } from "@/lib/portfolio-data";
import { X } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Casa D'Arte Projects" },
      {
        name: "description",
        content:
          "Selected residential, hospitality and commercial projects across North Macedonia — living rooms, bedrooms, restaurants, hotels, offices, bathrooms and facades.",
      },
      { property: "og:title", content: "Portfolio — Casa D'Arte" },
      { property: "og:description", content: "Curated residential and hospitality projects." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-gold mb-6">Portfolio</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8">
            Curated spaces.
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl mx-auto leading-relaxed">
            A selection of residences, restaurants, hotels and workplaces across North Macedonia
            where our finishes shape the architecture.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-12 text-[10px] uppercase tracking-[0.22em]">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
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
                className="group mb-4 md:mb-6 block w-full break-inside-avoid overflow-hidden rounded-sm bg-cream text-left"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-beige translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="eyebrow text-gold mb-1">{p.category}</p>
                    <p className="font-serif text-xl leading-tight">{p.title}</p>
                    <p className="text-xs text-beige/70 mt-1">{p.location} · {p.finish}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[70] bg-forest-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-beige hover:text-gold p-2"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].image}
              alt={filtered[lightbox].title}
              className="w-full max-h-[80vh] object-contain rounded-sm"
            />
            <div className="mt-5 text-beige text-center">
              <p className="eyebrow text-gold mb-1">{filtered[lightbox].category}</p>
              <p className="font-serif text-2xl">{filtered[lightbox].title}</p>
              <p className="text-sm text-beige/70 mt-1">
                {filtered[lightbox].location} · {filtered[lightbox].finish}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
