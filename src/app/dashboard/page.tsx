import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Topbar from '@/components/Topbar';
import ElectionCard from '@/components/ElectionCard';
import styles from './page.module.css';
import { supabaseAdmin, type Election } from '@/lib/supabase';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const firstName = user?.firstName || 'Voter';

  // Fetch live elections from Supabase
  // We use the admin client here for server-side fetching, but in a real 
  // app you might instantiate the client with the user's Clerk token for RLS.
  const { data: elections, error } = await supabaseAdmin
    .from('elections')
    .select('*')
    .eq('status', 'live')
    .order('ends_at', { ascending: true });

  return (
    <>
      <Topbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Welcome back, {firstName}</h1>
            <p className={styles.sub}>Here are the active elections you are eligible to vote in.</p>
          </header>

          <div className={styles.grid}>
            {elections && elections.length > 0 ? (
              elections.map((election: Election) => (
                <div key={election.id} style={{ position: 'relative' }}>
                  <ElectionCard election={election} />
                  <div style={{ position: 'absolute', bottom: '18px', right: '20px' }}>
                    <button className="btn-p" style={{ width: 'auto', height: '36px', fontSize: '.8rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                      </svg>
                      Open Ballot
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                There are currently no active elections.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
