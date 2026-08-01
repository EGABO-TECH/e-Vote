import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.css';

const PolicyIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    academic: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    welfare: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
    digital: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    infrastructure: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="22" x2="21" y2="22"></line>
        <line x1="6" y1="18" x2="6" y2="11"></line>
        <line x1="10" y1="18" x2="10" y2="11"></line>
        <line x1="14" y1="18" x2="14" y2="11"></line>
        <line x1="18" y1="18" x2="18" y2="11"></line>
        <polygon points="12 2 20 7 4 7"></polygon>
      </svg>
    ),
  };
  return icons[type] ?? null;
};

export default async function CandidatePreviewPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  const avatarUrl = user.imageUrl;

  // These would come from Supabase in production — empty until the candidate fills manifesto
  const candidateInfo = {
    category: 'Candidate', // Will be set from manifesto form
    slogan: '',            // Will be set from manifesto form
    statement: '',         // Will be set from manifesto form
    policies: [
      { type: 'academic',        title: 'Academic Excellence',    body: 'Your academic policy will appear here after you edit your manifesto.' },
      { type: 'welfare',         title: 'Student Welfare',        body: 'Your student welfare policy will appear here after you edit your manifesto.' },
      { type: 'digital',         title: 'Digital Innovation',     body: 'Your digital innovation policy will appear here after you edit your manifesto.' },
      { type: 'infrastructure',  title: 'Campus Infrastructure',  body: 'Your infrastructure policy will appear here after you edit your manifesto.' },
    ],
    goals: [
      'Goal 1 will appear here after you edit your manifesto.',
      'Goal 2 will appear here after you edit your manifesto.',
      'Goal 3 will appear here after you edit your manifesto.',
    ],
    views: 0,
  };

  const isIncomplete = !candidateInfo.statement;

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Public Profile Preview</h1>
          <p className={styles.pageSubtitle}>This is exactly how voters will see your profile.</p>
        </div>
        <Link href="/candidate/manifesto" className={styles.editBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Manifesto
        </Link>
      </div>

      {isIncomplete && (
        <div className={styles.incompleteAlert}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Your manifesto is incomplete. Fill in your details in the{' '}
          <Link href="/candidate/manifesto" className={styles.alertLink}>Manifesto editor</Link>{' '}
          before voters can see your full profile.
        </div>
      )}

      <div className={styles.previewLayout}>
        {/* Main Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileCardHeader}>
            <div className={styles.candidateAvatar}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className={styles.candidateBasic}>
              <div className={styles.runningFor}>Running for {candidateInfo.category}</div>
              <h2 className={styles.candidateName}>{fullName || 'Your Name'}</h2>
              {candidateInfo.slogan ? (
                <p className={styles.candidateSlogan}>"{candidateInfo.slogan}"</p>
              ) : (
                <p className={styles.emptyField}>No slogan added yet — add one in your manifesto</p>
              )}
              <div className={styles.verifiedBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                EC Verified Candidate
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.statRow}>
            <div className={styles.statChip}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {candidateInfo.views.toLocaleString()} views
            </div>
            <div className={styles.statChip}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Profile not yet published
            </div>
          </div>

          <div className={styles.divider} />

          <h3 className={styles.sectionTitle}>Personal Statement</h3>
          {candidateInfo.statement ? (
            <p className={styles.statement}>{candidateInfo.statement}</p>
          ) : (
            <p className={styles.emptyField}>No statement added yet. Write your personal statement in the Manifesto editor.</p>
          )}
        </div>

        {/* Policy Pillars Card */}
        <div className={styles.policiesCard}>
          <h3 className={styles.cardTitle}>Policy Pillars</h3>
          <div className={styles.policiesGrid}>
            {candidateInfo.policies.map((p, i) => (
              <div key={i} className={styles.policyChip}>
                <div className={styles.policyIconWrap}>
                  <PolicyIcon type={p.type} />
                </div>
                <div>
                  <div className={styles.policyTitle}>{p.title}</div>
                  <div className={styles.policyBody}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Commitments Card */}
        <div className={styles.goalsCard}>
          <h3 className={styles.cardTitle}>Key Commitments</h3>
          <ul className={styles.goalsList}>
            {candidateInfo.goals.map((g, i) => (
              <li key={i} className={styles.goalItem}>
                <span className={styles.goalIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.goalText}>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.disclaimer}>
        This preview is for your eyes only. Voters will see this profile on the public election portal. Any changes to your manifesto require EC re-review.
      </div>
    </div>
  );
}
