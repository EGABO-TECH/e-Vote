"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
};

function getRole(pathname: string) {
  if (pathname.startsWith("/voter")) return "voter";
  if (pathname.startsWith("/admin")) return "admin";
  return "admin";
}

export default function SideNavBar() {
  const pathname = usePathname();
  const role = getRole(pathname);
  const navItems = navConfig[role];

  return (
    <aside className="hidden lg:flex lg:flex-col h-screen w-64 fixed left-0 top-0 bg-primary-container text-on-primary py-8 shadow-xl z-50 overflow-y-auto border-r border-white/5">
      {/* Brand Identity */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <img
          alt="eVote Logo"
          className="h-10 w-auto flex-shrink-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeApBuNkcIfWbqQA7kHTE5OLuJNROKAvUiAI_7m7g8njlUAm0Qfxt18G8Q36jvR-a-qaxDaHmyR3b3nnzhX6UzAod5CinulfyYHyFkxP4W49YNca-t4LsCDChlBRhXxOJnMwWksg7KDiaMg4CZtisr97RfzAO2lr0ekF22TGXmKl0HBnH8q1gjQ7xSHgZs2LmdkUDMYZ4tvpZ4ovoBhHsXnZQrXPlTVDKFEwXamomwSdgDAo3rgqSjD4A2aQbxDuFr1JBFtBw3wqI"
        />
        <div>
          <h1 className="text-headline-md font-bold text-on-primary leading-none">
            e-Vote
          </h1>
          <p className="text-label-md text-on-primary-container mt-0.5">
            Cavendish
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-out group ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                  : "text-primary-fixed-dim hover:bg-white/10 hover:text-white hover:translate-x-1"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] flex-shrink-0 transition-all"
                style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}
              >
                {item.icon}
              </span>
              <span className="text-label-md leading-tight">{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="px-3 mt-6 pt-6 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-error rounded-lg hover:bg-error/10 hover:translate-x-1 transition-all duration-200 font-bold">
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span className="text-label-md">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
