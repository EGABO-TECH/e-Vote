'use client';

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import styles from './CandidateNav.module.css';

const BallotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

export default function CandidateNav() {
  return (
    <header className={styles.topbar}>
      <Link href="/" className={styles.logo}>
        <div className={styles.mark}><BallotIcon /></div>
        <span className={styles.brand}>e<b>-</b>Vote</span>
      </Link>

      <nav className={styles.nav}>
        <Link href="/candidate/dashboard" className={`${styles.navLink} ${styles.active}`}>Dashboard</Link>
        <Link href="/candidate/manifesto" className={styles.navLink}>Manifesto</Link>
        <Link href="/candidate/preview" className={styles.navLink}>Preview</Link>
        <Link href="/support" className={styles.navLink}>Support</Link>
      </nav>

      <div className={styles.right}>
        <UserButton
          appearance={{
            elements: {
              avatarBox: { width: 32, height: 32 },
            },
          }}
        />
      </div>
    </header>
  );
}
