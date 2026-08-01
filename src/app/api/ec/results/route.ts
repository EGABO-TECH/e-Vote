import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data: election, error: electionError } = await supabaseAdmin
    .from('elections')
    .select('id, title, status')
    .eq('status', 'live')
    .order('starts_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (electionError) {
    console.error('Error loading live election:', electionError);
    return NextResponse.json({ error: 'Unable to load election data.' }, { status: 500 });
  }

  if (!election) {
    return NextResponse.json({
      election: null,
      candidates: [],
      totalVotes: 0,
      registeredCount: 0,
      turnoutPercent: 0,
    });
  }

  const { data: candidatesData, error: candidatesError } = await supabaseAdmin
    .from('candidates')
    .select('id, name')
    .eq('election_id', election.id);

  if (candidatesError) {
    console.error('Error loading candidates:', candidatesError);
    return NextResponse.json({ error: 'Unable to load candidate data.' }, { status: 500 });
  }

  const { data: votesData, error: votesError } = await supabaseAdmin
    .from('votes')
    .select('candidate_id')
    .eq('election_id', election.id);

  if (votesError) {
    console.error('Error loading votes:', votesError);
    return NextResponse.json({ error: 'Unable to load vote data.' }, { status: 500 });
  }

  const { count: registeredCount } = await supabaseAdmin
    .from('voters')
    .select('id', { count: 'exact', head: true });

  const voteCounts = (votesData || []).reduce<Record<string, number>>((acc, row) => {
    if (!row.candidate_id) return acc;
    acc[row.candidate_id] = (acc[row.candidate_id] || 0) + 1;
    return acc;
  }, {});

  const totalVotes = Object.values(voteCounts).reduce((sum, value) => sum + value, 0);

  const candidates = (candidatesData || []).map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    votes: voteCounts[candidate.id] || 0,
    share: totalVotes ? Number(((voteCounts[candidate.id] || 0) / totalVotes * 100).toFixed(1)) : 0,
  }));

  const sortedCandidates = candidates.sort((a, b) => b.votes - a.votes);

  return NextResponse.json({
    election,
    candidates: sortedCandidates,
    totalVotes,
    registeredCount: registeredCount ?? 0,
    turnoutPercent: registeredCount ? Math.min(100, Math.round((totalVotes / registeredCount) * 100)) : 0,
  });
}
