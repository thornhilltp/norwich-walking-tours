"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function pushConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || [];

  // Mirror the gtag() helper defined in app/layout.tsx's inline consent
  // script. Consent Mode v2 requires the `arguments` object (array-like,
  // not a plain array) to be pushed onto the dataLayer, otherwise GTM's
  // consent parser silently ignores the update.
  // GTM expects the `arguments` object (array-like) on dataLayer. The
  // rest-param signature is purely to satisfy TS at the call site;
  // `arguments` is still populated at runtime.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      pushConsent(true);
    } else if (stored === "declined") {
      pushConsent(false);
    } else {
      // No preference yet — show banner
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    pushConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    pushConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed z-50 bottom-3 left-3 right-3 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-sm rounded-2xl bg-white border border-brand-accent/15 shadow-[0_12px_40px_-12px_rgba(26,26,26,0.35)]"
    >
      <div className="p-5">
        <p
          className="text-sm text-brand-text/80 leading-relaxed"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          We use Google Analytics and Google Ads cookies to understand how
          visitors reach this site. No personal data is sold or shared.{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:text-brand-accent transition-colors duration-150"
          >
            Privacy policy
          </a>
          .
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleDecline}
            className="flex-1 h-11 rounded-full border border-brand-text/20 text-sm font-semibold text-brand-text hover:border-brand-text/40 transition-colors duration-150"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 h-11 rounded-full bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accent/90 transition-colors duration-150"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
