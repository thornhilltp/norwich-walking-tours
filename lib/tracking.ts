type TrackingPayload = Record<string, unknown>;

export function trackEvent(event: string, data?: TrackingPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
