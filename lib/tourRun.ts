// A tour's run of dates in words, from its scheduled walks (live from the
// booking app, or the published dates when the booking app can't be read).
// Tom 2026-10-22: Dark History dates are being added after 6 Nov, so the
// page's date wording, FAQs, search description and Google event listings
// follow the booking app instead of being typed in.

export type RunWalk = { date: string; time: string; spotsLeft: number };

export type RunInfo = {
  /** No walks left. */
  empty: boolean;
  /** "Most evenings" when at least half the nights in the run have a walk. */
  pattern: "Most evenings" | "Selected evenings";
  /** The usual start time, e.g. "6pm". */
  timeLabel: string;
  /** Last walk, e.g. "6 Nov" and "6 November". */
  untilShort: string;
  untilLong: string;
};

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

const day = (iso: string, month: "short" | "long") =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month, timeZone: "UTC" });

export function describeRun(walks: RunWalk[]): RunInfo {
  if (walks.length === 0) {
    return { empty: true, pattern: "Selected evenings", timeLabel: "", untilShort: "", untilLong: "" };
  }
  const dates = Array.from(new Set(walks.map((w) => w.date))).sort();
  const first = dates[0];
  const last = dates[dates.length - 1];
  const spanDays = Math.round((Date.parse(`${last}T12:00:00Z`) - Date.parse(`${first}T12:00:00Z`)) / 86400000) + 1;
  const pattern = dates.length >= 2 && dates.length / spanDays >= 0.5 ? "Most evenings" : "Selected evenings";
  // The most common start time.
  const counts = new Map<string, number>();
  for (const w of walks) counts.set(w.time, (counts.get(w.time) ?? 0) + 1);
  const time = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0][0];
  return { empty: false, pattern, timeLabel: formatTime(time), untilShort: day(last, "short"), untilLong: day(last, "long") };
}

/** Today's date in Norwich (YYYY-MM-DD). */
export function londonToday() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
