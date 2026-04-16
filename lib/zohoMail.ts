import nodemailer from "nodemailer";

/**
 * Returns a Nodemailer transporter configured for Zoho Mail (EU region).
 *
 * Used by /api/contact and /api/subscribe to send internal notifications to
 * hello@norwichfreewalkingtours.co.uk. We send via Zoho's own SMTP rather
 * than Resend because Zoho's inbound anti-spoof rule (554 5.7.7 "Email
 * policy violation detected") hard-rejects mail on non-Zoho infrastructure
 * claiming to be from a Zoho-hosted domain. Zoho-to-Zoho mail bypasses
 * that check entirely.
 *
 * Customer-facing mail (booking confirmations) still goes via Resend from
 * the separate booking widget repo — that mail goes to external addresses
 * where Resend's deliverability is better.
 *
 * Returns null if the required env vars are missing, so calling code can
 * fall back to console logging in dev / misconfigured environments.
 */
export function getZohoTransporter() {
  const user = process.env.ZOHO_EMAIL;
  const pass = process.env.ZOHO_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true, // implicit TLS on 465
    auth: { user, pass },
  });
}
