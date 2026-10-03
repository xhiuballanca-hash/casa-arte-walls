import travertinoAsset from "@/assets/material-travertino.jpg.asset.json";
import marmorinoAsset from "@/assets/material-marmorino.jpg.asset.json";
import venezianoAsset from "@/assets/material-stucco-veneziano.jpg.asset.json";
import saharaAsset from "@/assets/material-sahara.jpg.asset.json";
import microcementAsset from "@/assets/material-microcement.jpg.asset.json";
import betonLookAsset from "@/assets/material-beton-look.jpg.asset.json";

const travertino = travertinoAsset.url;
const marmorino = marmorinoAsset.url;
const veneziano = venezianoAsset.url;
const sahara = saharaAsset.url;
const microcement = microcementAsset.url;
const betonLook = betonLookAsset.url;

export type Product = {
  slug: string;
  index: string;
  name: string;
  /** Optional secondary name, used only when an approved naming convention requires it. */
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
    tagline: "Natural Stone Effect",
    summary: "Travertino gives walls a natural stone appearance with visible texture and depth. It works well for both interiors and facades.",
    description:
      "Travertino gives walls a natural stone appearance with visible texture and depth. It works well for both interiors and facades.",
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
    tagline: "Refined Mineral Finish",
    summary: "Marmorino is a versatile decorative finish that can create smooth, polished or more textured surfaces. It gives interiors an elegant and refined character.",
    description:
      "Marmorino is a versatile decorative finish that can create smooth, polished or more textured surfaces. It gives interiors an elegant and refined character.",
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
    tagline: "Polished Marble Look",
    summary: "Stucco Veneziano is a smooth, polished finish with a glossy marble-like appearance. It is ideal for elegant feature walls.",
    description:
      "Stucco Veneziano is a smooth, polished finish with a glossy marble-like appearance. It is ideal for elegant feature walls.",
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
      "Suited to hospitality and residential interiors",
    ],
    interior: ["Feature walls", "Hotel suites", "Fine dining", "Private residences", "Retail flagships"],
    exterior: null,
  },
  {
    slug: "sahara",
    index: "03",
    name: "Sahara",
    tagline: "Sand Effect",
    summary: "Sahara creates a decorative sand effect with subtle movement and light reflection. It gives walls a warm and elegant look.",
    description:
      "Sahara creates a decorative sand effect with subtle movement and light reflection. It gives walls a warm and elegant look.",
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
    tagline: "Modern Minimalist Texture",
    summary: "Microcement creates a clean, continuous surface with a modern concrete look. It is ideal for minimalist and contemporary spaces.",
    description:
      "Microcement creates a clean, continuous surface with a modern concrete look. It is ideal for minimalist and contemporary spaces.",
    image: microcement,
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
    tagline: "Modern Concrete Effect",
    summary: "Beton Look gives walls the appearance of architectural concrete with natural texture and variation. It creates a modern, industrial feel.",
    description:
      "Beton Look gives walls the appearance of architectural concrete with natural texture and variation. It creates a modern, industrial feel.",
    image: betonLook,
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
