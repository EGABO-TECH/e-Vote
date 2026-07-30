import Link from "next/link";

export default function VoterDashboard() {
  const stats = [
    { label: "My Status", value: "Eligible", icon: "verified", color: "var(--green)" },
    { label: "Election", value: "LIVE", icon: "how_to_vote", color: "var(--blue)" },
    { label: "Time Left", value: "3h 26m", icon: "schedule", color: "var(--amber)" },
    { label: "Turnout", value: "67.4%", icon: "group", color: "var(--navy-mid)" },
  ];

  const candidates = [
    { name: "John Okello", position: "Guild President", votes: 1240, img: null },
    { name: "Sarah Namukasa", position: "Guild President", votes: 1108, img: null },
    { name: "Daniel Atim", position: "Guild President", votes: 893, img: null },
  ];
  const totalVotes = candidates.reduce((s, c) => s + c.votes, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Hero Election Card */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)",
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
      }}>
        <div style={{ position: "absolute", top: "-80px", right: "120px", width: "300px", height: "300px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", background: "rgba(22,163,74,0.25)", borderRadius: "999px", border: "1px solid rgba(22,163,74,0.5)", marginBottom: "1rem" }}>
            <span style={{ width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%", animation: "pulse-dot 1.5s infinite" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Election Status · LIVE</span>
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.75rem", maxWidth: "480px" }}>
            2026 Student Guild Presidential Election
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>schedule</span>
              Closes in: <strong style={{ color: "#fff" }}>03:26:32</strong>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>group</span>
              Open to all Undergraduate Students
            </span>
          </div>
          <Link href="/voter/active-election" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 28px",
            background: "var(--blue)", color: "#fff",
            borderRadius: "var(--r-md)", fontWeight: 800, fontSize: "1rem",
            textDecoration: "none", letterSpacing: "0.02em",
            boxShadow: "var(--sh-blue)",
            transition: "all 0.2s",
          }}>
            Cast Your Ballot
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>
          </Link>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: "6rem", opacity: 0.15, userSelect: "none", flexShrink: 0 }}>how_to_vote</span>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1rem" }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: "var(--surface)",
            borderRadius: "var(--r-lg)",
            padding: "1.25rem 1.5rem",
            border: "1px solid var(--border)",
            boxShadow: "var(--sh-sm)",
            display: "flex", alignItems: "center", gap: "14px",
          }}>
            <div style={{
              width: "42px", height: "42px",
              borderRadius: "var(--r-md)",
              background: s.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#fff", fontVariationSettings: '"FILL" 1' }}>{s.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Live results + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>

        {/* Live Results */}
        <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-1)" }}>Live Results Preview</p>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Guild President</span>
          </div>
          <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {candidates.map((c, i) => {
              const pct = Math.round((c.votes / totalVotes) * 100);
              return (
                <div key={c.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: i === 0 ? "var(--blue)" : "var(--surface-2)",
                        border: "2px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.75rem", fontWeight: 800,
                        color: i === 0 ? "#fff" : "var(--text-2)",
                      }}>
                        {c.name[0]}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-1)" }}>{c.name}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.95rem", color: i === 0 ? "var(--blue)" : "var(--text-1)" }}>{pct}%</span>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-3)" }}>{c.votes.toLocaleString()} votes</p>
                    </div>
                  </div>
                  <div style={{ height: "8px", background: "var(--surface-2)", borderRadius: "999px", overflow: "hidden", border: "1px solid var(--border)" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: i === 0 ? "var(--blue)" : "var(--border-mid)", borderRadius: "999px", transition: "width 0.6s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", boxShadow: "var(--sh-sm)" }}>
            <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-1)", marginBottom: "1rem" }}>My Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Cast Your Vote", icon: "how_to_vote", href: "/voter/active-election", primary: true },
                { label: "View My Receipt", icon: "receipt_long", href: "/voter/verification-receipt", primary: false },
                { label: "Election Rules", icon: "article", href: "/voter/rules", primary: false },
                { label: "Help Centre", icon: "help", href: "/voter/help-centre", primary: false },
              ].map((a) => (
                <a key={a.href} href={a.href} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "var(--r-sm)",
                  textDecoration: "none",
                  fontWeight: 600, fontSize: "0.875rem",
                  background: a.primary ? "var(--navy)" : "var(--surface-2)",
                  color: a.primary ? "#fff" : "var(--text-1)",
                  border: a.primary ? "none" : "1px solid var(--border)",
                  transition: "all 0.15s",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px", fontVariationSettings: '"FILL" 1' }}>{a.icon}</span>
                  {a.label}
                </a>
              ))}
            </div>
          </div>

          {/* Verification notice */}
          <div style={{
            background: "var(--green-bg)", border: "1px solid var(--green-bdr)",
            borderRadius: "var(--r-lg)", padding: "1.25rem",
          }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--green)", fontVariationSettings: '"FILL" 1', flexShrink: 0 }}>verified</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--green)" }}>Your identity is verified</p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-2)", marginTop: "3px", lineHeight: 1.5 }}>You are eligible to vote in this election. Your ballot is anonymous and encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
