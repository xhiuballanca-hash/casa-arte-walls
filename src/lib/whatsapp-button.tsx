import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = "38970000000";
  const message = encodeURIComponent(
    "Hello Casa D'Arte, I would like to learn more about your Italian decorative finishes.",
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-forest text-beige pl-4 pr-5 py-3 shadow-2xl border border-gold/40 hover:bg-gold hover:text-forest transition-all duration-300"
    >
      <span className="relative flex size-8 items-center justify-center rounded-full bg-gold/20 group-hover:bg-forest/10">
        <MessageCircle className="h-4 w-4" />
        <span className="absolute top-0 right-0 size-2 rounded-full bg-gold animate-pulse" />
      </span>
      <span className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] font-medium">
        Chat with us
      </span>
    </a>
  );
}
