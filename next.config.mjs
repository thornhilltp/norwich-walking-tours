/** @type {import('next').NextConfig} */
// Next.js dev mode (React Refresh / hot reload) uses eval(), so we have to
// allow 'unsafe-eval' locally or hydration crashes and the page goes blank.
// Production Next.js compiles real JS, doesn't need it, so we keep the
// stricter CSP there (matches CLAUDE.md T4 decision).
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  // Contentsquare tag (loaded only after cookie consent)
  "https://*.contentsquare.net",
  "https://app.contentsquare.com",
].join(" ");

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + Google Tag Manager + Google Analytics.
      // Production omits 'unsafe-eval'. Dev adds it so React Refresh can run.
      // Inline scripts allowed via 'unsafe-inline' (GTM bootstrap needs it;
      // migrating to nonces would be a larger refactor).
      `script-src ${scriptSrc}`,
      // Google Fonts, self
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self, Unsplash, data URIs, blob.
      // googletagmanager.com needed for GTM's image beacon pings (/td, /a).
      // google.com + google.co.uk for Google Ads conversion image beacons.
      "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://www.google.com https://www.google.co.uk https://*.contentsquare.net",
      // Google Analytics + GTM + Google Ads (conversion + remarketing endpoints)
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://www.googletagmanager.com https://www.google.com https://www.google.co.uk https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://*.contentsquare.net https://*.contentsquare.com",
      // Booking widget iframe
      "frame-src https://norwich-booking.vercel.app",
      "worker-src blob:",
      "child-src blob:",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // /about (old solo-Tom page) retired in favour of the collective page,
      // which moved /about-us -> /our-guides on 2026-09-27 to match the menu
      // label. Both old URLs 301 straight to the new one (no chain), keeping
      // indexed equity + external backlinks.
      { source: "/about", destination: "/our-guides", permanent: true },
      { source: "/about-us", destination: "/our-guides", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
