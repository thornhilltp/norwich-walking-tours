import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseClient } from "@/lib/supabase";

// ── Simple in-memory rate limiter ─────────────────────────────────────────────
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  return trimmed;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Subscribe handler ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Honeypot
    if (body._trap) {
      return NextResponse.json({ success: true });
    }

    const email = sanitizeText(body.email, 254);
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // ── 1. Persist to Supabase ───────────────────────────────────────────────
    // Table has a UNIQUE constraint on email. Postgres error code 23505 means
    // the address is already subscribed — treat that as success to avoid
    // leaking whether the address is on our list (email enumeration defence).
    const supabase = getSupabaseClient();
    let alreadySubscribed = false;

    if (supabase) {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email, source: "homepage" });

      if (error) {
        if (error.code === "23505") {
          alreadySubscribed = true;
        } else {
          console.error("[Subscribe] Supabase insert failed:", error);
          return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
          );
        }
      }
    } else {
      console.warn(
        "[Subscribe] Supabase env vars not set — skipping DB insert."
      );
    }

    // ── 2. Fire Resend notification (only for genuinely new subscribers) ─────
    if (!alreadySubscribed && process.env.RESEND_API_KEY) {
      const safeEmail = escapeHtml(email);
      const safeTimestamp = escapeHtml(timestamp);
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: "Norwich Free Tour <noreply@norwichfreewalkingtours.co.uk>",
          to: "hello@norwichfreewalkingtours.co.uk",
          subject: `New subscriber: ${email}`,
          text: `New email subscription\n\nEmail: ${email}\nTimestamp: ${timestamp}\nIP: ${ip}`,
          html: `
            <h2>New email subscription</h2>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Timestamp:</strong> ${safeTimestamp}</p>
          `,
        });
      } catch (emailErr) {
        // Don't fail the request if the notification email breaks — the
        // subscriber is already safely in Supabase.
        console.error("[Subscribe] Resend notification failed:", emailErr);
      }
    } else if (!alreadySubscribed && !process.env.RESEND_API_KEY) {
      console.log("[Subscribe] RESEND_API_KEY not set — DB insert only:", {
        email,
        timestamp,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Subscribe] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
