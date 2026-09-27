"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

// Outbound winner links for the server-rendered /best-in-norwich page. They
// are a client component only because the click needs to fire a tracking
// event; everything else on that page stays server-rendered.

interface WinnerLinkProps {
  href: string;
  category: string;
  winner: string;
  linkType: "website" | "map";
  children: React.ReactNode;
}

export function WinnerLink({
  href,
  category,
  winner,
  linkType,
  children,
}: WinnerLinkProps) {
  const Icon = linkType === "website" ? ArrowUpRight : MapPin;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("bin_winner_link_click", {
          category,
          winner,
          link_type: linkType,
        })
      }
      className="inline-flex items-center gap-1.5 rounded-full border border-brand-text/10 bg-brand-bg px-3 py-2 text-sm font-semibold text-brand-text transition hover:border-brand-accent hover:text-brand-accent min-h-[44px]"
      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
