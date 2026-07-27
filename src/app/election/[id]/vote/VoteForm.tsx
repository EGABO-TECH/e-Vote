'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { castVoteAction } from './actions';
import styles from './page.module.css';

type Candidate = {
  id: string;
  name: string;
  manifesto: string | null;
  photo_url: string | null;
};

export default function VoteForm({ 
  electionId, 
  candidates 
}: { 
  electionId: string, 
  candidates: Candidate[] 
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleVote = async () => {
    if (!selectedId) return;
    
    // Quick confirmation to prevent accidental votes
    if (!window.confirm("Are you sure? You cannot change your vote after casting it.")) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await castVoteAction(electionId, selectedId);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // The server action revalidates the path, but we can also refresh the router to show the "already voted" state
      router.refresh();
    }
  };

  return (
    <div>
      {error && (
        <div style={{ padding: '16px', background: 'var(--red-bg)', border: '1px solid var(--red)', color: 'var(--red)', borderRadius: 'var(--r-sm)', marginBottom: '24px', fontSize: '.875rem' }}>
          {error}
        </div>
      )}

      <div className={styles.candidatesGrid}>
        {candidates.map((c) => (
          <div 
            key={c.id} 
            className={styles.candidateCard}
            data-selected={selectedId === c.id}
            onClick={() => setSelectedId(c.id)}
          >
            <div className={styles.radioCircle}>
              <div className={styles.radioInner} />
            </div>
            <div className={styles.avatar}>
              {c.photo_url ? (
                <img src={c.photo_url} alt={c.name} />
              ) : (
                c.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{c.name}</div>
              {c.manifesto && <div className={styles.manifesto}>{c.manifesto}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.submitWrap}>
        <div className={styles.submitHint}>
          {selectedId ? "Ready to securely cast your vote." : "Please select a candidate to continue."}
        </div>
        <div style={{ width: '200px' }}>
          <button 
            className="btn-p" 
            disabled={!selectedId || isSubmitting}
            onClick={handleVote}
          >
            {isSubmitting ? (
              <><div className="spinner" style={{ width: '14px', height: '14px' }}/> Casting...</>
            ) : (
              "Cast Vote"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
