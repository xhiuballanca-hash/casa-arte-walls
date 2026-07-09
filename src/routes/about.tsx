import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about-craft.jpg";
import { ConsultationForm } from "@/lib/consultation-form";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Casa D'Arte — Italian Craftsmanship in North Macedonia" },
      {
        name: "description",
        content:
          "Casa D'Arte brings the depth of Italian decorative plasterwork — Travertino, Marmorino, Stucco Veneziano — to homes and hospitality across North Macedonia.",
      },
      { property: "og:title", content: "About Casa D'Arte" },
      {
        property: "og:description",
        content: "The story of Casa D'Arte and our passion for Italian craftsmanship.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-gold mb-6">About</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8 text-balance">
            A quiet devotion to <em className="italic">Italian craft.</em>
          </h1>
          <p className="text-forest/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Casa D'Arte was founded in Skopje in 2012 with a single conviction: the walls of a
            home or hotel deserve the same care as the architecture itself.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <img
            src={aboutImg}
            alt="Master craftsman applying Italian plaster"
            width={1200}
            height={1500}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover rounded-sm"
          />
          <div>
            <p className="eyebrow text-gold mb-5">The Atelier</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight mb-8">
              A material tradition, translated.
            </h2>
            <div className="space-y-6 text-forest/75 leading-relaxed">
              <p>
                Our pigments and lime bases are sourced from long-established Italian houses in
                Emilia-Romagna and the Veneto — the same suppliers used by restorers of historic
                Palladian villas.
              </p>
              <p>
                Every application is executed by artisans trained in the traditional Italian
                method: hand-troweled, layered slowly, polished to spec. There are no shortcuts,
                because there is no substitute for the depth this technique produces.
              </p>
              <p>
                We supply premium finishes to designers and contractors across North Macedonia,
                and we execute complete applications — from surface preparation to final polish
                — for private clients, hoteliers and restaurant groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 text-center md:text-left">
            {[
              { n: "14", l: "Years of craft" },
              { n: "300+", l: "Projects delivered" },
              { n: "240", l: "Custom color tones" },
              { n: "100%", l: "Italian pigments" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-5xl md:text-6xl text-gold mb-2">{s.n}</p>
                <p className="eyebrow text-forest/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-forest text-beige">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold mb-5">Start your project</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-10">
            Tell us about your space.
          </h2>
          <ConsultationForm variant="dark" source="about-page" />
        </div>
      </section>
    </>
  );
}
