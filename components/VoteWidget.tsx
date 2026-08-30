"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import {
  PHASE,
  RESULTS_DATE,
  VOTE_YEAR,
  VOTING_CLOSES,
  formatDate,
} from "@/lib/best-in-norwich";

// VoteWidget — the Best in Norwich ballot for /best-in-norwich.
//
// Built as a stepper, one category per screen. A sixteen-category ballot
// rendered as one long form does not get finished on a phone, and ~70% of this
// site's traffic is phones.
//
// Two modes, driven by PHASE:
//   voting-open      → radios plus a "something else" write-in. This is the
//                      live mode: nominating and voting happen in one window.
//   nominations-open → suggestions only, no votes recorded. Not in use for
//                      2027; kept in case a future year wants two phases.
//
// Talks to /api/best-in-norwich (GET for the ballot, POST to vote). Email is
// asked for once, at the end, and only to stop one person voting fifty times.
// The marketing checkbox next to it is the real UK GDPR one and is deliberately
// separate from the vote itself.
//
// Deep links: CategoryVoteLink dispatches BIN_GOTO_EVENT with a category key,
// which jumps the stepper straight to that category.

export const BIN_GOTO_EVENT = "bin:goto-category";
export const VOTE_ANCHOR_ID = "vote";

type Status = "idle" | "submitting" | "success" | "error";

interface BallotCategory {
  key: string;
  label: string;
  blurb?: string;
  nominees: string[];
}

const WRITE_IN = "__write_in__";

export function VoteWidget() {
  const [categories, setCategories] = useState<BallotCategory[] | null>(null);
  const [totalVotes, setTotalVotes] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  // categoryKey → nominee name, or WRITE_IN while they type their own.
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [writeIns, setWriteIns] = useState<
    Record<string, { name: string; url: string }>
  >({});

  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [trap, setTrap] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<{ counted: number; already: number } | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const votingOpen = PHASE === "voting-open";
  const nominating = PHASE === "nominations-open";
  const widgetOpen = votingOpen || nominating;

  // ── Load the ballot ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch("/api/best-in-norwich")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setCategories(Array.isArray(d.categories) ? d.categories : []);
        setTotalVotes(Number(d.totalVotes) || 0);
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([]);
          setTotalVotes(0);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Deep link into one category ─────────────────────────────────────────────
  const goToCategory = useCallback(
    (key: string) => {
      if (!categories) return;
      const index = categories.findIndex((c) => c.key === key);
      if (index === -1) return;
      setStep(index);
      containerRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    },
    [categories]
  );

  useEffect(() => {
    if (!categories) return;
    // ?c=<key> on load, then the in-page event for every click after that.
    const fromUrl = new URLSearchParams(window.location.search).get("c");
    if (fromUrl) goToCategory(fromUrl);

    function onGoto(e: Event) {
      const key = (e as CustomEvent<string>).detail;
      if (typeof key === "string") goToCategory(key);
    }
    window.addEventListener(BIN_GOTO_EVENT, onGoto);
    return () => window.removeEventListener(BIN_GOTO_EVENT, onGoto);
  }, [categories, goToCategory]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || !categories) return;

    const votes: Record<string, string> = {};
    const nominations: { categoryKey: string; name: string; url?: string }[] = [];

    for (const category of categories) {
      if (nominating) {
        const name = writeIns[category.key]?.name?.trim();
        if (!name) continue;
        nominations.push({
          categoryKey: category.key,
          name,
          url: writeIns[category.key]?.url?.trim() || undefined,
        });
        continue;
      }

      const choice = choices[category.key];
      if (!choice) continue;

      if (choice === WRITE_IN) {
        const written = writeIns[category.key];
        const name = written?.name?.trim();
        if (!name) continue;
        nominations.push({
          categoryKey: category.key,
          name,
          url: written?.url?.trim() || undefined,
        });
        votes[category.key] = name;
        continue;
      }

      votes[category.key] = choice;
    }

    if (Object.keys(votes).length === 0 && nominations.length === 0) {
      setStatus("error");
      setErrorMessage(
        nominating
          ? "Add at least one suggestion before you send it."
          : "Pick at least one category before you submit."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/best-in-norwich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          marketingOptIn,
          votes,
          nominations,
          _trap: trap,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      const counted = Number(data.counted) || 0;
      const already = Array.isArray(data.alreadyVoted) ? data.alreadyVoted.length : 0;

      setResult({ counted, already });
      setStatus("success");
      if (typeof data.totalVotes === "number") setTotalVotes(data.totalVotes);

      trackEvent("bin_vote_submitted", {
        categories_voted: counted,
        nominations_added: nominations.length,
        is_new: counted > 0,
      });
      for (const nomination of nominations) {
        trackEvent("bin_nomination_added", { category: nomination.categoryKey });
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // ── Shell ───────────────────────────────────────────────────────────────────
  const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;
  const shell =
    "bg-brand-white border-2 border-brand-text/10 rounded-2xl shadow-2xl p-6 sm:p-7";

  if (!widgetOpen) {
    return (
      <div id={VOTE_ANCHOR_ID} ref={containerRef} className={shell}>
        <p className="font-caveat text-4xl font-bold text-brand-accent mb-2">
          {PHASE === "voting-closed" ? "Voting has closed" : `${VOTE_YEAR} winners are in`}
        </p>
        <p className="text-base text-muted-foreground leading-relaxed" style={lora}>
          {PHASE === "voting-closed"
            ? `Counting now. Winners announced ${formatDate(RESULTS_DATE)}.`
            : "Scroll down for the full list."}
        </p>
      </div>
    );
  }

  if (categories === null) {
    return (
      <div id={VOTE_ANCHOR_ID} ref={containerRef} className={shell}>
        <div className="flex items-center gap-3 text-muted-foreground" style={lora}>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          Loading the ballot
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div id={VOTE_ANCHOR_ID} ref={containerRef} className={shell}>
        <div className="rounded-xl bg-brand-accent-light px-5 py-8 text-center">
          <Check className="mx-auto mb-3 h-8 w-8 text-brand-accent" aria-hidden="true" />
          <p className="font-caveat text-3xl font-bold text-brand-text mb-2">
            {nominating
              ? "Suggestions in"
              : result && result.counted > 0
                ? "Votes counted"
                : "You've already voted"}
          </p>
          <p className="text-base text-muted-foreground leading-relaxed" style={lora}>
            {nominating
              ? `We read every one. Approved names join the ballot within a day or two.`
              : result && result.counted > 0
                ? `${result.counted} ${result.counted === 1 ? "category" : "categories"} logged${
                    result.already > 0 ? `, ${result.already} you'd already done` : ""
                  }. Winners announced ${formatDate(RESULTS_DATE)}.`
                : "One vote per category. Your first answers still stand."}
          </p>
          <p className="mt-4 text-sm text-muted-foreground" style={lora}>
            Now send this to someone who argues about coffee.
          </p>
        </div>
      </div>
    );
  }

  const isFinalStep = step >= categories.length;
  const category = isFinalStep ? null : categories[step];
  const answered = nominating
    ? Object.values(writeIns).filter((w) => w.name.trim()).length
    : Object.values(choices).filter(Boolean).length;

  return (
    <div id={VOTE_ANCHOR_ID} ref={containerRef} className={shell}>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="mb-5">
        <p className="font-caveat text-3xl font-bold text-brand-accent leading-none">
          {nominating
            ? `Nominate — Best in Norwich ${VOTE_YEAR}`
            : `Vote — Best in Norwich ${VOTE_YEAR}`}
        </p>
        <p className="mt-1 text-sm text-muted-foreground" style={lora}>
          {nominating
            ? `Building the ballot. Suggestions close ${formatDate(VOTING_CLOSES)}.`
            : totalVotes === null
              ? "Open until " + formatDate(VOTING_CLOSES)
              : `${totalVotes.toLocaleString("en-GB")} ${
                  totalVotes === 1 ? "vote" : "votes"
                } cast · open until ${formatDate(VOTING_CLOSES)}`}
        </p>

        <div
          className="mt-4 h-2 w-full rounded-full bg-brand-accent-light overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.min(step + 1, categories.length + 1)}
          aria-valuemin={1}
          aria-valuemax={categories.length + 1}
          aria-label="Ballot progress"
        >
          <div
            className="h-full rounded-full bg-brand-accent transition-[width] duration-500 ease-out"
            style={{
              width: `${((step + 1) / (categories.length + 1)) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground" style={lora}>
          {isFinalStep
            ? `Last step · ${answered} of ${categories.length} answered`
            : `Step ${step + 1} of ${categories.length + 1}`}
        </p>
      </div>

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

        {category && (
          <fieldset key={category.key}>
            <legend className="text-xl font-bold text-brand-text" style={lora}>
              {category.label}
            </legend>
            {category.blurb && (
              <p className="mt-1 mb-3 text-sm text-muted-foreground" style={lora}>
                {category.blurb}
              </p>
            )}

            {nominating ? (
              <>
                {category.nominees.length > 0 && (
                  <p className="mb-3 text-sm text-muted-foreground" style={lora}>
                    Already on the list: {category.nominees.join(", ")}
                  </p>
                )}
                <div className="space-y-2 rounded-xl bg-brand-accent-light/60 p-4">
                  <label className="block text-sm font-semibold text-brand-text" style={lora}>
                    Who should be on the ballot?
                    <input
                      type="text"
                      maxLength={80}
                      value={writeIns[category.key]?.name ?? ""}
                      onChange={(e) =>
                        setWriteIns((prev) => ({
                          ...prev,
                          [category.key]: {
                            name: e.target.value,
                            url: prev[category.key]?.url ?? "",
                          },
                        }))
                      }
                      placeholder="Name of the place"
                      className="mt-1 w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base font-normal text-brand-text outline-none transition focus:border-brand-accent"
                      style={lora}
                    />
                  </label>
                  <label className="block text-sm font-semibold text-brand-text" style={lora}>
                    Website (optional)
                    <input
                      type="text"
                      maxLength={300}
                      value={writeIns[category.key]?.url ?? ""}
                      onChange={(e) =>
                        setWriteIns((prev) => ({
                          ...prev,
                          [category.key]: {
                            name: prev[category.key]?.name ?? "",
                            url: e.target.value,
                          },
                        }))
                      }
                      placeholder="example.co.uk"
                      className="mt-1 w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base font-normal text-brand-text outline-none transition focus:border-brand-accent"
                      style={lora}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground" style={lora}>
                    Every suggestion gets read by a human before it joins the ballot.
                  </p>
                </div>
              </>
            ) : (
              <>
            <div className="max-h-72 overflow-y-auto pr-1 -mr-1">
              {category.nominees.map((nominee) => (
                <label
                  key={nominee}
                  className="flex items-center gap-3 py-2.5 cursor-pointer min-h-[44px]"
                >
                  <input
                    type="radio"
                    name={`bin-${category.key}`}
                    value={nominee}
                    checked={choices[category.key] === nominee}
                    onChange={() =>
                      setChoices((prev) => ({ ...prev, [category.key]: nominee }))
                    }
                    className="h-5 w-5 shrink-0 accent-[#2DA96B]"
                  />
                  <span className="text-base leading-snug text-brand-text" style={lora}>
                    {nominee}
                  </span>
                </label>
              ))}

              <label className="flex items-center gap-3 py-2.5 cursor-pointer min-h-[44px]">
                <input
                  type="radio"
                  name={`bin-${category.key}`}
                  value={WRITE_IN}
                  checked={choices[category.key] === WRITE_IN}
                  onChange={() =>
                    setChoices((prev) => ({ ...prev, [category.key]: WRITE_IN }))
                  }
                  className="h-5 w-5 shrink-0 accent-[#2DA96B]"
                />
                <span className="text-base leading-snug text-brand-text" style={lora}>
                  {category.nominees.length > 0 ? "Something else" : "Tell us"}
                </span>
              </label>
            </div>

            {choices[category.key] === WRITE_IN && (
              <div className="mt-2 space-y-2 rounded-xl bg-brand-accent-light/60 p-4">
                <label className="block text-sm font-semibold text-brand-text" style={lora}>
                  Their name
                  <input
                    type="text"
                    maxLength={80}
                    value={writeIns[category.key]?.name ?? ""}
                    onChange={(e) =>
                      setWriteIns((prev) => ({
                        ...prev,
                        [category.key]: {
                          name: e.target.value,
                          url: prev[category.key]?.url ?? "",
                        },
                      }))
                    }
                    placeholder="The place that should have won"
                    className="mt-1 w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base font-normal text-brand-text outline-none transition focus:border-brand-accent"
                    style={lora}
                  />
                </label>
                <label className="block text-sm font-semibold text-brand-text" style={lora}>
                  Website (optional)
                  <input
                    type="text"
                    maxLength={300}
                    value={writeIns[category.key]?.url ?? ""}
                    onChange={(e) =>
                      setWriteIns((prev) => ({
                        ...prev,
                        [category.key]: {
                          name: prev[category.key]?.name ?? "",
                          url: e.target.value,
                        },
                      }))
                    }
                    placeholder="example.co.uk"
                    className="mt-1 w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base font-normal text-brand-text outline-none transition focus:border-brand-accent"
                    style={lora}
                  />
                </label>
                <p className="text-xs text-muted-foreground" style={lora}>
                  New entries are checked by a human before they appear on the ballot.
                </p>
              </div>
            )}
            </>
            )}
          </fieldset>
        )}

        {isFinalStep && (
          <div className="space-y-4">
            <p className="text-xl font-bold text-brand-text" style={lora}>
              Almost done.
            </p>
            <p className="text-sm text-muted-foreground" style={lora}>
              {nominating
                ? "Your email is only so we can come back to you if a suggestion needs checking. It is not published anywhere."
                : "Your email keeps the vote honest. One vote per person per category. It is not published anywhere."}
            </p>

            <div>
              <label
                htmlFor="bin-email"
                className="block text-sm font-semibold text-brand-text mb-1.5"
                style={lora}
              >
                Your email
              </label>
              <input
                id="bin-email"
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none transition focus:border-brand-accent"
                style={lora}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#2DA96B]"
              />
              <span className="text-xs leading-relaxed text-muted-foreground" style={lora}>
                Optional: email me the results and the odd thing from Norwich Free Walking
                Tours. Unsubscribe any time. See our{" "}
                <a href="/privacy" className="underline hover:text-brand-accent">
                  privacy policy
                </a>
                .
              </span>
            </label>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-red-700" role="alert" style={lora}>
            {errorMessage}
          </p>
        )}

        {/* ── Controls ────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 pt-1">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="inline-flex items-center gap-1 rounded-full px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:text-brand-accent min-h-[44px]"
              style={lora}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          )}

          {isFinalStep ? (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 text-xl font-bold text-brand-white shadow-lg transition hover:opacity-90 disabled:opacity-60 min-h-[52px]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  {nominating ? "Sending" : "Counting"}
                </>
              ) : (
                nominating ? "Send my suggestions" : "Submit my votes"
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-4 text-xl font-bold text-brand-white shadow-lg transition hover:opacity-90 min-h-[52px]"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {(nominating
                  ? writeIns[category!.key]?.name?.trim()
                  : choices[category!.key])
                  ? "Next"
                  : "Skip"}
              </button>
              <button
                type="button"
                onClick={() => setStep(categories.length)}
                className="rounded-full px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:text-brand-accent min-h-[44px]"
                style={lora}
              >
                Finish
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground" style={lora}>
          {nominating
            ? "Skip anything you have no strong feelings about. One suggestion is plenty."
            : "Skip any category you have no strong feelings about. Nobody is checking."}
        </p>
      </form>
    </div>
  );
}
