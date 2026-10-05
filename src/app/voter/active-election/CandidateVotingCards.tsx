'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { castVoteAction } from '@/app/election/[id]/vote/actions';

export type CandidateCardData = {
  id: string;
  name: string;
  position: string;
  slogan: string;
  statement: string;
  manifesto: string;
  goals: string;
  image_url: string | null;
};

export function CandidateVotingCards({
  electionId,
  title,
  description,
  bannerUrl,
  candidates,
  hasVoted,
  voterError,
  canVote,
  votingOpensAt,
}: {
  electionId: string;
  title: string;
  description: string | null;
  bannerUrl: string | null;
  candidates: CandidateCardData[];
  hasVoted: boolean;
  voterError: string | null;
  canVote: boolean;
  votingOpensAt: string;
}) {
  const router = useRouter();
  const [submittingCandidateId, setSubmittingCandidateId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalCandidates = useMemo(() => candidates.length, [candidates.length]);

  const handleVote = async (candidate: CandidateCardData) => {
    if (!canVote || hasVoted || submitting || voterError) return;
    if (!window.confirm(`Cast your one vote for ${candidate.name}? This cannot be changed.`)) return;

    setSubmitting(true);
    setSubmittingCandidateId(candidate.id);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await castVoteAction(electionId, candidate.id);

      if ('error' in result && result.error) {
        setError(result.error);
        return;
      }

      setSuccessMessage('Vote successfully recorded. Your verification receipt is now available.');
      router.replace('/voter/verification-receipt');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to record your vote.');
    } finally {
      setSubmitting(false);
      setSubmittingCandidateId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ position: 'relative', minHeight: 300, overflow: 'hidden', borderRadius: 20, background: 'linear-gradient(125deg, #142448 0%, #2453a6 58%, #22a39a 100%)', boxShadow: 'var(--sh-md)' }}>
        {bannerUrl && <img src={bannerUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(9,18,38,0.88) 0%, rgba(9,18,38,0.62) 52%, rgba(9,18,38,0.15) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, minHeight: 300, padding: '30px clamp(22px, 5vw, 52px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            <span style={{ padding: '7px 11px', border: '1px solid rgba(255,255,255,0.32)', borderRadius: 999, background: 'rgba(255,255,255,0.13)', fontWeight: 800, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{canVote ? 'Open for voting' : 'Upcoming election'}</span>
            <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: 650 }}>{totalCandidates} candidates</span>
          </div>
          <h2 style={{ maxWidth: 760, margin: 0, fontSize: 40, fontWeight: 900, lineHeight: 1.05 }}>{title}</h2>
          {description && <p style={{ maxWidth: 680, color: 'rgba(255,255,255,0.88)', fontSize: 15, lineHeight: 1.7, margin: '16px 0 0' }}>{description}</p>}
          <div style={{ marginTop: 22, padding: '8px 12px', borderRadius: 6, background: hasVoted || !canVote ? 'rgba(255,255,255,0.2)' : '#d9f99d', color: hasVoted || !canVote ? '#fff' : '#244315', fontSize: 12, fontWeight: 800 }}>
            {hasVoted ? 'Ballot cast' : canVote ? 'Your ballot is open' : `Voting opens ${votingOpensAt}`}
          </div>
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
          const isDisabled = !canVote || hasVoted || Boolean(voterError) || submitting;
          const isSubmittingThis = submittingCandidateId === candidate.id;

          return (
            <div
              key={candidate.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 12,
                boxShadow: 'var(--sh-sm)',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div style={{ position: 'relative', height: 190, overflow: 'hidden', borderRadius: 8, background: 'linear-gradient(125deg, #dce8f5, #b8ccde)' }}>
                  {candidate.image_url ? (
                    <img src={candidate.image_url} alt={`${candidate.name}, candidate portrait`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
                  ) : (
                    <div aria-label={`${candidate.name} portrait unavailable`} style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: '#17345b', fontSize: 48, fontWeight: 850 }}>
                      {candidate.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}
                    </div>
                  )}
                  <span style={{ position: 'absolute', left: 12, bottom: 12, padding: '6px 9px', borderRadius: 4, background: 'rgba(8,20,44,0.78)', color: '#fff', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>{candidate.position}</span>
                </div>

                <div>
                  <h3 style={{ fontSize: 21, fontWeight: 850, margin: '0 0 5px', color: 'var(--text-1)' }}>{candidate.name}</h3>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', margin: 0 }}>{candidate.slogan}</p>
                </div>

                {candidate.statement && <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>{candidate.statement}</p>}
                {candidate.goals && <div style={{ padding: '12px 14px', borderLeft: '3px solid var(--green)', background: 'var(--surface-2)' }}>
                  <p style={{ margin: '0 0 5px', color: 'var(--text-3)', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Promises and goals</p>
                  <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{candidate.goals}</p>
                </div>}
                <details style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <summary style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 750, cursor: 'pointer' }}>Read full manifesto</summary>
                  <p style={{ margin: '10px 0 0', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{candidate.manifesto}</p>
                </details>

                <button
                  disabled={isDisabled || submitting}
                  onClick={(event) => {
                    event.stopPropagation();
                    void handleVote(candidate);
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 16px',
                    fontWeight: 750,
                    fontSize: 14,
                    color: '#fff',
                    background: isDisabled ? 'var(--text-3)' : 'var(--blue)',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  {hasVoted ? 'Ballot already cast' : voterError ? 'Unavailable' : !canVote ? 'Voting not open' : isSubmittingThis ? 'Recording vote…' : `Vote for ${candidate.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
