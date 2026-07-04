import type { MetadataRoute } from "next";

// NOTE: no lastModified — the previous `new Date()` claimed every page
// changed on every deploy, which teaches Google to distrust the sitemap.
// Omitting the field is valid; Google falls back to its own crawl signals.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.norwichfreewalkingtours.co.uk";

  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/tour`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/what-is-a-free-tour`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/book`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/private-tours`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/things-to-do/free`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/explore`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/explore/where-to-stay-norwich`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/terms`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
