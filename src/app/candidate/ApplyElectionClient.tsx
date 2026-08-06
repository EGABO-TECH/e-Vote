'use client';

import { useState } from 'react';
import { applyForElection } from './actions';
import { useRouter } from 'next/navigation';

type ElectionOption = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  starts_at: string | null;
  ends_at: string | null;
};

export default function ApplyElectionClient({ elections }: { elections: ElectionOption[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const selectedElection = elections.find((e) => e.id === selectedId) || null;

  const handleApply = async () => {
    if (!selectedId || isApplying) return;
    setIsApplying(true);
    setError(null);
    try {
      await applyForElection(selectedId);
      router.refresh();
    } catch (e: any) {
      setError(e.message || 'Failed to apply. Please try again.');
      setIsApplying(false);
    }
  };

  const statusColor = (status: string) => {
    if (status === 'live' || status === 'active') return { bg: '#DCFCE7', color: '#16A34A', border: '#86EFAC' };
    if (status === 'draft') return { bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' };
    return { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' };
  };

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: '22px' }}>how_to_vote</span>
        <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)', margin: 0 }}>Apply for Candidacy</p>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Instruction */}
        <p style={{ color: 'var(--text-2)', fontSize: '0.9375rem', margin: 0 }}>
          Select the election you wish to participate in as a candidate. You can only apply to one election at a time.
        </p>

        {/* Error */}
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', color: '#B91C1C', fontSize: '0.875rem', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Election Selection Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {elections.map((election) => {
            const isSelected = selectedId === election.id;
            const colors = statusColor(election.status);
            const formattedStart = election.starts_at ? new Date(election.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
            const formattedEnd = election.ends_at ? new Date(election.ends_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

            return (
              <div
                key={election.id}
                onClick={() => setSelectedId(election.id)}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid var(--blue)' : '1px solid var(--border)',
                  background: isSelected ? '#EFF6FF' : 'var(--surface-2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: isSelected ? '0 4px 12px rgba(29,78,216,0.12)' : 'none',
                }}
              >
                {/* Radio indicator */}
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  border: isSelected ? '6px solid var(--blue)' : '2px solid var(--text-3)',
                  transition: 'all 0.2s',
                  background: isSelected ? 'var(--blue)' : 'transparent',
                }} />

                {/* Election info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: isSelected ? 'var(--blue)' : 'var(--text-1)' }}>
                      {election.title}
                    </span>
                    <span style={{
                      padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      background: colors.bg, color: colors.color, border: `1px solid ${colors.border}`,
                    }}>
                      {election.status}
                    </span>
                  </div>
                  {election.description && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-2)', margin: '0 0 4px', lineHeight: 1.4,
                      overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {election.description}
                    </p>
                  )}
                  {(formattedStart || formattedEnd) && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', margin: 0, fontWeight: 600 }}>
                      {formattedStart && `Opens: ${formattedStart}`}
                      {formattedStart && formattedEnd && ' · '}
                      {formattedEnd && `Closes: ${formattedEnd}`}
                    </p>
                  )}
                </div>

                {/* Checkmark when selected */}
                {isSelected && (
                  <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: '22px', flexShrink: 0, fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Apply button */}
        <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ color: 'var(--text-2)', fontSize: '0.8125rem', margin: 0 }}>
            {selectedElection
              ? <>Selected: <strong style={{ color: 'var(--text-1)' }}>{selectedElection.title}</strong></>
              : 'No election selected'}
          </p>
          <button
            onClick={handleApply}
            disabled={!selectedId || isApplying}
            style={{
              padding: '12px 28px',
              background: !selectedId || isApplying ? 'var(--border)' : 'var(--blue)',
              color: !selectedId || isApplying ? 'var(--text-3)' : '#fff',
              borderRadius: 'var(--r-md)', fontWeight: 800, fontSize: '0.9375rem',
              border: 'none',
              cursor: !selectedId || isApplying ? 'not-allowed' : 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
              boxShadow: !selectedId || isApplying ? 'none' : 'var(--sh-blue)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>assignment_turned_in</span>
            {isApplying ? 'Submitting Application…' : 'Submit Application'}
          </button>
        </div>

      </div>
    </div>
  );
}
