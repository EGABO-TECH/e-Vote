"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ElectionListItem = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  starts_at: string | null;
  ends_at: string | null;
  hasVoted: boolean;
  candidateCount: number;
};

export default function ActiveElectionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Upcoming" | "Open">("All");
  const [elections, setElections] = useState<ElectionListItem[]>([]);
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
          setLoadError(payload?.error || 'Unable to load elections.');
          setElections([]);
          setLoading(false);
          return;
        }

        const formatted = (payload.elections || []).map((e: any) => ({
          ...e,
          candidateCount: e.candidates?.length ?? 0,
        }));
        setElections(formatted);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Unable to load elections.');
        setElections([]);
      } finally {
        setLoading(false);
      }
    };
    loadElections();
  }, []);

  const filteredElections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return elections.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q);
      const matchesFilter = filterStatus === 'All' || e.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [elections, filterStatus, searchQuery]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--text-3)', animation: 'spin 1s linear infinite', display: 'block', marginBottom: 16 }}>autorenew</span>
          <p style={{ color: 'var(--text-2)', fontWeight: 600 }}>Loading elections…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>

      {/* Header */}
      <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-1)', margin: '0 0 8px 0', lineHeight: 1.1 }}>
            Elections Portal
          </h1>
          <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-2)', margin: 0 }}>
            Select an active election to view candidates and cast your ballot.
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
                  padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
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

      {/* Error state */}
      {loadError && (
        <div style={{ background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: '16px 20px', fontWeight: 600 }}>
          {loadError}
        </div>
      )}

      {/* Election Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {filteredElections.length === 0 && !loadError ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--text-3)', marginBottom: 16, display: 'block' }}>search_off</span>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 8px 0' }}>No elections found</h4>
            <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
              {searchQuery
                ? <>No elections match "{searchQuery}". <button onClick={() => { setSearchQuery(""); setFilterStatus("All"); }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button></>
                : 'There are no active elections at this time. Check back later.'}
            </p>
          </div>
        ) : (
          filteredElections.map((election) => (
            <Link
              key={election.id}
              href={`/voter/active-election/${election.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                boxShadow: 'var(--sh-sm)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '100%',
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--sh-lg)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--blue)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--sh-sm)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                }}
              >
                {/* Status badge + voted indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{
                    padding: '5px 12px',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: election.status === 'Open' ? 'var(--green-bg)' : '#FEF3C7',
                    color: election.status === 'Open' ? 'var(--green)' : '#92400E',
                    border: `1px solid ${election.status === 'Open' ? 'var(--green-bdr)' : '#FCD34D'}`,
                  }}>
                    {election.status}
                  </span>
                  {election.hasVoted && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: '#EFF6FF', color: 'var(--blue)', borderRadius: 999, fontSize: 11, fontWeight: 700, border: '1px solid #BFDBFE' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>how_to_vote</span>
                      Voted
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-1)', margin: '0 0 8px', lineHeight: 1.2 }}>
                    {election.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {election.description || 'No description provided.'}
                  </p>
                </div>

                {/* Meta info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-3)', fontSize: 13, fontWeight: 600 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>groups</span>
                    {election.candidateCount} approved candidate{election.candidateCount !== 1 ? 's' : ''}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--blue)', fontWeight: 700, fontSize: 13 }}>
                    {election.hasVoted ? 'View Results' : 'Cast Ballot'}
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer integrity note */}
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
