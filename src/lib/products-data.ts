import travertino from "@/assets/product-travertino.jpg";
import marmorino from "@/assets/product-marmorino.jpg";
import veneziano from "@/assets/product-veneziano.jpg";
import sahara from "@/assets/product-sahara.jpg";

export type Product = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  interior: string[];
  exterior: string[] | null;
};

export const products: Product[] = [
  {
    slug: "travertino",
    index: "01",
    name: "Travertino",
    tagline: "Architectural & Raw",
    description:
      "Inspired by the volcanic stone of Roman monuments, Travertino captures the honest, porous depth of natural travertine. A tactile finish that carries the weight of Italian architectural heritage into contemporary spaces.",
    image: travertino,
    features: [
      "Natural stone appearance with authentic porosity",
      "Multi-layer lime-based application",
      "Available in matte and semi-polished finishes",
      "Compatible with interior and exterior surfaces",
    ],
    benefits: [
      "Highly breathable, regulates humidity",
      "Ages gracefully with a natural patina",
      "Excellent durability, resistant to abrasion",
      "Made with mineral pigments — colour stability",
    ],
    interior: ["Living rooms", "Feature walls", "Hotel lobbies", "Restaurant interiors", "Bathrooms"],
    exterior: ["Facades", "Villa exteriors", "Courtyard walls", "Boutique storefronts"],
  },
  {
    slug: "marmorino",
    index: "02",
    name: "Marmorino",
    tagline: "Classic Sophistication",
    description:
      "The traditional lime-based Venetian finish, refined for over five centuries. Marmorino produces a smooth, softly luminous surface with subtle depth — the quiet confidence of Palladian villas translated for modern architecture.",
    image: marmorino,
    features: [
      "Slaked-lime base with fine marble powder",
      "Silky satin or polished finish options",
      "Custom pigmentation from a library of 240+ tones",
      "Hand-troweled application by master artisans",
    ],
    benefits: [
      "Naturally antibacterial and mould-resistant",
      "Zero VOC — safe for bedrooms and children's spaces",
      "Timeless finish that never dates",
      "Repairable and refinishable in place",
    ],
    interior: ["Bedrooms", "Dining rooms", "Boutique retail", "Executive offices", "Spas"],
    exterior: null,
  },
  {
    slug: "stucco-veneziano",
    index: "03",
    name: "Stucco Veneziano",
    tagline: "Mirror-like Brilliance",
    description:
      "The most refined expression of Italian plasterwork. Applied in up to eight translucent layers and polished to a mirror finish, Stucco Veneziano reveals a depth reminiscent of veined marble — luxury in its most restrained form.",
    image: veneziano,
    features: [
      "Up to 8 translucent lime-marble layers",
      "Mirror polish with beeswax finish",
      "Marble-veined depth and translucency",
      "Bespoke color matching",
    ],
    benefits: [
      "Extraordinary visual depth impossible with paint",
      "Ultra-smooth, easily cleaned surface",
      "Reflects light — makes spaces feel larger",
      "The signature of five-star hospitality",
    ],
    interior: ["Feature walls", "Hotel suites", "Fine dining", "Private residences", "Retail flagships"],
    exterior: null,
  },
  {
    slug: "sahara",
    index: "04",
    name: "Sahara",
    tagline: "Metallic Grain Texture",
    description:
      "A contemporary tactile finish inspired by desert landscapes and precious metals. Sahara combines mineral grain with fine metallic pigments — copper, bronze, champagne, gold — for walls that shift with the light throughout the day.",
    image: sahara,
    features: [
      "Fine mineral aggregate with metallic pigments",
      "Sand, bronze, copper, gold, or champagne palettes",
      "Light-reactive shimmer, restrained by day and dramatic by night",
      "Suitable for feature walls and full rooms",
    ],
    benefits: [
      "Dramatic visual effect without added ornament",
      "Hides minor imperfections in existing walls",
      "Highly durable — commercial-grade wear resistance",
      "Custom metallic tones for signature spaces",
    ],
    interior: ["Feature walls", "Hospitality bars", "Boutique retail", "Nightclub interiors", "Powder rooms"],
    exterior: ["Facade accents", "Sheltered entries"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
