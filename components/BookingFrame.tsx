"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/tracking";

const WIDGET_ORIGIN = "https://norwich-booking.vercel.app";
const RESIZE_EVENT = "norwich-widget-resize";
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 2000;

interface BookingFrameProps {
  className?: string;
  height?: number;
  sandbox?: string;
}

export function BookingFrame({ className, height = 700, sandbox }: BookingFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentHeight, setCurrentHeight] = useState(height);

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

  return (
    <iframe
      ref={iframeRef}
      src={`${WIDGET_ORIGIN}/`}
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
