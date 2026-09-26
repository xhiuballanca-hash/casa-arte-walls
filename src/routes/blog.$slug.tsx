import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPost, posts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — Casa D'Arte" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Casa D'Arte Journal` },
        { name: "description", content: p.excerpt.slice(0, 158) },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt.slice(0, 158) },
        { property: "og:type", content: "article" },
         { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: p.dateISO },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.dateISO,
            author: { "@type": "Organization", name: "Casa D'Arte" },
            publisher: { "@type": "Organization", name: "Casa D'Arte" },
            mainEntityOfPage: `/blog/${params.slug}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Journal", item: "/blog" },
              { "@type": "ListItem", position: 2, name: p.title, item: `/blog/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <article className="pt-40 pb-24 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <Link to="/blog" className="eyebrow text-forest/60 hover:text-gold inline-flex mb-8">
              ← The Journal
            </Link>
            <div className="hidden md:flex flex-col gap-2 border-t border-forest/15 pt-4">
              <span className="eyebrow text-gold">{post.category}</span>
              <span className="eyebrow text-forest/50">{post.date}</span>
              <span className="eyebrow text-forest/50">{post.readTime}</span>
            </div>
          </div>
          <div className="md:col-span-8 md:col-start-4 max-w-3xl">
            <div className="flex md:hidden items-center gap-3 mb-6">
              <span className="eyebrow text-gold">{post.category}</span>
              <span className="h-px w-6 bg-forest/20" />
              <span className="eyebrow text-forest/50">
                {post.date} · {post.readTime}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-forest leading-[1.05] mb-8 text-balance">
              {post.title}
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-forest/70 mb-12 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="space-y-6 text-forest/80 leading-[1.85] text-lg border-t border-forest/15 pt-10">
              {post.body.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-14 border-t border-forest/15 pt-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <p className="text-forest/60 text-sm leading-relaxed max-w-sm">
                Considering one of these finishes for a project? We prepare samples in your tones
                before anything is quoted.
              </p>
              <div className="flex gap-3">
                <Link to="/contact" search={{ intent: "sample" }} className="btn btn-outline">
                  Request a Sample
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow text-gold mb-8">Continue reading</p>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-10 border-t border-forest/15">
            {others.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block pt-6">
                <p className="eyebrow text-forest/50 mb-3">{p.category}</p>
                <p className="font-serif text-2xl text-forest leading-tight group-hover:text-gold transition-colors">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
