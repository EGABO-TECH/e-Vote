'use client';

import { useState } from 'react';
import styles from '../dashboard/page.module.css';

type Candidate = {
  id: string;
  name: string;
  position: string;
  time?: string;
  initials: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const INITIAL_PENDING: Candidate[] = [
  { id: '1', name: 'Niwasiima Ashelycole', position: 'Guild President', time: 'Submitted 2 days ago', initials: 'NA', status: 'Pending' },
  { id: '2', name: 'Joseph Kato', position: 'Speaker', time: 'Submitted 1 day ago', initials: 'JK', status: 'Pending' },
  { id: '3', name: 'Ruth Nabirye', position: 'Faculty Rep, Business', time: 'Submitted 5 hours ago', initials: 'RN', status: 'Pending' },
];
const INITIAL_APPROVED: Candidate[] = [
  { id: '4', name: 'David Mugisha', position: 'Guild President', initials: 'DM', status: 'Approved' },
  { id: '5', name: 'Faith Atim', position: 'Speaker', initials: 'FA', status: 'Approved' },
  { id: '6', name: 'Tom Okello', position: 'Faculty Rep, Law', initials: 'TO', status: 'Approved' },
];
const INITIAL_REJECTED: Candidate[] = [
  { id: '7', name: 'Peter Ssemwogerere', position: 'Guild President', time: 'Incomplete manifesto after 2 review cycles', initials: 'PS', status: 'Rejected' },
];

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

export default function CandidatesPage() {
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [pending, setPending] = useState<Candidate[]>(INITIAL_PENDING);
  const [approved, setApproved] = useState<Candidate[]>(INITIAL_APPROVED);
  const [rejected, setRejected] = useState<Candidate[]>(INITIAL_REJECTED);
  const [reviewCandidate, setReviewCandidate] = useState<Candidate | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | 'changes' | null>(null);

  const handleApprove = () => {
    if (!reviewCandidate) return;
    setApproved(p => [...p, { ...reviewCandidate, status: 'Approved' }]);
    setPending(p => p.filter(c => c.id !== reviewCandidate.id));
    setReviewAction('approved');
    setTimeout(() => { setReviewAction(null); setReviewCandidate(null); setReviewNote(''); setTab('approved'); }, 1500);
  };

  const handleReject = () => {
    if (!reviewCandidate) return;
    setRejected(p => [...p, { ...reviewCandidate, status: 'Rejected', time: reviewNote || 'Rejected by EC officer' }]);
    setPending(p => p.filter(c => c.id !== reviewCandidate.id));
    setReviewAction('rejected');
    setTimeout(() => { setReviewAction(null); setReviewCandidate(null); setReviewNote(''); setTab('rejected'); }, 1500);
  };

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
      {c.status === 'Pending' && <span style={pill('var(--amber-bg)', 'var(--amber)')}>Pending</span>}
      {c.status === 'Approved' && <span style={pill('var(--green-bg)', 'var(--green)')}>Approved</span>}
      {c.status === 'Rejected' && <span style={pill('var(--red-bg)', 'var(--red)')}>Rejected</span>}
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
              ✉ Change request sent to {reviewCandidate.name}.
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
