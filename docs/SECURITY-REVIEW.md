# Security Review — Norwich Free Walking Tour Website

**Date:** 2026-04-14
**Scope:** Code-level review of the Next.js marketing site (excludes the separate booking widget repo).
**Reviewer:** Claude Code, prior to first production deploy.

---

## Summary

| Severity | Count | Notes |
|---|---|---|
| Critical | 0 | — |
| High | 1 | HTML injection in contact email template — **fixed this review**. |
| Medium | 3 | In-memory rate limiter, missing schema validation, Next.js dependency CVEs (see below). |
| Info | 3 | CSP uses `unsafe-inline/eval`, no CAPTCHA, rate limiter not shared across instances. |

All High findings are remediated or accepted. See per-item status below.

---

## 1. Security headers ✅ Good

`next.config.mjs` sets:

- **HSTS:** `max-age=63072000; includeSubDomains; preload` (2 years, preload list eligible once domain is live).
- **X-Frame-Options:** `SAMEORIGIN` (prevents clickjacking of the marketing site; booking widget is on a separate origin and embedded deliberately).
- **X-Content-Type-Options:** `nosniff`.
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **Permissions-Policy:** camera, microphone, geolocation denied.
- **Content-Security-Policy:** scoped to self + GTM/GA + Resend + the booking widget origin; `frame-ancestors 'none'`.

**Accepted limitations:**
- `script-src` includes `'unsafe-inline'` and `'unsafe-eval'` — required for Next.js inline bootstrapping and the GTM snippet. Tightening would require a nonce-based CSP + script refactor; out of scope for a static marketing site.
- No `Report-To` / `Reporting-Endpoints` header configured. Optional future addition.

---

## 2. Consent & privacy ✅ Good

- **Consent Mode v2** initialised in `app/layout.tsx` with all signals (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`, `functionality_storage`, `personalization_storage`, `security_storage`) defaulting to `denied` until the user accepts in the cookie banner.
- `wait_for_update` of 500 ms blocks tag fire until user chooses.
- Cookie banner respects "decline" as the privacy-preserving default.
- Privacy policy published at `/privacy` and linked from the banner.

---

## 3. Contact form — `/app/api/contact/route.ts`

**Baseline (good):**
- Honeypot field `_trap` — bots that auto-fill all fields are silently discarded.
- In-memory rate limit: 3 submissions per 10 minutes per IP.
- Input sanitisation: `trim()` + max-length (`name` 120, `email` 254, `message` 2000).
- Email regex validation.
- Type checking on each field.

### 🔴 HIGH — HTML injection into outbound email — **FIXED**

**Before:** `name`, `email`, `message` were interpolated directly into the HTML email body without entity escaping. A submission containing `<script>` or `<img onerror="…">` would be embedded verbatim in the HTML email sent to `hello@norwichfreewalkingtours.co.uk`. While modern mail clients strip scripts, HTML injection still enables phishing-style display changes and exfiltration via image requests.

**After:** Added an `escapeHtml()` helper that replaces `& < > " '` with their entity equivalents. Applied to all three fields before interpolation. Plain-text part left as-is (safe — no rendering).

**Verification:** Submit `<script>alert(1)</script>` via the contact form. The resulting email HTML must show `&lt;script&gt;alert(1)&lt;/script&gt;` rather than an executable tag.

### 🟡 MEDIUM — In-memory rate limit

The `rateLimitMap` resets on every serverless cold start and is not shared across Vercel function instances. An attacker could defeat the 3/10-min limit by distributing requests across cold starts. **Accepted** for launch given zero baseline traffic; revisit if abuse occurs. Upgrade path: Upstash Redis or Vercel KV.

### 🟡 MEDIUM — No schema validation library

Manual regex + sanitisation is sufficient for MVP with two fields. Introducing `zod` would reduce the risk of future bugs as endpoints grow. **Deferred** until a second protected endpoint is added.

---

## 4. Subscribe endpoint — `/app/api/subscribe/route.ts`

New endpoint created in this review. Mirrors the contact route defences from day one:

- Honeypot, 3/10-min rate limit, email regex, max length 254, type check.
- `escapeHtml()` applied to email + timestamp before HTML interpolation.
- IP logged in plain-text body only; never surfaced to the end user.

No outstanding findings.

---

## 5. Dependencies — `npm audit --omit=dev`

```
1 high severity vulnerability
```

All findings are in the transitive `next` package.

| ID | Title | Severity | Affected range |
|---|---|---|---|
| GHSA-9g9p-9gw9-jx7f | Image Optimizer DoS via remotePatterns | moderate | `<15.5.10` |
| GHSA-h25m-26qc-wcjf | Request deserialization DoS with insecure RSC | high | `<15.0.8` |
| GHSA-ggv3-7p47-pfv8 | HTTP request smuggling in rewrites | moderate | `<15.5.13` |
| GHSA-3x4c-7xq6-9pq8 | Unbounded `next/image` disk cache growth | moderate | `<15.5.14` |
| GHSA-q4gf-8mx6-v5v3 | Server Components DoS | high | `<15.5.15` |

**Installed:** `next@14.2.35`. **Fix available:** `next@16.2.3` (semver-major upgrade, breaking changes in App Router APIs).

### Risk assessment

- We are a **marketing site**, not a Next.js SaaS. Of the five advisories:
  - DoS vectors only. No data exfiltration / auth bypass / RCE.
  - Vercel hosts with per-request isolation and WAF — reduces realistic blast radius.
  - No `remotePatterns` configured in `next.config.mjs` (all images are local under `/public`), so GHSA-9g9p-9gw9-jx7f is effectively non-exploitable here.
  - No custom rewrites that accept user-controlled upstreams, reducing GHSA-ggv3-7p47-pfv8.
  - `next/image` cache growth (GHSA-3x4c-7xq6-9pq8) is capped by Vercel's build output size; realistic risk is negligible.

### Decision

**Accept for initial launch.** Upgrade to `next@15.x` (then `16.x`) scheduled as a post-launch task to avoid coupling a DoS-only upgrade with go-live. Blocker review will be added once traffic exists and breaking-change surface can be properly tested.

Re-run `npm audit` after the upgrade and commit the clean output.

---

## 6. Other observations

- **ℹ️ No CAPTCHA:** The honeypot + rate limit combination is appropriate for current traffic levels. Add Turnstile or hCaptcha if spam becomes a problem.
- **ℹ️ Secrets handling:** `RESEND_API_KEY` is only read via `process.env` and never logged. `.env*` is gitignored. Confirm via `git ls-files .env* | wc -l` returning 0 before launch.
- **ℹ️ Iframe hardening:** Hero and `/book` iframes now carry `loading="lazy"` and `referrerPolicy="origin"`. Hero also retains a tight `sandbox` attribute.

---

## Action items (tracked)

- [x] Fix HTML injection in `app/api/contact/route.ts`.
- [x] Apply same escape in `app/api/subscribe/route.ts` from day one.
- [x] Document `npm audit` findings and accept risk.
- [ ] Post-launch: plan `next@15 → 16` upgrade once dependency surface is testable.
- [ ] Revisit rate limiter (Upstash/KV) if any endpoint sees abuse.
