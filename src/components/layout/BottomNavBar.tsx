"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/", icon: "dashboard" },
  { name: "Election", href: "/election-config", icon: "how_to_vote" },
  { name: "Sync", href: "/offline-sync", icon: "sync_alt" },
  { name: "Logs", href: "/audit-logs", icon: "receipt_long" },
  { name: "Users", href: "/users", icon: "group" },
  { name: "Settings", href: "/settings", icon: "settings" },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant bg-surface-container-lowest dark:bg-surface-dim shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.15)] lg:hidden overflow-x-auto">
      <div className="mx-auto flex min-w-max justify-around px-2 py-2 gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap min-w-[52px] ${
                isActive
                  ? "text-secondary bg-secondary/10"
                  : "text-on-surface-variant hover:text-secondary hover:bg-surface-container"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-all ${
                  isActive ? "text-secondary" : ""
                }`}
                style={
                  isActive
                    ? { fontVariationSettings: '"FILL" 1' }
                    : {}
                }
              >
                {item.icon}
              </span>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? "text-secondary" : ""}`}>
                {item.name}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-secondary rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
