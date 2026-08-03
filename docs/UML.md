# e-Vote — Use Case Diagram (System Use Cases)

This document contains a Use Case diagram for the e-Vote platform and short descriptions of the primary actors and use cases. The diagram is expressed in Mermaid for quick rendering in Markdown viewers that support Mermaid.

---

## Actors

- Voter — student or staff who authenticates, views elections, casts votes, and downloads receipts.
- Admin — election administrators who create/manage elections, manage candidates, and export results.
- Candidate — persons listed in elections who manage their profile/manifesto.
- Auditor — independent reviewer who inspects receipts, logs, and results.
- Clerk — external identity provider responsible for authentication and user provisioning via webhooks.

## Use Case Diagram (Mermaid)

```mermaid
usecaseDiagram
  actor Voter as Voter
  actor Admin as Admin
  actor Candidate as Candidate
  actor Auditor as Auditor
  actor Clerk as Clerk

  Voter --> (Authenticate)
  Voter --> (Browse Elections)
  Voter --> (Cast Vote)
  Voter --> (View Receipts)
  Voter --> (Queue Vote Offline)
  Voter --> (Sync Queued Votes)

  Candidate --> (Manage Profile)
  Candidate --> (View Candidate Page)

  Admin --> (Create Election)
  Admin --> (Manage Candidates)
  Admin --> (Publish / Close Election)
  Admin --> (Monitor Results)
  Admin --> (Export Results)
  Admin --> (Assign Roles)

  Auditor --> (View Audit Logs)
  Auditor --> (Verify Receipts)

  Clerk --> (Provision User via Webhook)

  (Cast Vote) ..> (Create Receipt) : <<include>>
  (Queue Vote Offline) ..> (Sync Queued Votes) : <<extend>>
  (Monitor Results) ..> (Export Results) : <<include>>
```

## Use Case Descriptions (Concise)

- Authenticate: Users sign in via Clerk. The app relies on Clerk sessions for identity and role enforcement.
- Browse Elections: View active, upcoming, and past elections (candidate lists, timelines).
- Cast Vote: Submit a vote for a candidate; server persistently records the vote in Supabase and issues a receipt.
- Queue Vote Offline: Client-side queueing when offline; votes are stored locally until connectivity returns.
- Sync Queued Votes: Client attempts to reconcile and submit queued votes; server ensures idempotency.
- Create Receipt: Server records receipt metadata and provides a downloadable/verifiable receipt (PDF/hash).
- Create Election / Manage Candidates / Publish / Close Election: Admin operations performed via admin UI and server APIs.
- Monitor Results / Export Results: Admins fetch aggregated results and optionally export JSON/CSV for external reporting.
- Assign Roles: Admins (or system onboarding via Clerk webhook) assign roles to users (voter, admin, auditor, candidate).
- View Audit Logs / Verify Receipts: Auditors inspect receipts and logs for transparency and verification.
- Provision User via Webhook: Clerk posts `user.created` events to the app; webhook verifies via Svix and upserts `voters` into Supabase.

## Mapping to Repository

- Clerk webhook handler: `src/app/api/webhooks/clerk/route.ts` (verifies Svix, upserts `voters`).
- Supabase clients + types: `src/lib/supabase.ts` (browser and admin clients).
- Election data helper: `src/lib/election-data.ts` (fetching elections, receipts).
- Results API: `src/app/api/ec/results/route.ts` (aggregates results for admins/auditors).
- Frontend pages and components: `src/app/*`, `src/components/*` (voter UI, admin UI, auditor views).

---

If you want, I can also:

- Export the diagram as an image and commit it next to `UML.md`.
- Expand this into separate, detailed use case specifications per actor.
