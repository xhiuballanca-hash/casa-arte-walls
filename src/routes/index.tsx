import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-plaster.jpg";
import architectsImg from "@/assets/architects-flatlay.jpg";
import { products } from "@/lib/products-data";
import { projects, categories } from "@/lib/portfolio-data";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa D'Arte — Turn Every Wall Into Art" },
      {
        name: "description",
        content:
          "Premium Italian decorative wall finishes — Travertino, Marmorino, Stucco Veneziano, Sahara — for homes, hotels, restaurants, offices and luxury spaces in North Macedonia.",
      },
      { property: "og:title", content: "Casa D'Arte — Turn Every Wall Into Art" },
      {
        property: "og:description",
        content:
          "Premium Italian decorative finishes for the most refined interiors and facades in North Macedonia.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const testimonials = [
    {
      quote:
        "Casa D'Arte transformed our restaurant from a dining room into a sensory journey. The Stucco walls possess a soul that paint simply cannot replicate.",
      name: "Elena Kostova",
      role: "Lead Designer, Metropolitan Group",
    },
    {
      quote:
        "The Marmorino they applied in our villa in Vodno has aged beautifully after four years. Their attention to craft is Italian in the truest sense.",
      name: "Marko Petrov",
      role: "Private Client, Skopje",
    },
    {
      quote:
        "We spec Casa D'Arte on every hospitality project. Their sample kits and technical support are unmatched in the region.",
      name: "Ana Dimitrova",
      role: "Architect, Studio ND",
    },
  ];

  const faqs = [
    {
      q: "How long does a typical application take?",
      a: "A single feature wall is usually completed in 2–3 days including layering and polishing. Full-room projects range from 5 to 10 days depending on the finish selected.",
    },
    {
      q: "Are the finishes suitable for bathrooms and wet areas?",
      a: "Yes. Marmorino and Stucco Veneziano are naturally lime-based and highly moisture-tolerant. We apply a mineral sealer for bathrooms and spa environments.",
    },
    {
      q: "Do you provide samples?",
      a: "We offer complimentary sample boxes for architects and designers, and priced sample panels for private clients. Request one via the consultation form.",
    },
    {
      q: "Do you work outside Skopje?",
      a: "Yes — we execute projects across North Macedonia and neighboring countries. Travel and lodging for larger applications are included in our quotation.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-forest">
        <img
          src={heroImg}
          alt="Hand-applied Italian Venetian plaster in deep forest green"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-forest/30 to-forest/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow text-gold mb-6 fade-in">Italian Craftsmanship · Est. 2012</p>
          <h1 className="font-serif text-beige text-[clamp(2.75rem,7vw,7rem)] leading-[1.05] max-w-5xl mb-8 reveal">
            Turn Every Wall <br />
            <em className="not-italic italic-serif" style={{ fontStyle: "italic" }}>Into Art.</em>
          </h1>
          <p className="text-beige/80 max-w-2xl text-base md:text-lg font-light leading-relaxed mb-10 reveal">
            Premium Italian decorative finishes for homes, hotels, restaurants, offices and luxury
            spaces across North Macedonia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gold text-forest px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-beige transition-all"
            >
              Request a Free Consultation
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-beige/40 text-beige backdrop-blur-sm bg-beige/5 px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-beige/15 transition-all"
            >
              View Our Projects
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-beige/60 text-[10px] uppercase tracking-[0.3em] fade-in">
          Scroll
        </div>
      </section>

      {/* PRODUCT SPOTLIGHT */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold mb-5">The Collection</p>
              <h2 className="font-serif text-4xl md:text-6xl text-forest leading-tight text-balance mb-6">
                Refined textures, refined depth.
              </h2>
              <p className="text-forest/60 text-lg leading-relaxed max-w-xl">
                Four signature finishes, each drawn from centuries of Italian tradition — from the
                mirror polish of Venetian palazzos to the raw tectonics of Roman travertine.
              </p>
            </div>
            <Link
              to="/products"
              className="self-start md:self-end text-[11px] uppercase tracking-[0.25em] border-b border-forest text-forest pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              Explore the collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream mb-6 rounded-sm">
                  <img
                    src={p.image}
                    alt={`${p.name} decorative wall finish`}
                    width={1000}
                    height={1250}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 eyebrow text-beige bg-forest/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                    {p.index}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-forest mb-1">{p.name}</h3>
                <p className="eyebrow text-forest/50 mb-3">{p.tagline}</p>
                <p className="text-sm text-forest/70 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] font-medium border-b border-gold pb-0.5">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECT PROGRAM */}
      <section className="relative bg-forest text-beige py-28 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <p className="eyebrow text-gold mb-6">Partnership</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8 text-balance">
              Designed for <em className="not-italic italic">visionaries.</em>
            </h2>
            <p className="text-beige/70 text-lg leading-relaxed mb-10 max-w-lg">
              We partner with architects and interior designers to develop custom textures,
              pigments and technical solutions for ambitious projects.
            </p>
            <ul className="space-y-4 mb-12">
              {[
                "Bespoke texture and pigment development",
                "Complimentary sample boxes and swatch cases",
                "On-site technical consultation",
                "Exclusive partnership terms",
              ].map((f) => (
                <li key={f} className="flex items-center gap-4 text-sm font-light">
                  <span className="h-px w-8 bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/architects"
              className="inline-flex items-center gap-3 border border-gold text-gold rounded-full px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-gold hover:text-forest transition-all"
            >
              Become a Partner →
            </Link>
          </div>
          <div className="relative">
            <img
              src={architectsImg}
              alt="Architect flatlay with plaster samples"
              width={1200}
              height={1200}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-sm"
            />
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-gold p-8 rounded-sm">
              <p className="font-serif text-4xl text-forest">300+</p>
              <p className="eyebrow text-forest/70 mt-1">Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-28 md:py-40 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="eyebrow text-gold mb-5">Curated Spaces</p>
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-tight mb-8">
              Portfolio
            </h2>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.22em]">
              {["All", ...categories].map((c) => (
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
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[280px]">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className={`group relative overflow-hidden bg-forest/10 rounded-sm ${
                  p.span === "wide"
                    ? "col-span-2 row-span-2"
                    : p.span === "tall"
                    ? "row-span-2"
                    : ""
                } ${i === 0 ? "col-span-2" : ""}`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-beige translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="eyebrow text-gold mb-1">{p.category}</p>
                  <p className="font-serif text-lg leading-tight">{p.title}</p>
                  <p className="text-xs text-beige/70 mt-1">{p.finish}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/portfolio"
              className="inline-flex text-[11px] uppercase tracking-[0.25em] border-b border-forest text-forest pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              View full portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 md:py-40 bg-beige">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow text-gold mb-6">The Experience</p>
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-14">
            Testimonials from designers, hoteliers and homeowners.
          </h2>
          <div className="grid gap-14">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="max-w-3xl mx-auto">
                <p className="font-serif text-2xl md:text-3xl text-forest leading-snug text-balance mb-6">
                  "{t.quote}"
                </p>
                <div className="flex flex-col items-center gap-1">
                  <span className="h-px w-10 bg-gold mb-3" />
                  <p className="eyebrow text-forest">{t.name}</p>
                  <p className="text-xs text-forest/50">{t.role}</p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-32 bg-cream">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <p className="eyebrow text-gold mb-5">Frequently Asked</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest">
              Answers, before you ask.
            </h2>
          </div>
          <div className="divide-y divide-forest/10">
            {faqs.map((f, i) => (
              <details key={i} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <span className="font-serif text-lg md:text-xl text-forest">{f.q}</span>
                  <span className="eyebrow text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-forest/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
