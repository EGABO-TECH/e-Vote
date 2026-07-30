"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navConfig = {
  admin: [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Election", href: "/admin/election-config", icon: "how_to_vote" },
    { name: "Sync", href: "/admin/offline-sync", icon: "sync_alt" },
    { name: "Logs", href: "/admin/audit-logs", icon: "receipt_long" },
    { name: "Users", href: "/admin/users", icon: "group" },
    { name: "Settings", href: "/admin/settings", icon: "settings" },
  ],
  voter: [
    { name: "Dashboard", href: "/voter", icon: "dashboard" },
    { name: "Vote", href: "/voter/active-election", icon: "how_to_vote" },
    { name: "Receipt", href: "/voter/verification-receipt", icon: "receipt_long" },
    { name: "Help", href: "/voter/help-centre", icon: "help" },
    { name: "Settings", href: "/voter/settings", icon: "settings" },
  ],
  candidate: [
    { name: "Home", href: "/candidate", icon: "dashboard" },
    { name: "Profile", href: "/candidate/profile", icon: "person" },
    { name: "Campaign", href: "/candidate/campaign", icon: "campaign" },
    { name: "Results", href: "/candidate/results", icon: "bar_chart" },
  ],
  ec: [
    { name: "Home", href: "/ec", icon: "dashboard" },
    { name: "Elections", href: "/ec/elections", icon: "how_to_vote" },
    { name: "Reports", href: "/ec/reports", icon: "bar_chart" },
    { name: "Support", href: "/ec/support", icon: "help" },
  ],
  auditor: [
    { name: "Dashboard", href: "/auditor", icon: "dashboard" },
    { name: "Logs", href: "/auditor/logs", icon: "receipt_long" },
    { name: "Reports", href: "/auditor/reports", icon: "bar_chart" },
    { name: "Settings", href: "/auditor/settings", icon: "settings" },
  ],
};

type NavRole = keyof typeof navConfig;

function getRole(pathname: string): NavRole | null {
  if (pathname.startsWith("/voter")) return "voter";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/candidate")) return "candidate";
  if (pathname.startsWith("/ec")) return "ec";
  if (pathname.startsWith("/auditor")) return "auditor";
  return null;
}

export default function BottomNavBar() {
  const pathname = usePathname();
  const role = getRole(pathname);
  if (!role) return null;
  const navItems = navConfig[role];

  return (
    <nav className="mobile-only" style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      zIndex: 50,
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      boxShadow: "0 -4px 20px -10px rgba(0,0,0,0.15)",
      display: "flex",
      overflowX: "auto",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "6px 8px",
        width: "100%",
        minWidth: "max-content",
        gap: "4px",
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                padding: "6px 12px",
                borderRadius: "12px",
                textDecoration: "none",
                minWidth: "52px",
                color: isActive ? "var(--blue)" : "var(--text-3)",
                background: isActive ? "var(--surface-3)" : "transparent",
                fontWeight: isActive ? 700 : 500,
                transition: "all 0.15s",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "22px",
                  fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0',
                }}
              >
                {item.icon}
              </span>
              <span style={{ fontSize: "10px", fontWeight: "inherit", letterSpacing: "0.02em" }}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
