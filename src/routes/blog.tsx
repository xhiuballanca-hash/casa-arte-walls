import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Casa D'Arte on Italian Decorative Finishes" },
      {
        name: "description",
        content:
          "Essays and guides on Italian decorative plasterwork, color theory and contemporary interior design from the Casa D'Arte atelier.",
      },
      { property: "og:title", content: "Journal — Casa D'Arte" },
      {
        property: "og:description",
        content: "Essays on Italian craft, color, and interior architecture.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow text-gold mb-6">The Journal</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.05] mb-8">
            Essays from the <em className="italic">atelier.</em>
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Notes on Italian craft, colour, and the architecture of the interior.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-4xl divide-y divide-forest/10">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block py-10 md:py-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="eyebrow text-gold">{p.category}</span>
                <span className="h-px w-6 bg-forest/20" />
                <span className="eyebrow text-forest/50">{p.date} · {p.readTime}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest leading-tight mb-4 group-hover:text-gold transition-colors">
                {p.title}
              </h2>
              <p className="text-forest/65 leading-relaxed">{p.excerpt}</p>
              <span className="mt-6 inline-block eyebrow border-b border-forest/40 group-hover:text-gold group-hover:border-gold pb-0.5 transition-colors">
                Read essay →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
