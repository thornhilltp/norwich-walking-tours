"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { DEMANDS, FINAL_TARGET } from "@/lib/petition";

// PetitionWidget — signature capture + live counter for /roys-plaza.
//
// Talks to /api/petition (GET for the count, POST to sign). The escalating
// demand checkboxes are the joke; the marketing consent checkbox underneath
// them is the real UK GDPR one and is deliberately kept visually separate so
// nobody opts in by accident while laughing.
//
// The ladder itself lives in lib/petition.ts so the page and this widget can
// never disagree about the thresholds.

type Status = "idle" | "submitting" | "success" | "already" | "error";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PetitionWidget() {
  const [count, setCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [demandStatue, setDemandStatue] = useState(true);
  const [demandAllShops, setDemandAllShops] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [trap, setTrap] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ── Load the live count ─────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch("/api/petition")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setCount(Number(d.count) || 0);
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Roll the number up to the real value ────────────────────────────────────
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (count === null) return;
    if (prefersReducedMotion() || count === 0) {
      setDisplayCount(count);
      return;
    }
    const from = displayCount;
    const start = performance.now();
    const duration = 900;

    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayCount(Math.round(from + (count! - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // displayCount deliberately omitted — including it restarts the animation
    // on every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const current = count ?? 0;
  const nextDemand = DEMANDS.find((d) => current < d.threshold) ?? null;
  const progressTarget = nextDemand?.threshold ?? FINAL_TARGET;
  const progressPct = Math.min((current / progressTarget) * 100, 100);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          demandStatue,
          demandAllShops,
          marketingOptIn,
          _trap: trap,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus(data.already ? "already" : "success");
      if (typeof data.count === "number") setCount(data.count);
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const signed = status === "success" || status === "already";

  return (
    <div
      className="bg-brand-white border-2 border-brand-text/10 rounded-2xl shadow-2xl p-6 sm:p-7"
      style={{ transform: "rotate(1deg)" }}
    >
      {/* ── Counter ───────────────────────────────────────────────────────── */}
      <div className="text-center mb-6">
        <p
          className="text-5xl sm:text-6xl font-bold text-brand-accent leading-none tabular-nums"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {count === null ? "—" : displayCount.toLocaleString("en-GB")}
        </p>
        <p
          className="mt-2 text-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {current === 1 ? "person has signed" : "people have signed"}
        </p>

        <div
          className="mt-4 h-2.5 w-full rounded-full bg-brand-accent-light overflow-hidden"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={progressTarget}
          aria-label="Signatures towards the next demand"
        >
          <div
            className="h-full rounded-full bg-brand-accent transition-[width] duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p
          className="mt-2 text-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {nextDemand
            ? `${(nextDemand.threshold - current).toLocaleString("en-GB")} more to unlock: ${nextDemand.headline}`
            : "Every demand unlocked. There is no going back."}
        </p>
      </div>

      {signed ? (
        <div className="rounded-xl bg-brand-accent-light px-5 py-8 text-center">
          <Check className="mx-auto mb-3 h-8 w-8 text-brand-accent" aria-hidden="true" />
          <p className="font-caveat text-3xl font-bold text-brand-text mb-2">
            {status === "already" ? "You've already signed" : "Signed"}
          </p>
          <p
            className="text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {status === "already"
              ? "Once is enough. Your position on the statue is noted."
              : "Now send it to three people from Norwich. Minimum."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div>
            <label
              htmlFor="petition-name"
              className="block text-sm font-semibold text-brand-text mb-1.5"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Your name
            </label>
            <input
              id="petition-name"
              type="text"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alan P."
              className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none transition focus:border-brand-accent"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            />
          </div>

          <div>
            <label
              htmlFor="petition-email"
              className="block text-sm font-semibold text-brand-text mb-1.5"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Your email
            </label>
            <input
              id="petition-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none transition focus:border-brand-accent"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            />
          </div>

          {/* ── The demands ─────────────────────────────────────────────── */}
          <fieldset className="rounded-xl bg-brand-accent-light/60 p-4">
            <legend
              className="px-1 text-sm font-semibold text-brand-accent"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              I am signing for
            </legend>

            <label className="flex items-start gap-3 py-2 cursor-not-allowed opacity-90">
              <input
                type="checkbox"
                checked
                disabled
                readOnly
                className="mt-1 h-5 w-5 shrink-0 accent-[#2DA96B]"
              />
              <span
                className="text-sm leading-snug text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                <span className="font-semibold">The renaming.</span> Anglia Square becomes Roy&apos;s
                Plaza. This one is not optional.
              </span>
            </label>

            <label className="flex items-start gap-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={demandStatue}
                onChange={(e) => setDemandStatue(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#2DA96B]"
              />
              <span
                className="text-sm leading-snug text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                <span className="font-semibold">The statue.</span> Bronze, life size at the very
                least, facing the Cathedral.
              </span>
            </label>

            <label className="flex items-start gap-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={demandAllShops}
                onChange={(e) => setDemandAllShops(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#2DA96B]"
              />
              <span
                className="text-sm leading-snug text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                <span className="font-semibold">All of it.</span> Every single unit becomes a Roys.
                A Roys next to a Roys next to a Roys.
              </span>
            </label>
          </fieldset>

          {/* ── Real consent, kept visually apart from the joke ──────────── */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#2DA96B]"
            />
            <span
              className="text-xs leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Optional: email me updates on how the petition is going, and the odd thing from
              Norwich Free Walking Tours. Unsubscribe any time. See our{" "}
              <a href="/privacy" className="underline hover:text-brand-accent">
                privacy policy
              </a>
              .
            </span>
          </label>

          {status === "error" && (
            <p
              className="text-sm text-red-700"
              role="alert"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 text-xl font-bold text-brand-white shadow-lg transition hover:opacity-90 disabled:opacity-60 min-h-[52px]"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Signing
              </>
            ) : (
              "Sign the petition"
            )}
          </button>

          <p
            className="text-center text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Takes 20 seconds. Not signing takes a lifetime of regret.
          </p>
        </form>
      )}
    </div>
  );
}
