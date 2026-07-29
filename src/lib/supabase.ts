import { createClient } from '@supabase/supabase-js';

// ── Browser client (uses anon key + RLS) ─────────────────────────────────────
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

// ── Server / Admin client (bypasses RLS — server-side only) ──────────────────
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ── Types ─────────────────────────────────────────────────────────────────────
export type Voter = {
  id: string;
  clerk_id: string;
  student_id: string | null;
  full_name: string | null;
  email: string;
  role: 'voter' | 'admin' | 'observer' | 'auditor';
  created_at: string;
};

export type Election = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  status: 'draft' | 'live' | 'closed';
  created_by: string | null;
  created_at: string;
};

export type Candidate = {
  id: string;
  election_id: string;
  name: string;
  manifesto: string | null;
  photo_url: string | null;
  created_at: string;
};

export type Vote = {
  id: string;
  election_id: string;
  voter_id: string;
  candidate_id: string;
  cast_at: string;
};
