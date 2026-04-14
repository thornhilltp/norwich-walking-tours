import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client. Uses the public anon key because the
// `subscribers` table has an RLS policy that allows anon inserts only.
// Never import this into a client component — keep it server-side so we can
// add service-role fallbacks or stricter logic later without leaking keys.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseClient() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
