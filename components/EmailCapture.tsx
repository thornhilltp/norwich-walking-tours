"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
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
        body: JSON.stringify({ email, consent, _trap: trap }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section className="section-padding bg-brand-accent-light">
      <div className="brand-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl border border-brand-accent/15 shadow-sm p-8 md:p-10 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-brand-accent" aria-hidden="true" />
          </div>

          <p
            className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Stay in the loop
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-3">
            Norwich from the inside
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Monthly local tips, new tour updates, and the occasional story you won&apos;t get on any tourist site. No spam.
          </p>

          {status === "success" ? (
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent/10 text-brand-accent font-semibold"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              role="status"
              aria-live="polite"
            >
              <Check className="w-5 h-5" aria-hidden="true" />
              You&apos;re in. First email coming soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-md mx-auto"
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
                  {status === "submitting" ? "Sending…" : "Get it in my inbox"}
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
                  I&apos;d like to receive occasional marketing emails from Norwich Free Walking Tour. Unsubscribe any time. See our{" "}
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
        </motion.div>
      </div>
    </section>
  );
}
