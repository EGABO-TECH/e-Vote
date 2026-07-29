import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default async function CandidateDashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  const avatarUrl = user.imageUrl;

  // These would come from Supabase in production — mocked for now
  const electionName = 'General Student Council Election 2026';
  const timeRemaining = '14';
  const timeUnit = 'DAYS';
  const metrics = { manifestoViews: 1240, profileCompleteness: 100, daysSinceUpdate: 2 };

  return (
    <div className={styles.container}>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{electionName.toUpperCase()}</h1>
          <div className={styles.heroCountdown}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Voting opens in: <strong>{timeRemaining} {timeUnit}</strong>
          </div>
          <p className={styles.heroSubtext}>Candidate registration is open</p>
          <Link href="/candidate/manifesto" className={styles.heroBtn}>
            EDIT MANIFESTO
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
        <div className={styles.heroGraphic}>
          <div className={styles.ballotIllustration}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span className={styles.statLabel}>MANIFESTO VIEWS</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Total Views</div>
            <div className={styles.statValue}>{metrics.manifestoViews.toLocaleString()}</div>
            <div className={styles.statFooter}>
              <span>Unique visitors</span>
              <span className={styles.statPositive}>+14% this week</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper} style={{ color: '#3B82F6', background: '#EFF6FF' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <span className={styles.statLabel}>PROFILE</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Dossier Completion</div>
            <div className={styles.statValue}>{metrics.profileCompleteness}%</div>
            <div className={styles.statProgressBar}>
              <div className={styles.statProgressFill} style={{ width: `${metrics.profileCompleteness}%` }} />
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span className={styles.statLabel}>LAST UPDATE</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Days Since Edit</div>
            <div className={styles.statValue}>{metrics.daysSinceUpdate}</div>
            <div className={styles.statFooter}>
              <span>Status</span>
              <span className={styles.statPositive} style={{ color: '#10B981' }}>Current</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <div className={styles.historyCard}>
          <div className={styles.historyHeader}>
            <h2 className={styles.historyTitle}>Your Manifesto</h2>
            <Link href="/candidate/preview" className={styles.viewAllLink}>
              Preview Public Profile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          </div>
          <div className={styles.historyList}>
            <div className={styles.historyItem}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className={styles.historyIcon} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div className={styles.historyIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EFF6FF' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
              <div className={styles.historyInfo}>
                <div className={styles.historyName}>{fullName || 'Your Name'}</div>
                <div className={styles.historyDate}>Candidate</div>
              </div>
              <div className={styles.historyStatus}>APPROVED</div>
            </div>
            <div className={styles.excerptBox}>
              Your manifesto excerpt will appear here after you fill in your personal statement in the Manifesto section.
            </div>
          </div>
          <div className={styles.cardActions}>
            <Link href="/candidate/manifesto" className={styles.editLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Manifesto
            </Link>
          </div>
        </div>

        <div className={styles.supportCard}>
          <h3 className={styles.supportTitle}>SUPPORT HUB</h3>
          <h2 className={styles.supportHeading}>Need assistance with your campaign?</h2>
          <p className={styles.supportText}>Our dedicated candidate support team is available 24/7 during the election period.</p>
          <Link href="/candidate/support" className={styles.supportLink}>
            Contact Electoral Commission
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
