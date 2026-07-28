import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-outline-variant/20 pt-10 pb-28 lg:pb-8 px-4 md:px-8 lg:px-margin-desktop bg-surface dark:bg-surface-dim w-full">
      <div className="max-w-container-max mx-auto">
        {/* Main grid — 1 col on mobile, 2 col on tablet, 3 col on desktop */}
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

          {/* Administration Links */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-1 opacity-60">
              Administration
            </h4>
            <Link href="/" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Dashboard
            </Link>
            <Link href="/election-config" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Election Configuration
            </Link>
            <Link href="/offline-sync" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Offline Sync
            </Link>
          </div>

          {/* System & Legal */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-1 opacity-60">
              System & Legal
            </h4>
            <Link href="/users" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Users & Roles
            </Link>
            <Link href="/audit-logs" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              System Audit Logs
            </Link>
            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-outline-variant/20">
              <Link href="/rules#privacy" className="text-xs font-semibold text-outline hover:text-secondary transition-colors hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <span className="text-outline/40 text-xs">•</span>
              <Link href="/rules#terms" className="text-xs font-semibold text-outline hover:text-secondary transition-colors hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </div>
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
