import { NextRequest, NextResponse } from "next/server";
import { getZohoTransporter } from "@/lib/zohoMail";
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

    // UK GDPR / EU GDPR: marketing requires explicit opt-in. Reject submissions
    // that arrive without `consent: true` — the browser enforces this via the
    // required checkbox, but scripted/malformed requests could bypass it.
    if (body.consent !== true) {
      return NextResponse.json(
        { error: "Please confirm your consent to receive marketing emails." },
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

    // ── 2. Fire Zoho SMTP notification (only for genuinely new subscribers) ──
    if (!alreadySubscribed) {
      const transporter = getZohoTransporter();
      if (transporter) {
        const safeEmail = escapeHtml(email);
        const safeTimestamp = escapeHtml(timestamp);
        try {
          const info = await transporter.sendMail({
            from: `"Norwich Free Tour" <${process.env.ZOHO_EMAIL}>`,
            to: "hello@norwichfreewalkingtours.co.uk",
            subject: `New subscriber: ${email}`,
            text: `New email subscription\n\nEmail: ${email}\nTimestamp: ${timestamp}\nIP: ${ip}`,
            html: `
              <h2>New email subscription</h2>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Timestamp:</strong> ${safeTimestamp}</p>
            `,
          });
          console.log("[Subscribe] Zoho SMTP accepted, id:", info.messageId);
        } catch (emailErr) {
          // Don't fail the request if the notification email breaks — the
          // subscriber is already safely in Supabase.
          console.error("[Subscribe] Zoho SMTP notification failed:", emailErr);
        }
      } else {
        console.log("[Subscribe] ZOHO_* env vars not set — DB insert only:", {
          email,
          timestamp,
        });
      }
    }

    return NextResponse.json({ success: true, alreadySubscribed });
  } catch (err) {
    console.error("[Subscribe] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
