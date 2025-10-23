---
title: "How to Add New Blog Post?"
description: "Quick guide to create and publish new blog posts on your platform."
keywords: "blog post, content, markdown, writing, tutorial"
tags: ["tutorial", "blog", "content", "markdown", "writing"]
date: "2024-01-15"
author: "Platform Guide"
---

Creating a new blog post is easy! Just add a new Markdown file to the `content/blog/` directory.

## Step 1: Create the File

Create a new `.md` file in `content/blog/`:

```
content/blog/your-post-slug.md
```

## Step 2: Add Frontmatter

Include the required metadata at the top:

```yaml
---
title: "Your Blog Post Title"
description: "Brief description of your post"
keywords: "keyword1, keyword2, keyword3"
tags: ["tag1", "tag2", "tag3"]
date: "2024-01-15"
author: "Your Name"
---

Your post content starts here...
```

## Step 3: Write Your Post

Use Markdown for formatting:

```markdown
## Introduction

Start with an engaging introduction...

## Main Content

Break your content into sections:

### Subsection

- Use bullet points
- **Bold important text**
- *Italicize for emphasis*
- Add [links](https://example.com)

### Code Examples

```javascript
const example = "Hello World";
```

## Conclusion

Wrap up your post with a conclusion...
```

## Step 4: Publish

Your post will automatically appear at:

```
/blog/your-post-slug
```

## Frontmatter Fields

- `title`: Post title (required)
- `description`: Post description (optional)
- `keywords`: SEO keywords (optional)
- `tags`: Content tags for filtering (optional)
- `date`: Publication date (optional)
- `author`: Author name (optional)

## Tips

- Use descriptive slugs for filenames
- Don't include the post title as H1 in content
- Use tags for better organization and filtering
- Write engaging descriptions for better SEO
- Keep your content well-structured with headings

## Tag Filtering

Posts with tags will automatically appear in the tag filter on the home page. Users can click tags to filter posts by topic.

That's it! Your new blog post is live and ready to be discovered.
