import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import dayjs from "dayjs";
import hljs from "highlight.js";

export type MarkdownMeta = {
  title: string;
  date: string;
  description?: string;
  keywords?: string[] | string;
  tags?: string[] | string;
  social?: boolean;
};

export type MarkdownItem = {
  slug: string;
  meta: MarkdownMeta;
  html: string;
};

const CONTENT_DIR = path.resolve(process.cwd(), "content");

// Configure marked with highlight.js
const renderer = new marked.Renderer();
renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const codeText = text;
  const language = lang;
  
  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(codeText, { language });
      return `<pre><code class="hljs language-${language}">${highlighted.value}</code></pre>`;
    } catch (err) {
      const highlighted = hljs.highlightAuto(codeText);
      return `<pre><code class="hljs">${highlighted.value}</code></pre>`;
    }
  }
  const highlighted = hljs.highlightAuto(codeText);
  return `<pre><code class="hljs">${highlighted.value}</code></pre>`;
};

marked.setOptions({
  renderer: renderer,
} as any);

function getDir(name: "blog" | "pages") {
  return path.join(CONTENT_DIR, name);
}

function toSlug(filename: string) {
  return filename.replace(/\.md$/i, "");
}

export function readMarkdownDir(name: "blog" | "pages"): MarkdownItem[] {
  const dir = getDir(name);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".md"));

  return files.map((file) => {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const html = marked.parse(content);
    return {
      slug: toSlug(file),
      meta: data as MarkdownMeta,
      html: typeof html === "string" ? html : String(html),
    };
  });
}

export function readBlogPosts(): MarkdownItem[] {
  const posts = readMarkdownDir("blog");
  return posts.sort((a, b) => {
    const dateA = dayjs(a.meta.date);
    const dateB = dayjs(b.meta.date);
    return dateB.diff(dateA);
  });
}

export function readPages(): MarkdownItem[] {
  return readMarkdownDir("pages");
}

export function readHome(): MarkdownItem | null {
  const filePath = path.join(CONTENT_DIR, "home.md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content);
  return {
    slug: "home",
    meta: data as MarkdownMeta,
    html: typeof html === "string" ? html : String(html),
  };
}

export function collectTags(items: MarkdownItem[]): string[] {
  const tagSet = new Set<string>();
  for (const item of items) {
    const tags = item.meta.tags;
    if (!tags) continue;
    const arr = Array.isArray(tags) ? tags : String(tags).split(",");
    for (const t of arr) tagSet.add(t.trim());
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

