/**
 * Studio details used across the public site, the admin workspace and printed
 * documents. Update these in one place.
 *
 * NOTE: phone and email below are placeholders until the studio supplies its
 * real contact details.
 */
export const SITE = {
  name: "Casa D'Arte",
  tagline: "Italian decorative finishes · supplied & applied",
  city: "Skopje",
  country: "North Macedonia",
  addressLine: "Skopje, North Macedonia",
  foundedYear: 2012,
  /** E.164 without "+" — used for wa.me links */
  whatsappNumber: "38970000000",
  phoneHref: "tel:+38970000000",
  phoneDisplay: "+389 70 000 000",
  email: "atelier@casadarte.mk",
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
