import type { Route } from "./+types/index";
import { useLoaderData } from "react-router";
import { readPages } from "~/lib/content.server";
import { Link, Title, Subtitle } from "~/components/ui";

export async function loader() {
  const pages = readPages();
  return { pages } as const;
}

export default function PagesIndex() {
  const { pages } = useLoaderData<typeof loader>();
  return (
    <div className="space-y-6">
      <div>
        <Title>Pages</Title>
        <Subtitle>Static content pages</Subtitle>
      </div>
      <ul className="list-disc pl-6">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link to={`/pages/${p.slug}`} className="text-lg font-medium">
              {p.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

