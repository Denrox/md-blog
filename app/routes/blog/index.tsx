import { useLoaderData } from "react-router";
import { readBlogPosts, collectTags } from "~/lib/content.server";
import { Link, Title, Subtitle, Card, Badge, Button, PageHeading, TextCard } from "~/components/ui";
import { siteConfig } from "~/lib/config";

const POSTS_PER_PAGE = 6;

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
  const tag = url.searchParams.get("tag") || undefined;

  let posts = readBlogPosts() || [];
  const allTags = collectTags(posts) || [];
  
  if (tag) {
    posts = posts.filter((p) => {
      const t = p.meta.tags;
      const arr = Array.isArray(t) ? t : t ? String(t).split(",") : [];
      return arr.map((s) => s.trim()).includes(tag);
    });
  }
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginated = posts.slice(start, end);

  return { posts: paginated, page, totalPages, tag, allTags, total } as const;
}


export default function BlogIndex() {
  const { posts, page, totalPages, tag, allTags, total } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-12">
      <PageHeading title={siteConfig.blog.title} subtitle={siteConfig.blog.subtitle} />
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={!tag ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link to="/">All Posts</Link>
        </Button>
        {allTags?.map((t) => (
          <Button
            key={t}
            variant={tag === t ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to={`?tag=${encodeURIComponent(t)}`}>
              #{t}
            </Link>
          </Button>
        )) || []}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post, index) => (
          <TextCard
            key={post.slug}
            title={post.meta.title}
            content={post.meta.description}
            isLink={true}
            tags={post.meta.tags}
            link={`/blog/${post.slug}`}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        )) || []}
      </div>

      {(!posts || posts.length === 0) && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <Title as="h3" className="text-2xl mb-2">No posts found</Title>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {tag ? `No posts found for tag "${tag}"` : "No blog posts available yet."}
          </p>
          {tag && (
            <Button asChild>
              <Link to="/">View All Posts</Link>
            </Button>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 pt-8">
          <Button
            variant="outline"
            disabled={page <= 1}
            asChild={page > 1}
          >
            {page > 1 ? (
              <Link to={`?${new URLSearchParams({ ...(tag ? { tag } : {}), page: String(page - 1) }).toString()}`}>
                ← Previous
              </Link>
            ) : (
              <span>← Previous</span>
            )}
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    asChild={pageNum !== page}
                  >
                    {pageNum === page ? (
                      <span>{pageNum}</span>
                    ) : (
                      <Link to={`?${new URLSearchParams({ ...(tag ? { tag } : {}), page: String(pageNum) }).toString()}`}>
                        {pageNum}
                      </Link>
                    )}
                  </Button>
                );
              } else if (
                pageNum === page - 2 ||
                pageNum === page + 2
              ) {
                return <span key={pageNum} className="text-neutral-400">...</span>;
              }
              return null;
            })}
          </div>
          
          <Button
            variant="outline"
            disabled={page >= totalPages}
            asChild={page < totalPages}
          >
            {page < totalPages ? (
              <Link to={`?${new URLSearchParams({ ...(tag ? { tag } : {}), page: String(page + 1) }).toString()}`}>
                Next →
              </Link>
            ) : (
              <span>Next →</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

