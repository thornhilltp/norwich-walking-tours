// One-off logo export for social media assets.
// Usage: node scripts/export-logos.mjs
//
// Sources are high-res PNGs (public/logo.png = wide wordmark,
// public/logo-icon.png = square pin). For white variants we swap RGB->white
// while keeping alpha so colour changes don't re-rasterise the source.
//
// Output: public/social/*.png

import sharp from "sharp";
import { readFileSync, rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const outDir = resolve(root, "public/social");

// Clear any stale outputs from previous runs
if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
const { mkdirSync } = await import("node:fs");
mkdirSync(outDir, { recursive: true });

const logoSrc = readFileSync(resolve(root, "public/logo.png"));
const pinSrc = readFileSync(resolve(root, "public/logo-icon.png"));

// Brand palette (from CLAUDE.md §3)
const BG_WARM = "#FCFAF8";
const BG_GREEN = "#2DA96B";
const BG_BLACK = "#000000";

const out = (name) => resolve(outDir, name);

// Render SVG to a transparent PNG buffer at a given width
async function renderTransparent(svg, width) {
  return sharp(svg, { density: 600 })
    .resize({ width, withoutEnlargement: false })
    .png()
    .toBuffer();
}

// Recolour a transparent RGBA PNG so every non-transparent pixel becomes solid
// `#hex`, alpha preserved. Used to produce white/black variants from the green
// source without re-rasterising the SVG.
async function recolour(rgbaBuf, hex) {
  const img = sharp(rgbaBuf).ensureAlpha();
  const { width, height } = await img.metadata();
  const alpha = await img.clone().extractChannel("alpha").toBuffer();
  return sharp({ create: { width, height, channels: 3, background: hex } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

// Compose a logo buffer centred on a coloured square canvas
async function onCanvas(logoBuf, canvasSize, bg, outPath) {
  await sharp({
    create: { width: canvasSize, height: canvasSize, channels: 4, background: bg },
  })
    .composite([{ input: logoBuf, gravity: "center" }])
    .png()
    .toFile(outPath);
  console.log("wrote", outPath.split(/[\\/]/).pop());
}

// ── WIDE WORDMARK + PIN (for cover photos, banners, email signatures) ────
// Natural green master — paste onto any light/warm background
const logoGreen2400 = await renderTransparent(logoSrc, 2400);
await sharp(logoGreen2400).toFile(out("logo-wide-green-2400-transparent.png"));
console.log("wrote logo-wide-green-2400-transparent.png");

// White master (for dark backgrounds — matches your site header)
const logoWhite2400 = await recolour(logoGreen2400, "#FFFFFF");
await sharp(logoWhite2400).toFile(out("logo-wide-white-2400-transparent.png"));
console.log("wrote logo-wide-white-2400-transparent.png");

// White-on-black (matches site nav + your screenshot)
// Canvas: 2400 wide to fit the logo with generous padding
const logoScaled = await sharp(logoWhite2400).resize({ width: 1600 }).toBuffer();
await sharp({
  create: { width: 2400, height: 1260, channels: 4, background: BG_BLACK },
})
  .composite([{ input: logoScaled, gravity: "center" }])
  .png()
  .toFile(out("logo-wide-on-black-2400x1260.png"));
console.log("wrote logo-wide-on-black-2400x1260.png");

// Green-on-warm (matches scrolled nav / site body)
const logoGreenScaled = await sharp(logoGreen2400).resize({ width: 1600 }).toBuffer();
await sharp({
  create: { width: 2400, height: 1260, channels: 4, background: BG_WARM },
})
  .composite([{ input: logoGreenScaled, gravity: "center" }])
  .png()
  .toFile(out("logo-wide-on-warm-2400x1260.png"));
console.log("wrote logo-wide-on-warm-2400x1260.png");

// ── SQUARE PIN (for profile pics — IG/TikTok/Pinterest/FB/GBP) ───────────
// Profile pics crop to circle on most platforms, so icon must sit well central.
// Source pin at 700px fits nicely on a 1080 square with comfortable padding.
const pinGreen = await renderTransparent(pinSrc, 700);
const pinWhite = await recolour(pinGreen, "#FFFFFF");
const pinGreenHiRes = await renderTransparent(pinSrc, 2000);

// Transparent masters
await sharp(pinGreenHiRes).toFile(out("pin-green-2000-transparent.png"));
console.log("wrote pin-green-2000-transparent.png");
const pinWhite2000 = await recolour(pinGreenHiRes, "#FFFFFF");
await sharp(pinWhite2000).toFile(out("pin-white-2000-transparent.png"));
console.log("wrote pin-white-2000-transparent.png");

// Profile-ready squares at 1080×1080
await onCanvas(pinWhite, 1080, BG_BLACK, out("profile-pin-on-black-1080.png"));
await onCanvas(pinWhite, 1080, BG_GREEN, out("profile-pin-on-green-1080.png"));
await onCanvas(pinGreen, 1080, BG_WARM, out("profile-pin-on-warm-1080.png"));

console.log("\nDone — all assets in public/social/");
