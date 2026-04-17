"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

const WIDGET_ORIGIN = "https://norwich-booking.vercel.app";

interface BookingFrameProps {
  className?: string;
  height?: number;
  sandbox?: string;
}

export function BookingFrame({ className, height = 700, sandbox }: BookingFrameProps) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== WIDGET_ORIGIN) return;
      const data = event.data;
      if (data && typeof data === "object" && data.type === "booking_confirmed") {
        const rest = { ...data };
        delete rest.type;
        trackEvent("booking_confirmed", rest);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      src={`${WIDGET_ORIGIN}/`}
      title="Book your Norwich walking tour"
      allow="payment"
      loading="lazy"
      referrerPolicy="origin"
      sandbox={sandbox}
      className={className ?? "w-full"}
      style={{ height: `${height}px`, border: "none", display: "block" }}
    />
  );
}
