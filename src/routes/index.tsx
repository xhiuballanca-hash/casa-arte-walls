import { createFileRoute, Link } from "@tanstack/react-router";
import heroInterior from "@/assets/hero-interior.jpg";
import craftAsset from "@/assets/application-craft.png.asset.json";
import { products } from "@/lib/products-data";
import { projects } from "@/lib/portfolio-data";
import { whatsappLink } from "@/lib/site-config";
import { useI18n, localizeProduct, localizePost } from "@/lib/i18n";

const TITLE = "Casa D'Arte | Italian Decorative Finishes & Application";
const DESCRIPTION =
  "Premium decorative finishes — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement and Beton Look — professionally applied by Casa D'Arte in North Macedonia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
          address: { "@type": "PostalAddress", addressCountry: "MK" },
          areaServed: "North Macedonia",
          knowsAbout: [
            "Travertino",
            "Marmorino",
            "Stucco Veneziano",
            "Sahara decorative finish",
            "Microcement",
            "Beton Look",
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const processSteps = [
  { n: "01", t: "Concept & Consultation", d: "Understand the space, design direction and project requirements." },
  { n: "02", t: "Finish Selection", d: "Choose the finish, texture and color." },
  { n: "03", t: "Quotation & Planning", d: "Materials and professional application are planned together." },
  { n: "04", t: "Professional Application", d: "Our team prepares and applies the decorative finish." },
  { n: "05", t: "Final Inspection", d: "The completed surface is checked before handover." },
];

function HomePage() {
  const { t, lang } = useI18n();
  const list = products.map((p) => localizeProduct(p, lang));

  return (
    <>
      <section className="relative isolate flex min-h-[90svh] items-end overflow-hidden bg-beige pt-24 md:min-h-[92svh] md:items-center">
        <img
          src={heroInterior}
          alt={t("Warm interior with a softly textured decorative wall, stone bench and natural light")}
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[64%_center] sm:object-center"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-cream/25" />
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-16 sm:px-10 sm:pb-20 md:px-12 md:pb-0">
          <div className="max-w-[42rem]">
            <p className="eyebrow mb-5 text-forest/70 reveal">Casa D'Arte</p>
            <h1 className="font-serif text-5xl leading-[1.02] text-forest text-balance reveal sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              {t("Turn Every Wall Into Art.")}
            </h1>
            <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-forest/80 reveal sm:text-lg md:text-xl">
              {t("Premium decorative finishes, professionally applied by our team.")}
            </p>
            <Link to="/products" className="btn btn-forest mt-9 reveal">
              {t("Explore Our Finishes")} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>


      {/* FINISHES */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold mb-5">{t("The Finishes")}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] text-balance">
                {t("Six finishes. Supplied and applied by our team.")}
              </h2>
            </div>
            <Link to="/products" className="link-line text-forest self-start md:self-end">
              {t("All finishes")} <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14">
            {list.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group block">
                <div className="overflow-hidden aspect-[4/5] bg-beige">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={t("{name} decorative finish", { name: p.name })}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </div>
                <h3 className="mt-6 font-serif text-3xl text-forest group-hover:text-gold transition-colors">{p.name}</h3>
                <p className="mt-2 text-forest/65 leading-relaxed max-w-sm">{p.tagline}</p>
                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.25em] text-forest/50 group-hover:text-gold transition-colors">
                  {t("View Finish")} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section id="process" className="py-24 md:py-36 px-6 md:px-12 bg-beige scroll-mt-24">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 md:gap-8 items-start">
          <div className="md:col-span-5">
            <img
              src={craftAsset.url}
              alt={t("Decorative finish applied by hand with a steel trowel")}
              width={941}
              height={1672}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] mb-10">{t("Our Process")}</h2>
            <ol className="border-t border-forest/15">
              {processSteps.map((s) => (
                <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-x-4 py-6 border-b border-forest/15">
                  <p className="font-serif text-gold text-xl pt-0.5">{s.n}</p>
                  <div>
                    <h3 className="font-serif text-2xl text-forest leading-snug mb-1">{t(s.t)}</h3>
                    <p className="text-forest/65 leading-relaxed">{t(s.d)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* REALIZED PROJECTS */}
      <section className="py-24 md:py-36 bg-cream">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="eyebrow text-gold mb-5">{t("Projects")}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08]">{t("Realized Projects")}</h2>
            </div>
            <Link to="/portfolio" className="link-line text-forest self-start md:self-end">
              {t("View all projects")} <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12">
            {projects.map((p) => (
              <Link key={p.id} to="/portfolio" className="group block">
                <div className="overflow-hidden aspect-[4/3] bg-beige">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${t(p.title)} — ${p.finish}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </div>
                <p className="mt-5 font-serif text-xl md:text-2xl text-forest">
                  {t(p.title)} — {p.finish}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-forest leading-[1.08] mb-6 text-balance">
            {t("Have a project in mind?")}
          </h2>
          <p className="text-forest/70 text-lg leading-relaxed mb-10">
            {t("Tell us about your space and we’ll help you choose the right finish.")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/contact" search={{ intent: "project" }} className="btn btn-forest">
              {t("Discuss Your Project")}
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {t("Message Us")}
            </a>
          </div>
          <Link to="/architects" className="mt-12 inline-block link-line text-forest/70 text-sm">
            {t("For Architects & Designers")} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
