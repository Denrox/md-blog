import type { PropsWithChildren } from "react";
import { Container, Link } from "./ui";
import { siteConfig } from "../lib/config";

export function Header({ pages }: { pages: { slug: string; title: string }[] }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:border-neutral-800/50 dark:bg-neutral-950/80 dark:supports-[backdrop-filter]:bg-neutral-950/70">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link 
            to="/" 
            className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            {siteConfig.title}
          </Link>
          <nav className="flex items-center gap-2">
            {pages.map((p) => (
              <Link
                key={p.slug}
                to={`/pages/${p.slug}`}
                variant="ghost"
              >
                {p.title}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-200/50 bg-neutral-50/50 dark:border-neutral-800/50 dark:bg-neutral-900/50">
      <Container className="py-8">
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} {siteConfig.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export function PageShell({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen pt-12 pb-8">
      <div className="animate-fade-in">
        {children}
      </div>
    </main>
  );
}

