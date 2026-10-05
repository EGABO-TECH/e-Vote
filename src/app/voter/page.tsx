export const dynamic = 'force-dynamic';

import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateVoterRecord, type VoterRecord } from "@/lib/voter-record";

export default async function VoterDashboard() {
  const user = await currentUser();
  const now = new Date().toISOString();

  // Keep the dashboard and election portal on the same currently-open elections.
  const { data: elections } = await supabaseAdmin
    .from("elections")
    .select("*")
    .in("status", ["live", "active"])
    .gte("ends_at", now)
    .order("starts_at", { ascending: true });

  const activeElections = elections ?? [];
  const nowTime = new Date(now).getTime();
  const runningElections = activeElections
    .filter((election) => new Date(election.starts_at).getTime() <= nowTime)
    .sort((a, b) => new Date(a.ends_at).getTime() - new Date(b.ends_at).getTime());
  const upcomingElections = activeElections
    .filter((election) => new Date(election.starts_at).getTime() > nowTime)
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
  const activeElection = runningElections[0] ?? upcomingElections[0] ?? null;
  const electionIsOpen = Boolean(activeElection
    && new Date(activeElection.starts_at) <= new Date(now)
    && new Date(activeElection.ends_at) > new Date(now));

  // Get live vote counts per candidate for the active election
  let candidates: { name: string; votes: number; photo_url: string | null }[] = [];
  let totalVotes = 0;
  let voterHasVoted = false;
  let voterRecord: VoterRecord | null = null;
  let voterAccountError: string | null = null;
  let totalVoters = 0;

  if (user) {
    const voterResult = await getOrCreateVoterRecord(user.id);
    voterRecord = voterResult.voter;
    voterAccountError = voterResult.error;
  }

  if (activeElection) {
    const [candidatesRes, votesRes, totalVotersRes] = await Promise.all([
      supabaseAdmin
        .from("candidates")
        .select("id, name, photo_url")
        .eq("election_id", activeElection.id)
        .eq("status", "approved"),
      supabaseAdmin
        .from("votes")
        .select("candidate_id")
        .eq("election_id", activeElection.id),
      supabaseAdmin.from("voters").select("id", { count: "exact", head: true }),
    ]);

    totalVoters = totalVotersRes.count ?? 0;
    const allVotes = votesRes.data ?? [];
    totalVotes = allVotes.length;

    const voteCounts: Record<string, number> = {};
    for (const v of allVotes) {
      voteCounts[v.candidate_id] = (voteCounts[v.candidate_id] || 0) + 1;
    }

    candidates = (candidatesRes.data ?? [])
      .map((c) => ({ name: c.name, photo_url: c.photo_url, votes: voteCounts[c.id] || 0 }))
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5);

    // Check if this voter has already voted
    if (voterRecord) {
      const { data: voteCheck } = await supabaseAdmin
        .from("votes")
        .select("id")
        .eq("election_id", activeElection.id)
        .eq("voter_id", voterRecord.id)
        .maybeSingle();
      const { data: registry } = await supabaseAdmin
        .from("voter_registry")
        .select("has_voted")
        .eq("election_id", activeElection.id)
        .eq("voter_id", voterRecord.id)
        .maybeSingle();
      voterHasVoted = !!voteCheck || Boolean(registry?.has_voted);
    }
  }

  const turnoutPct =
    totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : "0.0";

  // Compute time remaining
  let timeLeft = "—";
  if (activeElection?.ends_at) {
    const diff = new Date(activeElection.ends_at).getTime() - new Date(now).getTime();
    if (diff > 0) {
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      timeLeft = `${h}h ${m}m`;
    } else {
      timeLeft = "Closed";
    }
  }

  const stats = [
    {
      label: "My Status",
      value: voterRecord?.voting_suspended
        ? "Suspended"
        : voterHasVoted
        ? "Voted"
        : "Eligible",
      icon: voterRecord?.voting_suspended
        ? "block"
        : voterHasVoted
        ? "how_to_vote"
        : "verified",
      color: voterRecord?.voting_suspended
        ? "var(--red)"
        : voterHasVoted
        ? "var(--green)"
        : "var(--green)",
    },
    {
      label: "Election",
      value: activeElection ? electionIsOpen ? "LIVE" : "UPCOMING" : "None",
      icon: "how_to_vote",
      color: activeElection ? "var(--blue)" : "var(--text-3)",
    },
    {
      label: "Time Left",
      value: timeLeft,
      icon: "schedule",
      color: "var(--amber)",
    },
    {
      label: "Turnout",
      value: `${turnoutPct}%`,
      icon: "group",
      color: "var(--navy-mid)",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {voterAccountError && (
        <div role="alert" style={{ padding: '14px 18px', border: '1px solid #FECACA', borderRadius: 8, background: '#FEF2F2', color: '#991B1B', fontSize: 14, fontWeight: 650 }}>
          {voterAccountError}
        </div>
      )}

      {/* Hero Election Card */}
      <div
        className="voter-featured-election"
        data-has-banner={activeElection?.banner_url ? 'true' : 'false'}
        style={{
          background: "linear-gradient(125deg, #142448 0%, #2453a6 58%, #147b78 100%)",
          borderRadius: "var(--r-lg)",
          padding: "2.5rem",
          minHeight: 260,
          color: "#fff",
          boxShadow: "var(--sh-lg)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {activeElection?.banner_url && <img className="voter-featured-election__image" src={activeElection.banner_url} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <div className="voter-featured-election__overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(7,16,40,0.94) 0%, rgba(7,16,40,0.78) 55%, rgba(7,16,40,0.2) 100%)' }} />
        <div className="voter-featured-election__content" style={{ position: 'relative', zIndex: 1 }}>
          {activeElection ? (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  background: "rgba(22,163,74,0.25)",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,163,74,0.5)",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "var(--green)",
                    borderRadius: "50%",
                    animation: "pulse-dot 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Election Status · {electionIsOpen ? "LIVE" : "UPCOMING"}
                </span>
              </div>
              <h1
                className="voter-featured-election__title"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: "0.75rem",
                  maxWidth: "480px",
                }}
              >
                {activeElection.title}
              </h1>
              {activeElection.description && (
                <p className="voter-featured-election__description" style={{ maxWidth: 620, margin: '0 0 1.25rem', color: 'rgba(255,255,255,0.82)', fontSize: 15, lineHeight: 1.65 }}>
                  {activeElection.description}
                </p>
              )}
              <div
                className="voter-featured-election__timing"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    schedule
                  </span>
                  {electionIsOpen ? "Closes: " : "Opens: "}
                  <strong style={{ color: "#fff" }}>
                    {new Date(electionIsOpen ? activeElection.ends_at : activeElection.starts_at).toLocaleString()}
                  </strong>
                </span>
              </div>
              {voterHasVoted ? (
                <Link className="voter-featured-election__action" href={`/voter/active-election/${activeElection.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 20px', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 8, background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 750, textDecoration: 'none' }}>
                  Ballot cast · View candidates
                  <span className="material-symbols-outlined" style={{ fontSize: 19 }}>arrow_forward</span>
                </Link>
              ) : (
                <Link
                  className="voter-featured-election__action"
                  href={`/voter/active-election/${activeElection.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    background: "var(--blue)",
                    color: "#fff",
                    borderRadius: "var(--r-md)",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    boxShadow: "var(--sh-blue)",
                  }}
                >
                  {electionIsOpen ? "View candidates" : "Review candidates"}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    arrow_forward
                  </span>
                </Link>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  No Active Election
                </span>
              </div>
              <h1
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginBottom: "0.75rem",
                }}
              >
                No elections are currently active.
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>
                Check back when an election is scheduled by the Electoral
                Commission.
              </p>
            </>
          )}
        </div>
        {!activeElection?.banner_url && <span className="material-symbols-outlined" aria-hidden="true" style={{ position: 'relative', zIndex: 1, fontSize: '6rem', opacity: 0.18, userSelect: 'none', flexShrink: 0 }}>how_to_vote</span>}
      </div>

      {/* Stats Row — Real Data */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "1rem",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r-lg)",
              padding: "1.25rem 1.5rem",
              border: "1px solid var(--border)",
              boxShadow: "var(--sh-sm)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "var(--r-md)",
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  color: "#fff",
                  fontVariationSettings: '"FILL" 1',
                }}
              >
                {s.icon}
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  color: "var(--text-1)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activeElections.length > 1 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--text-1)', fontSize: 22, fontWeight: 850 }}>More active elections</h2>
              <p style={{ margin: '5px 0 0', color: 'var(--text-2)', fontSize: 14 }}>Explore each election and review its approved candidates.</p>
            </div>
            <Link href="/voter/active-election" style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 750, textDecoration: 'none' }}>All elections →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {activeElections.slice(1).map((election) => (
              <article key={election.id} style={{ overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--surface)', boxShadow: 'var(--sh-sm)' }}>
                <div style={{ position: 'relative', height: 150, background: 'linear-gradient(125deg, #142448 0%, #2453a6 58%, #147b78 100%)' }}>
                  {election.banner_url && <img src={election.banner_url} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(7,16,40,0.68), rgba(7,16,40,0.04))' }} />
                  <span style={{ position: 'absolute', left: 16, bottom: 14, color: '#fff', fontWeight: 800, fontSize: 11, textTransform: 'uppercase' }}>Live election</span>
                </div>
                <div style={{ padding: 18 }}>
                  <h3 style={{ margin: '0 0 8px', color: 'var(--text-1)', fontSize: 17, fontWeight: 800, lineHeight: 1.25 }}>{election.title}</h3>
                  <p style={{ minHeight: 44, margin: '0 0 14px', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.55 }}>{election.description || 'Review the election and meet the candidates.'}</p>
                  <Link href={`/voter/active-election/${election.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--blue)', fontSize: 13, fontWeight: 750, textDecoration: 'none' }}>
                    View candidates <span className="material-symbols-outlined" style={{ fontSize: 17 }}>arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Two columns: Live results + Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Live Results */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "var(--r-lg)",
            border: "1px solid var(--border)",
            boxShadow: "var(--sh-sm)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--text-1)",
              }}
            >
              {electionIsOpen ? "Live Results Preview" : "Candidate Preview"}
            </p>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {electionIsOpen ? `${totalVotes.toLocaleString()} votes cast` : "Voting has not opened"}
            </span>
          </div>
          <div
            style={{
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {candidates.length === 0 ? (
              <p
                style={{
                  color: "var(--text-3)",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                {activeElection
                  ? "No approved candidates yet."
                  : "No active election."}
              </p>
            ) : (
              candidates.map((c, i) => {
                const pct =
                  totalVotes > 0
                    ? Math.round((c.votes / totalVotes) * 100)
                    : 0;
                return (
                  <div key={c.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background:
                              i === 0 ? "var(--blue)" : "var(--surface-2)",
                            border: "2px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: i === 0 ? "#fff" : "var(--text-2)",
                          }}
                        >
                          {c.photo_url ? <img src={c.photo_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : c.name[0]}
                        </div>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color: "var(--text-1)",
                          }}
                        >
                          {c.name}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            color:
                              i === 0 ? "var(--blue)" : "var(--text-1)",
                          }}
                        >
                          {electionIsOpen ? `${pct}%` : "Candidate"}
                        </span>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-3)",
                          }}
                        >
                          {electionIsOpen ? `${c.votes.toLocaleString()} votes` : "View profile"}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        background: "var(--surface-2)",
                        borderRadius: "999px",
                        overflow: "hidden",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background:
                            i === 0 ? "var(--blue)" : "var(--border-mid)",
                          borderRadius: "999px",
                          transition: "width 0.6s",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r-lg)",
              border: "1px solid var(--border)",
              padding: "1.25rem 1.5rem",
              boxShadow: "var(--sh-sm)",
            }}
          >
            <p
              style={{
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--text-1)",
                marginBottom: "1rem",
              }}
            >
              My Actions
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                {
                  label: voterHasVoted ? "View My Vote" : "Cast Your Vote",
                  icon: "how_to_vote",
                  href: "/voter/active-election",
                  primary: true,
                },
                {
                  label: "View My Receipt",
                  icon: "receipt_long",
                  href: "/voter/verification-receipt",
                  primary: false,
                },
                {
                  label: "Election Rules",
                  icon: "article",
                  href: "/voter/rules",
                  primary: false,
                },
                {
                  label: "Help Centre",
                  icon: "help",
                  href: "/voter/help-centre",
                  primary: false,
                },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "var(--r-sm)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    background: a.primary ? "var(--navy)" : "var(--surface-2)",
                    color: a.primary ? "#fff" : "var(--text-1)",
                    border: a.primary ? "none" : "1px solid var(--border)",
                    transition: "all 0.15s",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "18px",
                      fontVariationSettings: '"FILL" 1',
                    }}
                  >
                    {a.icon}
                  </span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Verification notice */}
          <div
            style={{
              background: voterHasVoted ? "var(--green-bg)" : "var(--green-bg)",
              border: "1px solid var(--green-bdr)",
              borderRadius: "var(--r-lg)",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  color: "var(--green)",
                  fontVariationSettings: '"FILL" 1',
                  flexShrink: 0,
                }}
              >
                {voterHasVoted ? "check_circle" : "verified"}
              </span>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "var(--green)",
                  }}
                >
                  {voterHasVoted
                    ? "Your vote has been recorded"
                    : "Your identity is verified"}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-2)",
                    marginTop: "3px",
                    lineHeight: 1.5,
                  }}
                >
                  {voterHasVoted
                    ? "Thank you for participating. Your ballot is anonymous and encrypted."
                    : "You are eligible to vote. Your ballot is anonymous and encrypted."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
