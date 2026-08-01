import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: voterRow, error: voterError } = await supabaseAdmin
    .from('voters')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (voterError || !voterRow) {
    return NextResponse.json({ error: 'Unable to resolve voter account.' }, { status: 403 });
  }

  const voterId = voterRow.id;

  const { data: elections, error: electionsError } = await supabaseAdmin
    .from('elections')
    .select('id, title, description, status, starts_at, ends_at')
    .in('status', ['active', 'live'])
    .order('starts_at', { ascending: false });

  if (electionsError) {
    return NextResponse.json({ error: 'Unable to load elections.' }, { status: 500 });
  }

  const electionIds = (elections || []).map((election) => election.id);

  const { data: candidatesData, error: candidatesError } = await supabaseAdmin
    .from('candidates')
    .select('id, election_id, name, manifesto, photo_url')
    .in('election_id', electionIds);

  if (candidatesError) {
    return NextResponse.json({ error: 'Unable to load candidates.' }, { status: 500 });
  }

  const { data: registryRows, error: registryError } = await supabaseAdmin
    .from('voter_registry')
    .select('election_id, has_voted')
    .eq('voter_id', voterId)
    .in('election_id', electionIds);

  if (registryError) {
    return NextResponse.json({ error: 'Unable to load voting status.' }, { status: 500 });
  }

  const hasVotedMap = Object.fromEntries(
    (registryRows || []).map((row) => [row.election_id, row.has_voted])
  );

  const formattedElections = (elections || []).map((election) => ({
    id: election.id,
    title: election.title,
    description: election.description,
    status: election.status === 'live' ? 'Open' : 'Open',
    starts_at: election.starts_at,
    ends_at: election.ends_at,
    candidates: (candidatesData || [])
      .filter((candidate) => candidate.election_id === election.id)
      .map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        slogan: candidate.manifesto || 'Committed to student leadership.',
        manifesto: candidate.manifesto || 'No manifesto provided yet.',
        image_url: candidate.photo_url || '/logo.jpeg',
      })),
    hasVoted: Boolean(hasVotedMap[election.id]),
  }));

  return NextResponse.json({
    elections: formattedElections,
  });
}
