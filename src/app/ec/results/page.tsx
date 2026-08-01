'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from '../shared.module.css';

type CandidateResult = {
  id: string;
  name: string;
  votes: number;
  share: number;
  winner?: boolean;
};

type ResultsPayload = {
  election: { id: string; title: string } | null;
  candidates: CandidateResult[];
  totalVotes: number;
  registeredCount: number;
  turnoutPercent: number;
  error?: string;
};

function formatNumber(value: number) {
  return value.toLocaleString();
}

export default function ResultsPage() {
  const [certifyOpen, setCertifyOpen] = useState(false);
  const [certifyInput, setCertifyInput] = useState('');
  const [certified, setCertified] = useState(false);
  const [candidates, setCandidates] = useState<CandidateResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [turnoutPercent, setTurnoutPercent] = useState(0);
  const [electionTitle, setElectionTitle] = useState('Current election');
  const [liveStatus, setLiveStatus] = useState('Loading');
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleCertify = () => {
    if (certifyInput !== 'CERTIFY') return;
    setCertified(true);
    setCertifyOpen(false);
    setCertifyInput('');
  };

  useEffect(() => {
    let pollingId: number | undefined;

    const fetchResults = async () => {
      try {
        const response = await fetch('/api/ec/results', { cache: 'no-store' });
        const payload: ResultsPayload = await response.json();

        if (!response.ok || payload.error) {
          setLoadError(payload.error || 'Unable to load election results.');
          setLiveStatus('Unavailable');
          return;
        }

        setLoadError(null);
        setElectionTitle(payload.election?.title ?? 'Current election');
        setCandidates(payload.candidates.map((row, index) => ({ ...row, winner: index === 0 })));
        setTotalVotes(payload.totalVotes);
        setTurnoutPercent(payload.turnoutPercent);
        setLiveStatus(payload.election ? 'Live' : 'No live election');
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Unable to load election results.');
        setLiveStatus('Unavailable');
      }
    };

    fetchResults();
    pollingId = window.setInterval(fetchResults, 7000);

    return () => {
      if (pollingId) window.clearInterval(pollingId);
    };
  }, []);

  const pieColors = ['#2563eb', '#0ea5e9', '#22c55e', '#eab308', '#f97316'];
  const chartData = useMemo(
    () => candidates.map((candidate) => ({ label: candidate.name, value: candidate.votes })),
    [candidates]
  );

  const pieSegments = useMemo(() => {
    const circumference = 2 * Math.PI * 44;
    let cumulative = 0;

    return candidates.map((candidate, index) => {
      const length = circumference * (candidate.share / 100);
      const segment = {
        ...candidate,
        color: pieColors[index % pieColors.length],
        dashArray: `${length} ${circumference}`,
        dashOffset: circumference - cumulative,
      };
      cumulative += length;
      return segment;
    });
  }, [candidates]);

  return (
    <div className={styles.container}>
      {loadError && (
        <div style={{ padding: '16px 20px', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 12, color: '#B91C1C', marginBottom: 20 }}>
          {loadError}
        </div>
      )}

      {certified && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', fontWeight: 600, fontSize: '15px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Results certified and published to the public audit ledger. This election is now permanently locked.
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px' }}>Results &amp; Certification</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>{electionTitle} &middot; {liveStatus}</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIconWrapper}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <span className={styles.statLabel}>BALLOTS</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Ballots Cast</div>
            <div className={styles.statValue}>{formatNumber(totalVotes)}</div>
            <div className={styles.statFooter}>
              <span>Live tally</span>
              <span className={styles.statPositive}>Updated automatically</span>
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
            <span className={styles.statLabel}>LEADER</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Top Candidate</div>
            <div className={styles.statValue}>{candidates[0]?.name || 'TBD'}</div>
            <div className={styles.statFooter}>
              <span>{candidates[0] ? `${candidates[0].share.toFixed(1)}% share` : 'Waiting for votes'}</span>
              <span className={styles.statPositive}>Leading</span>
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
            <span className={styles.statLabel}>TURNOUT</span>
          </div>
          <div className={styles.statBody}>
            <div className={styles.statLabelTitle}>Registered Participation</div>
            <div className={styles.statValue}>{turnoutPercent}%</div>
            <div className={styles.statFooter}>
              <span>Based on registered users</span>
              <span className={styles.statPositive}>Live percent</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px', marginTop: '24px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Live Tally</h2>
              <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '13px' }}>Vote distribution for the active election.</p>
            </div>
            <span style={{ padding: '8px 14px', borderRadius: '999px', background: 'rgba(59,130,246,0.12)', color: '#2563eb', fontWeight: 700, fontSize: '12px' }}>{liveStatus}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px', borderRadius: '16px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <svg width="240" height="240" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="44" fill="none" stroke="var(--border)" strokeWidth="16" />
                {pieSegments.map((segment) => (
                  <circle
                    key={segment.id}
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="16"
                    strokeDasharray={segment.dashArray}
                    strokeDashoffset={segment.dashOffset}
                    strokeLinecap="round"
                  />
                ))}
                <circle cx="60" cy="60" r="28" fill="var(--surface)" />
                <text x="60" y="58" textAnchor="middle" fontSize="12" fill="var(--text-1)" fontWeight="700" transform="rotate(90 60 60)">
                  {totalVotes}
                </text>
                <text x="60" y="72" textAnchor="middle" fontSize="9" fill="var(--text-3)" transform="rotate(90 60 60)">
                  ballots
                </text>
              </svg>
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '18px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '18px' }}>Ranked Leaderboard</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 10px', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Candidate</th>
                    <th style={{ textAlign: 'right', padding: '12px 10px', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Votes</th>
                    <th style={{ textAlign: 'right', padding: '12px 10px', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((row) => (
                    <tr key={row.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: row.winner ? 700 : 500 }}>{row.name}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>{formatNumber(row.votes)}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>{row.share.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
                {candidates.map((row, index) => (
                  <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 999, background: pieColors[index % pieColors.length] }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-1)' }}>{row.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{row.share.toFixed(1)}% • {formatNumber(row.votes)} votes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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

      {certifyOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,18,32,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '32px', maxWidth: '440px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 800 }}>Certify &amp; publish results?</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              This locks <strong>{electionTitle}</strong> permanently and publishes the public verification ledger. <strong>This action cannot be undone.</strong>
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
