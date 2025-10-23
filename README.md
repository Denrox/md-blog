# md-blog

A blog platform built with React Router v7 and Markdown. Create beautiful content websites using simple Markdown files.

## Features

- **Markdown-based content** - Write posts and pages in Markdown
- **Easy Customization** - Simple configuration system
- **Responsive** - Works on all devices

## Quick Start

Run the interactive setup script to configure your blog:

```bash
npx md-blog-setup
```

Or specify a directory:

```bash
npx md-blog-setup ./my-awesome-blog
```

Or use an absolute path:

```bash
npx md-blog-setup /path/to/your-blog
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