import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export function WhatsAppButton() {
  const href = whatsappLink(
    "Hello Casa D'Arte, I would like to discuss a project involving your decorative finishes.",
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Casa D'Arte on WhatsApp"
      className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 flex items-center gap-3 bg-forest text-beige border border-gold/40 p-3 sm:pl-4 sm:pr-5 shadow-lg hover:bg-gold hover:text-forest hover:border-gold transition-colors duration-300"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] font-medium">
        WhatsApp
      </span>
    </a>
  );
}
