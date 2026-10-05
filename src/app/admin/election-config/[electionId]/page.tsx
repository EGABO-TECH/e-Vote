import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { ElectionStudioClient } from './ElectionStudioClient';

export const dynamic = 'force-dynamic';

export default async function ElectionStudioPage({ params }: { params: Promise<{ electionId: string }> }) {
  const { electionId } = await params;
  const [{ data: election, error: electionError }, { data: candidates, error: candidatesError }] = await Promise.all([
    supabaseAdmin.from('elections').select('id, title, description, banner_url, starts_at, ends_at, status').eq('id', electionId).single(),
    supabaseAdmin.from('candidates').select('id, name, category, slogan, statement, manifesto, goals, photo_url, status').eq('election_id', electionId).order('created_at', { ascending: true }),
  ]);

  if (electionError || candidatesError || !election) notFound();

  return <ElectionStudioClient election={election} initialCandidates={candidates ?? []} />;
}