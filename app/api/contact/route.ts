import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Simple in-memory rate limiter ─────────────────────────────────────────────
// Tracks submission timestamps per IP. Max 3 submissions per 10 minutes.
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

// ── Validation helpers ────────────────────────────────────────────────────────
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

// ── Contact form handler ──────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Rate limiting — use forwarded IP header (Vercel sets x-forwarded-for)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Reject honeypot (bots fill this hidden field; real users never see it)
    if (body._trap) {
      return NextResponse.json({ success: true }); // silent discard
    }

    const name = sanitizeText(body.name, 120);
    const email = sanitizeText(body.email, 254);
    const message = sanitizeText(body.message, 2000);

    if (!name) {
      return NextResponse.json(
        { error: "Please enter your name (max 120 characters)." },
        { status: 400 }
      );
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: "Please enter a message (max 2000 characters)." },
        { status: 400 }
      );
    }

    // ── Send via Resend ──────────────────────────────────────────────────────
    // Requires RESEND_API_KEY env var. Set this in Vercel → Settings → Environment Variables.
    // Also requires norwichfreewalkingtours.co.uk to be verified as a sending domain in Resend.
    if (process.env.RESEND_API_KEY) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message);
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Norwich Free Tour <noreply@norwichfreewalkingtours.co.uk>",
        to: "hello@norwichfreewalkingtours.co.uk",
        replyTo: email,
        subject: `Contact form: ${name}`,
        text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${safeMessage}</p>
        `,
      });
    } else {
      // Fallback logging when RESEND_API_KEY is not set (dev / pre-launch)
      console.log("[Contact form] RESEND_API_KEY not set — logging only:", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact form] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
