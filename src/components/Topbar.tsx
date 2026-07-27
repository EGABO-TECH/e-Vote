'use client';

import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import styles from './Topbar.module.css';

const BallotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

export default function Topbar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className={styles.topbar}>
      <Link href="/" className={styles.logo}>
        <div className={styles.mark}><BallotIcon /></div>
        <span className={styles.brand}>e<b>-</b>Vote</span>
      </Link>

      <nav className={styles.nav}>
        <Link href="/#how-it-works" className={styles.navLink}>How it works</Link>
        <Link href="/#security" className={styles.navLink}>Security</Link>
        <Link href="/about" className={styles.navLink}>About</Link>
      </nav>

      <div className={styles.right}>
        <div className={styles.liveBadge}>
          <span className={styles.liveDot} />
          Election live
        </div>

        {!isLoaded ? null : isSignedIn ? (
          <>
            <Link href="/dashboard" className={styles.dashLink}>Dashboard</Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 32, height: 32 },
                },
              }}
            />
          </>
        ) : (
          <Link href="/sign-in" className={styles.cta}>Sign in</Link>
        )}
      </div>
    </header>
  );
}
