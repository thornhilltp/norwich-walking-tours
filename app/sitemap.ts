import type { MetadataRoute } from "next";
import { CONTENT_READY } from "@/lib/best-in-norwich";

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
      url: `${base}/about-us`,
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
    // /best-in-norwich stays out until the real winners land — CONTENT_READY
    // also drives the noindex tag on the page itself.
    ...(CONTENT_READY
      ? [
          {
            url: `${base}/best-in-norwich`,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          {
            url: `${base}/best-in-norwich/vote`,
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      : []),
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
