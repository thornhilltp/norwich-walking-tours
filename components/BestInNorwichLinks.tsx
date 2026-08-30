"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { BIN_GOTO_EVENT, VOTE_ANCHOR_ID } from "@/components/VoteWidget";

// Two small client bits for the server-rendered /best-in-norwich page: the
// outbound winner links (which need a click handler for tracking) and the
// "vote in this category" link (which drives the stepper without a page load).

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

export function CategoryVoteLink({
  categoryKey,
  label,
}: {
  categoryKey: string;
  label: string;
}) {
  return (
    <a
      href={`#${VOTE_ANCHOR_ID}`}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent(BIN_GOTO_EVENT, { detail: categoryKey })
        );
      }}
      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent underline-offset-4 hover:underline min-h-[44px] py-2"
      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
    >
      {label}
    </a>
  );
}
