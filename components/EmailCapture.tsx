"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

type Status = "idle" | "submitting" | "success" | "already" | "error";
type Audience = "local" | "visitor";

// Copy is overridable so the same working form can sit on pages with a
// different promise (e.g. a tour page's waiting list). Defaults are the
// homepage "new tours first" block.
interface EmailCaptureProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  /** Tags the signup onto a tour's waiting list (tour slug). */
  tourInterest?: string;
  /** Where the form sits, stored on the subscriber row. */
  source?: "homepage" | "updates";
  /** Polaroid beside the form. Pass null to drop it. */
  photo?: { src: string; alt: string; caption: string } | null;
  /** Optional "local or visiting" tap. */
  askAudience?: boolean;
  /** Render as the page's H1 (standalone /updates page). */
  asPageHeading?: boolean;
}

const DEFAULT_PHOTO = {
  src: "/images/tour/tom-tombland-talk.jpg",
  alt: "Guide telling a story to a tour group in Tombland",
  caption: "Next walk: coming soon",
};

const AUDIENCE_OPTIONS: { value: Audience; label: string }[] = [
  { value: "local", label: "I'm local" },
  { value: "visitor", label: "Just visiting" },
];

export function EmailCapture({
  eyebrow = "New walks, first",
  heading = "Hear about new tours before anyone else",
  body = "We're adding new routes and themed walks. Join the list and you'll hear first. A few emails a year, only when there's news.",
  tourInterest,
  source = "homepage",
  photo = DEFAULT_PHOTO,
  askAudience = true,
  asPageHeading = false,
}: EmailCaptureProps = {}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!consent) {
      setStatus("error");
      setErrorMessage("Please tick the box to confirm you'd like to receive our emails.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          source,
          _trap: trap,
          ...(audience ? { audience } : {}),
          ...(tourInterest ? { tour_interest: tourInterest } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus(data.alreadySubscribed ? "already" : "success");
      trackEvent("subscribe_success", {
        is_new: !data.alreadySubscribed,
        source,
        ...(audience ? { audience } : {}),
        ...(tourInterest ? { tour_interest: tourInterest } : {}),
      });
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const Heading = asPageHeading ? "h1" : "h2";

  return (
    <section className="section-padding bg-brand-accent-light">
      <div className="brand-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={`mx-auto bg-white rounded-2xl border border-brand-accent/15 shadow-sm p-6 sm:p-8 md:p-10 ${
            photo
              ? "max-w-5xl grid gap-8 md:grid-cols-[5fr_7fr] md:gap-12 items-center"
              : "max-w-2xl"
          }`}
        >
          {photo && (
            // Polaroid, same frame as the homepage stories cards: paper
            // border, masking tape, slight tilt, Caveat caption.
            <div className="w-full max-w-[190px] sm:max-w-[240px] md:max-w-none mx-auto pt-3">
              <div
                className="relative p-2.5 pb-9 md:pb-11 shadow-lg border border-brand-text/5"
                style={{ backgroundColor: "#F5EBDA", transform: "rotate(-2deg)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm shadow-sm"
                  style={{
                    backgroundColor: "rgba(241, 225, 161, 0.75)",
                    borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                  }}
                />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 400px"
                  />
                </div>
                <p
                  className="absolute bottom-2 left-3 text-[17px] md:text-[21px] italic font-bold text-brand-text"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          )}

          <div className={photo ? "text-center md:text-left" : "text-center"}>
            <p
              className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {eyebrow}
            </p>
            <Heading className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-3 leading-tight">
              {heading}
            </Heading>
            <p
              className={`text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-md ${
                photo ? "mx-auto md:mx-0" : "mx-auto"
              }`}
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {body}
            </p>

            {status === "success" || status === "already" ? (
              <div
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent/10 text-brand-accent font-semibold text-left"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                role="status"
                aria-live="polite"
              >
                <Check className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {status === "success"
                  ? "You're in. You'll hear about the next walk first."
                  : "Looks like you're already on the list. See you on tour."}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`flex flex-col gap-4 max-w-md ${
                  photo ? "mx-auto md:mx-0" : "mx-auto"
                }`}
                noValidate
              >
                {/* Honeypot */}
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

                {askAudience && (
                  // Optional. Tapping the selected option again clears it.
                  <fieldset className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <legend className="sr-only">Where are you? (optional)</legend>
                    {AUDIENCE_OPTIONS.map((opt) => {
                      const selected = audience === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setAudience(selected ? null : opt.value)}
                          disabled={status === "submitting"}
                          className={`min-h-11 px-4 rounded-full border text-sm transition-colors duration-150 ${
                            selected
                              ? "bg-brand-accent border-brand-accent text-white"
                              : "bg-white border-brand-accent/30 text-brand-text hover:bg-brand-accent-light"
                          }`}
                          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </fieldset>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="subscribe-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="subscribe-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === "submitting"}
                    className="flex-grow h-12 px-4 rounded-xl border border-brand-accent/25 bg-white text-brand-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent disabled:opacity-60"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting" || !consent}
                    className="btn-cta inline-flex items-center justify-center h-12 px-6 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Keep me posted"}
                  </button>
                </div>

                <label
                  htmlFor="subscribe-consent"
                  className="flex items-start gap-3 text-left cursor-pointer"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                >
                  <input
                    id="subscribe-consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === "submitting"}
                    className="mt-1 h-4 w-4 flex-shrink-0 rounded border-brand-accent/40 text-brand-accent focus:ring-brand-accent cursor-pointer"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I&apos;d like to receive occasional marketing emails from Norwich Free Walking Tours. Unsubscribe any time. See our{" "}
                    <a href="/privacy" className="underline hover:text-brand-accent">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </form>
            )}

            {status === "error" && (
              <p
                className="mt-4 text-sm text-red-600"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                role="alert"
              >
                {errorMessage}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
