// Next bookable walk per tour, read from the booking app's Supabase tables
// (same project, same public read access the booking widget itself uses:
// `tours` rows are scheduled walks; products identify which tour). Server
// side only. Returns null for a tour when nothing is bookable or the env
// vars are missing, so cards simply hide the line.

import { getSupabaseClient } from "@/lib/supabase";

// The free tour's product id in the booking app (rows with no product are
// free tour walks too).
const FREE_PRODUCT_ID = "00000000-0000-4000-8000-000000000001";

export type NextWalk = { label: string; spotsLeft: number };

/** Dark History's run, read from the booking app: `last` is the last
    scheduled walk from today on (ISO date), null when none are left.
    `known` is false when the booking app couldn't be read, so callers can
    fall back to the published end date instead of hiding the tour. */
export type DarkRun = { known: boolean; last: string | null };

export type Walks = { free: NextWalk | null; dark: NextWalk | null; darkRun: DarkRun };

function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}

function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

function formatWhen(date: string, time: string, today: string) {
  const t = formatTime(time);
  if (date === today) return `Today, ${t}`;
  if (date === addDays(today, 1)) return `Tomorrow, ${t}`;
  const d = new Date(`${date}T12:00:00Z`);
  const day = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
  return `${day}, ${t}`;
}

type Row = { date: string; time: string; total_slots: number; booked_slots: number; product_id: string | null };

export async function getNextWalks(darkSlug?: string): Promise<Walks> {
  const empty: Walks = { free: null, dark: null, darkRun: { known: false, last: null } };
  const sb = getSupabaseClient();
  if (!sb) return empty;
  try {
    const now = londonNow();
    let darkId: string | null = null;
    if (darkSlug) {
      const { data } = await sb.rpc("get_product_by_slug", { p_slug: darkSlug }).maybeSingle();
      darkId = (data as { id?: string } | null)?.id ?? null;
    }
    const { data } = await sb
      .from("tours")
      .select("date, time, total_slots, booked_slots, product_id")
      .gte("date", now.date)
      .eq("active", true)
      .eq("unlisted", false)
      .order("date")
      .order("time")
      .limit(60);
    const rows = ((data ?? []) as Row[]).filter(
      (r) => r.booked_slots < r.total_slots && (r.date > now.date || r.time.slice(0, 5) > now.time),
    );
    // Dark History's last scheduled date (Tom 2026-10-22: dates get added
    // after 6 Nov). Its own query, so a long run of free tours can't push
    // Dark History dates past the 60-row window above.
    let darkRun: DarkRun = { known: false, last: null };
    if (darkId) {
      const { data: lastRow, error } = await sb
        .from("tours")
        .select("date")
        .eq("product_id", darkId)
        .gte("date", now.date)
        .eq("active", true)
        .eq("unlisted", false)
        .order("date", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error) darkRun = { known: true, last: (lastRow as { date?: string } | null)?.date ?? null };
    }
    const pick = (match: (r: Row) => boolean): NextWalk | null => {
      const r = rows.find(match);
      return r ? { label: formatWhen(r.date, r.time.slice(0, 5), now.date), spotsLeft: r.total_slots - r.booked_slots } : null;
    };
    return {
      free: pick((r) => r.product_id === null || r.product_id === FREE_PRODUCT_ID),
      dark: darkId ? pick((r) => r.product_id === darkId) : null,
      darkRun,
    };
  } catch {
    return empty;
  }
}
