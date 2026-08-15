'use client';

import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import styles from './LandingContent.module.css';

export default function LandingContent() {
  // Use a simple state to toggle between SignIn and SignUp, but initialize it based on hash if present
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#sign-up') {
      return 'sign-up';
    }
    return 'sign-in';
  });

  return (
    <main className={styles.page}>
      {/* LEFT PANEL */}
      <section className={styles.panelL}>
        <div className={styles.formWrap}>
          {mode === 'sign-in' ? (
            <>
              <div className={styles.eyebrow}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                Cavendish University Uganda
              </div>
              <h1 className={styles.formTitle}>Sign in to<br/>your account</h1>
              <p className={styles.formSub}>Access the voting portal using your institutional credentials.</p>
              
              <SignIn 
                routing="hash"
                appearance={{
                  elements: {
                    rootBox: { width: '100%' },
                    cardBox: { boxShadow: 'none' },
                    card: { width: '100%', padding: '0', boxShadow: 'none', background: 'transparent' },
                    header: { display: 'none' },
                    footer: { display: 'none' },
                    formFieldInput: "cl-custom-input",
                    formFieldLabel: "cl-custom-label",
                  }
                }}
              />
              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '.8125rem', color: 'var(--text-3)' }}>
                New to e-Vote? <a href="#sign-up" onClick={(e) => { e.preventDefault(); setMode('sign-up'); window.location.hash = 'sign-up'; }} style={{ color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }}>Create an account</a>
              </div>
            </>
          ) : (
            <>
              <div className={styles.eyebrow}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                Cavendish University Uganda
              </div>
              <h1 className={styles.formTitle}>Create your<br/>voter account</h1>
              <p className={styles.formSub}>Register once to participate in all institutional elections you are eligible for.</p>
              
              <SignUp 
                routing="hash"
                appearance={{
                  elements: {
                    rootBox: { width: '100%' },
                    cardBox: { boxShadow: 'none' },
                    card: { width: '100%', padding: '0', boxShadow: 'none', background: 'transparent' },
                    header: { display: 'none' },
                    footer: { display: 'none' },
                    formFieldInput: "cl-custom-input",
                    formFieldLabel: "cl-custom-label",
                  }
                }}
              />
              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '.8125rem', color: 'var(--text-3)' }}>
                Already have an account? <a href="#sign-in" onClick={(e) => { e.preventDefault(); setMode('sign-in'); window.location.hash = 'sign-in'; }} style={{ color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }}>Sign in</a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* RIGHT PANEL */}
      <aside className={styles.panelR} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />

        <div className={styles.ringsWrap}>
          <div className={styles.ring} /><div className={styles.ring} />
          <div className={styles.ring} /><div className={styles.ring} /><div className={styles.ring} />
          <div className={styles.ringC}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
        </div>

        <div className={styles.rpInner}>
          <div className={styles.rpTag}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            End-to-end encrypted
          </div>

          <h2 className={styles.rpTitle}>Democratic.<br/><em>Secure.</em><br/>Verifiable.</h2>
          <p className={styles.rpDesc}>A tamper-proof voting platform with offline resilience and cryptographic verification, purpose-built for academic institutions.</p>

          <div className={styles.featList}>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <span className={styles.featText}>End-to-end encrypted ballots</span>
            </div>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 6s4-4 11-4 11 4 11 4"/><path d="M1 12s4-4 11-4 11 4 11 4"/><path d="M5 18s2.5-2 7-2 7 2 7 2"/><line x1="2" y1="2" x2="22" y2="22"/>
                </svg>
              </div>
              <span className={styles.featText}>Offline-first &mdash; works without internet</span>
            </div>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <span className={styles.featText}>Cryptographic ballot verification</span>
            </div>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <span className={styles.featText}>Real-time transparent audit trail</span>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
