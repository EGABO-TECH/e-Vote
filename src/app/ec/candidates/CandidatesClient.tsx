'use client';

import { useState, useEffect } from 'react';
import styles from '../shared.module.css';
import { updateCandidateStatus } from './actions';

type Candidate = {
  id: string;
  name: string;
  position: string;
  time?: string;
  initials: string;
  status: 'pending' | 'approved' | 'rejected';
  manifesto?: string;
};

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || '??';

const avatar = (initials: string, size = 40) => ({
  width: `${size}px`, height: `${size}px`, borderRadius: '50%',
  background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontWeight: 700, fontSize: size > 40 ? '20px' : '14px', flexShrink: 0,
} as React.CSSProperties);

const pill = (bg: string, color: string) => ({
  display: 'inline-flex', alignItems: 'center', gap: '5px',
  fontSize: '11.5px', fontWeight: 700, padding: '4px 11px',
  borderRadius: '999px', letterSpacing: '0.02em', background: bg, color,
} as React.CSSProperties);

export function CandidatesClient({ initialCandidates }: { initialCandidates: any[] }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setCandidates(
      initialCandidates.map(c => ({
        id: c.id,
        name: c.name || 'Unknown',
        position: c.category || 'Unknown Position',
        initials: getInitials(c.name || ''),
        status: c.status || 'pending',
        manifesto: c.manifesto || '',
      }))
    );
  }, [initialCandidates]);

  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const pending = candidates.filter(c => c.status === 'pending');
  const approved = candidates.filter(c => c.status === 'approved');
  const rejected = candidates.filter(c => c.status === 'rejected');

  const [reviewCandidate, setReviewCandidate] = useState<Candidate | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | 'changes' | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (status: 'approved' | 'rejected') => {
    if (!reviewCandidate || isUpdating) return;
    setIsUpdating(true);
    try {
      await updateCandidateStatus(reviewCandidate.id, status);
      setCandidates(prev => prev.map(c => c.id === reviewCandidate.id ? { ...c, status } : c));
      setReviewAction(status);
      setTimeout(() => { setReviewAction(null); setReviewCandidate(null); setReviewNote(''); setTab(status); }, 1500);
    } catch (e) {
      alert('Failed to update candidate');
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApprove = () => handleUpdateStatus('approved');
  const handleReject = () => handleUpdateStatus('rejected');

  const handleRequestChanges = () => {
    setReviewAction('changes');
    setTimeout(() => setReviewAction(null), 2500);
  };

  const tabBtn = (key: typeof tab, label: string, count: number) => (
    <button
      style={{
        padding: '9px 16px', borderRadius: '9px',
        border: '1px solid var(--card-border)',
        background: tab === key ? 'var(--sidebar-active)' : '#fff',
        color: tab === key ? '#fff' : 'var(--muted)',
        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
      }}
      onClick={() => setTab(key)}
    >
      {label} ({count})
    </button>
  );

  const listRow = (c: Candidate, showReview = false) => (
    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid #F0F1F5' }}>
      <div style={avatar(c.initials)}>{c.initials}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '14px' }}>{c.name}</div>
        <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
          {c.position}{c.time ? ` · ${c.time}` : ''}
        </div>
      </div>
      {c.status === 'pending' && <span style={pill('var(--amber-bg)', 'var(--amber)')}>Pending</span>}
      {c.status === 'approved' && <span style={pill('var(--green-bg)', 'var(--green)')}>Approved</span>}
      {c.status === 'rejected' && <span style={pill('var(--red-bg)', 'var(--red)')}>Rejected</span>}
      {showReview && (
        <button
          style={{ background: '#fff', color: 'var(--ink)', fontWeight: 600, fontSize: '13.5px', padding: '9px 16px', borderRadius: '10px', border: '1px solid var(--card-border)', cursor: 'pointer' }}
          onClick={() => { setReviewCandidate(c); setReviewNote(''); setReviewAction(null); }}
        >
          Review
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      {!reviewCandidate ? (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px' }}>Candidates</h1>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Review applications and arrange the ballot</p>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {tabBtn('pending', 'Pending', pending.length)}
            {tabBtn('approved', 'Approved', approved.length)}
            {tabBtn('rejected', 'Rejected', rejected.length)}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '0 24px' }}>
            {tab === 'pending' && (
              pending.length === 0
                ? <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>No pending candidates.</div>
                : pending.map(c => listRow(c, true))
            )}
            {tab === 'approved' && approved.map(c => listRow(c))}
            {tab === 'rejected' && rejected.map(c => listRow(c))}
          </div>
        </>
      ) : (
        /* Review Panel */
        <div>
          <button
            style={{ background: '#fff', color: 'var(--ink)', fontWeight: 600, fontSize: '13.5px', padding: '10px 18px', borderRadius: '11px', border: '1px solid var(--card-border)', cursor: 'pointer', marginBottom: '18px' }}
            onClick={() => { setReviewCandidate(null); setReviewAction(null); }}
          >
            ← Back to list
          </button>

          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>{reviewCandidate.name}</h1>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>{reviewCandidate.position}</p>
          </div>

          {reviewAction === 'approved' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Candidate approved and moved to the Approved list.
            </div>
          )}
          {reviewAction === 'rejected' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#991B1B', fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Candidate rejected and moved to the Rejected list.
            </div>
          )}
          {reviewAction === 'changes' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', color: '#92400E', fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, marginRight: 4, verticalAlign: 'text-bottom' }}>mail</span> Change request sent to {reviewCandidate.name}.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={avatar(reviewCandidate.initials, 64)}>{reviewCandidate.initials}</div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Running for</div>
                  <div style={{ fontSize: '19px', fontWeight: 800 }}>{reviewCandidate.position}</div>
                  <span style={pill('var(--badge-blue-bg)', 'var(--sidebar-active)')}>Awaiting EC Decision</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F0F1F5', paddingTop: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Personal Statement</div>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  I'm running to make sure every student's voice reaches the guild floor — practical office hours, transparent budgets, and a faster response to hostel and welfare complaints.
                </p>
              </div>

              <div style={{ borderTop: '1px solid #F0F1F5', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Policy Pillars</div>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  Academic Excellence · Student Welfare · Digital Innovation · Campus Infrastructure
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '8px' }}>
                  Reviewer Note (optional)
                </label>
                <textarea
                  rows={3}
                  value={reviewNote}
                  onChange={e => setReviewNote(e.target.value)}
                  placeholder="Add a note for the candidate, e.g. what needs to change..."
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid var(--card-border)', background: 'var(--page-bg)', fontSize: '14px', color: 'var(--ink)', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleApprove}
                  style={{ background: 'var(--green)', color: '#fff', fontWeight: 700, fontSize: '13.5px', padding: '11px 20px', borderRadius: '11px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Approve
                </button>
                <button
                  onClick={handleRequestChanges}
                  style={{ background: '#fff', color: 'var(--ink)', fontWeight: 600, fontSize: '13.5px', padding: '10px 18px', borderRadius: '11px', border: '1px solid var(--card-border)', cursor: 'pointer' }}
                >
                  Request Changes
                </button>
                <button
                  onClick={handleReject}
                  style={{ background: 'var(--red)', color: '#fff', fontWeight: 700, fontSize: '13.5px', padding: '11px 20px', borderRadius: '11px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Reject
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--sidebar)', color: '#fff', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', color: '#7FA3F5', textTransform: 'uppercase', marginBottom: '10px' }}>This is exactly what voters will see</div>
              <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800 }}>Public profile preview</h3>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#B7C1E0', lineHeight: 1.6 }}>
                The candidate's Active Ballot card will show this photo, position, and manifesto excerpt exactly as rendered here — review it as the final artifact, not just the submission form.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
