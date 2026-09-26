// Photo prep + guard for public/images/tour.
//
// Every tour photo on the site must be:
//   - JPEG, progressive, EXIF stripped (no GPS / camera data shipped)
//   - long edge <= 2400px (desktop hero is 1280-1920 wide; 2400 covers 2x on phones)
//   - file size <= 600 KB
//
// Prep raw photos (PNG/JPEG/HEIC, any size) into the standard:
//   node scripts/prep-photos.mjs "public/Morrie Good Photos/walking down pottergate.png" --name pottergate-walk
//   node scripts/prep-photos.mjs "public/Morrie Good Photos"        (whole folder, names slugified)
//
// Check everything already in public/images/tour meets the standard (exits 1 if not):
//   node scripts/prep-photos.mjs --check
//
// Options: --name <slug>  output filename for a single input
//          --out <dir>    output folder (default public/images/tour)
//          --max <px>     long edge (default 2400)

import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, extname, basename, join } from "node:path";

const MAX_EDGE = 2400;
const MAX_BYTES = 600 * 1024;
const OUT_DEFAULT = resolve("public/images/tour");
const RAW_EXT = new Set([".png", ".jpg", ".jpeg", ".heic", ".webp", ".tif", ".tiff"]);

const argv = process.argv.slice(2);
const flag = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
const inputs = argv.filter((a, i) => !a.startsWith("--") && !["--name", "--out", "--max"].includes(argv[i - 1]));
const outDir = resolve(flag("--out") ?? OUT_DEFAULT);
const maxEdge = Number(flag("--max") ?? MAX_EDGE);
const kb = (n) => `${Math.round(n / 1024)} KB`;

const slugify = (s) =>
  basename(s, extname(s)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function encode(src, dest) {
  // Step quality down until under budget. Starts at 82 (visually lossless
  // for photos at this size); rarely needs more than two steps.
  // Read into memory first so re-encoding a file in place (src === dest) works.
  const input = readFileSync(src);
  for (const q of [82, 78, 74, 70, 66]) {
    const buf = await sharp(input)
      .rotate() // honour EXIF orientation before stripping it
      .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: q, progressive: true, mozjpeg: true })
      .toBuffer();
    if (buf.length <= MAX_BYTES || q === 66) {
      writeFileSync(dest, buf);
      const m = await sharp(buf).metadata();
      return { q, bytes: buf.length, w: m.width, h: m.height };
    }
  }
}

async function check() {
  const files = readdirSync(outDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const bad = [];
  for (const f of files) {
    const p = join(outDir, f);
    const bytes = statSync(p).size;
    const m = await sharp(p).metadata();
    const problems = [];
    if (Math.max(m.width, m.height) > maxEdge) problems.push(`${m.width}x${m.height} > ${maxEdge}px`);
    if (bytes > MAX_BYTES) problems.push(`${kb(bytes)} > ${kb(MAX_BYTES)}`);
    if (m.exif) problems.push("EXIF present");
    if (problems.length) bad.push(`${f}: ${problems.join(", ")}`);
  }
  if (bad.length) {
    console.error(`${bad.length} photo(s) outside the standard:\n  ${bad.join("\n  ")}\nRe-run prep on the raw file to fix.`);
    process.exit(1);
  }
  console.log(`${files.length} photos in ${outDir} all within ${maxEdge}px / ${kb(MAX_BYTES)}, no EXIF.`);
}

if (argv.includes("--check")) {
  await check();
} else if (!inputs.length) {
  console.error("Give a photo or folder to prep, or --check. See header comment for usage.");
  process.exit(1);
} else {
  mkdirSync(outDir, { recursive: true });
  const name = flag("--name");
  const jobs = [];
  for (const inp of inputs) {
    const p = resolve(inp);
    if (statSync(p).isDirectory()) {
      for (const f of readdirSync(p)) if (RAW_EXT.has(extname(f).toLowerCase())) jobs.push([join(p, f), slugify(f)]);
    } else {
      jobs.push([p, name ?? slugify(p)]);
    }
  }
  if (name && jobs.length > 1) { console.error("--name only works with a single input file."); process.exit(1); }
  for (const [src, slug] of jobs) {
    const dest = join(outDir, `${slug}.jpg`);
    const r = await encode(src, dest);
    console.log(`${slug}.jpg  ${r.w}x${r.h}  ${kb(r.bytes)}  q${r.q}`);
  }
}
