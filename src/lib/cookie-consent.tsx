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
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-40 fade-in"
    >
      <div className="bg-beige border border-forest/15 shadow-lg p-6">
        <p className="eyebrow text-gold mb-2">Cookies</p>
        <p className="text-sm text-forest/80 leading-relaxed mb-5">
          We use cookies to understand how visitors use this site and to improve it. Choose what
          you are comfortable with.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => accept("all")} className="btn btn-forest !px-5 !py-2.5 text-[10px]">
            Accept all
          </button>
          <button
            onClick={() => accept("essential")}
            className="btn btn-outline !px-5 !py-2.5 text-[10px]"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
