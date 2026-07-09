import { createFileRoute } from "@tanstack/react-router";
import { ConsultationForm } from "@/lib/consultation-form";
import architectsImg from "@/assets/architects-flatlay.jpg";

export const Route = createFileRoute("/architects")({
  head: () => ({
    meta: [
      { title: "Architect Program — Casa D'Arte Partnership" },
      {
        name: "description",
        content:
          "Casa D'Arte partners with architects and interior designers with free consultations, sample boxes, technical support, custom finishes and exclusive terms.",
      },
      { property: "og:title", content: "Architect Program — Casa D'Arte" },
      { property: "og:description", content: "Bespoke Italian finishes for design professionals." },
    ],
  }),
  component: ArchitectsPage,
});

function ArchitectsPage() {
  const perks = [
    {
      n: "01",
      t: "Complimentary consultation",
      d: "On-site or in-studio review of your project, samples in hand.",
    },
    {
      n: "02",
      t: "Sample boxes",
      d: "Curated boxes of physical swatches, sent to your studio at no cost.",
    },
    {
      n: "03",
      t: "Technical support",
      d: "Substrate assessment, primer recommendations, site walkthroughs.",
    },
    {
      n: "04",
      t: "Custom finishes",
      d: "Bespoke pigment matches and texture development for signature projects.",
    },
    {
      n: "05",
      t: "Exclusive partnership",
      d: "Priority scheduling, trade terms and long-standing collaboration.",
    },
  ];
  return (
    <>
      <section className="pt-40 pb-20 px-6 md:px-12 bg-forest text-beige">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-gold mb-6">Architect Program</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-balance">
            Crafting vision, <em className="italic">together.</em>
          </h1>
          <p className="text-beige/75 text-lg md:text-xl max-w-3xl leading-relaxed">
            Casa D'Arte partners with architects, interior designers and design-build studios to
            bring ambitious material choices to life. From concept swatches to on-site
            supervision, we work as an extension of your studio.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <img
            src={architectsImg}
            alt="Design samples on a studio table"
            width={1200}
            height={1200}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-sm"
          />
          <div className="space-y-8">
            {perks.map((p) => (
              <div key={p.n} className="grid grid-cols-[auto_1fr] gap-6 pb-6 border-b border-forest/10">
                <p className="font-serif text-gold text-xl">{p.n}</p>
                <div>
                  <p className="font-serif text-xl text-forest mb-1">{p.t}</p>
                  <p className="text-forest/65 text-sm leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold mb-5">Become a Partner</p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            Introduce your studio.
          </h2>
          <p className="text-forest/65 mb-10 leading-relaxed">
            Share your practice and current project pipeline. We'll follow up with a partnership
            proposal and a sample box tailored to your work.
          </p>
          <ConsultationForm variant="light" source="architects" defaultProject="Architect / Studio partnership" />
        </div>
      </section>
    </>
  );
}
