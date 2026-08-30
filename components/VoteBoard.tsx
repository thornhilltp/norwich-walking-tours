"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Plus } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { RESULTS_DATE, VOTING_CLOSES, formatDate } from "@/lib/best-in-norwich";

// VoteBoard — the 2027 vote at /best-in-norwich and /best-in-norwich/vote.
//
// Third design, and Tom's: the chart IS the ballot. Each category is a set of
// bars showing what people have voted for so far, and clicking a bar is the
// vote. Nothing to fill in unless the place you want is missing, in which case
// "Add a place" takes a name, a website and a category.
//
// What this replaced and why:
//   1. A stepper with last year's winner pre-listed — leading, would have
//      re-elected the 2026 list.
//   2. Sixteen blank text boxes on one page — the US alt-weekly ballot
//      pattern, and a wall people abandon.
//
// Trade-off worth knowing: showing counts before voting does nudge people
// toward whoever is ahead. Tom's call, and the competitive board is the thing
// that makes this shareable, so we take the nudge over the empty form.
//
// Email is asked once, on the first vote, then kept in localStorage so a
// second vote is a single click. The server still dedupes on email, so a
// cleared browser cannot double-vote.

const EMAIL_KEY = "bin_voter_email";
const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

interface Nominee {
  name: string;
  url: string | null;
  votes: number;
}

interface BoardCategory {
  key: string;
  label: string;
  blurb?: string;
  nominees: Nominee[];
}

type Pending = { categoryKey: string; name: string } | null;

export function VoteBoard({
  initialCategories,
}: {
  initialCategories: BoardCategory[];
}) {
  const [categories, setCategories] = useState<BoardCategory[]>(initialCategories);
  const [totalVotes, setTotalVotes] = useState<number | null>(null);
  const [voted, setVoted] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Email gate, shown once
  const [email, setEmail] = useState("");
  const [knownEmail, setKnownEmail] = useState<string | null>(null);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [pending, setPending] = useState<Pending>(null);

  // "Add a place" panel, per category
  const [addingFor, setAddingFor] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [added, setAdded] = useState<string[]>([]);

  useEffect(() => {
    try {
      setKnownEmail(window.localStorage.getItem(EMAIL_KEY));
    } catch {
      // Private browsing. The email prompt just shows every time.
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/best-in-norwich");
      const data = await res.json();
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        setCategories(data.categories);
      }
      if (typeof data.totalVotes === "number") setTotalVotes(data.totalVotes);
    } catch {
      // Keep whatever the server rendered.
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ── Voting ─────────────────────────────────────────────────────────────────
  async function castVote(categoryKey: string, name: string, voterEmail: string) {
    setBusy(categoryKey);
    setError("");

    // Move the bar straight away. The refresh below corrects it either way.
    setCategories((prev) =>
      prev.map((c) =>
        c.key !== categoryKey
          ? c
          : {
              ...c,
              nominees: c.nominees.map((n) =>
                n.name === name ? { ...n, votes: n.votes + 1 } : n
              ),
            }
      )
    );
    setVoted((prev) => ({ ...prev, [categoryKey]: name }));

    try {
      const res = await fetch("/api/best-in-norwich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: voterEmail,
          marketingOptIn,
          votes: { [categoryKey]: name },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      if (Array.isArray(data.alreadyVoted) && data.alreadyVoted.includes(categoryKey)) {
        setError("You have already voted in that category. Your first pick stands.");
      }

      trackEvent("bin_vote_submitted", {
        categories_voted: Number(data.counted) || 0,
        category: categoryKey,
        is_new: (Number(data.counted) || 0) > 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(null);
      refresh();
    }
  }

  function handleBarClick(categoryKey: string, name: string) {
    if (busy) return;
    if (knownEmail) {
      castVote(categoryKey, name, knownEmail);
      return;
    }
    setPending({ categoryKey, name });
  }

  async function confirmEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return;

    try {
      window.localStorage.setItem(EMAIL_KEY, clean);
    } catch {
      // Fine. They will be asked again next time.
    }
    setKnownEmail(clean);

    const job = pending;
    setPending(null);
    if (job) await castVote(job.categoryKey, job.name, clean);
  }

  // ── Adding a place ─────────────────────────────────────────────────────────
  async function submitNew(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = newName.trim();
    const categoryKey = newCategory || addingFor;
    if (!name || !categoryKey) return;

    const voterEmail = knownEmail ?? email.trim();
    if (!voterEmail) {
      setError("We need your email to count the vote.");
      return;
    }

    setBusy(categoryKey);
    setError("");

    try {
      const res = await fetch("/api/best-in-norwich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: voterEmail,
          marketingOptIn,
          votes: { [categoryKey]: name },
          nominations: [{ categoryKey, name, url: newUrl.trim() || undefined }],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      try {
        window.localStorage.setItem(EMAIL_KEY, voterEmail);
      } catch {
        // Ignore.
      }
      setKnownEmail(voterEmail);
      setAdded((prev) => [...prev, categoryKey]);
      setVoted((prev) => ({ ...prev, [categoryKey]: name }));
      setAddingFor(null);
      setNewName("");
      setNewUrl("");
      setNewCategory("");

      trackEvent("bin_nomination_added", { category: categoryKey });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(null);
      refresh();
    }
  }

  return (
    <div>
      {/* ── Running total ─────────────────────────────────────────────────── */}
      <p className="mb-6 text-sm text-muted-foreground" style={lora}>
        {totalVotes === null
          ? `Open until ${formatDate(VOTING_CLOSES)}`
          : `${totalVotes.toLocaleString("en-GB")} ${
              totalVotes === 1 ? "vote" : "votes"
            } so far · open until ${formatDate(VOTING_CLOSES)} · winners ${formatDate(
              RESULTS_DATE
            )}`}
      </p>

      {error && (
        <p className="mb-5 text-sm text-red-700" role="alert" style={lora}>
          {error}
        </p>
      )}

      {/* ── Email, asked once ─────────────────────────────────────────────── */}
      {pending && (
        <form
          onSubmit={confirmEmail}
          className="mb-8 rounded-xl bg-brand-white border-2 border-brand-accent p-5"
        >
          <p className="text-lg font-bold text-brand-text mb-1" style={lora}>
            One thing before that counts.
          </p>
          <p className="text-sm text-muted-foreground mb-3" style={lora}>
            Your email keeps it honest, one vote per person per category. Never
            published, never shared with anyone on the board.
          </p>
          <div className="flex flex-wrap gap-3">
            <input
              type="email"
              required
              autoFocus
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 min-w-[220px] rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none transition focus:border-brand-accent min-h-[48px]"
              style={lora}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-xl font-bold text-brand-white transition hover:opacity-90 min-h-[48px]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              Count my vote
            </button>
          </div>
          <label className="mt-3 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#2DA96B]"
            />
            <span className="text-xs leading-relaxed text-muted-foreground" style={lora}>
              Optional: email me the results and the odd thing from Norwich Free Walking
              Tours.{" "}
              <a href="/privacy" className="underline hover:text-brand-accent">
                Privacy policy
              </a>
              .
            </span>
          </label>
        </form>
      )}

      {/* ── The board ─────────────────────────────────────────────────────── */}
      <div className="space-y-10">
        {categories.map((category) => {
          const top = Math.max(...category.nominees.map((n) => n.votes), 1);
          const myVote = voted[category.key];

          return (
            <div key={category.key} id={category.key} className="scroll-mt-28">
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-brand-text" style={lora}>
                    {category.label}
                  </h3>
                  {category.blurb && (
                    <p className="text-sm text-muted-foreground" style={lora}>
                      {category.blurb}
                    </p>
                  )}
                </div>
                {myVote && (
                  <span
                    className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent"
                    style={lora}
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Voted
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {category.nominees.map((nominee) => {
                  const mine = myVote === nominee.name;
                  return (
                    <button
                      key={nominee.name}
                      type="button"
                      disabled={busy === category.key}
                      onClick={() => handleBarClick(category.key, nominee.name)}
                      aria-label={`Vote for ${nominee.name} as ${category.label}`}
                      className={`group relative flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition min-h-[48px] disabled:opacity-60 ${
                        mine
                          ? "border-brand-accent bg-brand-accent-light"
                          : "border-brand-text/10 bg-brand-white hover:border-brand-accent"
                      }`}
                    >
                      <span className="relative z-10 flex-1 text-base text-brand-text" style={lora}>
                        {nominee.name}
                      </span>
                      <span
                        className="relative z-10 w-10 shrink-0 text-right text-sm tabular-nums text-muted-foreground"
                        style={lora}
                      >
                        {nominee.votes}
                      </span>
                      {/* The bar itself, behind the label */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 rounded-lg transition-[width] duration-500 ${
                          mine ? "bg-brand-accent/25" : "bg-brand-accent/10"
                        }`}
                        style={{ width: `${(nominee.votes / top) * 100}%` }}
                      />
                    </button>
                  );
                })}

                {added.includes(category.key) && (
                  <p className="text-sm text-brand-accent" style={lora}>
                    Thanks. We check new places by hand, so it joins the board in a day or
                    so, with your vote on it.
                  </p>
                )}

                {addingFor === category.key ? (
                  <form
                    onSubmit={submitNew}
                    className="rounded-lg border-2 border-brand-accent bg-brand-white p-4 space-y-3"
                  >
                    <p className="text-sm font-semibold text-brand-text" style={lora}>
                      Add a place to {category.label.toLowerCase()}
                    </p>
                    <input
                      type="text"
                      required
                      autoFocus
                      maxLength={80}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Name of the place"
                      className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none focus:border-brand-accent min-h-[48px]"
                      style={lora}
                    />
                    <input
                      type="text"
                      maxLength={300}
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="Their website (optional)"
                      className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none focus:border-brand-accent min-h-[48px]"
                      style={lora}
                    />
                    <label className="block text-sm text-muted-foreground" style={lora}>
                      Category
                      <select
                        value={newCategory || category.key}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="mt-1 w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none focus:border-brand-accent min-h-[48px]"
                        style={lora}
                      >
                        {categories.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    {!knownEmail && (
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base text-brand-text outline-none focus:border-brand-accent min-h-[48px]"
                        style={lora}
                      />
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={busy === category.key}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-xl font-bold text-brand-white transition hover:opacity-90 disabled:opacity-60 min-h-[48px]"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                      >
                        {busy === category.key && (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        )}
                        Add and vote
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddingFor(null)}
                        className="text-sm text-muted-foreground underline underline-offset-4"
                        style={lora}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAddingFor(category.key);
                      setNewCategory(category.key);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-accent transition hover:underline underline-offset-4 min-h-[44px]"
                    style={lora}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    {category.nominees.length === 0
                      ? "Nothing here yet. Add the first one"
                      : "Not on the list? Add it"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
