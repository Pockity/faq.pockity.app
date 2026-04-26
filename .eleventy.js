const rssPlugin = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const path = require("path");
const docsTheme = require("./vendor/docs-theme");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  
  // Add the DZDocsTheme plugin
  eleventyConfig.addPlugin(docsTheme, {
    themePath: "vendor/docs-theme"
  });
  // Filters
  eleventyConfig.addFilter("dateToRfc3339", rssPlugin.dateToRfc3339);
  eleventyConfig.addFilter("dateToRfc822", rssPlugin.dateRfc822);
  eleventyConfig.addFilter("getNewestCollectionItemDate", rssPlugin.getNewestCollectionItemDate);
  eleventyConfig.addFilter("absoluteUrl", rssPlugin.absoluteUrl);

  eleventyConfig.addFilter("rssLastUpdatedDate", (collection) => {
    return rssPlugin.dateToRfc3339(rssPlugin.getNewestCollectionItemDate(collection));
  });

  eleventyConfig.addFilter("rssDate", rssPlugin.dateToRfc3339);
  
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("jsonify", (obj) => {
    return JSON.stringify(obj);
  });

  eleventyConfig.addFilter("absolute_url", (url) => {
    const isProduction = process.env.ELEVENTY_ENV === "production";
    const baseUrl = isProduction ? "https://faq.pockity.app" : "http://localhost:8080";
    if (url.startsWith("http")) return url;
    return new URL(url, baseUrl).href;
  });

  eleventyConfig.addFilter("relative_url", (url) => {
    return url;
  });

  // Server options
  eleventyConfig.setServerOptions({
    domDiff: false
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/videos");
  eleventyConfig.addPassthroughCopy("assets/css/*.css");

  // Watch targets
  eleventyConfig.addWatchTarget(path.join(__dirname, "assets/css"));

  // Layout aliases
  eleventyConfig.addLayoutAlias("post", "post.html");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("category", "category.njk");
  eleventyConfig.addLayoutAlias("default", "base.njk");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: 'excerpt',
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["md", "html", "njk", "liquid"]
  };
};
