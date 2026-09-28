"use client";

// Compact waiting-list form for a tour page's hero slot (where the booking
// widget goes once dates are on sale). Same /api/subscribe call, consent
// line and tracking as EmailCapture, sized for a card.

import { useState } from "react";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

type Status = "idle" | "submitting" | "success" | "already" | "error";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export function HeroWaitlistForm({
  tourInterest,
  tourName,
}: {
  tourInterest: string;
  tourName: string;
}) {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          // Pressing the button under the consent line is the opt-in, as on
          // EmailCapture; the server still requires the flag.
          consent: true,
          source: "homepage",
          _trap: trap,
          tour_interest: tourInterest,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus(data.alreadySubscribed ? "already" : "success");
      trackEvent("subscribe_success", {
        is_new: !data.alreadySubscribed,
        source: "tour_hero",
        tour_interest: tourInterest,
      });
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <div
        className="flex items-start gap-2 rounded-xl bg-brand-accent/10 text-brand-accent font-semibold px-4 py-3 text-left"
        style={lora}
        role="status"
        aria-live="polite"
      >
        <Check className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
        <span>
          You&apos;re on the {tourName} list. We&apos;ll email you when dates open.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <label className="sr-only" aria-hidden="true">
        Leave this field empty
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </label>
      <label htmlFor={`waitlist-${tourInterest}`} className="sr-only">
        Email address
      </label>
      <input
        id={`waitlist-${tourInterest}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={status === "submitting"}
        className="w-full h-12 px-4 rounded-xl border border-brand-accent/25 bg-white text-brand-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent disabled:opacity-60"
        style={lora}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-cta inline-flex w-full items-center justify-center h-12 px-6 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Join the waiting list"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700 m-0" style={lora} role="alert">
          {errorMessage}
        </p>
      )}
      <p className="text-[11.5px] text-muted-foreground leading-relaxed text-left m-0" style={lora}>
        By joining you agree to get occasional emails from Norwich Free Walking
        Tours. Unsubscribe any time. See our{" "}
        <a href="/privacy" className="underline hover:text-brand-accent">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
