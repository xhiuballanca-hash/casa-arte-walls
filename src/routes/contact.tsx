import { createFileRoute } from "@tanstack/react-router";
import { ConsultationForm } from "@/lib/consultation-form";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { SITE } from "@/lib/site-config";

const INTENTS = ["project", "sample", "quote", "partner"] as const;
export type ContactIntent = (typeof INTENTS)[number];

const intentCopy: Record<
  ContactIntent,
  { eyebrow: string; heading: string; project: string; message: string; submit: string }
> = {
  project: {
    eyebrow: "Discuss your project",
    heading: "Tell us about the project.",
    project: "",
    message: "",
    submit: "Send inquiry",
  },
  sample: {
    eyebrow: "Request a sample",
    heading: "Which finishes would you like to see?",
    project: "Sample request",
    message: "I would like to receive samples of: ",
    submit: "Request samples",
  },
  quote: {
    eyebrow: "Request a quote",
    heading: "Let us price the work.",
    project: "Quotation request",
    message: "Surface area (approx.), location, condition of the walls, preferred finish: ",
    submit: "Request a quote",
  },
  partner: {
    eyebrow: "Partnership",
    heading: "Introduce your studio or company.",
    project: "Partnership inquiry",
    message: "",
    submit: "Start the conversation",
  },
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { intent?: ContactIntent } => {
    const raw = search.intent;
    return typeof raw === "string" && (INTENTS as readonly string[]).includes(raw)
      ? { intent: raw as ContactIntent }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Contact Casa D'Arte — Discuss a Project, Request a Sample or Quote" },
      {
        name: "description",
        content:
           "Discuss your project with Casa D'Arte in North Macedonia. Request a quotation or consultation for Italian decorative finishes, supplied and professionally applied.",
      },
      { property: "og:title", content: "Contact Casa D'Arte" },
      {
        property: "og:description",
        content: "Discuss a project, request samples or a quotation for Italian decorative finishes.",
      },
      { property: "og:url", content: "/contact" },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { intent } = Route.useSearch();
  const copy = intentCopy[intent ?? "project"];

  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow text-gold mb-6">Contact</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8 max-w-4xl text-balance">
            Let's begin with a <em className="italic">conversation.</em>
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl leading-relaxed">
            Reach the studio by form, phone or WhatsApp. Whether you are specifying a finish,
            planning a development or renovating a home, we will guide you from sample to
            finished surface.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4 space-y-10">
            <div>
              <p className="eyebrow text-gold mb-4">Studio</p>
               <div className="flex gap-4 items-start text-forest">
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Casa D'Arte<br />
                   North Macedonia
                </span>
               </div>
            </div>

            <div>
              <p className="eyebrow text-gold mb-4">Direct</p>
              <div className="space-y-3">
                <a href={SITE.phoneHref} className="flex gap-4 items-center text-forest hover:text-gold transition-colors">
                  <Phone className="h-4 w-4" />
                  {SITE.phoneDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex gap-4 items-center text-forest hover:text-gold transition-colors">
                  <Mail className="h-4 w-4" />
                  {SITE.email}
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow text-gold mb-4">Social</p>
              <div className="space-y-3">
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center text-forest hover:text-gold transition-colors">
                  <Instagram className="h-4 w-4" />
                  {SITE.social.instagramHandle}
                </a>
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center text-forest hover:text-gold transition-colors">
                  <Facebook className="h-4 w-4" />
                   CasaDarteMacedonia
                </a>
              </div>
            </div>

          </div>

          <div className="md:col-span-7 md:col-start-6 bg-forest text-beige p-8 md:p-14">
            <p className="eyebrow text-gold mb-4">{copy.eyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-10">{copy.heading}</h2>
            <ConsultationForm
              key={intent ?? "project"}
              variant="dark"
              source={`contact-${intent ?? "project"}`}
              defaultProject={copy.project}
              defaultMessage={copy.message}
              defaultClientType={intent === "partner" ? "Architect / Interior designer" : undefined}
              submitLabel={copy.submit}
            />
          </div>
        </div>
      </section>
    </>
  );
}
