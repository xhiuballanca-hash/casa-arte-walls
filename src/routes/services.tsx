import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Casa D'Arte Application & Consultation" },
      {
        name: "description",
        content:
          "Decorative wall finishes, professional application, color consultation, custom textures — for residential and commercial projects across North Macedonia.",
      },
      { property: "og:title", content: "Services — Casa D'Arte" },
      {
        property: "og:description",
        content: "Full-service Italian decorative finishes: consultation, application, custom textures.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = [
    {
      n: "01",
      t: "Decorative wall finishes",
      d: "Full library of Italian finishes — Travertino, Marmorino, Stucco Veneziano, Sahara — with 240+ tones and custom pigmentation.",
    },
    {
      n: "02",
      t: "Professional application",
      d: "Trained artisans execute every layer, from substrate preparation to final polish and sealer.",
    },
    {
      n: "03",
      t: "Color consultation",
      d: "In-studio or on-site color development — we match to fabrics, joinery, existing architecture.",
    },
    {
      n: "04",
      t: "Custom textures",
      d: "Bespoke texture development for signature projects — from ultra-smooth to sculpted relief.",
    },
    {
      n: "05",
      t: "Commercial projects",
      d: "Hotels, restaurants, boutique retail, offices — with the scheduling and coordination the sector requires.",
    },
    {
      n: "06",
      t: "Residential projects",
      d: "Private homes, apartments and villas — approached with the discretion and care of a couturier.",
    },
  ];
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-gold mb-6">Services</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8">
            From swatch to sealed wall.
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl mx-auto leading-relaxed">
            A complete service, from color development through final polish — for private
            residences and commercial spaces alike.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s) => (
            <div
              key={s.n}
              className="group bg-cream p-8 md:p-10 rounded-sm hover:bg-forest hover:text-beige transition-all duration-500"
            >
              <p className="font-serif text-2xl text-gold mb-6">— {s.n}</p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">{s.t}</h3>
              <p className="text-sm leading-relaxed opacity-75">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12 bg-forest text-beige text-center">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold mb-5">Ready to begin?</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight text-balance">
            Book your free <em className="italic">consultation.</em>
          </h2>
          <Link
            to="/contact"
            className="inline-flex text-[11px] uppercase tracking-[0.25em] bg-gold text-forest rounded-full px-10 py-4 hover:bg-beige transition-all"
          >
            Request a consultation →
          </Link>
        </div>
      </section>
    </>
  );
}
