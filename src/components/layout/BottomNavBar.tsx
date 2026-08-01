"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navConfig = {
  admin: [
    { name: "Dashboard", shortLabel: "Home", href: "/admin", icon: "dashboard" },
    { name: "Election", shortLabel: "Election", href: "/admin/election-config", icon: "how_to_vote" },
    { name: "Sync", shortLabel: "Sync", href: "/admin/offline-sync", icon: "sync_alt" },
    { name: "Logs", shortLabel: "Logs", href: "/admin/audit-logs", icon: "receipt_long" },
    { name: "Users", shortLabel: "Users", href: "/admin/users", icon: "group" },
    { name: "Settings", shortLabel: "Settings", href: "/admin/settings", icon: "settings" },
  ],
  voter: [
    { name: "Dashboard", shortLabel: "Home", href: "/voter", icon: "dashboard" },
    { name: "Vote", shortLabel: "Vote", href: "/voter/active-election", icon: "how_to_vote" },
    { name: "Receipt", shortLabel: "Receipt", href: "/voter/verification-receipt", icon: "receipt_long" },
    { name: "Help", shortLabel: "Help", href: "/voter/help-centre", icon: "help" },
    { name: "Settings", shortLabel: "Settings", href: "/voter/settings", icon: "settings" },
  ],
  candidate: [
    { name: "Home", shortLabel: "Home", href: "/candidate", icon: "dashboard" },
    { name: "Profile", shortLabel: "Profile", href: "/candidate/profile", icon: "person" },
    { name: "Campaign", shortLabel: "Campaign", href: "/candidate/campaign", icon: "campaign" },
    { name: "Results", shortLabel: "Results", href: "/candidate/results", icon: "bar_chart" },
  ],
  ec: [
    { name: "Home", shortLabel: "Home", href: "/ec", icon: "dashboard" },
    { name: "Elections", shortLabel: "Elections", href: "/ec/elections", icon: "how_to_vote" },
    { name: "Reports", shortLabel: "Reports", href: "/ec/reports", icon: "bar_chart" },
    { name: "Support", shortLabel: "Support", href: "/ec/support", icon: "help" },
  ],
  auditor: [
    { name: "Dashboard", shortLabel: "Home", href: "/auditor", icon: "dashboard" },
    { name: "Logs", shortLabel: "Logs", href: "/auditor/logs", icon: "receipt_long" },
    { name: "Reports", shortLabel: "Reports", href: "/auditor/reports", icon: "bar_chart" },
    { name: "Settings", shortLabel: "Settings", href: "/auditor/settings", icon: "settings" },
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
      paddingBottom: "max(10px, env(safe-area-inset-bottom))",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
        width: "100%",
        padding: "8px 10px 6px",
        gap: "4px",
        alignItems: "stretch",
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const label = item.shortLabel ?? item.name;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                padding: "6px 4px 5px",
                borderRadius: "12px",
                textDecoration: "none",
                minHeight: "52px",
                color: isActive ? "var(--blue)" : "var(--text-3)",
                background: isActive ? "var(--surface-3)" : "transparent",
                fontWeight: isActive ? 700 : 500,
                transition: "all 0.15s",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  lineHeight: 1,
                  fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0',
                }}
              >
                {item.icon}
              </span>
              <span style={{
                fontSize: "9px",
                lineHeight: 1.2,
                fontWeight: "inherit",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
