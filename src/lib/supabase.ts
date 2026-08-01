import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

// Browser client (uses anon key + RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server / Admin client (bypasses RLS -- server-side only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Types
export type Voter = {
  id: string;
  clerk_id: string;
  student_id: string | null;
  full_name: string | null;
  email: string;
  role: 'voter' | 'admin' | 'auditor' | 'candidate' | 'observer';
  created_at: string;
};

export type Election = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  status: 'draft' | 'active' | 'live' | 'closed';
  created_by: string | null;
  created_at: string;
};

export type Candidate = {
  id: string;
  election_id: string;
  name: string;
  slogan: string | null;
  manifesto: string | null;
  image_url: string | null;
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

export type ReceiptRecord = {
  id: string;
  receipt_hash: string;
  voter_id: string;
  election_id: string;
  created_at: string;
};

export type VoterRegistryRow = {
  id: string;
  voter_id: string;
  election_id: string;
  has_voted: boolean;
  voted_at: string | null;
};
