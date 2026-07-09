import { createFileRoute } from "@tanstack/react-router";
import { ConsultationForm } from "@/lib/consultation-form";
import { Phone, Mail, MessageCircle, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Casa D'Arte — Skopje, North Macedonia" },
      {
        name: "description",
        content:
          "Get in touch with Casa D'Arte. Book a free consultation, request a sample box or ask about custom Italian decorative finishes.",
      },
      { property: "og:title", content: "Contact Casa D'Arte" },
      { property: "og:description", content: "Book a free consultation or request a sample box." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-gold mb-6">Contact</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8">
            Let's begin a <em className="italic">conversation.</em>
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Reach the atelier by form, phone or WhatsApp. We respond to every inquiry within one
            business day.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="eyebrow text-gold mb-4">Atelier</p>
              <a
                href="https://maps.google.com/?q=Partizanski+Odredi+Skopje"
                target="_blank"
                rel="noreferrer"
                className="flex gap-4 items-start text-forest hover:text-gold transition-colors"
              >
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Casa D'Arte Skopje<br />
                  bul. Partizanski Odredi<br />
                  1000 Skopje, North Macedonia
                </span>
              </a>
            </div>

            <div>
              <p className="eyebrow text-gold mb-4">Direct</p>
              <div className="space-y-3">
                <a href="tel:+38970000000" className="flex gap-4 items-center text-forest hover:text-gold transition-colors">
                  <Phone className="h-4 w-4" />
                  +389 70 000 000
                </a>
                <a href="mailto:atelier@casadarte.mk" className="flex gap-4 items-center text-forest hover:text-gold transition-colors">
                  <Mail className="h-4 w-4" />
                  atelier@casadarte.mk
                </a>
                <a
                  href="https://wa.me/38970000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-4 items-center text-forest hover:text-gold transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow text-gold mb-4">Social</p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social"
                    className="size-11 rounded-full border border-forest/25 grid place-items-center hover:border-gold hover:text-gold transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-sm overflow-hidden border border-forest/10">
              <iframe
                title="Casa D'Arte on the map"
                src="https://www.google.com/maps?q=Skopje+Partizanski+Odredi&output=embed"
                className="w-full h-64"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:col-span-3 bg-forest text-beige rounded-sm p-8 md:p-12">
            <p className="eyebrow text-gold mb-4">Send an inquiry</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Tell us about your project.
            </h2>
            <ConsultationForm variant="dark" source="contact-page" />
          </div>
        </div>
      </section>
    </>
  );
}
