import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getOrCreateVoterRecord } from '@/lib/voter-record';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { voter, error: voterError } = await getOrCreateVoterRecord(userId);
  if (!voter) return NextResponse.json({ error: voterError }, { status: 403 });
  const voterId = voter.id;

  const now = new Date().toISOString();
  const { data: elections, error: electionsError } = await supabaseAdmin
    .from('elections')
    .select('id, title, description, banner_url, status, starts_at, ends_at')
    .in('status', ['active', 'live'])
    .gte('ends_at', now)
    .order('starts_at', { ascending: false });

  if (electionsError) {
    return NextResponse.json({ error: 'Unable to load elections.' }, { status: 500 });
  }

  const electionIds = (elections || []).map((election) => election.id);
  if (electionIds.length === 0) return NextResponse.json({ elections: [] });

  const { data: candidatesData, error: candidatesError } = await supabaseAdmin
    .from('candidates')
    .select('id, election_id, name, category, slogan, manifesto, photo_url')
    .in('election_id', electionIds)
    .eq('status', 'approved');

  if (candidatesError) {
    return NextResponse.json({ error: 'Unable to load candidates.' }, { status: 500 });
  }

  const [registryResult, votesResult] = await Promise.all([
    supabaseAdmin
      .from('voter_registry')
      .select('election_id, has_voted')
      .eq('voter_id', voterId)
      .in('election_id', electionIds),
    supabaseAdmin
      .from('votes')
      .select('election_id')
      .eq('voter_id', voterId)
      .in('election_id', electionIds),
  ]);

  if (registryResult.error || votesResult.error) {
    return NextResponse.json({ error: 'Unable to load voting status.' }, { status: 500 });
  }

  const hasVotedIds = new Set([
    ...(registryResult.data || []).filter((row) => row.has_voted).map((row) => row.election_id),
    ...(votesResult.data || []).map((row) => row.election_id),
  ]);

  const formattedElections = (elections || []).map((election) => ({
    id: election.id,
    title: election.title,
    description: election.description,
    banner_url: election.banner_url,
    status: new Date(election.starts_at) > new Date(now) ? 'Upcoming' : 'Open',
    starts_at: election.starts_at,
    ends_at: election.ends_at,
    candidates: (candidatesData || [])
      .filter((candidate) => candidate.election_id === election.id)
      .map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        slogan: candidate.slogan || 'Committed to student leadership.',
        category: candidate.category || 'Candidate',
        manifesto: candidate.manifesto || 'No manifesto provided yet.',
        image_url: candidate.photo_url || '/logo.jpeg',
      })),
    hasVoted: hasVotedIds.has(election.id),
  }));

  return NextResponse.json({
    elections: formattedElections,
  });
}
