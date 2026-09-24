export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  readTime: string;
  category: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "art-of-venetian-plaster",
    title: "The Art of Stucco Veneziano",
    excerpt:
      "How a centuries-old Italian technique became the signature of contemporary luxury interiors — and why the hand that applies it matters as much as the material.",
    date: "March 2026",
    dateISO: "2026-03-10",
    readTime: "6 min read",
    category: "Craft",
    body: [
      "Venetian plaster, or Stucco Veneziano, traces its lineage to the palazzos of Renaissance Venice — a city whose damp maritime air demanded finishes both beautiful and breathable. Applied in translucent layers of slaked lime and finely ground marble, the technique produces a wall that seems to have depth of its own.",
      "Architects working on refined interiors have returned to Stucco Veneziano for precisely the reason Venetian builders prized it: no industrial paint replicates the visual softness of hand-troweled lime, or the way it shifts as the light moves through a room.",
      "It is also a technique in which the material and the application cannot be separated. The same product, in different hands, produces a different wall. The number of layers, the pressure of the trowel, the timing between coats and the final burnish all decide whether the surface reads as marble or as paint.",
      "This is why Casa D'Arte supplies the finish and applies it with its own team. A specified Stucco Veneziano is only realised when the people who chose the material are the people who bring it to the wall — layer by layer, until the surface belongs to the architecture rather than sitting on top of it.",
    ],
  },
  {
    slug: "choosing-finish-for-your-space",
    title: "Choosing the Right Finish for Your Space",
    excerpt:
      "Travertino, Marmorino, Stucco Veneziano, Sahara or Microcement — a designer's guide to selecting the finish that suits your architecture.",
    date: "February 2026",
    dateISO: "2026-02-12",
    readTime: "8 min read",
    category: "Guide",
    body: [
      "The six finishes we work with each have a distinct architectural character. Understanding which fits a given space — and how the space will be used — is the first decision in any project, and the one that a physical sample settles best.",
      "Marmorino is quiet. It works where you want depth without drama: bedrooms, dining rooms, offices for people who value restraint. A soft, luminous surface with subtle movement.",
      "Stucco Veneziano is theatrical. It belongs in spaces where light matters — suites with tall windows, restaurants where candlelight does the work at night. Polished to a mirror sheen, it reads as veined marble.",
      "Travertino is tectonic. Its porosity gives weight. It suits villas, facades and any wall that should feel rooted in the ground rather than applied to it.",
      "Sahara is contemporary. Fine mineral grain with metallic pigment makes it come alive in evening light, which is why it suits hospitality bars, boutique retail and powder rooms.",
      "Microcement is seamless. A thin, continuous cementitious surface for walls, floors and wet areas, it suits contemporary bathrooms, kitchens and commercial interiors where joints and tiles would interrupt the space.",
      "Whichever direction a project takes, we recommend deciding on samples prepared in the intended tone and texture, viewed in the actual space. The right finish is the one that looks inevitable there.",
    ],
  },
  {
    slug: "microcement-seamless-surfaces",
    title: "Microcement: Seamless Surfaces, Properly Executed",
    excerpt:
      "Why microcement has become the contemporary answer for bathrooms, floors and continuous interiors — and why preparation decides the result.",
    date: "January 2026",
    dateISO: "2026-01-28",
    readTime: "5 min read",
    category: "Guide",
    body: [
      "Microcement is a thin, cement-based coating applied in a few millimetres over an existing substrate. Its appeal is the continuity it brings: walls, floors, showers and joinery can share one uninterrupted surface, without grout lines or tile edges.",
      "That continuity is also its discipline. Because the coating is so thin, it reveals the substrate beneath it. Cracks, movement and moisture that a thicker system might hide will telegraph through microcement. A good result depends less on the final coat than on the assessment, priming and preparation that come before it.",
      "For wet areas, the sealing system and its detailing at drains, junctions and corners are what make the surface durable. This is where a supplier who also applies the material earns its place: the system is specified, prepared, applied and sealed by one team, and the responsibility for the finished surface is clear.",
      "Microcement is now part of our finishes, alongside the lime-based Italian systems. Where a project calls for a seamless, contemporary surface — a bathroom, a kitchen, a retail floor — we prepare samples in the intended tone and texture and quote material and application together.",
    ],
  },
  {
    slug: "green-in-italian-design",
    title: "Why Green Returned to Italian Design",
    excerpt:
      "From Renaissance palaces to contemporary Milanese interiors — a colour rediscovers its architectural authority.",
    date: "December 2025",
    dateISO: "2025-12-09",
    readTime: "5 min read",
    category: "Colour",
    body: [
      "For centuries, deep green was a colour of Italian nobility — found on the walls of Renaissance palaces and Venetian rooms, made from copper-based pigments and stabilised in lime, where it aged with dignity while cheaper greens turned muddy.",
      "In recent years, interior architects have brought it back. The forest green wall — deep, matte, unadorned — has become a signal of confidence in contemporary interiors.",
      "It is a colour that requires the right finish. Painted, it flattens. In Stucco Veneziano or Marmorino, the mineral pigment sits within translucent layers of lime and marble, and the green gains the depth it had in the palazzos: less a coat of colour than a material in its own right.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
