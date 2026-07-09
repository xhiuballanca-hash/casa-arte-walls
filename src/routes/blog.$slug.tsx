import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPost, posts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Essay not found — Casa D'Arte" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Casa D'Arte Journal` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug);
  return (
    <>
      <article className="pt-40 pb-24 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="eyebrow text-forest/60 hover:text-gold inline-flex mb-8">
            ← The Journal
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="eyebrow text-gold">{post.category}</span>
            <span className="h-px w-6 bg-forest/20" />
            <span className="eyebrow text-forest/50">{post.date} · {post.readTime}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-forest leading-[1.1] mb-8 text-balance">
            {post.title}
          </h1>
          <p className="font-serif italic text-xl text-forest/70 mb-12 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="space-y-6 text-forest/80 leading-[1.85] text-lg">
            {post.body.map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="py-20 px-6 md:px-12 bg-cream">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow text-gold mb-6">Continue reading</p>
          <div className="grid md:grid-cols-2 gap-6">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block bg-beige p-8 rounded-sm hover:bg-forest hover:text-beige transition-all"
              >
                <p className="eyebrow opacity-60 mb-3">{p.category}</p>
                <p className="font-serif text-2xl leading-tight group-hover:text-gold transition-colors">
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
