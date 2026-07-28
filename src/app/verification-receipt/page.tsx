import Link from "next/link";

export default function VerificationReceipt() {
  return (
    <>
      <div className="lg:p-margin-desktop p-4 max-w-container-max mx-auto">
        {/* Institutional Notice */}
        <section className="mb-stack-lg bg-surface-container-low p-stack-md rounded-xl border border-outline-variant flex items-start gap-4">
          <span className="material-symbols-outlined text-secondary pt-1">
            verified_user
          </span>
          <div>
            <h3 className="font-label-md text-label-md text-primary">
              Cryptographic Assurance
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              These digital receipts serve as immutable proof of your
              participation in the democratic process. Each transaction ID can
              be verified against the secure Supabase ledger at the University
              Audit Office.
            </p>
          </div>
        </section>
        {/* Receipts Grid/List */}
        <div className="space-y-gutter">
          {/* Receipt Item 1 */}
          <div className="receipt-card p-5 lg:p-stack-lg rounded-xl flex flex-col gap-0 bg-surface-container-lowest border border-outline-variant/30 soft-shadow">
            {/* Top row: election name + date */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4">
              <div>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1">
                  Election Name
                </span>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">
                  Student Guild President 2026
                </h4>
                <span className="inline-flex items-center gap-1.5 bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-[11px] font-bold uppercase border border-secondary/20">
                  <span
                    className="material-symbols-outlined text-xs"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    verified
                  </span>
                  Verified Receipt
                </span>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1">
                  Date &amp; Time
                </span>
                <p className="font-body-md text-body-md font-bold text-on-surface">Oct 12, 2026</p>
                <p className="text-label-sm text-outline">08:32 EAT</p>
              </div>
            </div>
            {/* Transaction ID row */}
            <div className="py-4 border-t border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1.5">
                Transaction ID
              </span>
              <div className="bg-surface-container-high border border-outline-variant/50 p-2 pl-4 rounded-xl font-mono text-xs flex items-center justify-between gap-2 shadow-inner">
                <code className="block truncate text-primary font-bold">
                  4a5e9f8b7c6d5a4e3f2b1a0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f
                </code>
                <button className="bg-surface text-on-surface-variant p-1.5 rounded-md shadow-sm border border-outline-variant/30 hover:bg-secondary hover:text-white hover:border-secondary transition-colors flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            {/* Download button — own row with separator */}
            <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
              <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 active:scale-95 shadow-sm">
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>
          {/* Receipt Item 2 */}
          <div className="receipt-card p-5 lg:p-stack-lg rounded-xl flex flex-col gap-0 bg-surface-container-lowest border border-outline-variant/30 soft-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4">
              <div>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1">
                  Election Name
                </span>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">
                  Faculty of Law Representative
                </h4>
                <span className="inline-flex items-center gap-1.5 bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-[11px] font-bold uppercase border border-secondary/20">
                  <span
                    className="material-symbols-outlined text-xs"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    verified
                  </span>
                  Verified Receipt
                </span>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1">
                  Date &amp; Time
                </span>
                <p className="font-body-md text-body-md font-bold text-on-surface">Oct 07, 2026</p>
                <p className="text-label-sm text-outline">09:15 EAT</p>
              </div>
            </div>
            <div className="py-4 border-t border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1.5">
                Transaction ID
              </span>
              <div className="bg-surface-container-high border border-outline-variant/50 p-2 pl-4 rounded-xl font-mono text-xs flex items-center justify-between gap-2 shadow-inner">
                <code className="block truncate text-primary font-bold">
                  b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3
                </code>
                <button className="bg-surface text-on-surface-variant p-1.5 rounded-md shadow-sm border border-outline-variant/30 hover:bg-secondary hover:text-white hover:border-secondary transition-colors flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
              <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 active:scale-95 shadow-sm">
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>
          {/* Receipt Item 3 (Historical) */}
          <div className="receipt-card p-5 lg:p-stack-lg rounded-xl flex flex-col gap-0 bg-surface-container-lowest border border-outline-variant/30 soft-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4">
              <div>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1">
                  Election Name
                </span>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">
                  Sports Committee Referendum
                </h4>
                <span className="inline-flex items-center gap-1.5 bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-[11px] font-bold uppercase border border-secondary/20">
                  <span
                    className="material-symbols-outlined text-xs"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    verified
                  </span>
                  Verified Receipt
                </span>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1">
                  Date &amp; Time
                </span>
                <p className="font-body-md text-body-md font-bold text-on-surface">May 05, 2026</p>
                <p className="text-label-sm text-outline">11:58 EAT</p>
              </div>
            </div>
            <div className="py-4 border-t border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-1.5">
                Transaction ID
              </span>
              <div className="bg-surface-container-high border border-outline-variant/50 p-2 pl-4 rounded-xl font-mono text-xs flex items-center justify-between gap-2 shadow-inner">
                <code className="block truncate text-primary font-bold">
                  9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f4a5e9f8b7c6d5a4e3f2b1a0d
                </code>
                <button className="bg-surface text-on-surface-variant p-1.5 rounded-md shadow-sm border border-outline-variant/30 hover:bg-secondary hover:text-white hover:border-secondary transition-colors flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
              <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 active:scale-95 shadow-sm">
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>
        {/* Decorative Visual: Data Integrity Visualization */}
        <div className="mt-stack-lg relative overflow-hidden rounded-2xl border-0 shadow-lg bg-gradient-to-br from-primary-container to-secondary-container min-h-[200px]">
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-15 transform translate-x-1/4 translate-y-1/4">
            <span className="material-symbols-outlined text-white hidden sm:block" style={{ fontSize: '280px', fontVariationSettings: '"FILL" 1' }}>
              security
            </span>
          </div>
          <div className="relative z-10 p-6 sm:p-8 lg:p-12">
            <h5 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight drop-shadow-md leading-tight">
              Audit-Ready Democracy
            </h5>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
              Your data is secured using military-grade encryption. Every vote
              cast at Cavendish University is timestamped and hashed to ensure
              the absolute integrity of our electoral system.
            </p>
          </div>
        </div>
        {/* Footer-like support link */}
        <div className="mt-stack-lg text-center pb-stack-lg">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Having trouble verifying your receipt?{" "}
            <Link className="text-secondary font-bold hover:underline" href="/rules#privacy">
              Contact System Audit
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
