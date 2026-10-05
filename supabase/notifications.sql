create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_clerk_id text not null,
  type text not null check (type in ('candidate_application', 'candidate_review', 'election_live', 'vote_recorded')),
  title text not null,
  message text not null,
  href text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists notifications_recipient_created_idx
  on public.notifications (recipient_clerk_id, created_at desc);

create index if not exists notifications_recipient_unread_idx
  on public.notifications (recipient_clerk_id, read_at)
  where read_at is null;

alter table public.notifications enable row level security;

drop policy if exists "Users can read their own notifications" on public.notifications;
create policy "Users can read their own notifications" on public.notifications
  for select to authenticated
  using (recipient_clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

drop policy if exists "Users can mark their own notifications read" on public.notifications;
create policy "Users can mark their own notifications read" on public.notifications
  for update to authenticated
  using (recipient_clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'))
  with check (recipient_clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_clerk_id text not null,
  type text not null check (type in ('candidate_application', 'candidate_review', 'election_live', 'vote_recorded')),
  title text not null,
  message text not null,
  href text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists notifications_recipient_created_idx
  on public.notifications (recipient_clerk_id, created_at desc);

create index if not exists notifications_recipient_unread_idx
  on public.notifications (recipient_clerk_id, read_at)
  where read_at is null;

alter table public.notifications enable row level security;

drop policy if exists "Users can read their own notifications" on public.notifications;
create policy "Users can read their own notifications" on public.notifications
  for select to authenticated
  using (recipient_clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

drop policy if exists "Users can mark their own notifications read" on public.notifications;
create policy "Users can mark their own notifications read" on public.notifications
  for update to authenticated
  using (recipient_clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'))
  with check (recipient_clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));