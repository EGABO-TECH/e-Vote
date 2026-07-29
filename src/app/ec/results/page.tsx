'use client';

import { useState } from 'react';
import styles from '../dashboard/page.module.css';

export default function ResultsPage() {
  const [certifyOpen, setCertifyOpen] = useState(false);
  const [certifyInput, setCertifyInput] = useState('');
  const [certified, setCertified] = useState(false);

  const handleCertify = () => {
    if (certifyInput !== 'CERTIFY') return;
    setCertified(true);
    setCertifyOpen(false);
    setCertifyInput('');
  };

  const statCard = (label: string, eyebrow: string, value: string, foot: string, footRight: string, footRightColor?: string) => (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <div className={styles.statIconWrapper}></div>
        <span className={styles.statLabel}>{eyebrow}</span>
      </div>
      <div className={styles.statBody}>
        <div className={styles.statLabelTitle}>{label}</div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statFooter}>
          <span>{foot}</span>
          <span className={styles.statPositive} style={footRightColor ? { color: footRightColor } : {}}>{footRight}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Certified banner */}
      {certified && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', fontWeight: 600, fontSize: '15px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Results certified and published to the public audit ledger. This election is now permanently locked.
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px' }}>Results &amp; Certification</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Software Engineering Rep Election &middot; Voting closed</p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <span className={styles.statLabel}>TURNOUT</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Ballots Cast</div>
            <div className={styles.statValue}>2,981</div>
            <div className={styles.statFooter}>
              <span>Of 3,420 eligible</span>
              <span className={styles.statPositive}>87%</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5" />
              </svg>
            </div>
            <span className={styles.statLabel}>RECONCILIATION</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Devices Synced</div>
            <div className={styles.statValue}>42 / 42</div>
            <div className={styles.statFooter}>
              <span>Status</span>
              <span className={styles.statPositive} style={{ color: '#10B981' }}>Complete</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <span className={styles.statLabel}>INTEGRITY</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Sync Discrepancies</div>
            <div className={styles.statValue}>0</div>
            <div className={styles.statFooter}>
              <span>All ballots reconciled</span>
              <span className={styles.statPositive} style={{ color: '#10B981' }}>Healthy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px', marginTop: '24px' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Live Tally — Faculty Rep</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr>
                {['Candidate', 'Votes', 'Share'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', padding: '0 12px 10px', borderBottom: '1px solid var(--card-border)', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Tom Okello', votes: '1,644', share: '55.2%', winner: true },
                { name: 'Brenda Achen', votes: '1,102', share: '36.9%', winner: false },
                { name: 'Write-in / spoiled', votes: '235', share: '7.9%', winner: false },
              ].map((row) => (
                <tr key={row.name}>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F1F5', fontWeight: row.winner ? 700 : 400 }}>
                    {row.winner && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '6px', color: 'var(--green)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                          <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                        </svg>
                      </span>
                    )}
                    {row.name}
                  </td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F1F5' }}>{row.votes}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F1F5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#F0F1F5', overflow: 'hidden' }}>
                        <div style={{ width: row.share, height: '100%', background: row.winner ? 'var(--green)' : 'var(--sidebar-active)', borderRadius: '3px' }} />
                      </div>
                      {row.share}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ fontSize: '18px', fontWeight: 800, margin: '26px 0 16px' }}>Anomaly &amp; Incident Log</div>
          {[
            { title: 'Device SE-07 offline queue reconciled', sub: 'Resolved automatically on reconnect' },
            { title: 'Duplicate submission attempt, Voter #2291', sub: 'Blocked by one-vote rule, no action needed' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderTop: '1px solid #F0F1F5' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green-bg)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{item.title}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>{item.sub}</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 700, padding: '4px 11px', borderRadius: '999px', background: 'var(--green-bg)', color: 'var(--green)' }}>Resolved</span>
            </div>
          ))}
        </div>

        {/* Certification card */}
        <div style={{ background: 'var(--sidebar)', color: '#fff', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', color: '#7FA3F5', textTransform: 'uppercase', marginBottom: '10px' }}>Certification Status</div>
          {certified ? (
            <>
              <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800, color: '#6EE7B7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Certified &amp; Published
              </h3>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#B7C1E0', lineHeight: 1.6 }}>
                This election is permanently locked. The public verification ledger is live.
              </p>
            </>
          ) : (
            <>
              <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800 }}>Not yet certified</h3>
              <p style={{ margin: '0 0 18px', fontSize: '13.5px', color: '#B7C1E0', lineHeight: 1.6 }}>
                Once certified, this election locks permanently and the public verification ledger is published. This cannot be undone.
              </p>
              <button
                onClick={() => setCertifyOpen(true)}
                style={{ background: '#fff', color: 'var(--ink)', fontWeight: 700, fontSize: '13.5px', padding: '11px 20px', borderRadius: '11px', border: 'none', cursor: 'pointer', width: '100%' }}
              >
                Certify &amp; Publish Results
              </button>
            </>
          )}
        </div>
      </div>

      {/* Certify Confirmation Modal */}
      {certifyOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,18,32,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '32px', maxWidth: '440px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 800 }}>Certify &amp; publish results?</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              This locks <strong>Software Engineering Rep Election</strong> permanently and publishes the public verification ledger. <strong>This action cannot be undone.</strong>
            </p>
            <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Type <strong>CERTIFY</strong> to confirm:</p>
            <input
              value={certifyInput}
              onChange={e => setCertifyInput(e.target.value)}
              placeholder="Type CERTIFY"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: `1px solid ${certifyInput === 'CERTIFY' ? 'var(--green)' : 'var(--card-border)'}`, background: 'var(--page-bg)', fontSize: '14px', marginBottom: '20px', outline: 'none', fontFamily: 'inherit' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCertify}
                disabled={certifyInput !== 'CERTIFY'}
                style={{ flex: 1, background: certifyInput === 'CERTIFY' ? '#DC2626' : '#F0F1F5', color: certifyInput === 'CERTIFY' ? '#fff' : 'var(--muted)', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '11px', border: 'none', cursor: certifyInput === 'CERTIFY' ? 'pointer' : 'not-allowed', transition: 'all .2s' }}
              >
                Certify &amp; Publish
              </button>
              <button
                onClick={() => { setCertifyOpen(false); setCertifyInput(''); }}
                style={{ flex: 1, background: '#fff', color: 'var(--ink)', fontWeight: 600, fontSize: '14px', padding: '12px', borderRadius: '11px', border: '1px solid var(--card-border)', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
