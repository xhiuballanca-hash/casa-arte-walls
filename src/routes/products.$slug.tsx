import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products-data";
import { ConsultationForm } from "@/lib/consultation-form";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Finish not found — Casa D'Arte" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const displayName = p.alias ? `${p.name} (${p.alias})` : p.name;
    const title = `${displayName} — Supplied & Applied by Casa D'Arte`;
    const description = `${p.summary} Supplied and professionally applied by Casa D'Arte in North Macedonia.`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: displayName,
            description: p.summary,
            brand: { "@type": "Brand", name: "Casa D'Arte" },
            category: "Decorative wall finish",
            url: `/products/${params.slug}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Finishes", item: "/products" },
              { "@type": "ListItem", position: 2, name: p.name, item: `/products/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      {/* TITLE */}
      <section className="pt-36 pb-10 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <Link to="/products" className="eyebrow text-forest/60 hover:text-gold transition-colors inline-flex mb-10">
            ← All finishes
          </Link>
          <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-end">
            <div className="md:col-span-7">
              <p className="font-serif text-gold text-xl mb-5">{product.index}</p>
              <h1 className="font-serif text-6xl md:text-8xl text-forest leading-[0.98] tracking-[-0.02em] mb-4">
                {product.name}
              </h1>
              {product.alias ? (
                <p className="font-serif italic text-forest/50 text-2xl mb-3">{product.alias}</p>
              ) : null}
              <p className="eyebrow text-forest/50">{product.tagline}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-forest/75 text-lg leading-relaxed mb-8">{product.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" search={{ intent: "quote" }} className="btn btn-forest">
                  Request a Quote
                </Link>
                <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline">
                  Request a Sample
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          {product.image ? (
            <img
              src={product.image}
              alt={`${product.name} decorative finish surface`}
              width={1600}
              height={1000}
              fetchPriority="high"
              className="w-full aspect-[16/10] object-cover"
            />
          ) : (
            <div className="flex aspect-[16/10] items-end bg-cream p-8 text-sm text-forest/50">
              Approved material photography to follow.
            </div>
          )}
          {product.imageNote ? (
            <p className="mt-3 text-xs text-forest/50 italic">{product.imageNote}</p>
          ) : null}
        </div>
      </section>

      {/* SUPPLIED & APPLIED */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10 md:gap-8 border-t border-forest/15 pt-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-gold">Supplied &amp; applied</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-3xl md:text-5xl text-forest leading-[1.1] text-balance mb-6">
              {product.name} is supplied by Casa D'Arte and applied by our own team.
            </h2>
            <p className="text-forest/70 text-lg leading-relaxed max-w-2xl">
              Tone, texture and sheen are approved on physical samples prepared for the project.
              The quotation covers material, surface preparation and application together, and the
              finish is executed by the people who know the system.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES / BENEFITS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow text-gold mb-5">Material</p>
            <h3 className="font-serif text-3xl md:text-4xl text-forest mb-8">Characteristics.</h3>
            <ul className="border-t border-forest/15">
              {product.features.map((f: string) => (
                <li key={f} className="py-4 border-b border-forest/15 text-forest/80 leading-relaxed">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold mb-5">In use</p>
            <h3 className="font-serif text-3xl md:text-4xl text-forest mb-8">Why it is specified.</h3>
            <ul className="border-t border-forest/15">
              {product.benefits.map((b: string) => (
                <li key={b} className="py-4 border-b border-forest/15 text-forest/80 leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow text-gold mb-5">Applications</p>
            <h3 className="font-serif text-3xl md:text-4xl text-forest leading-snug">
              Where {product.name} belongs.
            </h3>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow text-forest/45 mb-4">Interior</p>
              <ul className="border-t border-forest/15">
                {product.interior.map((i: string) => (
                  <li key={i} className="py-3 border-b border-forest/15 text-forest/80">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-forest/45 mb-4">Exterior</p>
              {product.exterior ? (
                <ul className="border-t border-forest/15">
                  {product.exterior.map((e: string) => (
                    <li key={e} className="py-3 border-b border-forest/15 text-forest/80">
                      {e}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-forest/60 leading-relaxed border-t border-forest/15 pt-3">
                  {product.name} is specified for interior surfaces. For facades and exterior
                  walls, see Travertino or ask us about a suitable system.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-forest text-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-5">Request a quote</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-8 text-balance">
              {product.name}, priced for your project.
            </h2>
            <p className="text-beige/70 leading-relaxed text-lg max-w-md">
              Share the surface area, the location and the condition of the walls where you know
              it. We will come back with the next step — samples, a site visit or a quotation for
              material and application.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ConsultationForm
              variant="dark"
              source={`product-${product.slug}`}
              defaultProject={`${product.name} — quotation`}
              submitLabel="Request a quote"
            />
          </div>
        </div>
      </section>

      {/* OTHERS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-gold mb-4">Other finishes</p>
              <h3 className="font-serif text-3xl md:text-4xl text-forest">Continue exploring.</h3>
            </div>
            <Link to="/products" className="link-line text-forest hidden sm:inline">
              All finishes <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {others.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-beige mb-4">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.name} decorative finish`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-end p-4 text-xs text-forest/50">
                      Photography to follow.
                    </div>
                  )}
                </div>
                <p className="font-serif text-xl text-forest group-hover:text-gold transition-colors">
                  {p.name}
                </p>
                <p className="eyebrow text-forest/50 mt-1">{p.alias ?? p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
