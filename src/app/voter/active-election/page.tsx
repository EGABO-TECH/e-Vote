"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CandidateVotingCards } from "./CandidateVotingCards";

export type ElectionCardData = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  candidates: Array<{
    id: string;
    name: string;
    slogan: string;
    manifesto: string;
    image_url: string;
  }>;
  hasVoted: boolean;
};

export default function ActiveElection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Upcoming" | "Open">("All");
  const [elections, setElections] = useState<ElectionCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadElections = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const response = await fetch('/api/voter/active-elections', { cache: 'no-store' });
        const payload = await response.json();

        if (!response.ok || payload?.error) {
          setElections([]);
          setLoadError(payload?.error || 'Unable to load elections.');
          setLoading(false);
          return;
        }

        setElections(payload.elections || []);
      } catch (error) {
        setElections([]);
        setLoadError(error instanceof Error ? error.message : 'Unable to load elections.');
      } finally {
        setLoading(false);
      }
    };

    loadElections();
  }, []);

  const filteredElections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return elections.filter((election) => {
      const matchesSearch =
        !q ||
        election.title.toLowerCase().includes(q) ||
        (election.description || '').toLowerCase().includes(q) ||
        election.status.toLowerCase().includes(q);
      const matchesFilter = filterStatus === 'All' || election.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [elections, filterStatus, searchQuery]);

  if (loading) {
    return <div style={{ padding: 32, fontWeight: 700, color: 'var(--text-2)' }}>Loading active elections…</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
      <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-1)', margin: '0 0 8px 0', lineHeight: 1.1 }}>
            Elections Portal
          </h1>
          <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-2)', margin: 0 }}>
            Securely exercise your right to shape the future of our campus.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, background: 'var(--surface-2)', padding: 6, borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: 18, pointerEvents: 'none' }}>
              search
            </span>
            <input
              style={{ width: '100%', padding: '10px 32px 10px 36px', background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: 'var(--text-1)' }}
              placeholder="Find an election..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {(['All', 'Upcoming', 'Open'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  background: filterStatus === f ? 'var(--blue)' : 'transparent',
                  color: filterStatus === f ? '#fff' : 'var(--text-2)',
                  transition: 'all 0.2s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {filteredElections.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--text-3)', marginBottom: 16 }}>search_off</span>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 8px 0' }}>No elections found</h4>
            <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
              No elections match “{searchQuery}”.{' '}
              <button onClick={() => { setSearchQuery(""); setFilterStatus("All"); }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          filteredElections.map((election) => (
            <div key={election.id} style={{ gridColumn: '1 / -1', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--sh-sm)', padding: 24 }}>
                  <CandidateVotingCards
                electionId={election.id}
                title={election.title}
                description={election.description}
                candidates={election.candidates}
                hasVoted={Boolean(election.hasVoted)}
              />
            </div>
          ))
        )}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--sh-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--blue)' }}>shield</span>
          <p style={{ margin: 0, fontWeight: 800 }}>Election Integrity</p>
        </div>
        <p style={{ margin: 0, color: 'var(--text-2)', lineHeight: 1.7 }}>
          Your ballot remains anonymous while your receipt proves participation. Only the election committee can audit the public tally without identifying the voter.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/voter/verification-receipt" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'none' }}>
            View receipt ledger →
          </Link>
        </div>
      </div>
    </div>
  );
}
