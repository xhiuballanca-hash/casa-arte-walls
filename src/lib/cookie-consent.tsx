import { useEffect, useState } from "react";

const KEY = "casadarte-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setVisible(true), 900);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  if (!visible) return null;

  const accept = (v: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-40 fade-in">
      <div className="bg-beige border border-forest/15 rounded-2xl shadow-2xl p-6">
        <p className="eyebrow text-gold mb-2">Cookies</p>
        <p className="text-sm text-forest/80 leading-relaxed mb-4">
          We use cookies to refine your experience and understand how visitors engage with our
          portfolio. Choose what you're comfortable with.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => accept("all")}
            className="text-[10px] uppercase tracking-[0.22em] bg-forest text-beige rounded-full px-5 py-2.5 hover:bg-gold hover:text-forest transition"
          >
            Accept all
          </button>
          <button
            onClick={() => accept("essential")}
            className="text-[10px] uppercase tracking-[0.22em] border border-forest/25 text-forest rounded-full px-5 py-2.5 hover:border-gold hover:text-gold transition"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
