import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /guide is intentionally unlisted — distributed via post-tour QR card
      // and booking-confirmation email, not via search. Page also carries a
      // noindex meta tag (app/guide/page.tsx) and is excluded from sitemap.
      disallow: ["/guide"],
    },
    sitemap: "https://www.norwichfreewalkingtours.co.uk/sitemap.xml",
  };
}
