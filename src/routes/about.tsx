import { createFileRoute, Link } from "@tanstack/react-router";
import applicationCraft from "@/assets/application-craft.png";
import { ConsultationForm } from "@/lib/consultation-form";
import { useT } from "@/lib/i18n";

const TITLE = "The Studio — Casa D'Arte, Italian Decorative Finishes";
const DESCRIPTION =
  "Casa D'Arte: a studio with more than a decade of experience supplying premium Italian decorative finishes and applying them with its own team across North Macedonia.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: TITLE,
          description: DESCRIPTION,
          url: "/about",
          about: { "@type": "Organization", name: "Casa D'Arte" },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    t: "Material and execution, together",
    d: "We chose early on not to be a shop that sells buckets, nor a crew that applies whatever arrives on site. Casa D'Arte supplies the finish and applies it, so one team is accountable for the surface.",
  },
  {
    t: "Decisions on the real material",
    d: "Every finish is approved on physical samples prepared for the project. Tone, texture and sheen are judged in the light of the space, not on a screen.",
  },
  {
    t: "Respect for the technique",
    d: "Italian decorative finishes are layered systems. Preparation, timing and the hand that applies them matter as much as the material. We do not skip steps.",
  },
  {
    t: "Restraint",
    d: "The finish should serve the architecture. Our role is to make a surface feel inevitable in its space, not to decorate for its own sake.",
  },
];

function AboutPage() {
  const t = useT();
  return (
    <>
      <section className="pt-40 pb-20 md:pb-28 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10 md:gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-6">{t("The Studio · Over a decade of experience")}</p>
            <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.02] mb-8 text-balance">
              {t("A studio for Italian finishes —")} <em className="italic">{t("supplied and applied.")}</em>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="text-forest/70 text-lg leading-relaxed">
              {t("Casa D'Arte brings more than a decade of experience to a simple conviction: a wall deserves the same care as the architecture around it, and the people who choose the material should be the people who put it on the wall.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8 items-start">
          <div className="md:col-span-5 md:sticky md:top-32">
            <img
              src={applicationCraft}
              alt={t("Decorative finish being applied by hand with a steel trowel")}
              width={941}
              height={1672}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover object-[60%_40%]"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-gold mb-5">{t("What we do")}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-[1.08] mb-8 text-balance">
              {t("From the first sample to the finished surface.")}
            </h2>
            <div className="space-y-6 text-forest/75 text-lg leading-relaxed">
              <p>
                {t("We work with Italian decorative finishes: Travertino, Marmorino, Stucco Veneziano, Sahara, Microcement and Beton Look. We supply the material specified for the project and apply it with our own team, from surface preparation through the finished surface.")}
              </p>
              <p>
                {t("Most of our work is with architects, interior designers, developers and hospitality or commercial clients, alongside private residences where the owners care about how a wall feels as much as how it looks. In every case the path is the same: consultation, samples, quotation, application, handover.")}
              </p>
              <p>
                {t("It is a deliberately narrow way of working. It means we can stand behind the surface, because we chose the material and we put it there.")}
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/services" className="btn btn-outline">
                {t("Our Services")}
              </Link>
              <Link to="/products" className="link-line text-forest self-center sm:ml-4">
                {t("The finishes")} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-4">
              <p className="eyebrow text-gold">{t("How we think")}</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-4xl md:text-5xl text-forest leading-[1.08] text-balance">
                {t("Four principles that shape every project.")}
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 border-t border-forest/15">
            {principles.map((p, i) => (
              <div key={p.t} className="grid grid-cols-[3rem_1fr] gap-x-6 py-8 border-b border-forest/15">
                <p className="font-serif text-gold text-lg pt-0.5">0{i + 1}</p>
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-3">{t(p.t)}</h3>
                  <p className="text-forest/65 leading-relaxed">{t(p.d)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 px-6 md:px-12 bg-forest text-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-14 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-5">{t("Start a conversation")}</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-8 text-balance">
              {t("Tell us about your space.")}
            </h2>
            <p className="text-beige/70 text-lg leading-relaxed max-w-md">
              {t("Whether you are specifying a finish, planning a development or renovating a home, the next step is a conversation and a sample.")}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ConsultationForm variant="dark" source="about-page" />
          </div>
        </div>
      </section>
    </>
  );
}
