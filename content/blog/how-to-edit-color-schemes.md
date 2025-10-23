---
title: "How to Edit Color Schemes?"
description: "Learn how to customize the color scheme of your blog platform with simple CSS custom properties."
keywords: "color scheme, customization, css, theming, design"
tags: ["tutorial", "customization", "css", "colors", "theming"]
date: "2024-01-15"
author: "Platform Guide"
---

The blog platform uses CSS custom properties for easy color customization. You can modify the color scheme by editing the `app/app.css` file.

## Quick Color Changes

### Primary Colors
Update the primary color palette in the `:root` section:

```css
:root {
  --color-primary-500: #your-color;
  --color-primary-600: #your-darker-color;
}
```

### Background Colors
Change the overall theme colors:

```css
:root {
  --bg-primary: #your-background;
  --bg-secondary: #your-card-background;
  --text-primary: #your-text-color;
}
```

## Dark Mode Colors

For dark mode customization, modify the `.dark` section:

```css
.dark {
  --bg-primary: #your-dark-background;
  --bg-secondary: #your-dark-card;
  --text-primary: #your-dark-text;
}
```

## Available Color Variables

- `--bg-primary`: Main background color
- `--bg-secondary`: Card/container backgrounds
- `--text-primary`: Main text color
- `--text-secondary`: Secondary text color
- `--border-color`: Border colors
- `--color-primary-*`: Primary color palette (50-950)

## Tips

- Use color contrast checkers to ensure accessibility
- Test both light and dark modes
- Keep the color palette consistent across all variables
- Consider using CSS color functions like `hsl()` for easier adjustments

That's it! Your color changes will be applied immediately across the entire platform.
