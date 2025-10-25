import { useLoaderData } from "react-router";
import { readBlogPosts } from "~/lib/content.server";
import { Title, Link, Badge, Button, PageHeading } from "~/components/ui";

export async function loader({ params }: { params: { slug: string } }) {
  const posts = readBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) throw new Response("Not Found", { status: 404 });
  return { post } as const;
}

export function meta({ data }: { data: { post: { meta: { title: string; description?: string; keywords?: string } } } }) {
  const { post } = data;
  return [
    { title: post.meta.title },
    { name: "description", content: post.meta.description || "" },
    { name: "keywords", content: post.meta.keywords || "" },
  ];
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      <PageHeading title={post.meta.title} subtitle={post.meta.description} />
      {post.meta.tags && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Array.isArray(post.meta.tags) ? post.meta.tags : String(post.meta.tags).split(","))
            .map((tag) => (
              <Badge key={tag.trim()} variant="accent" className="text-sm">
                #{tag.trim()}
              </Badge>
            ))}
        </div>
      )}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-code:text-accent-600 dark:prose-code:text-accent-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-700 prose-blockquote:border-l-primary-500 prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-900/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/">
                ← Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>Published on {post.meta.date}</span>
          </div>
        </div>
      </footer>
    </article>
  );
}

