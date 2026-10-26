// Microsoft Clarity (heatmaps + session replay). Loads only after the visitor
// accepts cookies — called from components/CookieConsent.tsx. UK PECR treats
// session recording as non-essential, so declined visitors never load it.
// Project ID from clarity.microsoft.com → Settings → Overview.
const CLARITY_PROJECT_ID = "z3q0b7e320";
// Only record the live site, so localhost and Vercel preview visits stay out
// of the heatmaps.
const LIVE_HOST = "www.norwichfreewalkingtours.co.uk";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

let injected = false;

export function loadClarity() {
  if (injected || typeof window === "undefined" || !CLARITY_PROJECT_ID) return;
  if (window.location.hostname !== LIVE_HOST) return;
  injected = true;

  // Microsoft's standard snippet: queue calls until the tag arrives.
  const clarity: ClarityFn =
    window.clarity ||
    function (...args: unknown[]) {
      (clarity.q = clarity.q || []).push(args);
    };
  window.clarity = clarity;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);

  // UK/EEA visitors need an explicit consent signal or Clarity runs without
  // cookies (every page view becomes a new session). Analytics only: ad
  // storage stays denied so Microsoft can't use the data for its ads.
  clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
}
