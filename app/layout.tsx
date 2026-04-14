import type { Metadata } from "next";
import { Caveat, Lora } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { StickyBookCTA } from "@/components/StickyBookCTA";
import { PageTransition } from "@/components/PageTransition";
import { CookieConsent } from "@/components/CookieConsent";

// !! REPLACE GTM-XXXXXXX with your real Google Tag Manager container ID !!
// Get this from tagmanager.google.com → your container → Admin → Install GTM
const GTM_ID = "GTM-PTF5DB67";

// ── Google Fonts ─────────────────────────────────────────────────────────────
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Norwich Free Walking Tour | See the real Norwich with a local",
  description:
    "A near-daily pay what you want walking tour of Norwich. 1h 45m. English language. Meets at The Forum, rain or shine. Book your spot free. Most guests tip £15–£20.",
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/Favicon.png", type: "image/png" },
    ],
    apple: "/Favicon.png",
  },
  openGraph: {
    title: "Norwich Free Walking Tour",
    description:
      "See the real Norwich with a local. Near daily. Book your spot free. Pay what it was worth at the end.",
    url: "https://www.norwichfreewalkingtours.co.uk",
    siteName: "Norwich Free Walking Tour",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Norwich Free Walking Tour — See the real Norwich with a local",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norwich Free Walking Tour",
    description: "See the real Norwich with a local. Near daily. Book free.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://www.norwichfreewalkingtours.co.uk"),
};

// ── JSON-LD Schema ────────────────────────────────────────────────────────────
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Norwich Free Walking Tour",
    description:
      "A near-daily pay what you want walking tour revealing the real Norwich. 1h 45m. English language. Meets at The Forum. Rain or shine.",
    url: "https://www.norwichfreewalkingtours.co.uk",
    touristType: ["Culture Seekers", "History Buffs", "Independent Travellers"],
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
      description: "Book free. Pay what it was worth at the end. Most guests tip £15–£20. Cards, Apple Pay, Google Pay, and cash accepted.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "5",
      bestRating: "5",
    },
    event: {
      "@type": "Event",
      name: "Norwich Free Walking Tour",
      duration: "PT1H45M",
      inLanguage: "en",
      eventSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1D",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.norwichfreewalkingtours.co.uk/#business",
    name: "Norwich Free Walking Tour",
    description: "Daily guided walking tours of Norwich. Pay what you want. English language. Meets at The Forum, Millennium Plain.",
    url: "https://www.norwichfreewalkingtours.co.uk",
    telephone: "",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "5",
      bestRating: "5",
    },
    sameAs: [
      "https://www.instagram.com/norwichfreetour",
    ],
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
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              gtag('js', new Date());
            `,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
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
        <Nav />
        <PageTransition>{children}</PageTransition>
        <StickyBookCTA />
        {/* CookieConsent pushes consent signals to dataLayer — GTM reads them to control GA4 */}
        <CookieConsent />
      </body>
    </html>
  );
}
