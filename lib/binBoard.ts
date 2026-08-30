import { getSupabaseClient } from "@/lib/supabase";
import { CATEGORIES, VOTE_YEAR } from "@/lib/best-in-norwich";

// Server-side board fetch for /best-in-norwich and /best-in-norwich/vote.
//
// Kept out of lib/best-in-norwich.ts on purpose: that file is imported by the
// client component, and pulling the Supabase client in with it would ship the
// whole SDK to the browser.
//
// The pages render the bars from this, so the board exists in the HTML rather
// than appearing a beat later. VoteBoard still refreshes on mount, which is
// what keeps the counts live after an ISR-cached page is served.

export interface BoardCategory {
  key: string;
  label: string;
  blurb?: string;
  nominees: { name: string; url: string | null; votes: number }[];
}

export async function getBoard(): Promise<BoardCategory[]> {
  const empty = CATEGORIES.map((c) => ({
    key: c.key,
    label: c.label,
    blurb: c.blurb,
    nominees: [],
  }));

  const supabase = getSupabaseClient();
  if (!supabase) return empty;

  const { data, error } = await supabase.rpc("bin_board", { p_year: VOTE_YEAR });
  if (error) {
    console.error("[BestInNorwich] Board fetch failed:", error);
    return empty;
  }

  const rows = (data ?? []) as {
    category_key: string;
    nominee_name: string;
    url: string | null;
    votes: number;
  }[];

  return CATEGORIES.map((c) => ({
    key: c.key,
    label: c.label,
    blurb: c.blurb,
    nominees: rows
      .filter((r) => r.category_key === c.key)
      .map((r) => ({
        name: r.nominee_name,
        url: r.url,
        votes: Number(r.votes) || 0,
      })),
  }));
}
