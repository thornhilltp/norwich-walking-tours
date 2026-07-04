import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /guide stays out of search via its noindex meta tag
      // (app/guide/page.tsx) + sitemap exclusion. Deliberately NOT
      // disallowed here: blocking the crawl would stop Google from ever
      // seeing the noindex, letting the URL index as a link-only result.
    },
    sitemap: "https://www.norwichfreewalkingtours.co.uk/sitemap.xml",
  };
}
