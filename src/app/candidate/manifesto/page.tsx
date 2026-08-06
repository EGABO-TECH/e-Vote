export const dynamic = 'force-dynamic';

import { ManifestoClient } from './ManifestoClient';
import { getCandidateProfile } from './actions';

import { supabaseAdmin } from '@/lib/supabase';

export default async function ManifestoPage() {
  let profile = null;
  try {
    profile = await getCandidateProfile();
  } catch (e) {
    console.error('Failed to get candidate profile', e);
  }

  // Fetch open elections candidates can apply to
  const { data: elections } = await supabaseAdmin
    .from('elections')
    .select('id, title, status')
    .in('status', ['active', 'live', 'draft', 'open'])
    .order('starts_at', { ascending: false });

  const openElections = elections || [];

  return <ManifestoClient initialProfile={profile} openElections={openElections} />;
}
