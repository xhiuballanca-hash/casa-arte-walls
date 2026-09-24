import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/blog-data";

const TITLE = "Journal — Casa D'Arte on Italian Decorative Finishes";
const DESCRIPTION =
  "Notes and guides on decorative finishes — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement and Beton Look — colour and interior surfaces, from Casa D'Arte.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Casa D'Arte Journal",
          description: DESCRIPTION,
          url: "/blog",
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.dateISO,
            url: `/blog/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold mb-6">The Journal</p>
            <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.02] mb-8 text-balance">
              Notes from the <em className="italic">studio.</em>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="text-forest/70 text-lg leading-relaxed">
              On Italian craft, colour, material and the architecture of the interior.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] border-t border-forest/15">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group grid md:grid-cols-12 gap-x-8 gap-y-4 py-10 md:py-14 border-b border-forest/15"
            >
              <div className="md:col-span-3 flex md:flex-col gap-3 md:gap-2">
                <span className="eyebrow text-gold">{p.category}</span>
                <span className="eyebrow text-forest/50">
                  {p.date} · {p.readTime}
                </span>
              </div>
              <div className="md:col-span-8">
                <h2 className="font-serif text-3xl md:text-5xl text-forest leading-[1.1] mb-4 group-hover:text-gold transition-colors text-balance">
                  {p.title}
                </h2>
                <p className="text-forest/65 text-lg leading-relaxed max-w-2xl">{p.excerpt}</p>
                <span className="mt-6 inline-block link-line text-forest text-sm">Read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
