export default function AdminDashboard() {
  const stats = [
    { label: "Active Nodes", value: "124 / 128", sub: "96.8% Uptime", icon: "dns", color: "var(--blue)" },
    { label: "Throughput", value: "8,420 req/s", sub: "+12% Peak Surge", icon: "speed", color: "var(--green)" },
    { label: "Sync Queue", value: "42 payloads", sub: "Processing", icon: "cloud_sync", color: "var(--amber)" },
    { label: "Security", value: "AES-256", sub: "All nodes encrypted", icon: "verified_user", color: "var(--navy-mid)" },
  ];

  const nodes = [
    { id: "CU-SI-001", location: "Main Campus", latency: "12ms", lastSync: "Just now", status: "Verified" },
    { id: "CU-MC-042", location: "Mukono Campus", latency: "24ms", lastSync: "2m ago", status: "Verified" },
    { id: "CU-KGC-009", location: "Kingsgate Campus", latency: "—", lastSync: "14m ago", status: "Offline" },
  ];

  const statusColor = (s: string) =>
    s === "Verified" ? "var(--green)" : s === "Offline" ? "var(--red)" : "var(--amber)";
  const statusBg = (s: string) =>
    s === "Verified" ? "var(--green-bg)" : s === "Offline" ? "var(--red-bg)" : "var(--amber-bg)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Page Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)",
        borderRadius: "var(--r-lg)",
        padding: "2rem 2.5rem",
        color: "#fff",
        boxShadow: "var(--sh-lg)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "240px", height: "240px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--blue-glow)" }}>monitoring</span>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue-glow)" }}>
            Operations Center
          </span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
          Infrastructure Monitor
        </h1>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", maxWidth: "560px", lineHeight: 1.6 }}>
          Real-time operational oversight for the University Electoral Commission. Ensuring data integrity and terminal uptime across all active nodes.
        </p>
        {/* Live badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          marginTop: "1rem", padding: "5px 14px",
          background: "rgba(22,163,74,0.2)", borderRadius: "999px",
          border: "1px solid rgba(22,163,74,0.4)",
        }}>
          <span style={{ width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%", display: "inline-block", animation: "pulse-dot 1.5s infinite" }} />
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>Infrastructure Status: ONLINE</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: "var(--surface)",
            borderRadius: "var(--r-lg)",
            padding: "1.5rem",
            border: "1px solid var(--border)",
            boxShadow: "var(--sh-sm)",
            display: "flex", flexDirection: "column", gap: "8px",
            transition: "box-shadow 0.2s",
          }}>
            <div style={{
              width: "44px", height: "44px",
              borderRadius: "var(--r-md)",
              background: s.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "4px",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#fff", fontVariationSettings: '"FILL" 1' }}>
                {s.icon}
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
            <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-2)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Security Protocols + Node Table */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem" }}>

        {/* Security Panel */}
        <div style={{
          background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)",
          borderRadius: "var(--r-lg)",
          padding: "1.75rem",
          color: "#fff",
          boxShadow: "var(--sh-md)",
        }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue-glow)", marginBottom: "1.25rem" }}>
            Security Protocols
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { icon: "verified_user", title: "End-to-End Encryption", desc: "AES-256 active for all transit payloads." },
              { icon: "lan", title: "Mesh-Node Validation", desc: "P2P node verification cycles every 120ms." },
              { icon: "security_update_good", title: "Integrity Checks", desc: "Hash verification on every payload." },
            ].map((p) => (
              <div key={p.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--blue-glow)", flexShrink: 0, fontVariationSettings: '"FILL" 1' }}>{p.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.3 }}>{p.title}</p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/audit-logs" style={{
            display: "inline-block", marginTop: "1.5rem",
            padding: "8px 18px",
            background: "var(--blue)", color: "#fff",
            borderRadius: "var(--r-sm)", fontSize: "0.82rem", fontWeight: 700,
            textDecoration: "none", boxShadow: "var(--sh-blue)",
          }}>View Security Audit</a>
        </div>

        {/* Node Connectivity Table */}
        <div style={{
          background: "var(--surface)",
          borderRadius: "var(--r-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--sh-sm)",
          overflow: "hidden",
        }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-1)" }}>Node Connectivity Status</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ padding: "5px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "transparent", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "var(--text-2)", fontFamily: "inherit" }}>Filter</button>
              <button style={{ padding: "5px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "transparent", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "var(--text-2)", fontFamily: "inherit" }}>Export Logs</button>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ background: "var(--surface-2)" }}>
                  {["Node", "Location", "Latency", "Last Sync", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, fontSize: "0.72rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nodes.map((n, i) => (
                  <tr key={n.id} style={{ background: i % 2 === 0 ? "transparent" : "var(--surface-2)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--text-1)", fontFamily: "monospace" }}>{n.id}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-2)" }}>{n.location}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-2)" }}>{n.latency}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-2)" }}>{n.lastSync}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        padding: "3px 10px", borderRadius: "999px",
                        fontSize: "0.75rem", fontWeight: 700,
                        color: statusColor(n.status), background: statusBg(n.status),
                        border: `1px solid ${statusColor(n.status)}33`,
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusColor(n.status) }} />
                        {n.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button style={{
                        padding: "4px 12px", fontSize: "0.78rem", fontWeight: 600,
                        border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)",
                        background: "transparent", cursor: "pointer", color: "var(--blue)",
                        fontFamily: "inherit", transition: "all 0.15s",
                      }}>Diagnostic</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", padding: "1.5rem", boxShadow: "var(--sh-sm)" }}>
        <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-1)", marginBottom: "1rem" }}>Quick Actions</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            { label: "Configure Election", icon: "how_to_vote", href: "/admin/election-config" },
            { label: "Manage Users", icon: "group", href: "/admin/users" },
            { label: "View Audit Logs", icon: "receipt_long", href: "/admin/audit-logs" },
            { label: "Offline Sync", icon: "sync_alt", href: "/admin/offline-sync" },
            { label: "System Settings", icon: "settings", href: "/admin/settings" },
          ].map((a) => (
            <a key={a.href} href={a.href} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "9px 18px",
              background: "var(--surface-2)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-sm)",
              fontSize: "0.85rem", fontWeight: 600,
              color: "var(--text-1)",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-light)";
              (e.currentTarget as HTMLElement).style.color = "var(--blue)";
              (e.currentTarget as HTMLElement).style.background = "var(--surface-3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
              (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{a.icon}</span>
              {a.label}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
