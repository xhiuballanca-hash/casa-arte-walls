import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Collections — Casa D'Arte Italian Decorative Finishes" },
      {
        name: "description",
        content:
          "The Casa D'Arte collection: Travertino, Marmorino, Stucco Veneziano and Sahara — four signature Italian decorative wall finishes.",
      },
      { property: "og:title", content: "Collections — Casa D'Arte" },
      {
        property: "og:description",
        content: "Four signature Italian decorative wall finishes for luxury interiors.",
      },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-gold mb-6">The Collection</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8 text-balance">
            Four finishes. <em className="italic">One tradition.</em>
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Each finish in the Casa D'Arte collection is drawn from a centuries-old Italian
            technique and executed by trained artisans.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] space-y-24 md:space-y-32">
          {products.map((p, i) => (
            <div
              key={p.slug}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <img
                src={p.image}
                alt={`${p.name} decorative wall finish`}
                width={1000}
                height={1250}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              <div>
                <p className="font-serif text-gold text-xl mb-4">— {p.index}</p>
                <h2 className="font-serif text-4xl md:text-6xl text-forest mb-3 leading-tight">
                  {p.name}
                </h2>
                <p className="eyebrow text-forest/50 mb-8">{p.tagline}</p>
                <p className="text-forest/75 text-lg leading-relaxed mb-8">{p.description}</p>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] border border-forest text-forest rounded-full px-8 py-3.5 hover:bg-forest hover:text-beige transition-all"
                >
                  Discover {p.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
