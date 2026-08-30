-- Best in Norwich — Supabase schema for /best-in-norwich + /api/best-in-norwich
--
-- NOT YET APPLIED. Run in the Supabase SQL editor when the awards page goes
-- live. Until then /api/best-in-norwich degrades gracefully: the ballot falls
-- back to the static seed in lib/best-in-norwich.ts and votes return an error.
--
-- Conventions copied from public.roys_plaza_signatures:
--   * anon gets INSERT only, never SELECT
--   * anything the public page needs to read comes back through a
--     SECURITY DEFINER function, so no row (and no email) is ever exposed
--   * the moderation screen works the same way — see the admin section at the
--     bottom. There is deliberately no service-role key in the app.
--
-- Marketing opt-ins are ALSO inserted into the existing public.subscribers
-- table by the API, so award consent lands on the real mailing list instead of
-- sitting in a table nobody exports.
--
-- Votes reference the nominee by NAME, not by foreign key. The ballot is a
-- union of the static seed (in the repo) and approved write-ins (in this DB),
-- and the name is the only identifier both halves share.

-- ── Write-ins ────────────────────────────────────────────────────────────────
create table if not exists public.bin_nominees (
  id                 uuid primary key default gen_random_uuid(),
  year               int  not null default 2027,
  category_key       text not null,
  name               text not null,
  url                text,
  status             text not null default 'pending',   -- pending | approved | rejected
  submitted_by_email text,
  -- Consent recorded here too: during the nominations phase there are no vote
  -- rows, so bin_votes.marketing_opt_in would never be written.
  marketing_opt_in   boolean not null default false,
  created_at         timestamptz not null default now()
);

-- One entry per name per category per year, case-insensitively.
create unique index if not exists bin_nominees_unique
  on public.bin_nominees (year, category_key, lower(name));

create index if not exists bin_nominees_ballot
  on public.bin_nominees (year, status, category_key);

-- ── Votes ────────────────────────────────────────────────────────────────────
create table if not exists public.bin_votes (
  id               uuid primary key default gen_random_uuid(),
  year             int  not null default 2027,
  category_key     text not null,
  nominee_name     text not null,
  email            text not null,
  marketing_opt_in boolean not null default false,
  source           text,
  created_at       timestamptz not null default now()
);

-- One vote per person per category per year. The API relies on the 23505 this
-- throws to report "you already voted in that one".
create unique index if not exists bin_votes_one_per_person
  on public.bin_votes (year, category_key, lower(email));

create index if not exists bin_votes_tally
  on public.bin_votes (year, category_key, lower(nominee_name));

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.bin_nominees enable row level security;
alter table public.bin_votes    enable row level security;

drop policy if exists anon_insert_bin_nominees on public.bin_nominees;
create policy anon_insert_bin_nominees
  on public.bin_nominees for insert to anon with check (true);

drop policy if exists anon_insert_bin_votes on public.bin_votes;
create policy anon_insert_bin_votes
  on public.bin_votes for insert to anon with check (true);

-- ── Read paths (SECURITY DEFINER) ────────────────────────────────────────────

-- Approved write-ins for the ballot. No emails, no counts.
create or replace function public.bin_approved_nominees(p_year int)
returns table (category_key text, name text, url text)
language sql
security definer
stable
set search_path = public
as $$
  select n.category_key, n.name, n.url
  from public.bin_nominees n
  where n.year = p_year
    and n.status = 'approved'
  order by n.category_key, n.name;
$$;

-- Total votes cast. The only public number while voting is open — per-nominee
-- counts stay hidden so nobody can rally a bandwagon off a live leaderboard.
create or replace function public.bin_total_votes(p_year int)
returns bigint
language sql
security definer
stable
set search_path = public
as $$
  select count(*) from public.bin_votes where year = p_year;
$$;

-- Full tally. NOT granted to anon — run it yourself in the SQL editor when
-- voting closes, then hard-code the winners into lib/best-in-norwich.ts.
create or replace function public.bin_vote_totals(p_year int)
returns table (category_key text, nominee_name text, votes bigint)
language sql
security definer
stable
set search_path = public
as $$
  select v.category_key, min(v.nominee_name) as nominee_name, count(*) as votes
  from public.bin_votes v
  where v.year = p_year
  group by v.category_key, lower(v.nominee_name)
  order by v.category_key, votes desc;
$$;

revoke all on function public.bin_approved_nominees(int) from public;
revoke all on function public.bin_total_votes(int)       from public;
revoke all on function public.bin_vote_totals(int)       from public;

grant execute on function public.bin_approved_nominees(int) to anon, authenticated;
grant execute on function public.bin_total_votes(int)       to anon, authenticated;
grant execute on function public.bin_vote_totals(int)       to service_role;

-- ── Moderation (no service-role key needed) ──────────────────────────────────
--
-- The admin screen at /admin/best-in-norwich authenticates with a single shared
-- token. The token is NOT stored in the app: only its SHA-256 hash lives here,
-- and every admin function checks it before doing anything. That way the site
-- keeps using the write-only anon key, and no master key that bypasses RLS ever
-- goes near Vercel.
--
-- SET THE PASSWORD by running this once in the SQL editor, with your own long
-- random string (40+ characters — these functions are reachable from the public
-- internet, so a short password is a guessable one):
--
--   select public.bin_admin_set_secret('paste-a-long-random-string-here');
--
-- To change it later, run the same line again with a new string.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.bin_admin_secret (
  id          int primary key default 1,
  token_hash  text not null,
  updated_at  timestamptz not null default now(),
  constraint bin_admin_secret_single_row check (id = 1)
);

-- No policies at all: with RLS on and nothing granted, anon can never read this
-- table. Only the SECURITY DEFINER functions below can see inside it.
alter table public.bin_admin_secret enable row level security;

create or replace function public.bin_admin_set_secret(p_token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  insert into public.bin_admin_secret (id, token_hash, updated_at)
  values (1, encode(digest(p_token, 'sha256'), 'hex'), now())
  on conflict (id) do update
    set token_hash = excluded.token_hash, updated_at = now();
$$;

create or replace function public.bin_admin_check(p_token text)
returns boolean
language sql
security definer
stable
set search_path = public, extensions
as $$
  select exists (
    select 1 from public.bin_admin_secret
    where token_hash = encode(digest(p_token, 'sha256'), 'hex')
  );
$$;

-- Pending write-ins, for the moderation list. Returns nothing at all unless the
-- token checks out, so a wrong token leaks no data and no row count.
create or replace function public.bin_admin_pending(p_token text, p_year int)
returns table (id uuid, category_key text, name text, url text, created_at timestamptz)
language sql
security definer
stable
set search_path = public, extensions
as $$
  select n.id, n.category_key, n.name, n.url, n.created_at
  from public.bin_nominees n
  where public.bin_admin_check(p_token)
    and n.year = p_year
    and n.status = 'pending'
  order by n.created_at desc;
$$;

create or replace function public.bin_admin_counts(p_token text, p_year int)
returns table (status text, n bigint)
language sql
security definer
stable
set search_path = public, extensions
as $$
  select n.status, count(*)
  from public.bin_nominees n
  where public.bin_admin_check(p_token)
    and n.year = p_year
  group by n.status;
$$;

-- Approve or reject one nomination. Returns the number of rows moved, so the
-- app can tell "wrong token" (0) from "done" (1).
create or replace function public.bin_admin_set_status(
  p_token  text,
  p_id     uuid,
  p_status text
)
returns int
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  moved int;
begin
  if not public.bin_admin_check(p_token) then
    return 0;
  end if;
  if p_status not in ('pending', 'approved', 'rejected') then
    return 0;
  end if;

  update public.bin_nominees set status = p_status where id = p_id;
  get diagnostics moved = row_count;
  return moved;
end;
$$;

-- bin_admin_set_secret stays out of anon's reach: the password is changed from
-- the SQL editor, never from the website.
revoke all on function public.bin_admin_set_secret(text)          from public, anon, authenticated;
revoke all on function public.bin_admin_check(text)               from public;
revoke all on function public.bin_admin_pending(text, int)        from public;
revoke all on function public.bin_admin_counts(text, int)         from public;
revoke all on function public.bin_admin_set_status(text, uuid, text) from public;

grant execute on function public.bin_admin_check(text)               to anon, authenticated;
grant execute on function public.bin_admin_pending(text, int)        to anon, authenticated;
grant execute on function public.bin_admin_counts(text, int)         to anon, authenticated;
grant execute on function public.bin_admin_set_status(text, uuid, text) to anon, authenticated;

-- ── Moderation cheat sheet (if you would rather use the SQL editor) ──────────
-- Pending write-ins waiting on approval:
--   select category_key, name, url, created_at
--   from public.bin_nominees where status = 'pending' order by created_at desc;
--
-- Approve one:
--   update public.bin_nominees set status = 'approved' where id = '<uuid>';
