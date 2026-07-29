import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default async function EcDashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  // These would come from Supabase in production — mocked for now
  const electionName = 'General Student Council Election 2026';
  const metrics = { voters: 6214, turnout: 0, candidatesApproved: 9, candidatesPending: 3, syncTotal: 128, syncReconciled: 128 };

  return (
    <div className={styles.container}>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{electionName}</h1>
          <p className={styles.heroSubtext}>Candidate registration is open &middot; Voting opens in 14 days</p>
          <Link href="/ec/candidates" className={styles.heroBtn}>
            Review Pending Candidates
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className={styles.statLabel}>VOTERS</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Registered</div>
            <div className={styles.statValue}>{metrics.voters.toLocaleString()}</div>
            <div className={styles.statFooter}>
              <span>Turnout so far</span>
              <span className={styles.statPositive}>{metrics.turnout}%</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
              </svg>
            </div>
            <span className={styles.statLabel}>CANDIDATES</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Approved / Pending</div>
            <div className={styles.statValue}>{metrics.candidatesApproved} / {metrics.candidatesPending}</div>
            <div className={styles.statFooter}>
              <span>Across 4 categories</span>
              <span style={{ background: 'var(--amber-bg)', color: 'var(--amber)', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>
                {metrics.candidatesPending} need review
              </span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5" /><path d="M18 3v4h-4M6 21v-4h4" />
              </svg>
            </div>
            <span className={styles.statLabel}>SYNC HEALTH</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Devices reconciled</div>
            <div className={styles.statValue}>{metrics.syncReconciled} / {metrics.syncTotal}</div>
            <div className={styles.statFooter}>
              <span>Status</span>
              <span className={styles.statPositive} style={{ color: '#10B981' }}>All synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <div className={styles.historyCard}>
          <div className={styles.historyHeader}>
            <h2 className={styles.historyTitle}>Your Elections</h2>
            <Link href="/ec/elections" className={styles.viewAllLink}>
              Manage all
            </Link>
          </div>
          <div className={styles.historyList}>
            <div className={styles.historyItem} style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div className={styles.historyIcon} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)', fontWeight: 'bold' }}>GS</div>
              <div className={styles.historyInfo}>
                <div className={styles.historyName}>General Student Council Election 2026</div>
                <div className={styles.historyDate}>All faculties &middot; Opens in 14 days</div>
              </div>
              <div className={styles.historyStatus} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)' }}>Draft</div>
            </div>
            <div className={styles.historyItem} style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div className={styles.historyIcon} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)', fontWeight: 'bold' }}>SE</div>
              <div className={styles.historyInfo}>
                <div className={styles.historyName}>Software Engineering Rep Election</div>
                <div className={styles.historyDate}>Dept. of Software Engineering &middot; Closed</div>
              </div>
              <div className={styles.historyStatus} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>Certified</div>
            </div>
            <div className={styles.historyItem}>
              <div className={styles.historyIcon} style={{ background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)', fontWeight: 'bold' }}>BA</div>
              <div className={styles.historyInfo}>
                <div className={styles.historyName}>Business Faculty Guild Rep</div>
                <div className={styles.historyDate}>Faculty of Business &middot; Results pending sync</div>
              </div>
              <div className={styles.historyStatus} style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>Awaiting certification</div>
            </div>
          </div>
        </div>

        <div className={styles.supportCard}>
          <h3 className={styles.supportTitle} style={{ color: '#7FA3F5' }}>CERTIFICATION STATUS</h3>
          <h2 className={styles.supportHeading}>Not yet certified</h2>
          <p className={styles.supportText}>General Student Council Election 2026 has not been certified. Results and the public audit ledger will remain unpublished until certification.</p>
          <Link
            href="/ec/results"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#fff',
              color: '#0F1220',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'opacity .15s',
              marginTop: 'auto',
            }}
          >
            Go to Results
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
