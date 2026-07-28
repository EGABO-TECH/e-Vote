"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: "dashboard" },
    { name: "Active Election", href: "/active-election", icon: "how_to_vote" },
    { name: "My Verification Receipt", href: "/verification-receipt", icon: "receipt_long" },
    { name: "Help Centre", href: "/help-centre", icon: "help" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col h-screen w-64 fixed left-0 top-0 bg-primary-container surface-container-lowest text-on-primary-fixed surface py-stack-lg shadow-sm z-50">
      <div className="px-6 mb-stack-lg flex flex-col items-center text-center">
        <img
          alt="e-Vote Sidebar Logo"
          className="w-full h-auto max-h-16 object-contain mb-4"
          src="/assets/e-Vote-Logo.png"
        />
        <h1 className="text-headline-md font-headline-md font-bold text-on-primary">
          e-Vote
        </h1>
        <p className="font-label-md text-label-md opacity-70 dark:hidden">
          Cavendish University
        </p>
      </div>
      <nav className="flex-grow px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:translate-x-2 hover:shadow-md transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container font-bold hover:brightness-110"
                  : "text-on-primary-fixed-variant hover:text-white hover:bg-[#1e2a47]"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-error rounded-lg hover:bg-error-container/30 hover:text-red-500 hover:translate-x-2 hover:shadow-md transition-all duration-300 ease-out font-bold active:scale-95">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-md text-label-md">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
