/** Official studio details used across the site, admin and printed documents. */
export const SITE = {
  name: "Casa D'Arte",
  tagline: "Italian decorative finishes · supplied & applied",
  country: "North Macedonia",
  addressLine: "North Macedonia",
  /** E.164 without "+" — used for wa.me links */
  whatsappNumber: "38972245116",
  phoneHref: "tel:+38972245116",
  phoneDisplay: "+389 72 245 116",
  email: "info@casadarte.mk",
  social: {
    instagram: "https://www.instagram.com/casadarte_macedonia/",
    instagramHandle: "@casadarte_macedonia",
    facebook: "https://www.facebook.com/CasaDarteMacedonia/",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
