# DZDocsTheme

## Project Goals
- Create a modern, documentation-focused 11ty theme mimicking Apple's Developer Documentation.
- High-fidelity typography (San Francisco system fonts), precise alignments, and responsive media handling.
- Optimized for FAQ and developer guide content (e.g., `faq.pockity.app`, `faq.elytra.app`).

## Tech Stack
- **SSG:** Eleventy (11ty)
- **Templating:** Nunjucks (`.njk`)
- **Styling:** Plain CSS (CSS Variables, Grid, Flexbox)
- **Markdown:** `markdown-it` with anchor and attribute plugins.

## Layout Standards
- **Global Header:** Navigation and branding.
- **Left Sidebar:** Hierarchical, collapsible navigation.
- **Main Content:** Centered column (max-width: 800px) with optimal readability.
- **Components:** Styled callouts (Note, Important, Warning) and syntax-highlighted code blocks.
- **Media:** Responsive images and videos with proper aspect ratios and text sizing.

## Project Structure
- `src/`: Source files.
  - `_includes/`: Layouts and components.
  - `css/`: Plain CSS files.
  - `js/`: Client-side interactivity.
  - `data/`: Global data files.
- `_site/`: Output directory (built site).
- `.eleventy.js`: Configuration.
