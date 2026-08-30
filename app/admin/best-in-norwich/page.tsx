import type { Metadata } from "next";
import { getAdminToken, tokenIsValid } from "@/lib/binAdminAuth";
import { getSupabaseClient } from "@/lib/supabase";
import { VOTE_CATEGORIES, VOTE_YEAR, findVoteCategory } from "@/lib/best-in-norwich";
import {
  NomineeList,
  SignIn,
  SignOutButton,
  type PendingNominee,
} from "./_components/AdminClient";

// /admin/best-in-norwich — moderation screen for public nominations.
//
// Not linked from anywhere and noindex. Sign in with the shared token, which is
// verified against a hash held in Postgres (public.bin_admin_secret) rather
// than against an environment variable.
//
// Reads go through SECURITY DEFINER functions that take the token as an
// argument, so this page runs on the ordinary write-only anon key. There is no
// service-role key in this app by design.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best in Norwich — moderation",
  robots: { index: false, follow: false },
};

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

interface PendingRow {
  id: string;
  category_key: string;
  name: string;
  url: string | null;
  created_at: string;
}

export default async function BinAdminPage() {
  const token = getAdminToken();
  const authed = await tokenIsValid(token);

  let pending: PendingNominee[] = [];
  const counts: Record<string, number> = {};
  let loadError = "";

  if (authed) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      loadError = "Supabase is not configured for this deployment.";
    } else {
      const [pendingRes, countsRes] = await Promise.all([
        supabase.rpc("bin_admin_pending", { p_token: token, p_year: VOTE_YEAR }),
        supabase.rpc("bin_admin_counts", { p_token: token, p_year: VOTE_YEAR }),
      ]);

      if (pendingRes.error) {
        loadError = pendingRes.error.message;
      } else {
        pending = ((pendingRes.data ?? []) as PendingRow[]).map((row) => ({
          id: row.id,
          category_key: row.category_key,
          category_label: findVoteCategory(row.category_key)?.label ?? row.category_key,
          name: row.name,
          url: row.url,
          created_at: row.created_at,
        }));
      }

      if (!countsRes.error && Array.isArray(countsRes.data)) {
        for (const row of countsRes.data as { status: string; n: number }[]) {
          counts[row.status] = Number(row.n) || 0;
        }
      }
    }
  }

  return (
    <main className="bg-brand-bg min-h-screen pt-24 pb-20">
      <div className="brand-container max-w-3xl">
        <p
          className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3"
          style={lora}
        >
          Best in Norwich {VOTE_YEAR}
        </p>
        <h1 className="mb-6 leading-tight">
          <span className="block font-caveat text-5xl font-bold text-brand-accent">
            Nominations to check
          </span>
        </h1>

        {!authed ? (
          <>
            <p className="mb-6 text-lg text-muted-foreground" style={lora}>
              Enter the admin token to moderate suggestions.
            </p>
            <SignIn />
          </>
        ) : loadError ? (
          <p className="text-lg text-red-700" style={lora}>
            {loadError}
          </p>
        ) : (
          <>
            <div
              className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
              style={lora}
            >
              <span>{counts.pending ?? 0} waiting</span>
              <span aria-hidden="true">·</span>
              <span>{counts.approved ?? 0} on the ballot</span>
              <span aria-hidden="true">·</span>
              <span>{counts.rejected ?? 0} rejected</span>
              <span aria-hidden="true">·</span>
              <span>{VOTE_CATEGORIES.length} categories</span>
            </div>

            <NomineeList nominees={pending} />

            <div className="mt-10 border-t border-brand-text/10 pt-6 space-y-3">
              <p className="text-sm text-muted-foreground" style={lora}>
                Approved names appear on the public ballot straight away. Rejected ones
                never show, and the person who suggested them is not told either way.
              </p>
              <SignOutButton />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
