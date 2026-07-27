# e-Vote Platform

![e-Vote System](./1.jpeg)

**e-Vote** is a secure, modern, and verifiable electronic voting platform purpose-built for academic institutions (configured for Cavendish University Uganda). It provides a tamper-proof voting experience with offline resilience and cryptographic verification.

## 🚀 Features

- **End-to-End Encryption:** Ballots are cast securely and tied to specific authenticated student credentials.
- **Double-Vote Prevention:** Built-in Row Level Security (RLS) ensures that a student can only cast a single vote per election.
- **Live Dashboard:** Students can view active, upcoming, and closed elections in real-time.
- **Institutional Authentication:** Powered by Clerk, restricting and managing access securely.
- **Admin Management:** (In Progress) A dedicated panel for creating elections and registering candidates.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Styling:** Custom CSS Modules & CSS Variables (`globals.css`)

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd e-Vote
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root of the project and populate it using the `.env.local.example` template:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗄️ Database Schema

The platform relies on four core tables in Supabase:
1. `voters`: Synchronized automatically with Clerk via Webhooks.
2. `elections`: Tracks the status of elections (draft, live, closed).
3. `candidates`: Associates candidates with specific elections.
4. `votes`: Secure ledger recording encrypted ballot casts with unique constraint checks.
