const path = require("path");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const tocPlugin = require("eleventy-plugin-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig, options = {}) {
  const themePath = options.themePath || "vendor/docs-theme";
  
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(tocPlugin, {
    tags: ['h2', 'h3'],
    wrapper: 'div',
    wrapperClass: 'toc-content'
  });

  // Markdown configuration
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  const md = markdownIt(mdOptions)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink()
    })
    .use(markdownItAttrs);
    
  // Shortcodes
  eleventyConfig.addPairedShortcode("disclosure", function(content, title) {
    return `
<details class="apple-disclosure">
  <summary class="disclosure-summary">
    <span class="disclosure-title">${title}</span>
    <svg class="disclosure-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  </summary>
  <div class="disclosure-content">
    ${md.render(content)}
  </div>
</details>`;
  });

  eleventyConfig.addPairedShortcode("callout", function(content, type = "note") {
    const labels = {
      note: "Note",
      important: "Important",
      warning: "Warning"
    };
    return `
<div class="callout callout-${type}">
  <div class="callout-label">${labels[type] || "Note"}</div>
  <div class="callout-content">
    ${md.render(content)}
  </div>
</div>`;
  });

  // Filters
  eleventyConfig.addFilter("filterByParent", function(collection, parent, currentUrl) {
    if (!parent || !collection) return [];
    return collection.filter(item => 
      item.data.eleventyNavigation && 
      item.data.eleventyNavigation.parent === parent && 
      item.url !== currentUrl
    );
  });

  // Passthrough Copy
  const cssPath = path.join(themePath, "src/css");
  const jsPath = path.join(themePath, "src/js");
  const imagesPath = path.join(themePath, "src/images");
  
  eleventyConfig.addPassthroughCopy({ [cssPath]: "css" });
  eleventyConfig.addPassthroughCopy({ [jsPath]: "js" });
  eleventyConfig.addPassthroughCopy({ [imagesPath]: "images" });

  // Layout Aliases
  eleventyConfig.addLayoutAlias("base.njk", path.join(themePath, "src/_includes/base.njk"));
  eleventyConfig.addLayoutAlias("home.njk", path.join(themePath, "src/_includes/home.njk"));
  eleventyConfig.addLayoutAlias("category.njk", path.join(themePath, "src/_includes/category.njk"));
};
