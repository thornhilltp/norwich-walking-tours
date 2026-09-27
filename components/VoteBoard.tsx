"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Loader2, Plus } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { RESULTS_DATE, VOTING_CLOSES, formatDate } from "@/lib/best-in-norwich";

// VoteBoard — the Best in Norwich 2027 vote. One widget, hero right column.
//
// Design history, so nobody rebuilds a rejected version:
//   1. Stepper with last year's winner pre-listed — leading, would have
//      re-elected the 2026 list.
//   2. Sixteen blank text boxes on one page — the US alt-weekly ballot, a wall
//      people abandon.
//   3. Sixteen categories of bars down the page — better, still a page rather
//      than a widget.
//   4. This: one hero-sized widget. Category chips to jump anywhere, top three
//      bars for the current one, and after a vote it advances to the next
//      category you have not answered. Choice if you want it, momentum if you
//      do not.
//
// Clicking a bar is the vote — there is no form unless a place is missing.
// Email is asked once and kept in localStorage; the server still dedupes on
// email, so clearing the browser buys nothing.
//
// Counts stay hidden in a category until you have voted in it (Tom, 2026-08-30).
// Standard poll behaviour, and it means nobody's answer is steered by seeing
// who is already ahead — while still paying out the running result the moment
// they commit.

const EMAIL_KEY = "bin_voter_email";
const VOTED_KEY = "bin_voted_categories";
const TOP_N = 3;
const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

interface Nominee {
  name: string;
  url: string | null;
  image: string | null;
  votes: number;
}

export interface BoardCategory {
  key: string;
  label: string;
  short?: string;
  question: string;
  blurb?: string;
  nominees: Nominee[];
}

function initials(name: string) {
  return name.replace(/^(the|a)\s+/i, "").trim().charAt(0).toUpperCase();
}

export function VoteBoard({
  initialCategories,
}: {
  initialCategories: BoardCategory[];
}) {
  const [categories, setCategories] = useState<BoardCategory[]>(initialCategories);
  const [totalVotes, setTotalVotes] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [voted, setVoted] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [knownEmail, setKnownEmail] = useState<string | null>(null);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [pending, setPending] = useState<{ key: string; name: string } | null>(null);

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const chipsRef = useRef<HTMLDivElement | null>(null);
  const shareUrl = "https://www.norwichfreewalkingtours.co.uk/best-in-norwich";
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const category = categories[active];

  useEffect(() => {
    try {
      setKnownEmail(window.localStorage.getItem(EMAIL_KEY));
      const stored = window.localStorage.getItem(VOTED_KEY);
      if (stored) setVoted(JSON.parse(stored) as Record<string, string>);
    } catch {
      // Private browsing. Everything still works, it just asks again.
    }
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
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
      // Keep the server-rendered board.
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    setExpanded(false);
    setAdding(false);
    setJustAdded(false);
  }, [active]);

  const answered = useMemo(() => Object.keys(voted).length, [voted]);
  const allDone = answered >= categories.length && categories.length > 0;
  const showShare = answered >= 3;
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy. The link is norwichfreewalkingtours.co.uk/best-in-norwich");
    }
    trackEvent("bin_share_click", { method: "copy", categories_voted: answered });
  }

  function rememberVote(key: string, name: string) {
    setVoted((prev) => {
      const next = { ...prev, [key]: name };
      try {
        window.localStorage.setItem(VOTED_KEY, JSON.stringify(next));
      } catch {
        // Ignore.
      }
      return next;
    });
  }

  function advance(fromIndex: number) {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setCategories((current) => {
        setVoted((v) => {
          const nextIndex = current.findIndex((c, i) => i > fromIndex && !v[c.key]);
          const wrapped =
            nextIndex === -1 ? current.findIndex((c) => !v[c.key]) : nextIndex;
          if (wrapped !== -1) setActive(wrapped);
          return v;
        });
        return current;
      });
    }, 900);
  }

  async function castVote(key: string, name: string, voterEmail: string) {
    setBusy(true);
    setError("");

    setCategories((prev) =>
      prev.map((c) =>
        c.key !== key
          ? c
          : {
              ...c,
              nominees: c.nominees.map((n) =>
                n.name === name ? { ...n, votes: n.votes + 1 } : n
              ),
            }
      )
    );
    rememberVote(key, name);
    advance(categories.findIndex((c) => c.key === key));

    try {
      const res = await fetch("/api/best-in-norwich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: voterEmail,
          marketingOptIn,
          votes: { [key]: name },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      trackEvent("bin_vote_submitted", {
        category: key,
        categories_voted: Number(data.counted) || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
      refresh();
    }
  }

  function onBar(name: string) {
    if (busy || !category) return;
    if (knownEmail) {
      castVote(category.key, name, knownEmail);
      return;
    }
    setPending({ key: category.key, name });
  }

  async function confirmEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return;
    try {
      window.localStorage.setItem(EMAIL_KEY, clean);
    } catch {
      // Ignore.
    }
    setKnownEmail(clean);
    const job = pending;
    setPending(null);
    if (job) await castVote(job.key, job.name, clean);
  }

  async function submitNew(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) return;
    const name = newName.trim();
    const voterEmail = knownEmail ?? email.trim();
    if (!name) return;
    if (!voterEmail) {
      setError("We need your email to count the vote.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/best-in-norwich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: voterEmail,
          marketingOptIn,
          votes: { [category.key]: name },
          nominations: [
            { categoryKey: category.key, name, url: newUrl.trim() || undefined },
          ],
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
      rememberVote(category.key, name);
      setJustAdded(true);
      setAdding(false);
      setNewName("");
      setNewUrl("");
      trackEvent("bin_nomination_added", { category: category.key });
      advance(active);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
      refresh();
    }
  }

  if (!category) return null;

  const myVote = voted[category.key];
  // Before voting the order must not leak the standings either, so names sit
  // alphabetically until the reveal.
  const revealed = Boolean(myVote);
  const ranked = [...category.nominees].sort((a, b) =>
    revealed ? b.votes - a.votes : a.name.localeCompare(b.name, "en-GB")
  );
  const shown = expanded ? ranked : ranked.slice(0, TOP_N);
  const top = Math.max(...ranked.map((n) => n.votes), 1);

  return (
    <div className="bg-brand-white border-2 border-brand-text/10 rounded-2xl shadow-2xl p-5 sm:p-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <p className="font-caveat text-3xl font-bold text-brand-accent leading-none">
        Vote — Best in Norwich 2027
      </p>
      <p className="mt-1 text-xs text-muted-foreground" style={lora}>
        {answered === 0 || totalVotes === null
          ? `Closes ${formatDate(VOTING_CLOSES)} · winners ${formatDate(RESULTS_DATE)}`
          : `${totalVotes.toLocaleString("en-GB")} ${
              totalVotes === 1 ? "vote" : "votes"
            } so far · you have voted in ${answered} of ${categories.length}`}
      </p>

      {/* ── Category chips ─────────────────────────────────────────────── */}
      <div ref={chipsRef} className="mt-4 flex flex-wrap gap-2">
        {categories.map((c, i) => {
          const isActive = i === active;
          const done = Boolean(voted[c.key]);
          return (
            <button
              key={c.key}
              type="button"
              data-active={isActive}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition min-h-[36px] ${
                isActive
                  ? "bg-brand-accent text-brand-white"
                  : done
                    ? "bg-brand-accent-light text-brand-accent"
                    : "border border-brand-text/15 text-muted-foreground hover:border-brand-accent"
              }`}
              style={lora}
            >
              {done && !isActive && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              {c.short ?? c.label}
            </button>
          );
        })}
      </div>

      {/* ── The question ───────────────────────────────────────────────── */}
      <p className="mt-3 text-lg font-bold text-brand-text" style={lora}>
        {category.question}
      </p>
      {!revealed && category.nominees.length > 0 && (
        <p className="mt-0.5 text-xs text-muted-foreground" style={lora}>
          Pick one to see how Norwich has voted.
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-700" role="alert" style={lora}>
          {error}
        </p>
      )}

      {/* ── Email, asked once ──────────────────────────────────────────── */}
      {pending && (
        <form onSubmit={confirmEmail} className="mt-3 rounded-xl bg-brand-accent-light p-4">
          <p className="text-sm font-semibold text-brand-text mb-2" style={lora}>
            One thing, so it only counts once.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              type="email"
              required
              autoFocus
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 min-w-[180px] rounded-lg border-2 border-brand-text/15 bg-brand-white px-3 py-2.5 text-base text-brand-text outline-none focus:border-brand-accent min-h-[44px]"
              style={lora}
            />
            <button
              type="submit"
              className="rounded-full bg-brand-accent px-5 py-2.5 text-lg font-bold text-brand-white transition hover:opacity-90 min-h-[44px]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              Count it
            </button>
          </div>
          <label className="mt-2 flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#2DA96B]"
            />
            <span className="text-xs leading-snug text-muted-foreground" style={lora}>
              Email me the results.{" "}
              <a href="/privacy" className="underline hover:text-brand-accent">
                Privacy
              </a>
            </span>
          </label>
        </form>
      )}

      {/* ── Bars ───────────────────────────────────────────────────────── */}
      <div className="mt-3 space-y-2">
        {shown.map((nominee) => {
          const mine = myVote === nominee.name;
          return (
            <button
              key={nominee.name}
              type="button"
              disabled={busy}
              onClick={() => onBar(nominee.name)}
              aria-label={`Vote for ${nominee.name} as ${category.label}`}
              className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition min-h-[56px] disabled:opacity-60 ${
                mine
                  ? "border-brand-accent"
                  : "border-brand-text/10 hover:border-brand-accent"
              }`}
            >
              {revealed && (
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 transition-[width] duration-500 ${
                    mine ? "bg-brand-accent/20" : "bg-brand-accent/10"
                  }`}
                  style={{ width: `${(nominee.votes / top) * 100}%` }}
                />
              )}
              {nominee.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={nominee.image}
                  alt=""
                  className="relative z-10 h-10 w-10 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-lg font-bold text-brand-accent"
                  style={lora}
                >
                  {initials(nominee.name)}
                </span>
              )}
              <span
                className="relative z-10 flex-1 text-base leading-snug text-brand-text"
                style={lora}
              >
                {nominee.name}
              </span>
              <span className="relative z-10 flex shrink-0 items-center gap-1.5">
                {revealed && (
                  <span
                    className={`text-sm tabular-nums ${
                      mine ? "text-brand-accent" : "text-muted-foreground"
                    }`}
                    style={lora}
                  >
                    {nominee.votes}
                  </span>
                )}
                {mine && (
                  <Check className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                )}
              </span>
            </button>
          );
        })}

        {ranked.length === 0 && !adding && (
          <p className="text-sm text-muted-foreground" style={lora}>
            Nobody has said yet. Go first.
          </p>
        )}

        {justAdded && (
          <p className="text-sm text-brand-accent" style={lora}>
            Counted. We check new places by hand, so it joins the board in a day or so.
          </p>
        )}
      </div>

      {/* ── Share. Appears once someone has three votes in, because that is
            the point at which they are invested enough to send it on. ───── */}
      {showShare && (
        <div className="mt-4 rounded-xl bg-brand-accent-light p-4">
          <p className="font-caveat text-2xl font-bold text-brand-text leading-none mb-1">
            {allDone ? "That is the lot. Now stitch someone up." : "Send it to someone who will disagree."}
          </p>
          <p className="text-xs text-muted-foreground mb-3" style={lora}>
            The categories with fewest votes are the easiest to swing.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Best in Norwich 2027 is open. Vote for your coffee, pub and chippy here: ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("bin_share_click", {
                  method: "whatsapp",
                  categories_voted: answered,
                })
              }
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-5 py-2.5 text-lg font-bold text-brand-white transition hover:opacity-90 min-h-[44px]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              Send on WhatsApp
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-text/15 px-5 py-2.5 text-sm font-semibold text-brand-text transition hover:border-brand-accent min-h-[44px]"
              style={lora}
            >
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
        </div>
      )}

      {/* ── Add a place ────────────────────────────────────────────────── */}
      {adding ? (
        <form onSubmit={submitNew} className="mt-3 rounded-xl bg-brand-accent-light p-4 space-y-2">
          <input
            type="text"
            required
            autoFocus
            maxLength={80}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name of the place"
            className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-white px-3 py-2.5 text-base text-brand-text outline-none focus:border-brand-accent min-h-[44px]"
            style={lora}
          />
          <input
            type="text"
            maxLength={300}
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Their website (optional)"
            className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-white px-3 py-2.5 text-base text-brand-text outline-none focus:border-brand-accent min-h-[44px]"
            style={lora}
          />
          {!knownEmail && (
            <input
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-lg border-2 border-brand-text/15 bg-brand-white px-3 py-2.5 text-base text-brand-text outline-none focus:border-brand-accent min-h-[44px]"
              style={lora}
            />
          )}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-2.5 text-lg font-bold text-brand-white transition hover:opacity-90 disabled:opacity-60 min-h-[44px]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Add and vote
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="text-sm text-muted-foreground underline underline-offset-4"
              style={lora}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:underline underline-offset-4 min-h-[44px]"
            style={lora}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Not there? Add it
          </button>

          {ranked.length > TOP_N && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-sm text-muted-foreground hover:text-brand-accent min-h-[44px]"
              style={lora}
            >
              {expanded ? "Show fewer" : `All ${ranked.length} →`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
