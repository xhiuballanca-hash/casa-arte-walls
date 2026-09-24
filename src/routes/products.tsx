import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products-data";

const TITLE = "Finishes — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement, Beton Look";
const DESCRIPTION =
  "Six premium decorative finishes — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement and Beton Look — supplied and professionally applied by Casa D'Arte.";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Finishes — Casa D'Arte" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Casa D'Arte decorative finishes",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.alias ? `${p.name} (${p.alias})` : p.name,
            url: `/products/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-6">The Finishes</p>
            <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.02] mb-8 text-balance">
              Six finishes. <em className="italic">One standard of execution.</em>
            </h1>
            <p className="text-forest/70 text-lg max-w-2xl leading-relaxed">
              Each finish is an Italian decorative system we supply and apply with our own team —
              pigmented and textured to the project, approved on physical samples, and quoted
              together with the application.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link to="/contact" search={{ intent: "sample" }} className="btn btn-forest">
              Request a Sample
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] border-t border-forest/15 py-6 flex flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-forest/50">
          {products.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="hover:text-gold transition-colors">
              {p.index} {p.name}
            </a>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] space-y-28 md:space-y-40">
          {products.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className={`grid md:grid-cols-12 gap-12 md:gap-8 items-center scroll-mt-28 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2 md:[&>*:first-child]:col-start-7" : ""
              }`}
            >
              <div className="md:col-span-6">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.name} decorative wall finish`}
                    width={1000}
                    height={1250}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full aspect-[4/5] object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/5] items-end bg-beige p-6 text-sm text-forest/50">
                    Approved material photography to follow.
                  </div>
                )}
                {p.imageNote ? (
                  <p className="mt-3 text-xs text-forest/50 italic">{p.imageNote}</p>
                ) : null}
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:col-start-1" : "md:col-start-8"}`}>
                <p className="font-serif text-gold text-xl mb-5">{p.index}</p>
                <h2 className="font-serif text-4xl md:text-6xl text-forest mb-2 leading-[1.05]">
                  {p.name}
                </h2>
                {p.alias ? (
                  <p className="font-serif italic text-forest/50 text-xl mb-3">{p.alias}</p>
                ) : null}
                <p className="eyebrow text-forest/50 mb-8">{p.tagline}</p>
                <p className="text-forest/75 text-lg leading-relaxed mb-8">{p.description}</p>
                <div className="grid sm:grid-cols-2 gap-6 border-t border-forest/15 pt-6 mb-10 text-sm">
                  <div>
                    <p className="eyebrow text-forest/45 mb-3">Interior</p>
                    <p className="text-forest/70 leading-relaxed">{p.interior.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-forest/45 mb-3">Exterior</p>
                    <p className="text-forest/70 leading-relaxed">
                      {p.exterior ? p.exterior.join(" · ") : "Interior use"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="btn btn-outline">
                    Explore {p.name}
                  </Link>
                  <Link
                    to="/contact"
                    search={{ intent: "quote" }}
                    className="link-line text-forest self-center sm:ml-4"
                  >
                    Request a quote <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream border-t border-forest/10">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-5">Not sure which finish?</p>
            <h2 className="font-serif text-3xl md:text-5xl text-forest leading-[1.1] text-balance">
              Tell us about the space and we will prepare samples in tones and textures suited to
              it — before anything is quoted.
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link to="/contact" search={{ intent: "project" }} className="btn btn-forest">
              Discuss Your Project
            </Link>
            <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline">
              Request a Sample
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
