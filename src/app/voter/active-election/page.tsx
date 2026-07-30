"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const SECONDARY_ELECTIONS = [
  {
    id: 1,
    status: "Upcoming",
    statusColor: "var(--surface-3)",
    statusText: "var(--blue)",
    timeLabel: "Opens in 2 Days",
    title: "Faculty of Law: Representative",
    description: "Electing the student representatives for the Faculty Board for the 2026/27 session.",
    action: "view-candidates",
    candidateImgs: [
      "/logo.svg",
      "/logo.svg",
    ],
    extraCandidates: "+4",
    progress: null,
  },
  {
    id: 2,
    status: "Ongoing",
    statusColor: "var(--surface-2)",
    statusText: "var(--text-2)",
    timeLabel: "Ends tomorrow",
    title: "Sports Committee: Chairperson",
    description: "Direct election for the head of university sports and extracurricular coordinating committee.",
    action: "vote",
    candidateImgs: [],
    extraCandidates: null,
    progress: 78,
  },
];

export default function ActiveElection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Upcoming" | "Ongoing">("All");

  const filteredElections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SECONDARY_ELECTIONS.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q);
      const matchesFilter = filterStatus === "All" || e.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
      {/* Header Section */}
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
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {(["All", "Upcoming", "Ongoing"] as const).map((f) => (
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
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {/* Featured Election Card (Hero) */}
        <div style={{ gridColumn: '1 / -1', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', position: 'relative', boxShadow: 'var(--sh-sm)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 32 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--blue)', color: '#fff', borderRadius: 99, fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>fiber_manual_record</span>
                  Active Now
                </span>
                <span style={{ padding: '6px 16px', background: 'var(--surface-2)', color: 'var(--text-2)', borderRadius: 99, fontWeight: 700, fontSize: 14 }}>
                  Ends in 4h 22m
                </span>
              </div>
              <img
                style={{ width: 96, height: 96, objectFit: 'contain' }}
                alt="Student Guild Presidential Election Icon"
                src="/logo.svg"
              />
            </div>
            <h4 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-1)', marginBottom: 24, maxWidth: 800, lineHeight: 1.1 }}>
              2026 Student Guild Presidential Election
            </h4>
            <p style={{ fontSize: 18, color: 'var(--text-2)', marginBottom: 32, maxWidth: 600, lineHeight: 1.6 }}>
              Cast your vote for the next President of the Student Guild. Ensure
              your voice is heard in this critical election determining the
              leadership for the upcoming academic biennium.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>
                  Start Date
                </p>
                <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
                  Oct 12, 2026 • 08:00 AM
                </p>
              </div>
              <button style={{ padding: '16px 32px', background: 'var(--blue)', color: '#fff', fontWeight: 700, borderRadius: 12, border: 'none', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: 'var(--sh-blue)' }}>
                <span style={{ fontSize: 16 }}>Cast Your Ballot</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>how_to_vote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats/System Health Card */}
        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{ background: 'var(--blue)', color: '#fff', padding: 24, borderRadius: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'var(--sh-blue)' }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, marginBottom: 16 }}>verified_user</span>
              <h5 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, margin: 0 }}>Supabase Secured</h5>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: '8px 0 24px 0', lineHeight: 1.5 }}>
                Your vote is encrypted and stored on a secured ledger, ensuring 100% tamper-proof results.
              </p>
              <Link href="/voter/rules" style={{ fontSize: 14, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                Learn about security
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </Link>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--text-1)', color: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined">history</span>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Last Action</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                Verified receipt
                <span style={{ padding: '2px 8px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--blue)', fontFamily: 'monospace', fontSize: 12 }}>#8292-X</span>
              </p>
            </div>
          </div>
        </div>

        {/* Filtered election cards */}
        {filteredElections.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--text-3)', marginBottom: 16 }}>search_off</span>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 8px 0' }}>No elections found</h4>
            <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
              No elections match "{searchQuery}".{" "}
              <button onClick={() => { setSearchQuery(""); setFilterStatus("All"); }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <>
            {filteredElections.map((election) => (
              <div key={election.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--sh-sm)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700, background: election.statusColor, color: election.statusText }}>
                    {election.status}
                  </span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', margin: 0 }}>{election.timeLabel}</p>
                </div>
                <h5 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 8px 0', lineHeight: 1.3 }}>{election.title}</h5>
                <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 24px 0', lineHeight: 1.5, flex: 1 }}>{election.description}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  {election.action === "view-candidates" ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {election.candidateImgs.map((src, i) => (
                          <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--surface)', background: 'var(--surface-2)', overflow: 'hidden', marginLeft: i > 0 ? -8 : 0 }}>
                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={src} alt="candidate" />
                          </div>
                        ))}
                        {election.extraCandidates && (
                          <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--surface)', background: 'var(--text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', marginLeft: -8 }}>
                            {election.extraCandidates}
                          </div>
                        )}
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4 }}>
                        View Candidates
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ flex: 1, background: 'var(--surface-2)', height: 8, borderRadius: 99, overflow: 'hidden', marginRight: 16 }}>
                        <div style={{ background: 'var(--blue)', height: '100%', width: `${election.progress}%` }}></div>
                      </div>
                      <button style={{ padding: '8px 16px', background: 'var(--text-1)', color: 'var(--surface)', borderRadius: 8, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                        Vote
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* View Election Calendar card */}
            <div style={{ background: 'var(--surface)', border: '2px dashed var(--border)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', marginBottom: 12 }}>
                <span className="material-symbols-outlined">event_note</span>
              </div>
              <h5 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 4px 0' }}>View Election Calendar</h5>
              <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>See all scheduled votes for 2026</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
