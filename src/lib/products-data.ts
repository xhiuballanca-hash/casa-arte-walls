import travertino from "@/assets/product-travertino.jpg";
import marmorino from "@/assets/product-marmorino.jpg";
import veneziano from "@/assets/product-veneziano.jpg";
import sahara from "@/assets/product-sahara.jpg";
import microcementTemp from "@/assets/portfolio-bathroom.jpg";

export type Product = {
  slug: string;
  index: string;
  name: string;
  /** Optional alternate name shown alongside the primary name (e.g. "Venetian Plaster"). */
  alias?: string;
  tagline: string;
  /** One-line summary used in lists and navigation. */
  summary: string;
  description: string;
  image?: string;
  /**
   * Set when the image is a neutral placeholder rather than dedicated
   * photography of this finish. Shown as a caption so nothing is misleading.
   */
  imageNote?: string;
  features: string[];
  benefits: string[];
  interior: string[];
  exterior: string[] | null;
};

const productCatalog: Product[] = [
  {
    slug: "travertino",
    index: "01",
    name: "Travertino",
    tagline: "Architectural & Raw",
    summary: "The porous, stone-like depth of Roman travertine — for interiors and facades.",
    description:
      "Inspired by the stone of Roman monuments, Travertino captures the honest, porous depth of natural travertine. A tactile lime-based finish that carries the weight of Italian architectural heritage into contemporary spaces — indoors and on facades.",
    image: travertino,
    features: [
      "Natural stone appearance with authentic porosity",
      "Multi-layer lime-based application",
      "Matte or semi-polished surface, to specification",
      "Suitable for interior and exterior surfaces",
    ],
    benefits: [
      "Breathable mineral surface",
      "Ages gracefully with a natural patina",
      "Robust, tactile finish for high-visibility walls",
      "Mineral pigments for stable colour",
    ],
    interior: ["Living rooms", "Feature walls", "Hotel lobbies", "Restaurant interiors", "Bathrooms"],
    exterior: ["Facades", "Villa exteriors", "Courtyard walls", "Boutique storefronts"],
  },
  {
    slug: "marmorino",
    index: "02",
    name: "Marmorino",
    tagline: "Classic Sophistication",
    summary: "A smooth, softly luminous lime finish with quiet depth — the classic Venetian wall.",
    description:
      "The traditional lime-based Venetian finish. Marmorino produces a smooth, softly luminous surface with subtle depth — the quiet confidence of Palladian villas translated for modern architecture.",
    image: marmorino,
    features: [
      "Slaked-lime base with fine marble powder",
      "Silky satin or polished finish options",
      "Custom pigmentation to project specification",
      "Hand-troweled application by our own team",
    ],
    benefits: [
      "Lime-based, breathable mineral surface",
      "Calm, low-sheen depth suited to bedrooms and living spaces",
      "A timeless finish that does not date",
      "Repairable and refinishable in place",
    ],
    interior: ["Bedrooms", "Dining rooms", "Boutique retail", "Executive offices", "Spas"],
    exterior: null,
  },
  {
    slug: "stucco-veneziano",
    index: "04",
    name: "Stucco Veneziano",
    tagline: "Mirror-like Brilliance",
    summary: "Translucent lime-marble layers polished to a mirror finish with marble-like depth.",
    description:
      "The most refined expression of Italian plasterwork. Applied in multiple translucent layers and polished to a mirror finish, Stucco Veneziano — Venetian plaster — reveals a depth reminiscent of veined marble. Luxury in its most restrained form.",
    image: veneziano,
    features: [
      "Multiple translucent lime-marble layers",
      "Polished, mirror-like surface with wax protection",
      "Marble-veined depth and translucency",
      "Bespoke colour matching",
    ],
    benefits: [
      "A visual depth that paint cannot reproduce",
      "Smooth, easily maintained surface",
      "Reflects light, lending presence to a room",
      "Widely specified in luxury hospitality and residential interiors",
    ],
    interior: ["Feature walls", "Hotel suites", "Fine dining", "Private residences", "Retail flagships"],
    exterior: null,
  },
  {
    slug: "sahara",
    index: "03",
    name: "Sahara",
    tagline: "Metallic Grain Texture",
    summary: "Fine mineral grain with metallic pigments — a surface that shifts with the light.",
    description:
      "A contemporary tactile finish inspired by desert landscapes and precious metals. Sahara combines mineral grain with fine metallic pigments — copper, bronze, champagne, gold — for walls that change character with the light throughout the day.",
    image: sahara,
    features: [
      "Fine mineral aggregate with metallic pigments",
      "Sand, bronze, copper, gold or champagne palettes",
      "Light-reactive shimmer — restrained by day, dramatic by night",
      "Suitable for feature walls and full rooms",
    ],
    benefits: [
      "Dramatic visual effect without added ornament",
      "Helps mask minor imperfections in existing walls",
      "Durable finish suited to commercial interiors",
      "Custom metallic tones for signature spaces",
    ],
    interior: ["Feature walls", "Hospitality bars", "Boutique retail", "Lounges", "Powder rooms"],
    exterior: ["Facade accents", "Sheltered entries"],
  },
  {
    slug: "microcement",
    index: "05",
    name: "Microcement",
    tagline: "Seamless & Contemporary",
    summary: "Continuous, joint-free cement surfaces for walls, floors and wet areas.",
    description:
      "A thin, seamless cement-based coating applied in fine layers over existing substrates — walls, floors, stairs and wet areas. Microcement suits contemporary architecture where uninterrupted planes and a calm, mineral surface are the intent.",
    image: microcementTemp,
    imageNote:
      "Representative architectural image. Dedicated Microcement photography will follow.",
    features: [
      "Seamless application at only a few millimetres of thickness",
      "For walls, floors, stairs and wet areas, with the appropriate sealing system",
      "Can be applied over many existing substrates, including tiles",
      "Matte to satin surface in a wide range of tones",
    ],
    benefits: [
      "Continuous surfaces without joints or grout lines",
      "Renovation-friendly: minimal build-up on existing surfaces",
      "Durable and easy to maintain when correctly sealed",
      "A coherent look across floor, wall and built-in elements",
    ],
    interior: ["Bathrooms and showers", "Kitchens", "Floors and stairs", "Retail interiors", "Feature walls"],
    exterior: ["Terraces and sheltered exterior surfaces, subject to system specification"],
  },
  {
    slug: "beton-look",
    index: "06",
    name: "Beton Look",
    tagline: "Architectural Concrete Character",
    summary: "A decorative finish with the calm, mineral appearance of exposed concrete.",
    description:
      "Beton Look brings the visual character of concrete to interior surfaces. Its restrained tone and subtle movement suit contemporary spaces where the wall is intended to feel architectural and understated.",
    imageNote: "Approved Beton Look material photography will be added when supplied.",
    features: [
      "Concrete-inspired decorative appearance",
      "Subtle variation created through application",
      "Matte architectural character",
      "Tone and texture selected for the project",
    ],
    benefits: [
      "Creates a restrained contemporary surface",
      "Works as a feature or continuous wall finish",
      "Pairs naturally with timber, metal and stone",
      "Applied as part of the complete Casa D'Arte service",
    ],
    interior: ["Living spaces", "Offices", "Retail interiors", "Hospitality spaces", "Feature walls"],
    exterior: null,
  },
];

const finishOrder = [
  "travertino",
  "marmorino",
  "sahara",
  "stucco-veneziano",
  "microcement",
  "beton-look",
];

export const products = [...productCatalog].sort(
  (a, b) => finishOrder.indexOf(a.slug) - finishOrder.indexOf(b.slug),
);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
