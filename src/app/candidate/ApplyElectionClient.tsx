'use client';

import { useState } from 'react';
import { applyForElection } from './actions';
import { useRouter } from 'next/navigation';

export default function ApplyElectionClient({ electionId, electionName }: { electionId: string, electionName: string }) {
  const [isApplying, setIsApplying] = useState(false);
  const router = useRouter();

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await applyForElection(electionId);
      router.refresh();
    } catch (e: any) {
      alert(e.message || 'Failed to apply');
      setIsApplying(false);
    }
  };

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)', overflow: 'hidden' }}>
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' }}>Candidacy Application</p>
      </div>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ padding: '1rem', background: '#EFF6FF', borderRadius: '8px', color: 'var(--blue)', width: '100%', border: '1px solid #BFDBFE' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '4px' }}>Active Election: {electionName}</h3>
          <p style={{ fontSize: '0.875rem' }}>You have not applied to run as a candidate for this election yet. Click below to submit your application and begin building your manifesto.</p>
        </div>
        <button
          onClick={handleApply}
          disabled={isApplying}
          style={{
            padding: '12px 24px', background: 'var(--blue)', color: '#fff',
            borderRadius: 'var(--r-md)', fontWeight: 800, fontSize: '1rem',
            border: 'none', cursor: isApplying ? 'not-allowed' : 'pointer',
            opacity: isApplying ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}
        >
          {isApplying ? 'Submitting Application...' : 'Apply for Candidacy'}
          {!isApplying && <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>assignment_turned_in</span>}
        </button>
      </div>
    </div>
  );
}
