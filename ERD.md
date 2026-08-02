# e-Vote Entity Relationship Diagram (ERD)

This file documents the database entities and relationships in the e-Vote system, based on the Supabase schema and repository usage.

## ER Diagram (Mermaid)

```mermaid
erDiagram
    VOTERS {
        uuid id PK
        text clerk_id UQ
        text student_id
        text full_name
        text email UQ
        text role
        timestamptz created_at
    }
    ELECTIONS {
        uuid id PK
        text title
        text description
        timestamptz starts_at
        timestamptz ends_at
        text status
        uuid created_by FK
        timestamptz created_at
    }
    CANDIDATES {
        uuid id PK
        uuid election_id FK
        text name
        text manifesto
        text photo_url
        timestamptz created_at
    }
    VOTES {
        uuid id PK
        uuid election_id FK
        uuid voter_id FK
        uuid candidate_id FK
        timestamptz cast_at
    }
    RECEIPTS {
        uuid id PK
        text receipt_hash UQ
        uuid voter_id FK
        uuid election_id FK
        timestamptz created_at
    }
    VOTER_REGISTRY {
        uuid id PK
        uuid voter_id FK
        uuid election_id FK
        boolean has_voted
        timestamptz voted_at
    }

    VOTERS ||--o{ ELECTIONS : "created by"
    ELECTIONS ||--o{ CANDIDATES : "has"
    ELECTIONS ||--o{ VOTES : "receives"
    VOTERS ||--o{ VOTES : "casts"
    CANDIDATES ||--o{ VOTES : "receives"
    VOTERS ||--o{ RECEIPTS : "owns"
    ELECTIONS ||--o{ RECEIPTS : "issues"
    VOTERS ||--o{ VOTER_REGISTRY : "tracks"
    ELECTIONS ||--o{ VOTER_REGISTRY : "registers"
```

## Entities and Relationships

- `voters`
  - Primary records for users synchronized from Clerk via webhook.
  - Unique by `clerk_id` and `email`.
  - Roles include `voter`, `admin`, and `observer`.
  - Related to elections via `created_by` and to votes, receipts, and voter registry.

- `elections`
  - Stores election metadata and lifecycle state.
  - `created_by` references the `voters` table.
  - One election can have many candidates, votes, receipts, and registry entries.

- `candidates`
  - Candidate entries belong to a single election.
  - Each vote references one candidate.

- `votes`
  - Captures a single vote per voter per election.
  - Foreign keys: `election_id`, `voter_id`, `candidate_id`.
  - Database constraint enforces unique `(election_id, voter_id)`.

- `receipts`
  - Stores proof of voting for each voter and election.
  - Unique receipt hash and unique `(voter_id, election_id)`.

- `voter_registry`
  - Tracks voter registration and voting status per election.
  - Unique `(voter_id, election_id)` ensures one registry entry per voter per election.

## Notes

- All tables are enabled with Row Level Security in Supabase.
- The application uses both browser-side Supabase client and server-side `supabaseAdmin` for privileged operations.
- Clerk handles authentication and synchronizes users into `voters` with `clerk_id`.
- The ERD reflects the current schema defined in `supabase/schema.sql` and the app's use of these entities.
