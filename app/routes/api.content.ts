import type { Route } from "./+types/api.content";
import { readBlogPosts, readPages } from "~/lib/content.server";

export async function action({ request }: Route.ActionArgs) {
    const url = new URL(request.url);
  const scope = url.searchParams.get("scope");
  const result = {
    blog: scope && scope !== "blog" ? [] : readBlogPosts(),
    pages: scope && scope !== "pages" ? [] : readPages(),
  } as const;
  return Response.json(result);
}

export default function ApiContent() {
  return null;
}

