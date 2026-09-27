import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import {
  BIN_ADMIN_COOKIE,
  BIN_ADMIN_MAX_AGE,
  getAdminToken,
  tokenIsValid,
} from "@/lib/binAdminAuth";
import { VOTE_YEAR } from "@/lib/best-in-norwich";

// /api/best-in-norwich/admin — moderation actions for /admin/best-in-norwich.
//
// POST { action: "login", token }           → sets the httpOnly session cookie
// POST { action: "logout" }                 → clears it
// POST { action: "approve" | "reject", id } → moves one nomination
//
// Every database call goes through a SECURITY DEFINER function that re-checks
// the token itself, so the cookie is a convenience, not the security boundary.
// No service-role key anywhere: this route uses the same write-only anon client
// as the public one.

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Slows down guessing at this route. Note the token is also reachable by
// calling Supabase directly, which is why it has to be long and random —
// see the header comment in supabase/best-in-norwich.sql.
const loginAttempts = new Map<string, number[]>();
const LOGIN_MAX = 8;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

function loginRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (loginAttempts.get(ip) ?? []).filter(
    (t) => now - t < LOGIN_WINDOW_MS
  );
  if (hits.length >= LOGIN_MAX) return true;
  loginAttempts.set(ip, [...hits, now]);
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const action = typeof body.action === "string" ? body.action : "";

  // ── Sign in ────────────────────────────────────────────────────────────────
  if (action === "login") {
    if (loginRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in a few minutes." },
        { status: 429 }
      );
    }

    const token = typeof body.token === "string" ? body.token : undefined;
    if (!(await tokenIsValid(token))) {
      return NextResponse.json({ error: "Wrong token." }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(BIN_ADMIN_COOKIE, token!, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: BIN_ADMIN_MAX_AGE,
    });
    return res;
  }

  if (action === "logout") {
    const res = NextResponse.json({ success: true });
    res.cookies.set(BIN_ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  // ── Moderate ───────────────────────────────────────────────────────────────
  if (action === "approve" || action === "reject") {
    const token = getAdminToken();
    if (!token) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }

    const id = typeof body.id === "string" ? body.id : "";
    if (!UUID_RE.test(id)) {
      return NextResponse.json({ error: "Bad id." }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 500 }
      );
    }

    const status = action === "approve" ? "approved" : "rejected";
    const { data, error } = await supabase.rpc("bin_admin_set_status", {
      p_token: token,
      p_id: id,
      p_status: status,
    });

    if (error) {
      console.error("[BinAdmin] Update failed:", error);
      return NextResponse.json({ error: "Update failed." }, { status: 500 });
    }

    // The function returns 0 for a bad token as well as a missing row, which
    // is deliberate — it never confirms whether a given id exists.
    if (Number(data) === 0) {
      return NextResponse.json(
        { error: "That did not go through. Try signing in again." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, status, year: VOTE_YEAR });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
