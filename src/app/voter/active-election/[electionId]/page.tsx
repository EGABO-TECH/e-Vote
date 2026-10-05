import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { getOrCreateVoterRecord } from '@/lib/voter-record';
import { formatEastAfricaTime } from '@/lib/date-time';
import { CandidateVotingCards } from '../CandidateVotingCards';

export const dynamic = 'force-dynamic';

export default async function ElectionVotingPage({ params }: { params: Promise<{ electionId: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { electionId } = await params;

  // Fetch election details
  const { data: election, error: electionError } = await supabaseAdmin
    .from('elections')
    .select('id, title, description, banner_url, status, starts_at, ends_at')
    .eq('id', electionId)
    .single();

  if (electionError || !election) {
    return (
      <div style={{ padding: '64px 24px', textAlign: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--text-3)', display: 'block', marginBottom: 16 }}>error</span>
        <h2 style={{ color: 'var(--text-1)' }}>Election Not Found</h2>
        <p style={{ color: 'var(--text-2)' }}>This election does not exist or has been removed.</p>
        <Link href="/voter/active-election" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>← Back to Elections</Link>
      </div>
    );
  }

  // Check if election is open for voting
  const now = new Date();
  const canViewCandidates = election.status === 'active' || election.status === 'live';
  const isUpcoming = new Date(election.starts_at) > now;
  const isOpen = canViewCandidates && !isUpcoming && new Date(election.ends_at) > now;
  const votingOpensAt = formatEastAfricaTime(election.starts_at);

  // Fetch only APPROVED candidates for this election
  const { data: candidatesData } = await supabaseAdmin
    .from('candidates')
    .select('id, name, category, slogan, statement, manifesto, goals, photo_url')
    .eq('election_id', electionId)
    .eq('status', 'approved');

  const candidates = (candidatesData || []).map((c) => ({
    id: c.id,
    name: c.name,
    position: c.category || 'Candidate',
    slogan: c.slogan || 'Committed to student leadership.',
    statement: c.statement || '',
    manifesto: c.manifesto || 'No manifesto provided.',
    goals: c.goals || '',
    image_url: c.photo_url || null,
  }));

  const { voter: voterRow, error: voterError } = await getOrCreateVoterRecord(userId);

  // Check if voter has already voted in this election
  let hasVoted = false;
  if (voterRow) {
    const [registryResult, voteResult] = await Promise.all([
      supabaseAdmin
        .from('voter_registry')
        .select('has_voted')
        .eq('voter_id', voterRow.id)
        .eq('election_id', electionId)
        .maybeSingle(),
      supabaseAdmin
        .from('votes')
        .select('id')
        .eq('voter_id', voterRow.id)
        .eq('election_id', electionId)
        .maybeSingle(),
    ]);
    hasVoted = Boolean(registryResult.data?.has_voted || voteResult.data);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link
          href="/voter/active-election"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-2)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          All Elections
        </Link>
        <span style={{ color: 'var(--text-3)', fontSize: 14 }}>/</span>
        <span style={{ color: 'var(--text-1)', fontWeight: 700, fontSize: 14 }}>{election.title}</span>
      </div>

      {voterError && (!canViewCandidates || candidates.length === 0) && (
        <div role="alert" style={{ background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>
          {voterError}
        </div>
      )}

      {/* Election timing */}
      {!isOpen && (
        <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, color: '#92400E', fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>info</span>
          {isUpcoming ? `Candidate profiles are available now. Voting opens ${votingOpensAt}.` : `This election is currently ${election.status} and not open for voting.`}
        </div>
      )}

      {/* No approved candidates banner */}
      {canViewCandidates && candidates.length === 0 && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--blue)', fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>pending</span>
          No candidates have been approved by the Electoral Commission yet. Please check back soon.
        </div>
      )}

      {/* Voting cards */}
      {canViewCandidates && candidates.length > 0 && (
        <CandidateVotingCards
          electionId={election.id}
          title={election.title}
          description={election.description}
          bannerUrl={election.banner_url}
          candidates={candidates}
          hasVoted={hasVoted}
          voterError={voterError}
          canVote={isOpen}
          votingOpensAt={votingOpensAt}
        />
      )}
    </div>
  );
}
