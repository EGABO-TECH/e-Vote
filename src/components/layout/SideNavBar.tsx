"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const navConfig = {
  admin: [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Election Configuration", href: "/admin/election-config", icon: "how_to_vote" },
    { name: "Offline Sync Management", href: "/admin/offline-sync", icon: "sync_alt" },
    { name: "System Audit Logs", href: "/admin/audit-logs", icon: "receipt_long" },
    { name: "User & Role Management", href: "/admin/users", icon: "group" },
    { name: "Settings", href: "/admin/settings", icon: "settings" },
    { name: "Rules", href: "/admin/rules", icon: "article" },
  ],
  voter: [
    { name: "Dashboard", href: "/voter", icon: "dashboard" },
    { name: "Active Election", href: "/voter/active-election", icon: "how_to_vote" },
    { name: "Verification Receipt", href: "/voter/verification-receipt", icon: "receipt_long" },
    { name: "Help Centre", href: "/voter/help-centre", icon: "help" },
    { name: "Settings", href: "/voter/settings", icon: "settings" },
    { name: "Rules", href: "/voter/rules", icon: "article" },
  ],
  candidate: [
    { name: "Dashboard", href: "/candidate", icon: "dashboard" },
    { name: "Public Profile", href: "/candidate/preview", icon: "person" },
    { name: "Manifesto", href: "/candidate/manifesto", icon: "campaign" },
    { name: "Support", href: "/candidate/support", icon: "help" },
    { name: "Settings", href: "/candidate/settings", icon: "settings" },
  ],
  ec: [
    { name: "Dashboard", href: "/ec", icon: "dashboard" },
    { name: "Elections", href: "/ec/elections", icon: "how_to_vote" },
    { name: "Candidates", href: "/ec/candidates", icon: "how_to_reg" },
    { name: "Results", href: "/ec/results", icon: "bar_chart" },
    { name: "Support", href: "/ec/support", icon: "help" },
    { name: "Settings", href: "/ec/settings", icon: "settings" },
  ],
  auditor: [
    { name: "Dashboard", href: "/auditor", icon: "dashboard" },
    { name: "Audit Logs", href: "/auditor/logs", icon: "receipt_long" },
    { name: "Reports", href: "/auditor/reports", icon: "bar_chart" },
    { name: "Settings", href: "/auditor/settings", icon: "settings" },
  ],
};

type NavRole = keyof typeof navConfig;

function getRole(pathname: string): NavRole {
  if (pathname.startsWith("/voter")) return "voter";
  if (pathname.startsWith("/candidate")) return "candidate";
  if (pathname.startsWith("/ec")) return "ec";
  if (pathname.startsWith("/auditor")) return "auditor";
  return "admin";
}

export default function SideNavBar() {
  const pathname = usePathname();
  const role = getRole(pathname);
  const navItems = navConfig[role];
  const { signOut } = useClerk();

  return (
    <aside className="desktop-only" style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "256px",
      position: "fixed",
      left: 0,
      top: 0,
      background: "var(--navy)",
      color: "#fff",
      padding: "2rem 0",
      boxShadow: "var(--sh-lg)",
      zIndex: 50,
      overflowY: "auto",
      borderRight: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Brand Identity */}
      <div style={{ padding: "0 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          alt="eVote Logo"
          style={{ height: "40px", width: "auto", flexShrink: 0 }}
          src="/logo.jpeg"
        />
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>
            e-Vote
          </h1>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
            Cavendish
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flexGrow: 1, padding: "0 0.75rem", display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "/voter" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 16px",
                borderRadius: "var(--r-md)",
                textDecoration: "none",
                transition: "all 0.2s var(--ease)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.875rem",
                background: isActive ? "var(--blue)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                boxShadow: isActive ? "var(--sh-blue)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(3px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                }
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  flexShrink: 0,
                  fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0',
                }}
              >
                {item.icon}
              </span>
              <span style={{ lineHeight: 1.3 }}>{item.name}</span>
              {isActive && (
                <span style={{
                  marginLeft: "auto",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  flexShrink: 0,
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div style={{ padding: "0 0.75rem", marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: "var(--r-md)",
            color: "var(--red)",
            fontWeight: 700,
            fontSize: "0.875rem",
            fontFamily: "inherit",
            transition: "all 0.2s var(--ease)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.1)";
            (e.currentTarget as HTMLElement).style.transform = "translateX(3px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>logout</span>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
