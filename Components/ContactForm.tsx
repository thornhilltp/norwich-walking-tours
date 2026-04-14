"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _trap: data.get("_trap"), // honeypot — bots fill this, humans don't
        }),
      });

      if (!res.ok) throw new Error("Send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle className="w-12 h-12 text-brand-accent" aria-hidden="true" />
        <h3 className="font-caveat text-3xl font-bold">
          Message sent.
        </h3>
        <p className="text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="_trap"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-brand-text mb-1.5" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full h-11 px-4 rounded-xl border border-brand-accent/20 bg-white text-base text-brand-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-brand-text mb-1.5" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full h-11 px-4 rounded-xl border border-brand-accent/20 bg-white text-base text-brand-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-brand-text mb-1.5" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="What would you like to know?"
          className="w-full px-4 py-3 rounded-xl border border-brand-accent/20 bg-white text-base text-brand-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-cta h-12 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
      >
        {sending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
