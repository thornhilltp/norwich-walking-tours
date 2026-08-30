"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { RESULTS_DATE, VOTE_YEAR, VOTING_CLOSES, formatDate } from "@/lib/best-in-norwich";

// VoteForm — the 2027 ballot at /best-in-norwich/vote.
//
// Rebuilt 2026-08-30. The first version listed last year's winner as the only
// option in each category, which meant most people would just tick it and we
// would re-elect the same list. Every box is now blank free text.
//
// Suggestions still exist, but only as a <datalist>: nothing shows until you
// start typing, and then it offers names other people have already entered.
// That keeps the tally from fragmenting across spellings without putting a
// name in front of anyone who did not ask for one.
//
// The standings chart is deliberately held back until after submitting. Shown
// up front it is a leaderboard telling people the popular answer; shown after,
// it is the payoff and the reason to send the page to someone else.

type Status = "idle" | "submitting" | "success" | "error";

interface BallotCategory {
  key: string;
  label: string;
  blurb?: string;
  nominees: string[];
}

interface ResultRow {
  category_key: string;
  nominee_name: string;
  votes: number;
}

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export function VoteForm() {
  const [categories, setCategories] = useState<BallotCategory[] | null>(null);
  const [totalVotes, setTotalVotes] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [trap, setTrap] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState<ResultRow[] | null>(null);
  const [counted, setCounted] = useState(0);

  const resultsRef = useRef<HTMLDivElement | null>(null);

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

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v.trim()).length,
    [answers]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || !categories) return;

    const votes: Record<string, string> = {};
    const nominations: { categoryKey: string; name: string }[] = [];

    for (const category of categories) {
      const name = answers[category.key]?.trim();
      if (!name) continue;
      votes[category.key] = name;
      // Every answer is a write-in now, so each one also goes into the
      // moderation queue. Approved names are what the chart is built from.
      nominations.push({ categoryKey: category.key, name });
    }

    if (Object.keys(votes).length === 0) {
      setStatus("error");
      setErrorMessage("Fill in at least one category before you submit.");
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
          wantResults: true,
          _trap: trap,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setCounted(Number(data.counted) || 0);
      setResults(Array.isArray(data.results) ? data.results : []);
      if (typeof data.totalVotes === "number") setTotalVotes(data.totalVotes);
      setStatus("success");

      trackEvent("bin_vote_submitted", {
        categories_voted: Number(data.counted) || 0,
        nominations_added: nominations.length,
        is_new: (Number(data.counted) || 0) > 0,
      });

      requestAnimationFrame(() =>
        resultsRef.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        })
      );
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div ref={resultsRef} className="scroll-mt-24">
        <div className="rounded-2xl bg-brand-accent-light p-6 sm:p-8 mb-10">
          <div className="flex items-start gap-3">
            <Check className="mt-1 h-6 w-6 shrink-0 text-brand-accent" aria-hidden="true" />
            <div>
              <p className="font-caveat text-4xl font-bold text-brand-text leading-none mb-2">
                {counted > 0 ? "Counted" : "You have already voted"}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
                {counted > 0
                  ? `${counted} ${counted === 1 ? "category" : "categories"} logged. Winners announced ${formatDate(RESULTS_DATE)}.`
                  : "One vote per category. Your first answers still stand."}
              </p>
            </div>
          </div>
        </div>

        <StandingsChart
          categories={categories ?? []}
          results={results ?? []}
          totalVotes={totalVotes}
        />

        <div className="mt-10 rounded-xl border border-brand-text/10 p-6">
          <p className="font-caveat text-3xl font-bold text-brand-accent mb-2">
            Now go and stitch someone up
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed" style={lora}>
            Send this to anyone who has strong opinions about chips. The categories
            with the fewest votes are the ones most easily swung.
          </p>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
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

      {categories === null ? (
        <p className="flex items-center gap-3 text-muted-foreground" style={lora}>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          Loading the categories
        </p>
      ) : (
        <>
          <div className="space-y-5">
            {categories.map((category) => (
              <div key={category.key} id={category.key} className="scroll-mt-28">
                <label
                  htmlFor={`bin-${category.key}`}
                  className="block text-lg font-bold text-brand-text"
                  style={lora}
                >
                  {category.label}
                </label>
                {category.blurb && (
                  <p className="text-sm text-muted-foreground mb-1.5" style={lora}>
                    {category.blurb}
                  </p>
                )}
                <input
                  id={`bin-${category.key}`}
                  type="text"
                  maxLength={80}
                  autoComplete="off"
                  list={
                    category.nominees.length > 0 ? `bin-list-${category.key}` : undefined
                  }
                  value={answers[category.key] ?? ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [category.key]: e.target.value }))
                  }
                  placeholder="Type a name"
                  className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-white px-4 py-3 text-base text-brand-text outline-none transition focus:border-brand-accent min-h-[48px]"
                  style={lora}
                />
                {category.nominees.length > 0 && (
                  <datalist id={`bin-list-${category.key}`}>
                    {category.nominees.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-brand-accent-light p-6">
            <p className="text-lg font-bold text-brand-text mb-1" style={lora}>
              Last bit.
            </p>
            <p className="text-sm text-muted-foreground mb-4" style={lora}>
              Your email stops one person voting fifty times. It is never published and
              never shared with anyone on the list.
            </p>

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
              className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-white px-4 py-3 text-base text-brand-text outline-none transition focus:border-brand-accent min-h-[48px]"
              style={lora}
            />

            <label className="mt-4 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#2DA96B]"
              />
              <span className="text-xs leading-relaxed text-muted-foreground" style={lora}>
                Optional: email me the results and the odd thing from Norwich Free
                Walking Tours. Unsubscribe any time. See our{" "}
                <a href="/privacy" className="underline hover:text-brand-accent">
                  privacy policy
                </a>
                .
              </span>
            </label>
          </div>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-700" role="alert" style={lora}>
              {errorMessage}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-2xl font-bold text-brand-white shadow-lg transition hover:opacity-90 disabled:opacity-60 min-h-[52px]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Counting
                </>
              ) : (
                "Submit and see the standings"
              )}
            </button>
            <p className="text-sm text-muted-foreground" style={lora}>
              {answeredCount > 0
                ? `${answeredCount} filled in. Skip the rest.`
                : `Open until ${formatDate(VOTING_CLOSES)}`}
            </p>
          </div>
        </>
      )}
    </form>
  );
}

// ── Chart ────────────────────────────────────────────────────────────────────
// Plain divs, no chart library. Only categories that have votes are drawn, so
// early on it stays short rather than showing sixteen empty frames.
function StandingsChart({
  categories,
  results,
  totalVotes,
}: {
  categories: BallotCategory[];
  results: ResultRow[];
  totalVotes: number | null;
}) {
  const byCategory = new Map<string, ResultRow[]>();
  for (const row of results) {
    const list = byCategory.get(row.category_key) ?? [];
    list.push(row);
    byCategory.set(row.category_key, list);
  }

  const withVotes = categories.filter((c) => (byCategory.get(c.key)?.length ?? 0) > 0);

  return (
    <div>
      <h2 className="mb-2 leading-tight">
        <span
          className="block text-2xl md:text-3xl font-bold text-brand-text"
          style={lora}
        >
          Where it stands
        </span>
        <span className="block font-caveat text-5xl font-bold text-brand-accent">
          right now.
        </span>
      </h2>
      <p className="mb-8 text-lg text-muted-foreground leading-relaxed" style={lora}>
        {totalVotes !== null
          ? `${totalVotes.toLocaleString("en-GB")} ${totalVotes === 1 ? "vote" : "votes"} cast so far across ${VOTE_YEAR === 2027 ? "sixteen" : "all"} categories. Names appear once we have checked them, so yours may take a day.`
          : "Names appear once we have checked them, so yours may take a day."}
      </p>

      {withVotes.length === 0 ? (
        <p className="text-lg text-muted-foreground" style={lora}>
          Nothing to show yet. You are early, which means your answers are currently
          winning.
        </p>
      ) : (
        <div className="space-y-8">
          {withVotes.map((category) => {
            const rows = (byCategory.get(category.key) ?? [])
              .slice()
              .sort((a, b) => b.votes - a.votes)
              .slice(0, 5);
            const top = rows[0]?.votes ?? 1;

            return (
              <div key={category.key}>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3"
                  style={lora}
                >
                  {category.label}
                </p>
                <div className="space-y-2">
                  {rows.map((row, i) => (
                    <div key={row.nominee_name} className="flex items-center gap-3">
                      <div className="w-40 sm:w-52 shrink-0 truncate text-sm text-brand-text" style={lora}>
                        {row.nominee_name}
                      </div>
                      <div className="flex-1 h-6 rounded-full bg-brand-accent-light overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            i === 0 ? "bg-brand-accent" : "bg-brand-accent/50"
                          }`}
                          style={{ width: `${Math.max((row.votes / top) * 100, 6)}%` }}
                        />
                      </div>
                      <div
                        className="w-8 shrink-0 text-right text-sm tabular-nums text-muted-foreground"
                        style={lora}
                      >
                        {row.votes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
