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
    ad_storage: "denied",         // we don't run ads — keep denied
    ad_user_data: "denied",
    ad_personalization: "denied",
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-bg border-t border-brand-accent/15 shadow-lg"
    >
      <div className="brand-container py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p
          className="text-sm text-brand-text/80 leading-relaxed max-w-prose"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          We use Google Analytics to understand how visitors use this site. No
          personal data is sold or shared.{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:text-brand-accent transition-colors duration-150"
          >
            Privacy policy
          </a>
          .
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-sm font-medium text-brand-text/60 hover:text-brand-text transition-colors duration-150 px-3 py-2"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="text-sm font-semibold bg-brand-accent text-white rounded-lg px-5 py-2 hover:bg-brand-accent/90 transition-colors duration-150"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
