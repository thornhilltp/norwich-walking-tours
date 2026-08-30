import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import {
  CATEGORIES,
  PHASE,
  VOTE_YEAR,
  findCategory,
} from "@/lib/best-in-norwich";

// /api/best-in-norwich — ballot + vote capture for the Best in Norwich awards.
//
// GET  → { phase, totalVotes, categories: [{ key, label, blurb, nominees:
//         [{ name, url, votes }] }] }  — the board. Approved names with their
//         running counts, including names on zero.
// POST → { success, counted, alreadyVoted, totalVotes, results }
//
// Tables (see supabase/best-in-norwich.sql):
//   public.bin_nominees  — public write-ins, moderated. anon INSERT-only.
//   public.bin_votes     — one row per (year, category, email). anon INSERT-only.
//
// Votes are stored against the nominee NAME, not a foreign key. The ballot is
// a union of the static seed in lib/best-in-norwich.ts and approved write-ins
// in the DB, so a name is the only identifier both halves share.
//
// Same defensive shape as /api/petition: per-IP rate limiter, honeypot,
// SECURITY DEFINER RPCs so the anon key never reads a row (and never an email).

export const dynamic = "force-dynamic";

// ── Rate limiter ──────────────────────────────────────────────────────────────
// Per-instance and in-memory, same as /api/petition. Slows casual spam; will
// not stop a determined botnet.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOMINEE_NAME = 80;
const MAX_URL = 300;

function sanitizeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  return trimmed;
}

/** Only http(s). Anything else (javascript:, data:) is dropped rather than
 *  rejected — a bad URL should not lose someone's vote. */
function sanitizeUrl(value: unknown): string | null {
  const raw = sanitizeText(value, MAX_URL);
  if (!raw) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

// ── Board ────────────────────────────────────────────────────────────────────
// The chart and the ballot are the same thing: every approved name in a
// category with its running count. Clicking a bar is a vote, so the client
// needs the counts up front.
export async function GET() {
  const supabase = getSupabaseClient();

  let board: {
    category_key: string;
    nominee_name: string;
    url: string | null;
    image_url: string | null;
    votes: number;
  }[] = [];
  let totalVotes = 0;

  if (supabase) {
    const [boardRes, countRes] = await Promise.all([
      supabase.rpc("bin_board", { p_year: VOTE_YEAR }),
      supabase.rpc("bin_total_votes", { p_year: VOTE_YEAR }),
    ]);

    if (boardRes.error) {
      console.error("[BestInNorwich] Board RPC failed:", boardRes.error);
    } else if (Array.isArray(boardRes.data)) {
      board = boardRes.data;
    }

    if (countRes.error) {
      console.error("[BestInNorwich] Count RPC failed:", countRes.error);
    } else {
      totalVotes = Number(countRes.data) || 0;
    }
  }

  const categories = CATEGORIES.map((category) => ({
    key: category.key,
    label: category.label,
    question: category.question ?? `${category.label} in Norwich?`,
    blurb: category.blurb,
    nominees: board
      .filter((row) => row.category_key === category.key)
      .map((row) => ({
        name: row.nominee_name,
        url: row.url,
        image: row.image_url,
        votes: Number(row.votes) || 0,
      })),
  }));

  return NextResponse.json({ phase: PHASE, year: VOTE_YEAR, totalVotes, categories });
}

// ── Vote ──────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // During nominations we take write-ins but not votes — the ballot is still
  // being built, so a vote cast now would be racing an incomplete field.
  const takingVotes = PHASE === "voting-open";
  const takingNominations = PHASE === "nominations-open" || PHASE === "voting-open";

  if (!takingNominations) {
    return NextResponse.json(
      { error: "The ballot is closed for this year." },
      { status: 409 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Steady on. Try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Honeypot — bots fill every field they find.
    if (body._trap) {
      return NextResponse.json({ success: true, counted: 0, alreadyVoted: [] });
    }

    const email = sanitizeText(body.email, 254);
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // UK GDPR: a vote is not consent to be marketed at. Separate flag, never
    // inferred from voting.
    const marketingOptIn = body.marketingOptIn === true;

    // votes: { [categoryKey]: nomineeName }
    const rawVotes =
      body.votes && typeof body.votes === "object" ? body.votes : {};
    const votes: { category_key: string; nominee_name: string }[] = [];

    for (const [categoryKey, value] of Object.entries(takingVotes ? rawVotes : {})) {
      if (!findCategory(categoryKey)) continue;
      const nomineeName = sanitizeText(value, MAX_NOMINEE_NAME);
      if (!nomineeName) continue;
      votes.push({ category_key: categoryKey, nominee_name: nomineeName });
    }

    // nominations: [{ categoryKey, name, url? }] — write-ins. Stored pending
    // and invisible on the ballot until approved in Supabase.
    const rawNominations = Array.isArray(body.nominations) ? body.nominations : [];
    const nominations: {
      category_key: string;
      name: string;
      url: string | null;
    }[] = [];

    for (const entry of rawNominations.slice(0, CATEGORIES.length)) {
      if (!entry || typeof entry !== "object") continue;
      if (!findCategory(entry.categoryKey)) continue;
      const name = sanitizeText(entry.name, MAX_NOMINEE_NAME);
      if (!name) continue;
      nominations.push({
        category_key: entry.categoryKey,
        name,
        url: sanitizeUrl(entry.url),
      });
    }

    if (votes.length === 0 && nominations.length === 0) {
      return NextResponse.json(
        {
          error: takingVotes
            ? "Pick at least one category before you submit."
            : "Add at least one suggestion before you submit.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn("[BestInNorwich] Supabase env vars not set — vote dropped.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Marketing consent has to be recorded before anything else, because in
    // the nominations phase there are no vote rows to hang it off. Ticking the
    // box on a nomination is a real opt-in and has to reach the actual list.
    if (marketingOptIn) {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email, source: "best_in_norwich" });
      // 23505 = already on the list. Nothing to do.
      if (error && error.code !== "23505") {
        console.error("[BestInNorwich] Subscriber insert failed:", error);
      }
    }

    // Write-ins next, so an approved one can be voted for next time round.
    //
    // One row at a time, deliberately. Every answer is a write-in now, so a
    // ballot will usually contain at least one name that already exists — and
    // a multi-row insert fails as a whole on the first unique violation, which
    // would silently drop the genuinely new names alongside it.
    for (const nomination of nominations) {
      const { error } = await supabase.from("bin_nominees").insert({
        year: VOTE_YEAR,
        category_key: nomination.category_key,
        name: nomination.name,
        url: nomination.url,
        status: "pending",
        submitted_by_email: email,
        marketing_opt_in: marketingOptIn,
      });
      // 23505 = we already know this name in this category. Nothing to do.
      if (error && error.code !== "23505") {
        console.error("[BestInNorwich] Nomination insert failed:", error);
      }
    }

    // Votes go in one at a time so a single duplicate category does not throw
    // away the rest of the ballot.
    const alreadyVoted: string[] = [];
    let counted = 0;

    for (const vote of votes) {
      const { error } = await supabase.from("bin_votes").insert({
        year: VOTE_YEAR,
        category_key: vote.category_key,
        nominee_name: vote.nominee_name,
        email,
        marketing_opt_in: marketingOptIn,
        source: "best_in_norwich",
      });

      if (!error) {
        counted += 1;
        continue;
      }

      // 23505 = unique violation on (year, category_key, email).
      if (error.code === "23505") {
        alreadyVoted.push(vote.category_key);
        continue;
      }

      console.error("[BestInNorwich] Vote insert failed:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    const { data: totalData } = await supabase.rpc("bin_total_votes", {
      p_year: VOTE_YEAR,
    });

    // Standings, for the chart the vote page shows once someone has voted.
    // Only approved names are charted — see bin_public_results.
    let results: unknown[] = [];
    if (body.wantResults === true) {
      const { data, error } = await supabase.rpc("bin_public_results", {
        p_year: VOTE_YEAR,
      });
      if (error) {
        console.error("[BestInNorwich] Results RPC failed:", error);
      } else if (Array.isArray(data)) {
        results = data;
      }
    }

    return NextResponse.json({
      success: true,
      counted,
      alreadyVoted,
      nominated: nominations.length,
      totalVotes: Number(totalData) || 0,
      results,
    });
  } catch (err) {
    console.error("[BestInNorwich] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
