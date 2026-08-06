export const dynamic = 'force-dynamic';

import { ManifestoClient } from './ManifestoClient';
import { getCandidateProfile } from './actions';

export default async function ManifestoPage() {
  let profile = null;
  try {
    profile = await getCandidateProfile();
  } catch (e) {
    console.error('Failed to get candidate profile', e);
  }

  return <ManifestoClient initialProfile={profile} />;
}
