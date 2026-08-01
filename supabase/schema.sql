-- ============================================================
-- e-Vote Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ── voters ────────────────────────────────────────────────────────────────────
-- Synced from Clerk via webhook on user.created
create table if not exists voters (
  id           uuid primary key default gen_random_uuid(),
  clerk_id     text unique not null,
  student_id   text,
  full_name    text,
  email        text unique not null,
  role         text default 'voter' check (role in ('voter', 'admin', 'observer')),
  created_at   timestamptz default now()
);

-- ── elections ─────────────────────────────────────────────────────────────────
create table if not exists elections (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  status       text default 'draft' check (status in ('draft', 'live', 'closed')),
  created_by   uuid references voters(id) on delete set null,
  created_at   timestamptz default now()
);

-- ── candidates ────────────────────────────────────────────────────────────────
create table if not exists candidates (
  id           uuid primary key default gen_random_uuid(),
  election_id  uuid not null references elections(id) on delete cascade,
  name         text not null,
  manifesto    text,
  photo_url    text,
  created_at   timestamptz default now()
);

-- ── votes ─────────────────────────────────────────────────────────────────────
-- One vote per voter per election — enforced by unique constraint
create table if not exists votes (
  id           uuid primary key default gen_random_uuid(),
  election_id  uuid not null references elections(id) on delete cascade,
  voter_id     uuid not null references voters(id) on delete cascade,
  candidate_id uuid not null references candidates(id) on delete cascade,
  cast_at      timestamptz default now(),
  unique(election_id, voter_id)
);

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table voters     enable row level security;
alter table elections  enable row level security;
alter table candidates enable row level security;
alter table votes      enable row level security;

-- voters: each user can only read/update their own row
create policy "voters_select_own" on voters
  for select using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

create policy "voters_update_own" on voters
  for update using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

-- elections: anyone authenticated can read live elections; admins can do all
create policy "elections_read_live" on elections
  for select using (status = 'live');

-- candidates: readable on live elections
create policy "candidates_read_live" on candidates
  for select using (
    exists (
      select 1 from elections e
      where e.id = candidates.election_id and e.status = 'live'
    )
  );

-- votes: voters can insert their own vote
create policy "votes_insert_own" on votes
  for insert with check (
    voter_id = (
      select id from voters
      where clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

-- votes: voters can only see their own vote
create policy "votes_select_own" on votes
  for select using (
    voter_id = (
      select id from voters
      where clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

-- ── Seed: example live election ───────────────────────────────────────────────
-- Uncomment to pre-populate a test election
-- insert into elections (title, description, starts_at, ends_at, status)
-- values (
--   'Student Guild Presidential Election 2026',
--   'Vote for your preferred candidate for the 2026 Student Guild Presidency.',
--   now(),
--   now() + interval '7 days',
--   'live'
-- );
