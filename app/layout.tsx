import type { Metadata } from "next";
import { Caveat, Lora } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { StickyBookCTA } from "@/components/StickyBookCTA";
import { CookieConsent } from "@/components/CookieConsent";
import { MotionProvider } from "@/components/MotionProvider";

// !! REPLACE GTM-XXXXXXX with your real Google Tag Manager container ID !!
// Get this from tagmanager.google.com → your container → Admin → Install GTM
const GTM_ID = "GTM-PTF5DB67";

// ── Google Fonts ─────────────────────────────────────────────────────────────
// `next/font/google` handles preload, self-hosting, and FOIT/FOUT mitigation
// automatically. `preload: true` (default) injects <link rel="preload"> for
// each font file used on the current route — explicit here for clarity.
// Caveat is the hero headline font, so preload matters for LCP.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
  preload: true,
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
  preload: true,
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Norwich Free Walking Tours | Daily, Local-Led, Free to Book",
  description:
    "Daily 2-hour walking tour of Norwich. Free to book, tip what it was worth. Meets at The Forum, rain or shine. Local guides. Max 15 per group.",
  keywords: [
    "free walking tour Norwich",
    "Norwich walking tours",
    "things to do in Norwich",
    "Elm Hill tour",
    "Norwich Cathedral tour",
    "Norwich Lanes",
    "free tour Norwich",
    "pay what you want Norwich",
    "Norwich guided tour",
    "what to do in Norwich",
  ],
  alternates: {
    canonical: "https://www.norwichfreewalkingtours.co.uk",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Norwich Free Walking Tours",
    description:
      "See the real Norwich with a local. Daily. Book your spot free. Pay what it was worth at the end.",
    url: "https://www.norwichfreewalkingtours.co.uk",
    siteName: "Norwich Free Walking Tours",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Norwich Free Walking Tours. See the real Norwich with a local.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norwich Free Walking Tours",
    description: "See the real Norwich with a local. Daily. Book free.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://www.norwichfreewalkingtours.co.uk"),
};

// ── JSON-LD Schema ────────────────────────────────────────────────────────────
// NOTE (2026-07): no aggregateRating/review on LocalBusiness. Google ignores
// self-served ratings on LocalBusiness/Organization (2019 policy) and
// republishing Google's own reviews violates their guidelines. Ratings live
// as visible on-page content + llms.txt instead.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.norwichfreewalkingtours.co.uk/#website",
    name: "Norwich Free Walking Tours",
    alternateName: "The Real Norwich Tour",
    url: "https://www.norwichfreewalkingtours.co.uk",
    inLanguage: "en-GB",
    publisher: { "@id": "https://www.norwichfreewalkingtours.co.uk/#localbusiness" },
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Norwich Free Walking Tours",
    description:
      "A daily pay what you want walking tour revealing the real Norwich. 2 hours, about 2.5 km. English language. Starts at The Forum, finishes at Norwich Market. Rain or shine.",
    url: "https://www.norwichfreewalkingtours.co.uk",
    audienceType: ["Culture Seekers", "History Buffs", "Independent Travellers"],
    inLanguage: "en",
    location: {
      "@type": "Place",
      name: "The Forum, Norwich",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Millennium Plain",
        addressLocality: "Norwich",
        postalCode: "NR2 1TF",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 52.6278,
        longitude: 1.2983,
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      description: "Book free. Pay what it was worth at the end. Most guests tip £10–£20. Cards, Apple Pay, Google Pay, and cash accepted.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    // Canonical Person @id — must match app/about/page.tsx's Person schema
    // so Google/AI merge them into one entity.
    "@id": "https://www.norwichfreewalkingtours.co.uk/about#tom",
    name: "Tom Thornhill",
    jobTitle: "Founder and Guide",
    description:
      "Founder and guide of Norwich Free Walking Tours. Norwich resident, lived in the city for over a decade. Runs the daily walking tour of the medieval city centre.",
    url: "https://www.norwichfreewalkingtours.co.uk/about",
    worksFor: {
      "@id": "https://www.norwichfreewalkingtours.co.uk/#localbusiness",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.norwichfreewalkingtours.co.uk/#localbusiness",
    name: "Norwich Free Walking Tours",
    description: "Daily guided walking tours of Norwich. Pay what you want. English language. Meets at The Forum, Millennium Plain.",
    url: "https://www.norwichfreewalkingtours.co.uk",
    image: "https://www.norwichfreewalkingtours.co.uk/og-image.jpg",
    priceRange: "£0–£20",
    currenciesAccepted: "GBP",
    paymentAccepted: "Card, Apple Pay, Google Pay, Cash",
    openingHours: "Mo-Su",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Millennium Plain",
      addressLocality: "Norwich",
      postalCode: "NR2 1TF",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.6278,
      longitude: 1.2983,
    },
    // sameAs — cross-platform identity for entity resolution. AI models +
    // Google use these to confirm we're the same entity across the web.
    // The share.google URL is Google's canonical share link for our
    // Knowledge Graph entity (machine ID /g/11z4zrm5_q). Replace with a
    // cleaner g.page short URL or maps.app.goo.gl link if Tom generates one.
    sameAs: [
      "https://www.instagram.com/norwichfreewalkingtours",
      "https://www.tiktok.com/@norwichfreewalkingtours",
      "https://www.facebook.com/norwichfreewalkingtours",
      "https://share.google/N1peOKH6mk3qrHMRt",
      "https://www.tripadvisor.com/Attraction_Review-g186342-d34359588-Reviews-Norwich_Free_Walking_Tours-Norwich_Norfolk_East_Anglia_England.html",
      "https://www.freetour.com/norwich",
      "https://www.guruwalk.com/walks/69964-norwich-free-walking-tour-the-real-norwich-with-a-local",
      "https://www.visitnorwich.co.uk/service/norwich-free-walking-tours/",
    ],
    founder: { "@id": "https://www.norwichfreewalkingtours.co.uk/about#tom" },
    employee: { "@id": "https://www.norwichfreewalkingtours.co.uk/about#tom" },
  },
];

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${caveat.variable} ${lora.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Consent Mode v2 — sets defaults BEFORE GTM loads so no tags fire without consent */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // EEA + UK + Switzerland — consent required (GDPR / UK GDPR / nFADP).
              // Everything denied until the cookie banner collects a choice.
              gtag('consent', 'default', {
                'region': ['EEA', 'GB', 'CH'],
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              // Rest of world — consent not legally required for analytics or ads.
              // Granted so Google Ads Conversion Linker can write _gcl_aw and
              // GA4 → Ads conversion ingestion has the user-level signal it needs.
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
              });
              gtag('js', new Date());
            `,
          }}
        />
        {/* Warm the GTM origin before the loader below fires, so the async
            gtm.js fetch doesn't pay DNS+TLS on the critical path. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Google Tag Manager — MUST run during head parse, not after hydration.
            Google Ads attribution depends on the Google Tag reading `gclid` from
            the landing URL and writing the _gcl_aw first-party cookie. Between
            11 Jul and 19 Aug 2026 this was deferred (next/script
            strategy="afterInteractive"), which put it behind the full JS bundle
            — ad visitors tapped through to /book before it ever ran, the gclid
            was lost, and Ads-tracked conversions fell from ~52% of real bookings
            to ~8%. gtm.js is injected with async=true, so loading it here never
            blocks parsing or rendering. Consent Mode defaults above still run
            first, so consent ordering is preserved. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Early connection to the booking widget host. The hero iframe now
            renders in the server HTML (see BookingFrame `priority`), so the
            browser discovers it during parse — this preconnect warms the
            DNS+TLS handshake even earlier, and also covers the below-the-fold
            lazy embed. */}
        <link rel="preconnect" href="https://norwich-booking.vercel.app" />
        {/* Best-effort warm-up for the widget's database origin (Supabase).
            dns-prefetch only — the connection isn't guaranteed to be used, so
            we resolve DNS ahead of time without committing a full TLS handshake. */}
        <link rel="dns-prefetch" href="https://qjinckfpvuoxllpwcadw.supabase.co" />
      </head>
      <body className="antialiased sticky-cta-clearance">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MotionProvider>
          <Nav />
          {/* No PageTransition wrapper — it SSR'd every page at opacity:0
              until hydration, gating first paint on the full JS bundle
              (removed 2026-07-04, the site-wide speed bug). */}
          {children}
          <StickyBookCTA />
          {/* CookieConsent pushes consent signals to dataLayer — GTM reads them to control GA4 */}
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
