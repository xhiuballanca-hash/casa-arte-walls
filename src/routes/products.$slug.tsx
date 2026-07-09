import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products-data";
import { ConsultationForm } from "@/lib/consultation-form";
import { Check } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Casa D'Arte" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Italian Decorative Finish · Casa D'Arte` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — Casa D'Arte` },
        { property: "og:description", content: p.description.slice(0, 155) },
        { property: "og:image", content: p.image },
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
      <section className="pt-32 pb-8 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/products"
            className="eyebrow text-forest/60 hover:text-gold transition-colors inline-flex mb-8"
          >
            ← The Collection
          </Link>
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-7">
              <p className="font-serif text-gold text-xl mb-4">— {product.index}</p>
              <h1 className="font-serif text-6xl md:text-8xl text-forest leading-[1] mb-4">
                {product.name}
              </h1>
              <p className="eyebrow text-forest/50">{product.tagline}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-forest/75 text-lg leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <img
            src={product.image}
            alt={`${product.name} texture close-up`}
            width={1600}
            height={900}
            className="w-full aspect-[16/10] object-cover rounded-sm"
          />
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow text-gold mb-5">Features</p>
            <h3 className="font-serif text-3xl md:text-4xl text-forest mb-8">
              Material properties.
            </h3>
            <ul className="space-y-4">
              {product.features.map((f) => (
                <li key={f} className="flex gap-4 items-start text-forest/80">
                  <Check className="h-4 w-4 mt-1 text-gold shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold mb-5">Benefits</p>
            <h3 className="font-serif text-3xl md:text-4xl text-forest mb-8">
              Why architects specify it.
            </h3>
            <ul className="space-y-4">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-4 items-start text-forest/80">
                  <Check className="h-4 w-4 mt-1 text-gold shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow text-gold mb-5">Interior Applications</p>
            <ul className="space-y-3">
              {product.interior.map((i) => (
                <li key={i} className="border-b border-forest/10 pb-3 text-forest/80">{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold mb-5">Exterior Applications</p>
            {product.exterior ? (
              <ul className="space-y-3">
                {product.exterior.map((e) => (
                  <li key={e} className="border-b border-forest/10 pb-3 text-forest/80">{e}</li>
                ))}
              </ul>
            ) : (
              <p className="text-forest/60 italic">
                {product.name} is formulated for interior application only.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-forest text-beige">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold mb-5">Request a Quotation</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Priced to your project.
          </h2>
          <p className="text-beige/70 mb-10 leading-relaxed">
            Every quotation is tailored — surface area, prep condition, chosen finish and pigment.
            Share the essentials and we'll respond within one business day.
          </p>
          <ConsultationForm
            variant="dark"
            source={`product-${product.slug}`}
            defaultProject={product.name}
          />
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow text-gold mb-4">Explore Further</p>
          <h3 className="font-serif text-3xl md:text-4xl text-forest mb-10">Other finishes.</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-beige mb-4">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="font-serif text-xl text-forest">{p.name}</p>
                <p className="eyebrow text-forest/50">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
