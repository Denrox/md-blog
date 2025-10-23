import { useLoaderData } from "react-router";
import { readPages } from "~/lib/content.server";
import { Title, Link, Badge, Button, PageHeading } from "~/components/ui";

export async function loader({ params }: { params: { slug: string } }) {
  const pages = readPages();
  const page = pages.find((p) => p.slug === params.slug);
  if (!page) throw new Response("Not Found", { status: 404 });
  return { page } as const;
}

export function meta({ data }: { data: { page: { meta: { title: string; description?: string; keywords?: string } } } }) {
  const { page } = data;
  return [
    { title: page.meta.title },
    { name: "description", content: page.meta.description || "" },
    { name: "keywords", content: page.meta.keywords || "" },
  ];
}

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      <PageHeading title={page.meta.title} subtitle={page.meta.description} />
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-code:text-accent-600 dark:prose-code:text-accent-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-700 prose-blockquote:border-l-primary-500 prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-900/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg">
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </article>
  );
}

