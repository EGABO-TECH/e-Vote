"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerConfig = {
  admin: {
    title: "eVote Admin",
    description: "Secure administrative governance for Cavendish University elections.",
    links: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/election-config", label: "Election Configuration" },
      { href: "/admin/offline-sync", label: "Offline Sync" },
      { href: "/admin/users", label: "Users & Roles" },
      { href: "/admin/audit-logs", label: "Audit Logs" },
      { href: "/admin/rules#privacy", label: "Privacy Policy" },
      { href: "/admin/rules#terms", label: "Terms of Service" },
    ],
  },
  voter: {
    title: "eVote Voter",
    description: "Student voting portal for Cavendish University elections.",
    links: [
      { href: "/voter", label: "Dashboard" },
      { href: "/voter/active-election", label: "Active Election" },
      { href: "/voter/verification-receipt", label: "Verification Receipt" },
      { href: "/voter/help-centre", label: "Help Centre" },
      { href: "/voter/settings", label: "Settings" },
      { href: "/voter/rules#privacy", label: "Privacy Policy" },
      { href: "/voter/rules#terms", label: "Terms of Service" },
    ],
  },
};

function getRole(pathname: string) {
  if (pathname.startsWith("/voter")) return "voter";
  if (pathname.startsWith("/admin")) return "admin";
  return "admin";
}

export default function Footer() {
  const pathname = usePathname();
  const role = getRole(pathname);
  const { title, description, links } = footerConfig[role];

  return (
    <footer className="mt-12 border-t border-outline-variant/20 pt-10 pb-28 lg:pb-8 px-4 md:px-8 lg:px-margin-desktop bg-surface dark:bg-surface-dim w-full">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-10">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-extrabold text-xl">
              <span className="material-symbols-outlined text-[28px]">
                admin_panel_settings
              </span>
              eVote Admin
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
              Secure, transparent, and integrity-assured administrative governance for Cavendish University electoral operations.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-on-primary-container italic bg-primary-container/10 w-fit px-3 py-2 rounded-full border border-primary/20 shadow-sm mt-1">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              <span className="font-medium">Authorized by the University Electoral Commission</span>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-1 opacity-60">
              Quick Links
            </h4>
            {links.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-1 opacity-60">
              Policies
            </h4>
            {links.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-outline font-medium">
            © 2026 eVote Cavendish University Uganda. All Rights Reserved.
          </p>
          <p className="text-xs text-outline flex items-center gap-1.5 font-medium">
            Built with{" "}
            <span
              className="material-symbols-outlined text-[13px] text-error"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              favorite
            </span>{" "}
            for secure elections
          </p>
        </div>
      </div>
    </footer>
  );
}
