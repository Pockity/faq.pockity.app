# DZDocs Theme

A modern, documentation-focused Eleventy (11ty) theme designed to perfectly mirror the Apple Support User Guide aesthetic.

## Features

- **Apple Support Aesthetic:** High-fidelity recreation of the Pages User Guide, including centered hero sections, alternating feature rows, and clean, readable typography.
- **Two Distinct Layouts:** Optimized 'Home' layout for landing pages and 'Base' layout for standard documentation articles.
- **Interactive Disclosures:** Native-feeling accordions using the `disclosure` shortcode for collapsible content.
- **Automatic "See Also":** Contextual sibling links automatically generated for articles in the same category.
- **Built-in Callouts:** Styled Note, Important, and Warning blocks.
- **Dark Mode Support:** Fully adaptive theme that respects system appearance settings.

## Usage

### 1. Layouts

#### `home`
Used for the landing page of your documentation guide.
```markdown
---
layout: home.njk
title: My Project
---
```

#### `base`
Used for standard documentation articles.
```markdown
---
layout: base.njk
title: My Article
eleventyNavigation:
  key: My Article
  parent: Category Name
  order: 1
---
```

### 2. Custom Shortcodes

#### Disclosure (Accordion)
```njk
{% disclosure "What is this?" %}
This is a collapsible section that reveals more information when clicked.
{% enddisclosure %}
```

#### Callouts
```njk
{% callout "note" %} This is a note. {% endcallout %}
{% callout "important" %} This is important. {% endcallout %}
{% callout "warning" %} This is a warning. {% endcallout %}
```

## Customization

### Adding Custom Stylesheets
You can easily extend or override the theme's default styles.

1. **Create your CSS file:** For example, create `src/css/custom.css`.
2. **Link it in your layout:** Override the layout files (`src/_includes/base.njk` or `src/_includes/home.njk`) to include your stylesheet after the default one:
   ```html
   <link rel="stylesheet" href="/css/styles.css">
   <link rel="stylesheet" href="/css/custom.css">
   ```
3. **Redefine Variables:** You can change theme colors by redefining CSS variables in your `custom.css`:
   ```css
   :root {
     --link-color: #ff2d55; /* Change standard blue to pink */
     --font-family: "Your Custom Font", sans-serif;
   }
   ```

### Overriding Local Assets
The theme uses specific assets (icons, images) which you can replace by adding files with the same names to your project's `src/images` or `src/css` folders, ensuring they are correctly mapped in your `.eleventy.js` configuration.

## Development

```bash
npm install
npm run build # Build the site to _site/
npm run serve # Build and serve with hot-reloading
```
