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
  role         text default 'voter' check (role in ('voter', 'admin', 'observer', 'candidate', 'ec', 'auditor')),
  
  -- Voter Portal Phase 1 additions
  voting_pin   text, -- Stored securely (hashed)
  voting_suspended boolean default false,
  two_factor_enabled boolean default false,
  push_notifications_enabled boolean default false,
  dark_mode_enabled boolean default false,
  
  created_at   timestamptz default now()
);

-- ── elections ─────────────────────────────────────────────────────────────────
create table if not exists elections (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  scope        text,
  eligibility  text,
  biometric    boolean default false,
  categories   text[],
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  status       text default 'draft' check (status in ('draft', 'active', 'live', 'closed')),
  created_by   uuid references voters(id) on delete set null,
  created_at   timestamptz default now()
);

-- ── candidates ────────────────────────────────────────────────────────────────
create table if not exists candidates (
  id           uuid primary key default gen_random_uuid(),
  clerk_id     text unique, -- To link to the user creating the candidate profile
  election_id  uuid references elections(id) on delete cascade, -- Made optional
  name         text not null,
  category     text, -- Position (e.g. President)
  slogan       text,
  statement    text,
  manifesto    text,
  goals        text,
  photo_url    text,
  status       text default 'pending' check (status in ('pending', 'approved', 'rejected')),
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

-- ── receipts ──────────────────────────────────────────────────────────────────
create table if not exists receipts (
  id           uuid primary key default gen_random_uuid(),
  receipt_hash text unique not null,
  voter_id     uuid not null references voters(id) on delete cascade,
  election_id  uuid not null references elections(id) on delete cascade,
  created_at   timestamptz default now(),
  unique(voter_id, election_id)
);

-- ── voter registry ───────────────────────────────────────────────────────────
create table if not exists voter_registry (
  id           uuid primary key default gen_random_uuid(),
  voter_id     uuid not null references voters(id) on delete cascade,
  election_id  uuid not null references elections(id) on delete cascade,
  has_voted    boolean default false not null,
  voted_at     timestamptz,
  unique(voter_id, election_id)
);

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table voters     enable row level security;
alter table elections  enable row level security;
alter table candidates enable row level security;
alter table votes      enable row level security;
alter table receipts   enable row level security;
alter table voter_registry enable row level security;

-- voters: each user can only read/update their own row
create policy "voters_select_own" on voters
  for select using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

create policy "voters_update_own" on voters
  for update using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

-- elections: anyone authenticated can read open and live elections; admins can do all
create policy "elections_read_open" on elections
  for select using (status in ('active', 'live'));

-- candidates: readable on open or live elections
create policy "candidates_read_open" on candidates
  for select using (
    exists (
      select 1 from elections e
      where e.id = candidates.election_id and e.status in ('active', 'live')
    )
  );

create policy "candidates_select_own" on candidates
  for select using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

create policy "candidates_update_own" on candidates
  for update using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

create policy "candidates_insert_own" on candidates
  for insert with check (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

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

-- receipts: voters can read their own receipts
create policy "receipts_select_own" on receipts
  for select using (
    voter_id = (
      select id from voters
      where clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

-- receipts: voters can insert their own receipt record
create policy "receipts_insert_own" on receipts
  for insert with check (
    voter_id = (
      select id from voters
      where clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

-- voter registry: voters can read their own registry status
create policy "voter_registry_select_own" on voter_registry
  for select using (
    voter_id = (
      select id from voters
      where clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

-- voter registry: voters can insert or update their own registry status
create policy "voter_registry_upsert_own" on voter_registry
  for insert with check (
    voter_id = (
      select id from voters
      where clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );


-- ── support tickets ────────────────────────────────────────────────────────
create table if not exists support_tickets (
  id           uuid primary key default gen_random_uuid(),
  clerk_id     text not null,
  subject      text not null,
  message      text not null,
  category     text,
  status       text default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at   timestamptz default now()
);

alter table support_tickets enable row level security;

create policy "support_tickets_insert_own" on support_tickets
  for insert with check (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

create policy "support_tickets_select_own" on support_tickets
  for select using (clerk_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. SYSTEM SETTINGS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists system_settings (
  id             integer primary key default 1 check (id = 1), -- Ensure single row
  institution    text default 'Cavendish University Uganda',
  enforce_2fa    boolean default false,
  session_timeout integer default 15,
  updated_at     timestamptz default now()
);

-- Insert initial row if empty
insert into system_settings (id) values (1) on conflict do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS POLICIES FOR SETTINGS
-- ─────────────────────────────────────────────────────────────────────────────
alter table system_settings enable row level security;
create policy "Anyone can read system settings"
  on system_settings for select
  using (true);
create policy "Only admins can update system settings"
  on system_settings for update
  using (
    (select raw_user_meta_data->>'role' from auth.users where id = auth.uid()) = 'admin'
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. AUDIT LOGS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists audit_logs (
  id           uuid primary key default gen_random_uuid(),
  timestamp    timestamptz default now(),
  action       text not null,
  actor_role   text not null,
  ip_address   text,
  status       text not null,
  details      text,
  severity     text default 'info'
);

-- RLS for audit_logs
alter table audit_logs enable row level security;
create policy "Auditors can read audit logs"
  on audit_logs for select
  using (
    (select raw_user_meta_data->>'role' from auth.users where id = auth.uid()) in ('auditor', 'admin')
  );


