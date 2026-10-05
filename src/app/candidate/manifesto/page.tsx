export const dynamic = 'force-dynamic';

import { currentUser } from '@clerk/nextjs/server';
import { ManifestoClient } from './ManifestoClient';
import { getCandidateProfile } from './actions';

import { supabaseAdmin } from '@/lib/supabase';

export default async function ManifestoPage() {
  const user = await currentUser();
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

  const initialName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  return (
    <ManifestoClient
      initialProfile={profile}
      openElections={openElections}
      initialName={initialName}
      clerkImageUrl={user?.imageUrl ?? null}
    />
  );
}
