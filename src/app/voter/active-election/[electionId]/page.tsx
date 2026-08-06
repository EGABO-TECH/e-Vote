import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { CandidateVotingCards } from '../CandidateVotingCards';

export const dynamic = 'force-dynamic';

export default async function ElectionVotingPage({ params }: { params: Promise<{ electionId: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { electionId } = await params;

  // Fetch election details
  const { data: election, error: electionError } = await supabaseAdmin
    .from('elections')
    .select('id, title, description, status, starts_at, ends_at')
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
  const isOpen = election.status === 'active' || election.status === 'live';

  // Fetch only APPROVED candidates for this election
  const { data: candidatesData } = await supabaseAdmin
    .from('candidates')
    .select('id, name, slogan, manifesto, photo_url')
    .eq('election_id', electionId)
    .eq('status', 'approved');

  const candidates = (candidatesData || []).map((c) => ({
    id: c.id,
    name: c.name,
    slogan: c.slogan || 'Committed to student leadership.',
    manifesto: c.manifesto || 'No manifesto provided.',
    image_url: c.photo_url || '/logo.jpeg',
  }));

  // Look up voter ID from clerk_id, auto-create row if missing
  let { data: voterRow } = await supabaseAdmin
    .from('voters')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (!voterRow) {
    const { currentUser } = await import('@clerk/nextjs/server');
    const clerkUser = await currentUser();
    if (clerkUser) {
      const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress ?? null;
      const fullName = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null;

      const { data: newVoter } = await supabaseAdmin
        .from('voters')
        .upsert([{
          clerk_id: userId,
          email: primaryEmail,
          full_name: fullName,
          role: 'voter',
          student_id: primaryEmail ? primaryEmail.split('@')[0] : null,
        }], { onConflict: 'clerk_id' })
        .select('id')
        .single();

      if (newVoter) voterRow = newVoter;
    }
  }

  // Check if voter has already voted in this election
  let hasVoted = false;
  if (voterRow) {
    const { data: registry } = await supabaseAdmin
      .from('voter_registry')
      .select('has_voted')
      .eq('voter_id', voterRow.id)
      .eq('election_id', electionId)
      .single();
    hasVoted = Boolean(registry?.has_voted);
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

      {/* Closed election banner */}
      {!isOpen && (
        <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, color: '#92400E', fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>info</span>
          This election is currently {election.status} and not open for voting.
        </div>
      )}

      {/* No approved candidates banner */}
      {isOpen && candidates.length === 0 && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--blue)', fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>pending</span>
          No candidates have been approved by the Electoral Commission yet. Please check back soon.
        </div>
      )}

      {/* Voting cards */}
      {isOpen && candidates.length > 0 && (
        <CandidateVotingCards
          electionId={election.id}
          title={election.title}
          description={election.description}
          candidates={candidates}
          hasVoted={hasVoted}
        />
      )}
    </div>
  );
}
