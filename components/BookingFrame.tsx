"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/tracking";

const WIDGET_ORIGIN = "https://norwich-booking.vercel.app";
const RESIZE_EVENT = "norwich-widget-resize";
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 2000;
// Attribution params forwarded from this page's URL into the iframe src.
// utm_* are standard. matchtype + network are Google Ads ValueTrack outputs
// (set on the campaign's Final URL suffix) — the widget persists them as
// booking-row columns for keyword-leak diagnostics and channel verification.
const FORWARD_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "matchtype",
  "network",
] as const;

// Build the iframe src with UTMs forwarded from this page's URL + referrer.
// The iframe sets referrerPolicy="origin", so inside the booking widget,
// document.referrer is always this marketing site — useless for attribution.
// We synthesise utm_source/utm_medium from this page's own document.referrer
// and pass it through as a URL param so the widget gets real attribution.
function buildWidgetSrc(): string {
  if (typeof window === "undefined") return `${WIDGET_ORIGIN}/`;

  const params = new URLSearchParams();
  const urlParams = new URLSearchParams(window.location.search);

  for (const key of FORWARD_KEYS) {
    const v = urlParams.get(key);
    if (v) params.set(key, v);
  }

  // Fallback: synthesise utm_source from referrer when no explicit UTM tag.
  // Skip self-referrers (intra-site navigation on the marketing host).
  if (!params.has("utm_source") && document.referrer) {
    try {
      const refHost = new URL(document.referrer).hostname.toLowerCase();
      if (!refHost.endsWith("norwichfreewalkingtours.co.uk")) {
        params.set("utm_source", refHost);
        params.set("utm_medium", "referral");
      }
    } catch {
      /* malformed referrer — ignore */
    }
  }

  const qs = params.toString();
  return qs ? `${WIDGET_ORIGIN}/?${qs}` : `${WIDGET_ORIGIN}/`;
}

interface BookingFrameProps {
  className?: string;
  height?: number;
  sandbox?: string;
}

export function BookingFrame({ className, height = 700, sandbox }: BookingFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentHeight, setCurrentHeight] = useState(height);
  // Defer iframe mount until we can read window.location + document.referrer.
  // Avoids a hydration mismatch + a wasted load of the bare URL.
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    setIframeSrc(buildWidgetSrc());
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== WIDGET_ORIGIN) return;
      if (event.source !== iframeRef.current?.contentWindow) return;

      const data = event.data;
      if (!data || typeof data !== "object" || typeof data.type !== "string") return;

      if (data.type === RESIZE_EVENT) {
        const next = Number((data as { height?: unknown }).height);
        if (Number.isFinite(next) && next >= MIN_HEIGHT && next <= MAX_HEIGHT) {
          setCurrentHeight(next);
        }
        return;
      }

      // Forward any other typed message from the widget to the dataLayer.
      // type becomes the GA4 event name; remaining fields become parameters.
      const { type, ...rest } = data as { type: string; [key: string]: unknown };
      trackEvent(type, rest);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Placeholder until iframe src is computed on the client (one tick after mount).
  // Keeps layout stable while we read window.location + document.referrer.
  if (!iframeSrc) {
    return (
      <div
        className={className ?? "w-full"}
        style={{ height: `${currentHeight}px`, display: "block" }}
        aria-hidden
      />
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
      title="Book your Norwich walking tour"
      allow="payment"
      loading="lazy"
      referrerPolicy="origin"
      sandbox={sandbox}
      className={className ?? "w-full"}
      style={{
        height: `${currentHeight}px`,
        border: "none",
        display: "block",
        transition: "height 200ms ease-out",
      }}
    />
  );
}
