import styles from './ElectionCard.module.css';
import type { Election } from '@/lib/supabase';

interface ElectionCardProps {
  election: Election;
}

export default function ElectionCard({ election }: ElectionCardProps) {
  // Simple format for the date
  const endsAt = new Date(election.ends_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        {election.status === 'live' ? (
          <div className={styles.liveBadge}>
            <span className={styles.dot} />
            Live
          </div>
        ) : (
          <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
            {election.status}
          </div>
        )}
        <span className={styles.meta}>Closes {endsAt}</span>
      </div>
      
      <div className={styles.title}>{election.title}</div>
      
      <div className={styles.info}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Cavendish University Uganda
      </div>
      
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>
    </div>
  );
}
