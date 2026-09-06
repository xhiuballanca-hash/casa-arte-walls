import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-plaster.jpg";
import architectsImg from "@/assets/architects-flatlay.jpg";
import craftImg from "@/assets/about-craft.jpg";
import { products } from "@/lib/products-data";
import { projects, categories } from "@/lib/portfolio-data";
import { ConsultationForm } from "@/lib/consultation-form";
import { SITE, whatsappLink } from "@/lib/site-config";

const TITLE = "Casa D'Arte | Italian Decorative Finishes & Application";
const DESCRIPTION =
  "Italian decorative finishes — Travertino, Marmorino, Venetian plaster, Sahara, Microcement — supplied and professionally applied by Casa D'Arte in North Macedonia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Casa D'Arte",
          description:
            "Premium Italian decorative wall finishes — supplied and professionally applied — for architects, designers, developers, hospitality and residential projects in North Macedonia.",
          foundingDate: "2012",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Skopje",
            addressCountry: "MK",
          },
          areaServed: "North Macedonia",
          knowsAbout: [
            "Travertino",
            "Marmorino",
            "Stucco Veneziano",
            "Venetian plaster",
            "Sahara decorative finish",
            "Microcement",
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const processSteps = [
  {
    n: "01",
    t: "Concept & Consultation",
    d: "We discuss the space, the architecture and the atmosphere you want — in the studio or on site.",
  },
  {
    n: "02",
    t: "Sample & Finish Selection",
    d: "Physical samples in your tones and textures, so decisions are made on the real material.",
  },
  {
    n: "03",
    t: "Quotation & Planning",
    d: "A clear quotation for material and application, with surface preparation and scheduling agreed.",
  },
  {
    n: "04",
    t: "Professional Application",
    d: "Our own trained team prepares the substrate and applies the finish layer by layer.",
  },
  {
    n: "05",
    t: "Finished Project",
    d: "Sealed, inspected and handed over — a surface that belongs to the architecture.",
  },
];

const assurances = [
  {
    n: "I",
    t: "One responsibility",
    d: "Material and application come from the same team. There is no gap between the product specified and the surface delivered.",
  },
  {
    n: "II",
    t: "Decisions made on samples",
    d: "Finish, tone and texture are approved on physical samples prepared for the project — not on renderings or catalogue swatches.",
  },
  {
    n: "III",
    t: "A quotation you can plan around",
    d: "Material, preparation and application are quoted together, so budgets and site schedules can be set with confidence.",
  },
  {
    n: "IV",
    t: "Executed by our own team",
    d: "The finish is applied by the people who know the material — with surface preparation, layering and sealing handled properly.",
  },
];

const faqs = [
  {
    q: "Do you only supply materials, or also apply them?",
    a: "Both. Casa D'Arte supplies premium Italian decorative finishes and applies them with its own trained team. Most projects combine the two, so one party is responsible for the finished surface.",
  },
  {
    q: "Which finishes do you offer?",
    a: "Travertino, Marmorino, Stucco Veneziano (Venetian plaster), Sahara and Microcement — each available in a range of tones, and pigmented to project specification.",
  },
  {
    q: "Can we see samples before deciding?",
    a: "Yes. We prepare sample boxes for architects and designers, and project-specific samples in your chosen tones and textures before any work is quoted or scheduled.",
  },
  {
    q: "How is a quotation prepared?",
    a: "After a consultation and, where needed, a site visit. The quotation reflects the finish selected, the surface area, the condition of the substrate and the preparation required.",
  },
  {
    q: "Do you work with architects, developers and commercial projects?",
    a: "Yes. We support architects and interior designers with specification and samples, and work with developers, investors, hospitality and commercial clients from planning through execution.",
  },
  {
    q: "Where do you work?",
    a: "The studio is based in Skopje and we take on projects across North Macedonia. For projects further afield, contact us to discuss.",
  },
];

function HomePage() {
  const [filter, setFilter] = useState<string>("All");
  const [activeFinish, setActiveFinish] = useState(0);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const current = products[activeFinish] ?? products[0];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-forest">
        <img
          src={heroImg}
          alt="Hand-applied Italian decorative plaster in deep forest green"
          width={1920}
          height={1200}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-forest/45" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-24 md:pb-28 pt-32">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="eyebrow text-gold mb-8 fade-in">Italian Decorative Finishes · Est. 2012</p>
            <h1 className="font-serif text-beige text-[clamp(3rem,8vw,8rem)] leading-[0.98] tracking-[-0.02em] max-w-5xl mb-10 reveal">
              Turn Every Wall <br />
              <em className="italic font-normal">Into Art.</em>
            </h1>
            <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-end reveal">
              <p className="md:col-span-6 lg:col-span-5 text-beige/85 text-base md:text-lg font-light leading-relaxed text-balance">
                Premium Italian decorative finishes — supplied and professionally applied by our
                own team. For architects, designers, developers and discerning private clients
                across North Macedonia.
              </p>
              <div className="md:col-span-6 lg:col-span-7 flex flex-col sm:flex-row md:justify-end gap-3">
                <Link to="/contact" search={{ intent: "project" }} className="btn btn-gold">
                  Discuss Your Project
                </Link>
                <Link to="/portfolio" className="btn btn-outline-light">
                  View Our Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-beige/15">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-5 flex flex-wrap gap-x-10 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-beige/60">
            <span>Premium Italian materials</span>
            <span className="hidden sm:inline">Applied by our own team</span>
            <span className="hidden md:inline">Sample · Quotation · Execution</span>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow text-gold">Material &amp; execution</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] text-balance mb-10">
              We do not sell finishes by the bucket. We deliver{" "}
              <em className="italic">finished surfaces.</em>
            </h2>
            <p className="text-forest/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-14">
              Casa D'Arte supplies premium Italian decorative finishes and applies them with its
              own trained team. From the first sample through quotation and planning to the final
              polish, one studio carries the responsibility — so the surface on the wall is the
              surface that was specified.
            </p>
            <div className="grid sm:grid-cols-2 gap-10 border-t border-forest/15 pt-10">
              <div>
                <p className="eyebrow text-forest/50 mb-5">What we supply</p>
                <ul className="space-y-2 text-forest/85">
                  {products.map((p) => (
                    <li key={p.slug} className="flex items-baseline gap-4">
                      <span className="font-serif text-gold text-sm">{p.index}</span>
                      <span>
                        {p.name}
                        {p.alias ? <span className="text-forest/50"> · {p.alias}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-forest/50 mb-5">What we execute</p>
                <ul className="space-y-2 text-forest/85">
                  {[
                    "Consultation and finish selection",
                    "Project samples and specification",
                    "Quotation and site planning",
                    "Surface preparation and application",
                    "Sealing, inspection and handover",
                  ].map((s, i) => (
                    <li key={s} className="flex items-baseline gap-4">
                      <span className="font-serif text-gold text-sm">0{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link to="/contact" search={{ intent: "quote" }} className="btn btn-forest">
                Request a Quote
              </Link>
              <a href="#process" className="btn btn-outline">
                How we work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINISHES */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold mb-5">The Finishes</p>
              <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] text-balance">
                Five finishes. One standard of execution.
              </h2>
            </div>
            <Link to="/products" className="link-line text-forest self-start md:self-end">
              All finishes <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Active image (desktop) */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                {products.map((p, i) => (
                  <img
                    key={p.slug}
                    src={p.image}
                    alt={`${p.name} decorative finish`}
                    width={1000}
                    height={1250}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                      i === activeFinish ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <p className="font-serif text-2xl text-forest">
                  {current.name}
                  {current.alias ? <span className="text-forest/50 text-lg"> · {current.alias}</span> : null}
                </p>
                <p className="eyebrow text-forest/50">{current.tagline}</p>
              </div>
              {current.imageNote ? (
                <p className="mt-2 text-xs text-forest/50 italic">{current.imageNote}</p>
              ) : null}
            </div>

            {/* List */}
            <div className="lg:col-span-7 border-t border-forest/15">
              {products.map((p, i) => (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  onMouseEnter={() => setActiveFinish(i)}
                  onFocus={() => setActiveFinish(i)}
                  className="group grid grid-cols-[auto_1fr] lg:grid-cols-[3rem_1fr_auto] gap-x-6 gap-y-4 items-center py-7 md:py-9 border-b border-forest/15 transition-colors"
                >
                  <span className="font-serif text-gold text-lg lg:pt-1 self-start">{p.index}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-serif text-3xl md:text-4xl text-forest group-hover:text-gold transition-colors">
                        {p.name}
                      </h3>
                      {p.alias ? (
                        <span className="font-serif text-lg text-forest/50 italic">{p.alias}</span>
                      ) : null}
                    </div>
                    <p className="eyebrow text-forest/45 mt-2">{p.tagline}</p>
                    <p className="text-forest/70 leading-relaxed mt-3 max-w-xl">{p.summary}</p>
                    <div className="lg:hidden mt-5 overflow-hidden aspect-[16/9] bg-beige">
                      <img
                        src={p.image}
                        alt={`${p.name} decorative finish`}
                        width={1000}
                        height={563}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {p.imageNote ? (
                      <p className="lg:hidden mt-2 text-xs text-forest/50 italic">{p.imageNote}</p>
                    ) : null}
                  </div>
                  <span className="hidden lg:inline text-[11px] uppercase tracking-[0.25em] text-forest/40 group-hover:text-gold transition-colors">
                    Explore →
                  </span>
                </Link>
              ))}
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
                <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline">
                  Request a Sample
                </Link>
                <p className="text-sm text-forest/55 leading-relaxed max-w-sm">
                  Every finish can be pigmented and textured to the project. Samples are prepared
                  before anything is quoted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 md:py-40 px-6 md:px-12 bg-beige scroll-mt-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24">
            <div className="md:col-span-4">
              <p className="eyebrow text-gold">How we work</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] text-balance mb-6">
                From concept to finished project.
              </h2>
              <p className="text-forest/70 text-lg leading-relaxed max-w-2xl">
                A clear sequence, so architects, developers and private clients know what happens
                next — and who is responsible for it.
              </p>
            </div>
          </div>

          <ol className="grid md:grid-cols-5 gap-x-8 gap-y-12 border-t border-forest/15">
            {processSteps.map((s) => (
              <li key={s.n} className="pt-8 md:pt-10 grid grid-cols-[3rem_1fr] md:grid-cols-1 gap-x-4">
                <p className="font-serif text-gold text-2xl md:mb-6">{s.n}</p>
                <div>
                  <h3 className="font-serif text-2xl text-forest leading-snug mb-3">{s.t}</h3>
                  <p className="text-sm text-forest/65 leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 md:mt-20 flex flex-col sm:flex-row gap-3">
            <Link to="/contact" search={{ intent: "project" }} className="btn btn-forest">
              Discuss Your Project
            </Link>
            <Link to="/services" className="btn btn-outline">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-28 md:py-40 bg-cream">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <p className="eyebrow text-gold mb-5">Projects</p>
              <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08]">
                Surfaces in place.
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.22em]">
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

          <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[300px]">
            {filtered.map((p, i) => (
              <Link
                key={p.id}
                to="/portfolio"
                className={`group relative overflow-hidden bg-forest/10 ${
                  p.span === "feature"
                    ? "col-span-2 row-span-2"
                    : p.span === "tall"
                    ? "row-span-2"
                    : p.span === "wide"
                    ? "col-span-2"
                    : ""
                } ${i === 0 ? "col-span-2" : ""}`}
              >
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.finish}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-forest/65 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-beige translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500">
                  <p className="eyebrow text-gold mb-1">{p.category}</p>
                  <p className="font-serif text-lg md:text-xl leading-tight">{p.title}</p>
                  <p className="text-xs text-beige/70 mt-1">{p.finish}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <Link to="/portfolio" className="link-line text-forest">
              View all projects <span aria-hidden>→</span>
            </Link>
            <Link to="/contact" search={{ intent: "project" }} className="btn btn-outline self-start">
              Discuss a Similar Project
            </Link>
          </div>
        </div>
      </section>

      {/* PROFESSIONALS */}
      <section className="bg-forest text-beige py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-14 md:gap-8 items-start">
            <div className="md:col-span-7 lg:col-span-6">
              <p className="eyebrow text-gold mb-6">Architects · Designers · Developers</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.08] mb-8 text-balance">
                Specify with confidence. <em className="italic">We take it from there.</em>
              </h2>
              <p className="text-beige/70 text-lg leading-relaxed mb-12 max-w-xl">
                We work alongside architects, interior designers, developers and hospitality
                operators as the party responsible for the decorative surface — from sample box
                and specification to quotation and execution on site. The material and the
                application are handled by one team, which removes a layer of coordination and
                risk from your project.
              </p>
              <ul className="border-t border-beige/15">
                {[
                  ["Sample boxes and custom project samples", "Curated finish cases for the studio, and bespoke samples in your tones and textures."],
                  ["Finish and material specification support", "Guidance on which finish suits the space, substrate and use — with documentation for tender."],
                  ["Technical consultation", "Substrate assessment, preparation requirements and detailing, in the studio or on site."],
                  ["Quotation", "Material and application quoted together, so cost and programme can be planned."],
                  ["Professional execution", "Application by our own trained team, coordinated with your site schedule."],
                  ["Flexible partnership", "From single feature walls to multi-unit developments and rollouts, on terms that suit the collaboration."],
                ].map(([t, d]) => (
                  <li key={t} className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-8 gap-y-1 py-5 border-b border-beige/15">
                    <p className="font-serif text-xl leading-snug">{t}</p>
                    <p className="text-sm text-beige/60 leading-relaxed">{d}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row gap-3">
                <Link to="/architects" className="btn btn-gold">
                  Become a Partner
                </Link>
                <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline-light">
                  Request a Sample Box
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-5 lg:col-start-8">
              <img
                src={architectsImg}
                alt="Finish samples and drawings laid out for specification"
                width={1200}
                height={1200}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
              <p className="mt-4 text-xs text-beige/50 leading-relaxed">
                Sample cases and finish specifications prepared for design studios. Est. 2012, Skopje.
              </p>
            </div>
          </div>

          <div className="mt-24 md:mt-32 grid md:grid-cols-3 gap-10 md:gap-8 border-t border-beige/15 pt-12">
            {[
              {
                t: "Architects & interior designers",
                d: "Samples, specification support and a partner who executes the finish as it was drawn.",
              },
              {
                t: "Developers & investors",
                d: "Predictable quotations, coordinated scheduling and consistent finishes across units, lobbies and common areas.",
              },
              {
                t: "Hospitality & commercial",
                d: "Hotels, restaurants, retail and offices — durable, characterful surfaces delivered around operating constraints.",
              },
            ].map((a) => (
              <div key={a.t}>
                <p className="eyebrow text-gold mb-4">{a.t}</p>
                <p className="text-beige/70 leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CASA D'ARTE */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8 items-start">
          <div className="md:col-span-5">
            <img
              src={craftImg}
              alt="Decorative finish being applied by hand with a steel trowel"
              width={1200}
              height={1500}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-gold mb-6">Why Casa D'Arte</p>
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] mb-12 text-balance">
              From material to <em className="italic">finished surface.</em>
            </h2>
            <div className="border-t border-forest/15">
              {assurances.map((a) => (
                <div key={a.n} className="grid grid-cols-[2.5rem_1fr] gap-x-6 py-7 border-b border-forest/15">
                  <p className="font-serif text-gold text-lg pt-0.5">{a.n}</p>
                  <div>
                    <h3 className="font-serif text-2xl text-forest mb-2">{a.t}</h3>
                    <p className="text-forest/65 leading-relaxed">{a.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/about" className="link-line text-forest">
                About the studio <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow text-gold mb-5">Questions</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-[1.1]">
              Before you ask.
            </h2>
          </div>
          <div className="md:col-span-8 border-t border-forest/15">
            {faqs.map((f, i) => (
              <details key={i} className="group border-b border-forest/15">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-serif text-xl md:text-2xl text-forest">{f.q}</span>
                  <span className="font-serif text-gold text-2xl leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-7 text-forest/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-6">Discuss your project</p>
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] mb-8 text-balance">
              Tell us what you are building.
            </h2>
            <p className="text-forest/70 text-lg leading-relaxed mb-10 max-w-md">
              A residence, a hotel, a restaurant, a development. Share the essentials and we will
              come back with the next step — a conversation, samples or a site visit.
            </p>
            <div className="space-y-3 text-sm">
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="link-line text-forest">
                WhatsApp the studio
              </a>
              <br />
              <a href={SITE.phoneHref} className="link-line text-forest">
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ConsultationForm variant="light" source="home-inquiry" submitLabel="Send inquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
