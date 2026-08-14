import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

// /api/petition — signature capture for the Roy's Plaza parody petition.
//
// GET  → { count }            public signature total, via a SECURITY DEFINER
//                             RPC so RLS never has to expose rows.
// POST → { success, already } inserts one signature.
//
// Table: public.roys_plaza_signatures (anon INSERT-only RLS policy).

export const dynamic = "force-dynamic";

// ── Rate limiter ──────────────────────────────────────────────────────────────
// Same in-memory approach as /api/subscribe. Per-instance only, so it slows
// casual spam rather than stopping a determined botnet.
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

function sanitizeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  return trimmed;
}

// ── Count ─────────────────────────────────────────────────────────────────────
export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ count: 0 });
  }

  const { data, error } = await supabase.rpc("roys_plaza_signature_count");

  if (error) {
    console.error("[Petition] Count RPC failed:", error);
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: Number(data) || 0 });
}

// ── Sign ──────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
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
      return NextResponse.json({ success: true, already: false });
    }

    const name = sanitizeText(body.name, 80);
    if (!name) {
      return NextResponse.json(
        { error: "Please tell us your name." },
        { status: 400 }
      );
    }

    const email = sanitizeText(body.email, 254);
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // UK GDPR: the signature itself is fine, but emailing them later needs
    // explicit opt-in. Stored as its own flag, never inferred from signing.
    const marketingOptIn = body.marketingOptIn === true;

    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn("[Petition] Supabase env vars not set — signature dropped.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    const { error } = await supabase.from("roys_plaza_signatures").insert({
      name,
      email,
      demand_statue: body.demandStatue === true,
      demand_all_shops: body.demandAllShops === true,
      marketing_opt_in: marketingOptIn,
      source: "roys_plaza",
    });

    if (error) {
      // 23505 = unique violation on email. They've already signed.
      if (error.code === "23505") {
        return NextResponse.json({ success: true, already: true });
      }
      console.error("[Petition] Supabase insert failed:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Fresh count so the client can update without a second round trip.
    const { data: countData } = await supabase.rpc("roys_plaza_signature_count");

    return NextResponse.json({
      success: true,
      already: false,
      count: Number(countData) || 0,
    });
  } catch (err) {
    console.error("[Petition] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
