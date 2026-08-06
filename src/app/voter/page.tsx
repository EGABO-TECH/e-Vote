export const dynamic = 'force-dynamic';

import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export default async function VoterDashboard() {
  const user = await currentUser();

  // Get the live/active election
  const { data: elections } = await supabaseAdmin
    .from("elections")
    .select("*")
    .in("status", ["live", "active"])
    .order("ends_at", { ascending: true })
    .limit(1);

  const activeElection = elections?.[0] ?? null;

  // Get live vote counts per candidate for the active election
  let candidates: { name: string; votes: number }[] = [];
  let totalVotes = 0;
  let voterHasVoted = false;
  let voterRecord: any = null;
  let totalVoters = 0;

  if (activeElection) {
    const [candidatesRes, votesRes, voterRes, totalVotersRes] = await Promise.all([
      supabaseAdmin
        .from("candidates")
        .select("id, full_name")
        .eq("election_id", activeElection.id)
        .eq("status", "approved"),
      supabaseAdmin
        .from("votes")
        .select("candidate_id")
        .eq("election_id", activeElection.id),
      user
        ? supabaseAdmin
            .from("voters")
            .select("id, voting_suspended")
            .eq("clerk_id", user.id)
            .single()
        : Promise.resolve({ data: null }),
      supabaseAdmin.from("voters").select("id", { count: "exact", head: true }),
    ]);

    totalVoters = totalVotersRes.count ?? 0;
    voterRecord = voterRes.data;
    const allVotes = votesRes.data ?? [];
    totalVotes = allVotes.length;

    const voteCounts: Record<string, number> = {};
    for (const v of allVotes) {
      voteCounts[v.candidate_id] = (voteCounts[v.candidate_id] || 0) + 1;
    }

    candidates = (candidatesRes.data ?? [])
      .map((c) => ({ name: c.full_name, votes: voteCounts[c.id] || 0 }))
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
      voterHasVoted = !!voteCheck;
    }
  }

  const turnoutPct =
    totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : "0.0";

  // Compute time remaining
  let timeLeft = "—";
  if (activeElection?.ends_at) {
    const diff = new Date(activeElection.ends_at).getTime() - Date.now();
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
      value: activeElection ? activeElection.status.toUpperCase() : "None",
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

      {/* Hero Election Card */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)",
          borderRadius: "var(--r-lg)",
          padding: "2.5rem",
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
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "120px",
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
          }}
        />
        <div>
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
                  Election Status · {activeElection.status.toUpperCase()}
                </span>
              </div>
              <h1
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
              <div
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
                  Closes:{" "}
                  <strong style={{ color: "#fff" }}>
                    {new Date(activeElection.ends_at).toLocaleString()}
                  </strong>
                </span>
              </div>
              {voterHasVoted ? (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    background: "var(--green)",
                    color: "#fff",
                    borderRadius: "var(--r-md)",
                    fontWeight: 800,
                    fontSize: "1rem",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    check_circle
                  </span>
                  Ballot Cast — Thank you!
                </div>
              ) : (
                <Link
                  href="/voter/active-election"
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
                  Cast Your Ballot
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
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "6rem", opacity: 0.15, userSelect: "none", flexShrink: 0 }}
        >
          how_to_vote
        </span>
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
              Live Results Preview
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
              {totalVotes.toLocaleString()} votes cast
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
                          {c.name[0]}
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
                          {pct}%
                        </span>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-3)",
                          }}
                        >
                          {c.votes.toLocaleString()} votes
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
