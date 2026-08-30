import { cookies } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase";

// Auth for the Best in Norwich moderation screen.
//
// One user, one shared token, no accounts and no extra environment variables.
// The token itself lives nowhere in this codebase or in Vercel: only its
// SHA-256 hash sits in public.bin_admin_secret, and every admin function in
// Postgres checks the hash before returning or changing anything.
//
// That is why there is no service-role key here. The site keeps using the
// write-only anon key, so even a full compromise of the deployment cannot read
// voter emails or touch the bookings tables.
//
// Set or change the password from the Supabase SQL editor:
//   select public.bin_admin_set_secret('a-long-random-string');

export const BIN_ADMIN_COOKIE = "bin_admin";
export const BIN_ADMIN_MAX_AGE = 60 * 60 * 8; // 8 hours

/** Asks Postgres whether this token is the right one. Returns false if
 *  Supabase is unreachable or the secret has never been set — a missing
 *  password must mean "nobody gets in", never "everybody gets in". */
export async function tokenIsValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { data, error } = await supabase.rpc("bin_admin_check", {
    p_token: token,
  });

  if (error) {
    console.error("[BinAdmin] Token check failed:", error);
    return false;
  }
  return data === true;
}

export function getAdminToken(): string | undefined {
  return cookies().get(BIN_ADMIN_COOKIE)?.value;
}

export async function isAdminAuthed(): Promise<boolean> {
  return tokenIsValid(getAdminToken());
}
