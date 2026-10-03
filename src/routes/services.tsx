import { createFileRoute, Link } from "@tanstack/react-router";
import craftApplication from "@/assets/application-craft.png.asset.json";
import { useT } from "@/lib/i18n";

const TITLE = "Services — Supply, Application & Consultation | Casa D'Arte";
const DESCRIPTION =
  "Italian decorative finishes supplied and professionally applied: consultation, samples, colour and texture development, quotation and execution for residential, commercial and hospitality projects in North Macedonia.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Decorative finish supply and application",
          provider: { "@type": "Organization", name: "Casa D'Arte" },
          areaServed: "North Macedonia",
          serviceType: [
            "Decorative wall finishes",
            "Professional application",
            "Colour consultation",
            "Custom textures",
            "Commercial projects",
            "Residential projects",
          ],
          url: "/services",
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    t: "Decorative wall finishes",
    d: "Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement and Beton Look: decorative finishes supplied for the project. Each finish is chosen for the space, the substrate and the intended visual character.",
    link: { label: "The finishes", to: "/products" as const },
  },
  {
    n: "02",
    t: "Professional application",
    d: "The finish is applied by our own team: substrate assessment and preparation, priming, layering, polishing and sealing. We coordinate with your architect, contractor and other trades so the surface is delivered as specified.",
  },
  {
    n: "03",
    t: "Colour consultation",
    d: "Tone development in the studio or on site, judged in the light of the actual space against joinery, stone, fabrics and existing architecture. Approved on physical samples before anything is quoted.",
  },
  {
    n: "04",
    t: "Custom textures",
    d: "Bespoke texture and sheen development for signature walls and spaces, from the smoothest polished surface to more tactile, mineral finishes. Samples are refined until the intent is met.",
  },
  {
    n: "05",
    t: "Commercial & hospitality projects",
    d: "Hotels, restaurants, retail, offices and developments. Consistent finishes across many surfaces, quotations you can plan around, and scheduling coordinated with opening dates and operating constraints.",
  },
  {
    n: "06",
    t: "Residential projects",
    d: "Private homes, apartments and villas, approached with discretion. From a single feature wall to complete interiors and facades, guided from the first sample to handover.",
  },
];

function ServicesPage() {
  const t = useT();
  const tr = t;
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10 md:gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-6">{t("Services")}</p>
            <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.02] mb-8 text-balance">
              {t("From sample to")} <em className="italic">{t("sealed wall.")}</em>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="text-forest/70 text-lg leading-relaxed">
              {t("Casa D'Arte does not only supply decorative materials. We take a project from finish selection and samples through quotation to professional application by our own team.")}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] border-t border-forest/15">
          {services.map((s) => (
            <div
              key={s.n}
              className="grid md:grid-cols-12 gap-x-8 gap-y-4 py-10 md:py-14 border-b border-forest/15"
            >
              <p className="md:col-span-1 font-serif text-gold text-2xl">{s.n}</p>
              <h2 className="md:col-span-4 font-serif text-3xl md:text-4xl text-forest leading-[1.1]">
                {t(s.t)}
              </h2>
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-forest/70 text-lg leading-relaxed">{t(s.d)}</p>
                {s.link ? (
                  <Link to={s.link.to} className="link-line text-forest mt-5 inline-block">
                    {t(s.link.label)} <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8 items-center">
          <div className="md:col-span-5">
            <img
              src={craftApplication.url}
              alt={t("Decorative finish applied by hand with a steel trowel")}
              width={941}
              height={1672}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
             <p className="eyebrow text-gold mb-6">{t("From concept to completion")}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-[1.08] mb-10 text-balance">
               {t("Our Process")}
            </h2>
            <ol className="border-t border-forest/15">
              {[
                 ["Concept & Consultation", "Understand the space, design direction and project requirements."],
                 ["Finish Selection", "Choose the finish, texture and color."],
                 ["Quotation & Planning", "Materials and professional application are planned together."],
                 ["Professional Application", "Our team prepares and applies the decorative finish."],
                 ["Final Inspection", "The completed surface is checked before handover."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] gap-x-6 py-5 border-b border-forest/15">
                  <p className="font-serif text-gold text-lg">0{i + 1}</p>
                  <div>
                    <p className="font-serif text-xl text-forest mb-1">{tr(t)}</p>
                    <p className="text-sm text-forest/60 leading-relaxed">{tr(d)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12 bg-forest text-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-5">{t("Next step")}</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance">
              {t("Discuss the project, or start with a")} <em className="italic">{t("sample.")}</em>
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link to="/contact" search={{ intent: "project" }} className="btn btn-gold">
              {t("Discuss Your Project")}
            </Link>
            <Link to="/contact" search={{ intent: "quote" }} className="btn btn-outline-light">
              {t("Request a Quote")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
