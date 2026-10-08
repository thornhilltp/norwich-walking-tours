// Contentsquare (heatmaps + session replay). Loads only after the visitor
// accepts cookies — called from components/CookieConsent.tsx. UK PECR treats
// session recording as non-essential, so declined visitors never load it.
const CONTENTSQUARE_TAG_ID = "05ec4e7755701";

let injected = false;

export async function loadContentsquare() {
  if (injected || typeof window === "undefined") return;
  injected = true;
  // Dynamic import keeps the SDK out of the bundle for visitors who decline.
  const { injectContentsquareScript } = await import("@contentsquare/tag-sdk");
  injectContentsquareScript({ clientId: CONTENTSQUARE_TAG_ID });
}
