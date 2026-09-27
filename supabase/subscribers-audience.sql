-- Local vs visitor on the email list. Nullable: the question is optional
-- and older rows never answered it.
alter table public.subscribers
  add column if not exists audience text
  check (audience in ('local', 'visitor'));
