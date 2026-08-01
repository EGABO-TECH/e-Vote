'use client';

import { useMemo, useState } from 'react';
import { castVoteAction } from '@/app/election/[id]/vote/actions';

export type CandidateCardData = {
  id: string;
  name: string;
  slogan: string;
  manifesto: string;
  image_url: string;
};

export function CandidateVotingCards({
  electionId,
  title,
  description,
  candidates,
  hasVoted,
}: {
  electionId: string;
  title: string;
  description: string | null;
  candidates: CandidateCardData[];
  hasVoted: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalCandidates = useMemo(() => candidates.length, [candidates.length]);

  const handleVote = async () => {
    if (!selectedId || hasVoted || submitting) return;

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await castVoteAction(electionId, selectedId);

      if ('error' in result && result.error) {
        setError(result.error);
        return;
      }

      setSuccessMessage('Vote successfully recorded. Your verification receipt is now available.');
      setSelectedId(null);
      window.location.href = '/voter/verification-receipt';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to record your vote.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, boxShadow: 'var(--sh-sm)', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-3)', textTransform: 'uppercase', margin: '0 0 8px' }}>
              Active election
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>{title}</h2>
          </div>
          <span style={{ padding: '8px 14px', background: 'var(--green-bg)', color: 'var(--green)', borderRadius: 999, fontWeight: 700, fontSize: 12, border: '1px solid var(--green-bdr)' }}>
            {hasVoted ? 'Ballot cast' : 'Open for voting'}
          </span>
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-3)', fontSize: 13, fontWeight: 700 }}>
          <span className="material-symbols-outlined">groups</span>
          <span>{totalCandidates} candidates in this race</span>
        </div>
      </div>

      {error && (
        <div style={{ background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div style={{ background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid var(--green-bdr)', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontWeight: 700 }}>
          {successMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {candidates.map((candidate) => {
          const isSelected = selectedId === candidate.id;
          const isDisabled = hasVoted;

          return (
            <div
              key={candidate.id}
              onClick={() => {
                if (!isDisabled) setSelectedId(candidate.id);
              }}
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(246,249,255,1) 100%)',
                border: isSelected ? '2px solid var(--blue)' : '1px solid var(--border)',
                borderRadius: 22,
                padding: 18,
                boxShadow: isSelected ? '0 18px 35px rgba(29,78,216,0.18)' : 'var(--sh-sm)',
                transform: isSelected ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
                transition: 'all 0.25s ease',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(59,130,246,0.14), transparent 48%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 68, height: 68, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(29,78,216,0.12)', background: '#eaf1ff', flexShrink: 0 }}>
                    <img src={candidate.image_url || '/logo.jpeg'} alt={candidate.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {isSelected && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'var(--blue)', color: '#fff', fontSize: 18 }}>
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: 'var(--text-1)' }}>{candidate.name}</h3>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', margin: '0 0 12px' }}>
                    “{candidate.slogan}”
                  </p>
                </div>

                <div style={{ background: 'rgba(148,163,184,0.06)', borderRadius: 16, padding: 14, border: '1px solid rgba(148,163,184,0.12)' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-2)', margin: 0 }}>
                    {candidate.manifesto}
                  </p>
                </div>

                <button
                  disabled={hasVoted || submitting || isDisabled}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!hasVoted) setSelectedId(candidate.id);
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderRadius: 14,
                    padding: '12px 16px',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#fff',
                    background: hasVoted ? 'var(--text-3)' : 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
                    boxShadow: hasVoted ? 'none' : '0 12px 24px rgba(29,78,216,0.2)',
                    cursor: hasVoted ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {hasVoted ? 'Ballot Cast' : submitting && selectedId === candidate.id ? 'Recording...' : 'Vote Me'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
        <button
          onClick={handleVote}
          disabled={!selectedId || hasVoted || submitting}
          style={{
            padding: '14px 28px',
            borderRadius: 14,
            border: 'none',
            fontWeight: 800,
            background: !selectedId || hasVoted || submitting ? 'var(--border)' : 'var(--navy)',
            color: !selectedId || hasVoted || submitting ? 'var(--text-3)' : '#fff',
            cursor: !selectedId || hasVoted || submitting ? 'not-allowed' : 'pointer',
            boxShadow: !selectedId || hasVoted || submitting ? 'none' : 'var(--sh-blue)',
          }}
        >
          {submitting ? 'Submitting Vote...' : 'Confirm Vote'}
        </button>
      </div>
    </div>
  );
}
