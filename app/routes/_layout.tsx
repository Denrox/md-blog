import type { Route } from "./+types/_layout";
import { Outlet, useLoaderData } from "react-router";
import { Header, Footer, PageShell } from "~/components/layout";
import { Container } from "~/components/ui";
import { readPages } from "~/lib/content.server";
import { siteConfig } from "~/lib/config";

export async function loader() {
  const pages = readPages().map((p) => ({ slug: p.slug, title: p.meta.title }));
  return { pages } as const;
}

export function meta() {
  return [
    { title: siteConfig.seo.title },
    { name: "description", content: siteConfig.seo.description },
    { name: "keywords", content: siteConfig.seo.keywords },
  ];
}

export default function Layout() {
  const { pages } = useLoaderData<typeof loader>();
  return (
    <>
      <Header pages={pages} />
      <PageShell>
        <Container>
          <Outlet />
        </Container>
      </PageShell>
      <Footer />
    </>
  );
}

