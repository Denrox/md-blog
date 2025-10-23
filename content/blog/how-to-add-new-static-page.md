---
title: "How to Add New Static Page?"
description: "Step-by-step guide to create new static pages for your blog platform."
keywords: "static page, content, markdown, pages, tutorial"
tags: ["tutorial", "pages", "content", "markdown", "static"]
date: "2024-01-15"
author: "Platform Guide"
---

Adding a new static page is simple! Just create a new Markdown file in the `content/pages/` directory.

## Step 1: Create the File

Create a new `.md` file in `content/pages/`:

```
content/pages/your-page-name.md
```

## Step 2: Add Frontmatter

Start your file with the required metadata:

```yaml
---
title: "Your Page Title"
description: "Brief description of your page"
keywords: "keyword1, keyword2, keyword3"
tags: ["tag1", "tag2", "tag3"]
date: "2024-01-15"
author: "Your Name"
---

Your page content starts here...
```

## Step 3: Write Content

Add your content using Markdown:

```markdown
## Section Heading

Your content goes here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Lists
- Code blocks

### Subsection

More content...
```

## Step 4: Access Your Page

Your page will be automatically available at:

```
/pages/your-page-name
```

## Required Frontmatter Fields

- `title`: Page title (required)
- `description`: Page description (optional)
- `keywords`: SEO keywords (optional)
- `tags`: Content tags (optional)
- `date`: Publication date (optional)
- `author`: Author name (optional)

## Tips

- Use kebab-case for filenames (e.g., `my-awesome-page.md`)
- Don't include the page title as an H1 in the content (it's displayed automatically)
- Use descriptive filenames that match your content
- Test your page by visiting the URL after saving

That's it! Your new static page is ready to go.
