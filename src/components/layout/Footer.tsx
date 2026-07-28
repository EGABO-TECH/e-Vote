import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-outline-variant/20 pt-10 pb-8 px-4 md:px-8 lg:px-margin-desktop bg-surface-container-lowest w-full shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]">
      <div className="max-w-container-max mx-auto">
        {/* Main grid — 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-10">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-extrabold text-xl">
              <span className="material-symbols-outlined text-[28px]">
                how_to_vote
              </span>
              e-Vote Cavendish
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
              Transparent, secure, and accessible governance for every Cavendish
              University voter.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-on-primary-container italic bg-primary-container/10 w-fit px-3 py-2 rounded-full border border-primary/20 shadow-sm mt-1">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              <span className="font-medium">Authorized by the University Electoral Commission</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-1 opacity-60">
              Platform
            </h4>
            <Link href="/" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Dashboard
            </Link>
            <Link href="/active-election" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Active Election
            </Link>
            <Link href="/verification-receipt" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Verification Receipt
            </Link>
          </div>

          {/* Support & Legal */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-1 opacity-60">
              Support &amp; Legal
            </h4>
            <Link href="/help-centre" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Help Centre &amp; Support
            </Link>
            <Link href="/rules" className="text-sm font-medium text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">
              Full Election Rules
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
