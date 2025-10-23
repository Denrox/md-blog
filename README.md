# md-blog

A modern blog platform built with React Router v7 and Markdown. Create beautiful content websites using simple Markdown files.

## Features

- **Markdown-based content** - Write posts and pages in Markdown
- **Easy Customization** - Simple configuration system
- **Responsive** - Works on all devices

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd md-blog
npm install
```

### 2. Configure Your Blog

Run the interactive setup script to configure your blog:

```bash
npm run setup
```

Or use npx (if published):

```bash
npx md-blog-setup
```

The setup script will guide you through configuring:
- Site title and branding
- Blog page settings
- SEO metadata
- Footer information

### 3. Start Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your blog!

## Configuration

The setup script modifies `app/lib/config.ts` with your custom values:

```typescript
export const siteConfig = {
  title: "Your Blog Name",
  blog: {
    title: "Blog",
    subtitle: "Your blog description",
  },
  seo: {
    title: "Your Blog - SEO Title",
    description: "Your blog description for search engines",
    keywords: "blog, keywords, seo",
  },
  footer: {
    copyright: "Your Blog Name",
  },
} as const;
```

## Adding Content

### Blog Posts

Create new blog posts in `content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Post description"
keywords: "keyword1, keyword2"
tags: ["tag1", "tag2"]
date: "2024-01-15"
author: "Your Name"
---

Your post content here...
```

### Static Pages

Create new pages in `content/pages/`:

```markdown
---
title: "Page Title"
description: "Page description"
keywords: "page, keywords"
tags: ["page", "static"]
---

Your page content here...
```

## Customization

### Colors

Edit `app/app.css` to customize colors:

```css
:root {
  --color-primary-500: #your-color;
  --color-primary-600: #your-darker-color;
}
```

### Styling

The platform uses Tailwind CSS. Modify components in `app/components/` to change the design.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup` - Configure your blog
- `npm run typecheck` - Run TypeScript checks

## Docker

### Build Docker Image

```bash
docker build -t md-blog .
```

### Run with Docker

```bash
docker run -p 3000:3000 md-blog
```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  md-blog:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

## Technology Stack

- **React Router v7**
- **React**
- **Tailwind CSS**
- **Marked** - Markdown parsing
- **Gray Matter** - Frontmatter parsing

## License

MIT