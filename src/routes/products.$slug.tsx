import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products-data";
import { useI18n, localizeProduct, localizePost } from "@/lib/i18n";

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
        { name: "twitter:card", content: "summary_large_image" },
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
  const { t, lang } = useI18n();
  const product = localizeProduct(Route.useLoaderData().product, lang);
  const others = products.filter((p) => p.slug !== product.slug).map((p) => localizeProduct(p, lang));

  return (
    <>
      {/* TITLE */}
      <section className="pt-36 pb-10 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <Link to="/products" className="eyebrow text-forest/60 hover:text-gold transition-colors inline-flex mb-10">
            {t("← All finishes")}
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
               <p className="text-forest/75 text-lg leading-relaxed mb-8">{product.summary}</p>
               <Link to="/contact" search={{ intent: "project" }} className="btn btn-forest">
                 {t("Discuss Your Project")}
               </Link>
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
              alt={t("{name} decorative finish surface", { name: product.name })}
              width={1600}
              height={1000}
              fetchPriority="high"
              className="w-full aspect-[16/10] object-cover"
            />
          ) : (
            <div className="flex aspect-[16/10] items-end bg-cream p-8 text-sm text-forest/50">
              {t("Approved material photography to follow.")}
            </div>
          )}
          {product.imageNote ? (
            <p className="mt-3 text-xs text-forest/50 italic">{product.imageNote}</p>
          ) : null}
        </div>
      </section>

       <section className="pb-20 md:pb-28 px-6 md:px-12 bg-beige">
         <div className="mx-auto max-w-[1400px] border-t border-forest/15 pt-10 md:pt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
           <p className="font-serif text-2xl md:text-3xl text-forest max-w-2xl">
             {t("{name} is supplied by Casa D'Arte and professionally applied by our own team.", { name: product.name })}
           </p>
           <Link to="/contact" search={{ intent: "project" }} className="link-line text-forest self-start md:self-center shrink-0">
             {t("Discuss Your Project")} <span aria-hidden>→</span>
           </Link>
         </div>
       </section>

      {/* OTHERS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-gold mb-4">{t("Other finishes")}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-forest">{t("Continue exploring.")}</h3>
            </div>
            <Link to="/products" className="link-line text-forest hidden sm:inline">
              {t("All finishes")} <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {others.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-beige mb-4">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={t("{name} decorative finish", { name: p.name })}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-end p-4 text-xs text-forest/50">
                      {t("Photography to follow.")}
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
