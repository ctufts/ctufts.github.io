module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByTag("post")
  );

  eleventyConfig.addCollection("archive", (collection) =>
    collection.getFilteredByTag("archive")
  );

  const slugify = (input) =>
    String(input)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tags = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (["post", "archive"].includes(tag)) return;
        tags.add(slugify(tag));
      });
    });
    return [...tags].sort();
  });

  eleventyConfig.addFilter("dateIso", (dateObj) =>
    new Date(dateObj).toISOString().split("T")[0]
  );

  eleventyConfig.addFilter("dateReadable", (dateObj) =>
    new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    })
  );

  eleventyConfig.addFilter("dateRfc822", (dateObj) =>
    new Date(dateObj).toUTCString()
  );

  eleventyConfig.addFilter("xmlEscape", (input) =>
    String(input || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;")
  );

  eleventyConfig.addFilter("truncate", (input, length = 200) => {
    const text = String(input || "");
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + "...";
  });

  eleventyConfig.addFilter("slug", slugify);
  eleventyConfig.addFilter("tagSlug", slugify);
  eleventyConfig.addFilter("hasTag", (tags, tagSlug) =>
    (tags || []).some((t) => slugify(t) === tagSlug)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "dist"
    },
    serverOptions: {
      host: "127.0.0.1",
      port: 8081
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
