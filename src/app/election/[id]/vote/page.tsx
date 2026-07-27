import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import Topbar from '@/components/Topbar';
import VoteForm from './VoteForm';
import styles from './page.module.css';

export default async function VotePage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) redirect('/');

  // 1. Fetch Election
  const { data: election, error: electionError } = await supabaseAdmin
    .from('elections')
    .select('*')
    .eq('id', params.id)
    .single();

  if (electionError || !election) {
    return (
      <>
        <Topbar />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Election Not Found</h1>
            <p className={styles.desc}>This election may have been removed or the link is invalid.</p>
          </div>
        </div>
      </>
    );
  }

  // 2. Fetch Voter ID for current Clerk user
  const { data: voter } = await supabaseAdmin
    .from('voters')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (!voter) {
    return (
      <>
        <Topbar />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Access Denied</h1>
            <p className={styles.desc}>We could not verify your voter registration. Please try logging in again.</p>
          </div>
        </div>
      </>
    );
  }

  // 3. Check if already voted
  const { data: existingVote } = await supabaseAdmin
    .from('votes')
    .select('id')
    .eq('election_id', election.id)
    .eq('voter_id', voter.id)
    .single();

  const hasVoted = !!existingVote;

  // 4. Fetch Candidates
  const { data: candidates } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('election_id', election.id)
    .order('created_at', { ascending: true });

  return (
    <>
      <Topbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Official Ballot</div>
          <h1 className={styles.title}>{election.title}</h1>
          <p className={styles.desc}>
            {hasVoted 
              ? "You have successfully cast your vote in this election."
              : (election.description || "Review the candidates below and cast your vote.")
            }
          </p>
        </div>

        {hasVoted ? (
          <div className={styles.votedState}>
            <div className={styles.votedIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className={styles.votedTitle}>Vote Recorded</div>
            <div className={styles.votedDesc}>Your encrypted ballot has been securely submitted and verified.</div>
            <a href="/dashboard" className="btn-g" style={{ width: 'auto', display: 'inline-flex' }}>
              Return to Dashboard
            </a>
          </div>
        ) : election.status !== 'live' ? (
          <div className={styles.votedState} style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className={styles.votedIcon} style={{ background: 'var(--surface-3)', color: 'var(--text-3)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className={styles.votedTitle}>Election Closed</div>
            <div className={styles.votedDesc}>This election is currently {election.status}. Voting is not allowed.</div>
            <a href="/dashboard" className="btn-g" style={{ width: 'auto', display: 'inline-flex' }}>
              Return to Dashboard
            </a>
          </div>
        ) : (
          <VoteForm electionId={election.id} candidates={candidates || []} />
        )}
      </div>
    </>
  );
}
