/** @type {import('next').NextConfig} */
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
      // Next.js inline scripts + Google Analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Google Fonts, self, data URIs for Leaflet markers
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self, Unsplash, data URIs (Leaflet), blob
      "img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org",
      // Leaflet map tiles + Google Analytics
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      // Booking widget iframe
      "frame-src https://norwich-booking.vercel.app",
      // OpenStreetMap tiles for Leaflet
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
