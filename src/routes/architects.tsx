import { createFileRoute, Link } from "@tanstack/react-router";
import { ConsultationForm } from "@/lib/consultation-form";
import architectsImg from "@/assets/architects-flatlay.jpg";
import craftImg from "@/assets/about-craft.jpg";
import { products } from "@/lib/products-data";
import { useI18n, localizeProduct, localizePost } from "@/lib/i18n";

const TITLE = "Architects & Designers — Casa D'Arte Partnership";
const DESCRIPTION =
  "Sample boxes, custom samples, finish specification support, technical consultation, quotation and professional application. Casa D'Arte works with architects, designers, developers and hospitality projects in North Macedonia.";

export const Route = createFileRoute("/architects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/architects" },
    ],
    links: [{ rel: "canonical", href: "/architects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Architect & Designer Partnership",
          provider: { "@type": "Organization", name: "Casa D'Arte" },
          areaServed: "North Macedonia",
          description: DESCRIPTION,
          url: "/architects",
        }),
      },
    ],
  }),
  component: ArchitectsPage,
});

const support = [
  {
    n: "01",
    t: "Sample boxes",
    d: "A curated case of our finishes for the studio, so material conversations start with the real surface rather than a swatch on screen.",
  },
  {
    n: "02",
    t: "Custom samples and textures",
    d: "Project-specific samples in your tones, textures and sheen, refined until the finish matches the intent before anything is quoted.",
  },
  {
    n: "03",
    t: "Finish and material specification",
    d: "Guidance on which finish suits the space, substrate and use, with the information you need for drawings, schedules and tender.",
  },
  {
    n: "04",
    t: "Technical consultation",
    d: "Substrate assessment, preparation requirements, junctions and detailing, reviewed in the studio or on site with your team.",
  },
  {
    n: "05",
    t: "Quotation",
    d: "Material and application quoted together, itemised by surface, so your client can approve the finish and the budget in one step.",
  },
  {
    n: "06",
    t: "Professional execution",
    d: "The finish is applied by our own team, coordinated with your programme and other trades, and handed over as specified.",
  },
  {
    n: "07",
    t: "Flexible partnership",
    d: "From a single feature wall to a multi-unit development or hospitality rollout, our way of working fits the project and the practice.",
  },
];

const audiences = [
  {
    t: "Architects & interior designers",
    d: "One partner for the decorative surface: samples, specification, quotation and execution, so the finish on site is the finish you drew.",
    cta: { label: "Request a Sample Box", intent: "sample" as const },
  },
  {
    t: "Developers & investors",
    d: "Consistent finishes across units, lobbies and common areas, with quotations you can plan around and scheduling coordinated with your contractor.",
    cta: { label: "Request a Quote", intent: "quote" as const },
  },
  {
    t: "Hospitality & commercial",
    d: "Hotels, restaurants, retail and offices: durable, characterful surfaces delivered around opening dates and operating constraints.",
    cta: { label: "Discuss Your Project", intent: "project" as const },
  },
];

function ArchitectsPage() {
  const { t, lang } = useI18n();
  const tr = t;
  const list = products.map((p) => localizeProduct(p, lang));
  return (
    <>
      {/* HERO */}
      <section className="relative bg-forest text-beige pt-40 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 md:gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-6">{t("Architects · Designers · Developers")}</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] mb-8 text-balance">
              {t("Specify with confidence.")} <em className="italic">{t("We take it from there.")}</em>
            </h1>
            <p className="text-beige/75 text-lg md:text-xl max-w-3xl leading-relaxed">
              {t("Casa D'Arte works alongside architects, interior designers, developers and hospitality operators as the party responsible for the decorative surface, from sample box and specification to quotation and execution on site. Material and application are handled by one team.")}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <a href="#partner" className="btn btn-gold">
              {t("Become a Partner")}
            </a>
            <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline-light">
              {t("Request a Sample Box")}
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE PROVIDE */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8 items-start">
          <div className="md:col-span-5 md:sticky md:top-32">
            <img
              src={architectsImg}
              alt={t("Finish samples and drawings laid out for specification")}
              width={1200}
              height={1200}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
            <p className="mt-4 text-xs text-forest/50 leading-relaxed">
              {t("Sample cases and project samples are prepared for each collaboration.")}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-gold mb-5">{t("What we provide")}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-[1.08] mb-12 text-balance">
              {t("Support from the first sample to the last coat.")}
            </h2>
            <div className="border-t border-forest/15">
              {support.map((p) => (
                <div key={p.n} className="grid grid-cols-[3rem_1fr] gap-x-6 py-7 border-b border-forest/15">
                  <p className="font-serif text-gold text-lg pt-0.5">{p.n}</p>
                  <div>
                    <h3 className="font-serif text-2xl text-forest mb-2">{t(p.t)}</h3>
                    <p className="text-forest/65 leading-relaxed">{t(p.d)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINISHES STRIP */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream border-y border-forest/10">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10 md:gap-8 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow text-gold mb-5">{t("The finishes")}</p>
            <p className="text-forest/70 leading-relaxed max-w-sm">
              {t("Five Italian systems, each pigmented and textured to project specification. Full details, applications and galleries on each finish page.")}
            </p>
          </div>
          <ul className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {list.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block border-t border-forest/20 pt-4"
                >
                  <p className="font-serif text-gold text-sm mb-2">{p.index}</p>
                  <p className="font-serif text-2xl text-forest group-hover:text-gold transition-colors">
                    {p.name}
                  </p>
                  <p className="eyebrow text-forest/45 mt-1">{p.alias ?? p.tagline}</p>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products" className="group block border-t border-forest/20 pt-4">
                <p className="font-serif text-gold text-sm mb-2">—</p>
                <p className="font-serif text-2xl text-forest group-hover:text-gold transition-colors">
                  {t("All finishes →")}
                </p>
                <p className="eyebrow text-forest/45 mt-1">{t("Overview")}</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-20">
            <div className="md:col-span-4">
              <p className="eyebrow text-gold">{t("Who we work with")}</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-4xl md:text-5xl text-forest leading-[1.08] text-balance">
                {t("One responsibility, whatever the scale of the project.")}
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 border-t border-forest/15">
            {audiences.map((a) => (
              <div key={a.t} className="pt-8 flex flex-col">
                <h3 className="font-serif text-2xl text-forest mb-4">{t(a.t)}</h3>
                <p className="text-forest/65 leading-relaxed mb-8 flex-1">{t(a.d)}</p>
                <Link to="/contact" search={{ intent: a.cta.intent }} className="link-line text-forest self-start">
                  {t(a.cta.label)} <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW A COLLABORATION RUNS */}
      <section className="bg-forest text-beige py-24 md:py-36 px-6 md:px-12">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8 items-center">
          <div className="md:col-span-6">
            <p className="eyebrow text-gold mb-6">{t("How a collaboration runs")}</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.08] mb-10 text-balance">
              {t("Clear steps, so your client always knows what happens next.")}
            </h2>
            <ol className="border-t border-beige/15">
              {[
                ["Concept & consultation", "We review the space and intent with you in the studio or on site."],
                ["Sample & finish selection", "Project samples in your tones and textures, approved on the real material."],
                ["Quotation & planning", "Material and application quoted together; preparation and programme agreed."],
                ["Professional application", "Our own team prepares the substrate and applies the finish."],
                ["Finished project", "Sealed, inspected and handed over as specified."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] gap-x-6 py-5 border-b border-beige/15">
                  <p className="font-serif text-gold text-lg">0{i + 1}</p>
                  <div>
                    <p className="font-serif text-xl mb-1">{tr(t)}</p>
                    <p className="text-sm text-beige/60 leading-relaxed">{tr(d)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <img
              src={craftImg}
              alt={t("Decorative finish applied by hand with a steel trowel")}
              width={1200}
              height={1500}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PARTNER FORM */}
      <section id="partner" className="py-24 md:py-36 px-6 md:px-12 bg-cream scroll-mt-24">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-5">{t("Become a Partner")}</p>
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.05] mb-8 text-balance">
              {t("Introduce your studio or company.")}
            </h2>
            <p className="text-forest/65 leading-relaxed text-lg max-w-md">
              {t("Tell us about your practice or portfolio and the projects you have in view. We will come back to arrange a conversation and, where useful, a sample box.")}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ConsultationForm
              variant="light"
              source="architects"
              defaultProject="Partnership inquiry"
              defaultClientType="Architect / Interior designer"
              submitLabel="Start the conversation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
