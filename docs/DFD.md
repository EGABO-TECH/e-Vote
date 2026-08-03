**e-Vote Context Diagram**

This document provides a high-level context diagram (level 0 DFD) for the e-Vote system showing external actors, primary integrations, and the system boundary. The diagram is expressed as a Mermaid flowchart for quick rendering in Markdown viewers that support Mermaid.

```mermaid
flowchart TB
  subgraph ExternalActors[External Actors]
    Voter[Voter (Student)]
    Admin[Administrator / EC Staff]
    Auditor[Auditor]
    Candidate[Candidate]
    ClerkAuth[Clerk (Auth)]
    SupabaseExternal[Supabase (Database & Realtime)]
    PDFLib[html2pdf.js]
  end

  subgraph System[e-Vote Application]
    WebApp[Next.js Frontend]
    API[Server API Routes]
    OfflineSync[Offline Sync Queue]
    ReceiptService[Receipt Generator]
    AdminTools[Admin UI & Tools]
  end

  Voter -->|Sign-in / Request UI| ClerkAuth
  ClerkAuth -->|Auth Tokens / Webhooks| WebApp
  ClerkAuth -->|User.created webhook| API

  WebApp -->|Fetch/Write| API
  API -->|Reads/Writes| SupabaseExternal
  OfflineSync -->|Flush queued votes| API
  API -->|Create receipt| ReceiptService
  ReceiptService -->|Render PDF| PDFLib
  Admin -->|Manage elections| AdminTools
  AdminTools -->|Admin API calls| API
  Auditor -->|View logs & receipts| API
  Candidate -->|View candidate pages| WebApp

  SupabaseExternal -->|Realtime events / notifications| WebApp
  WebApp -->|Download receipts| ReceiptService

  %% Notes
  classDef ext fill:#f9f,stroke:#333,stroke-width:1px;
  class ExternalActors ext;
```

Key components and actors

- **Voter (Student):** The end-user who views elections and casts votes via the frontend. Authentication is provided by Clerk.
- **Administrator / EC Staff:** Manage elections, candidates, and verify results through admin UIs.
- **Auditor:** Independent reviewer who inspects receipts, logs, and results for transparency.
- **Candidate:** Candidate users who view their profile and campaign pages.
- **Clerk (Auth):** External authentication provider (Clerk) responsible for user sign-in, identity, and webhook events (user.created) used to seed the Supabase `voters` table.
- **Supabase (Database & Realtime):** Primary system of record (Postgres) for elections, candidates, votes, receipts, and voter registry. Also used for realtime updates and RLS policies.
- **HTML2PDF (html2pdf.js):** Client-side library used to render and download receipt PDFs.
- **Next.js Frontend:** `src/app` React pages and components that present UI to voters, admins, auditors, and candidates.
- **Server API Routes:** Next.js API routes (server-side) that perform server tasks, including Clerk webhook handling, EC results endpoints, and admin operations. Server uses `supabaseAdmin` for privileged operations.
- **Offline Sync Queue:** Client-side mechanism for queuing votes while offline; reconciles with server when connectivity is restored.
- **Receipt Generator:** Service that records receipt hashes in Supabase and triggers PDF rendering for voter verification.

How to render

- Use a Markdown viewer that supports Mermaid diagrams (e.g., VS Code Markdown Preview, GitHub pages with Mermaid enabled, or Mermaid Live Editor) to view the diagram above.

Notes and assumptions

- Diagram reflects the current repository code and README details (Clerk, Supabase, offline sync, receipt generation).
- Internal subsystems (e.g., RLS, background sync workers) are intentionally abstracted to keep the context diagram focused and readable.
