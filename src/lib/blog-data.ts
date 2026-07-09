export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "art-of-venetian-plaster",
    title: "The Art of Venetian Plaster",
    excerpt:
      "How a 500-year-old Italian technique became the signature of contemporary luxury interiors.",
    date: "March 2026",
    readTime: "6 min read",
    category: "Craft",
    body: [
      "Venetian plaster, or Stucco Veneziano, traces its lineage to the palazzos of 15th-century Venice — a city whose damp maritime air demanded finishes both beautiful and breathable. Applied in translucent layers of slaked lime and finely-ground marble, the technique produces a wall that seems to have depth of its own.",
      "In the last decade, architects working on the world's most refined interiors have returned to Stucco Veneziano for precisely the reason Venetian merchants prized it: no industrial paint can replicate the visual softness of hand-troweled lime.",
      "At Casa D'Arte, every application is executed by artisans trained in the traditional Italian method, using pigments imported directly from Emilia-Romagna. The result is not decoration — it is architecture.",
    ],
  },
  {
    slug: "choosing-finish-for-your-space",
    title: "Choosing the Right Finish for Your Space",
    excerpt:
      "Marmorino, Travertino, Stucco Veneziano or Sahara — a designer's guide to selecting the finish that suits your architecture.",
    date: "February 2026",
    readTime: "8 min read",
    category: "Guide",
    body: [
      "The four finishes in our core collection each have a distinct architectural character. Understanding which fits a given space is the first decision in any project.",
      "Marmorino is quiet — it works where you want depth without drama. Bedrooms, dining rooms, offices for people who value restraint.",
      "Stucco Veneziano is theatrical. It belongs in spaces where light matters: hotel suites with tall windows, restaurants where candlelight will do the work at night.",
      "Travertino is tectonic. Its porosity gives weight. It suits villas and facades — anything that should feel rooted.",
      "Sahara is contemporary. Metallic pigments make it come alive at night, which is why it appears so often in hospitality bars and boutique retail.",
    ],
  },
  {
    slug: "green-in-italian-design",
    title: "Why Green Returned to Italian Design",
    excerpt:
      "From the Medici palaces to Milano's contemporary interiors — a color rediscovers its architectural authority.",
    date: "January 2026",
    readTime: "5 min read",
    category: "Colour",
    body: [
      "For centuries, deep forest green was the color of Italian nobility — the pigment of choice for the walls of the Medici, the Sforza, the Doges of Venice. Extracted from copper minerals and stabilized in lime, it aged with dignity where cheaper greens turned muddy.",
      "In the last five years, Milano's most influential interior architects have brought it back. The forest green wall — deep, matte, unadorned — has become a signal of confidence.",
      "It is a color that requires the right finish. Painted, it flattens. In Stucco Veneziano or Marmorino, it becomes what it was in the palazzos: architecture.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
