# e-Vote System Architecture

This document describes the architecture of the e-Vote system, including its primary components, responsibilities, data flow, and security model.

## Overview

e-Vote is a modern full-stack voting platform built with Next.js 16, Clerk, and Supabase. The system supports authenticated voting, election management, audit/receipt verification, and offline-friendly vote capture.

## Architectural Components

### 1. Frontend / Presentation

- `Next.js App Router` provides the main UI for voters, administrators, candidates, and auditors.
- Pages are organized under `src/app/` by role and feature area:
  - `/voter` for voter dashboards and vote flows
  - `/admin`, `/ec`, and `/auditor` for administrative and audit views
  - `/candidate` for candidate profile and campaign pages
  - Authentication flows under `/sign-in` and `/sign-up`
- Shared UI components live in `src/components/`.
- Global layout and theme are configured in `src/app/layout.tsx`.

### 2. Authentication and Access Control

- `Clerk` is the external identity provider used for sign-in, session management, and role metadata.
- Server-side authentication is handled by `@clerk/nextjs` and `@clerk/nextjs/server`.
- `src/middleware.ts` protects routes by role and redirects unauthorized users to the correct landing page.
- Clerk user creation events are synchronized with the application database using a webhook at `src/app/api/webhooks/clerk/route.ts`.

### 3. Data Storage and Business Logic

- `Supabase` serves as the primary backend platform, providing PostgreSQL storage, Row Level Security (RLS), and realtime capabilities.
- Core data entities include:
  - `voters`
  - `elections`
  - `candidates`
  - `votes`
  - `receipts`
  - `voter_registry`
- The database schema is defined in `supabase/schema.sql`.
- `src/lib/supabase.ts` exports two Supabase clients:
  - `supabase` for browser-side access using the anon key and RLS
  - `supabaseAdmin` for server-side access using the service role key

### 4. Server API Routes and Business APIs

- Server routes are implemented in `src/app/api/` and support data retrieval, election reporting, and webhook handling.
- Notable routes:
  - `src/app/api/webhooks/clerk/route.ts` — verifies Clerk webhook payloads via Svix and upserts user records into Supabase
  - `src/app/api/ec/results/route.ts` — aggregates live election results, candidate vote counts, and turnout statistics
  - `src/app/api/voter/active-elections/route.ts` — loads active elections, candidates, and voter registry state for a voter
- Business logic helpers live under `src/lib/`:
  - `src/lib/election-data.ts` provides election and receipt retrieval logic
  - `src/lib/auditor.ts` supports auditor-specific queries and reports

### 5. Voting Flow and Receipt Generation

- Voting actions are implemented in server-action functions such as `src/app/election/[id]/vote/actions.ts`.
- The vote flow includes:
  1. Authenticate voter via Clerk
  2. Verify election status and candidate validity
  3. Resolve voter identity from `voters` using `clerk_id`
  4. Update `voter_registry` and insert into `votes`
  5. Generate a receipt hash and insert into `receipts`
  6. Revalidate relevant pages using `revalidatePath`
- Receipt generation uses `crypto.createHash` to create a unique hash for verification.
- The frontend may render receipts PDF downloads using `html2pdf.js`.

### 6. Offline / Resilience Considerations

- The system is designed to support offline scenarios by queuing votes locally and syncing when connectivity returns.
- The current codebase references an `Offline Sync Queue` concept in the architecture, though the actual client-side queue implementation is implied by the app design and offline-friendly UI patterns.

## Data Flow Summary

- Users access the Next.js frontend and authenticate with Clerk.
- Authenticated requests are passed through middleware for role enforcement.
- The frontend fetches election and candidate data from Supabase through protected API routes or directly via the browser client with RLS.
- When a voter casts a ballot, the server-side action writes `votes`, `receipts`, and updates `voter_registry` using the admin Supabase client.
- Admins and auditors query results and receipts through server APIs, with aggregated reports built from Supabase queries.

## Security Model

- Clerk provides authentication and session management.
- Supabase RLS policies are enabled for all core tables to restrict access on a per-user basis.
- The server-side `supabaseAdmin` client uses a service role key and bypasses RLS only on secure server routes.
- The Clerk webhook route verifies payloads using Svix and `CLERK_WEBHOOK_SECRET`.
- Sensitive environment variables include:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `CLERK_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `BALLOT_SECRET_KEY`

## Deployment Considerations

- The application is suitable for deployment on platforms that support Next.js 16 App Router and environment variables.
- Clerk must be configured with the app URL and webhook endpoint.
- Supabase project must host the PostgreSQL database and apply the schema in `supabase/schema.sql`.
- Service keys must remain secret and only be available to server execution contexts.

## Code Mapping

- `src/app/layout.tsx` — global layout and Clerk provider
- `src/middleware.ts` — auth/role-based route protection
- `src/lib/supabase.ts` — Supabase client configuration
- `src/lib/election-data.ts` — election/receipt data retrieval logic
- `src/app/api/webhooks/clerk/route.ts` — Clerk webhook handling
- `src/app/api/ec/results/route.ts` — election results API
- `src/app/election/[id]/vote/actions.ts` — vote casting and receipt issuance
- `supabase/schema.sql` — database schema and RLS policies

## Architecture Summary

e-Vote is a hybrid client-server application where Clerk handles authentication and Supabase stores election data securely. The Next.js application stitches frontend UI, server-side business logic, and database operations into a cohesive platform for voting, auditing, and administration.
