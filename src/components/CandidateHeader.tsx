'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './CandidateHeader.module.css';

export default function CandidateHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useUser();
  const [isDark, setIsDark] = useState(false);
  const displayName = user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : 'Candidate';
  const candidateId = (user?.publicMetadata?.candidateId as string) ?? null;

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className={styles.greeting}>
          Welcome back, <strong className={styles.greetingName}>{displayName}</strong>
          <div className={styles.subtext}>
            {candidateId ? `Candidate ID: ${candidateId}` : (
              <span className={styles.noId}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                No Candidate ID assigned
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={toggleTheme} aria-label="Toggle Theme">
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        <Link href="/candidate/settings" className={styles.iconButton}>
          <div className={styles.notificationDot}></div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </Link>

        <div className={styles.profileBadge}>
          <Link href="/candidate/settings" className={styles.profileInfoWrapper}>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{displayName.toUpperCase()}</span>
              <span className={styles.profileRole}>Candidate</span>
            </div>
          </Link>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: { width: 32, height: 32 },
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
