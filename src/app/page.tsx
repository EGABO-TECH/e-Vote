import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      {/* Large Election Status Card */}
      <section className="mb-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 card-elevation overflow-hidden relative group">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[400px]">
            <div className="p-stack-lg lg:p-12 flex flex-col justify-center z-10 order-2 lg:order-1">
              <div className="flex items-center gap-2 bg-success-container/10 px-3 py-1.5 rounded-full border border-green-200 w-fit mb-4">
                <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-widest text-green-700 uppercase">
                  Election Status • LIVE
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-stack-md leading-tight tracking-tight drop-shadow-sm">
                2026 STUDENT GUILD PRESIDENTIAL ELECTION
              </h3>
              <div className="flex flex-wrap items-center gap-stack-md text-on-surface-variant font-body-md mb-stack-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    schedule
                  </span>
                  <span>
                    Voting closes in:{" "}
                    <strong className="text-secondary font-bold tabular-nums">
                      03:26:32
                    </strong>
                  </span>
                </div>
                <span className="hidden lg:block opacity-30">|</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    group
                  </span>
                  <span>Open to all Undergraduate Students</span>
                </div>
              </div>
              <Link href="/active-election" className="bg-[#0F172A] hover:bg-secondary text-on-primary px-10 py-5 rounded-lg font-bold text-lg tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl flex items-center gap-4 w-fit">
                CAST YOUR BALLOT
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="relative overflow-hidden h-64 sm:h-80 lg:h-full order-1 lg:order-2">
              <img
                alt="Election Illustration"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAa3glfqS0Tis_3B5fF3mere_6uYFs2CyVa9mbLY86qK149l2FIPc9pjOW-lpnfkPLjVbLZk3K2ZCZ-_LgwT8SlKrzgWfmRmTyY6NlDOtrVjSbt7GCo8FBQJdA5ffJjAR2T5Fm2gqbfaQdPm2ZoAO420BHG5W5eFPzRTSrYhzuSz1kfryXntFa5NmpMHZNtA95OuM6sC1h66W54Q9yusl6fbtZF0QU_jan_AzbXr3fLfXG6LkLfIAULAsd2oCFzSTtDKOx0Da0QLo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Election Overview Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Total Registered Voters */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 bg-primary-fixed-dim/30 rounded-lg text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">groups</span>
            </span>
            <span className="text-label-sm font-bold text-outline uppercase tracking-wider">
              Demographics
            </span>
          </div>
          <p className="text-on-surface-variant font-label-md mb-1">
            Total Registered Voters
          </p>
          <h4 className="text-headline-lg font-headline-lg text-primary">
            5,432
          </h4>
          <div className="mt-4 pt-4 border-t border-outline-variant/10">
            <div className="flex justify-between items-center text-label-sm">
              <span className="text-on-surface-variant">Validated Identity</span>
              <span className="text-green-600 font-bold">100%</span>
            </div>
          </div>
        </div>

        {/* Current Turnout */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 bg-secondary-fixed/30 rounded-lg text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined">analytics</span>
            </span>
            <span className="text-label-sm font-bold text-outline uppercase tracking-wider">
              Live Stats
            </span>
          </div>
          <p className="text-on-surface-variant font-label-md mb-1">
            Current Turnout
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-headline-lg font-headline-lg text-primary">
              3,981
            </h4>
            <span className="text-secondary font-bold text-body-lg">/ 73%</span>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: "73%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 bg-surface-variant/30 rounded-lg text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">verified_user</span>
            </span>
            <span className="text-label-sm font-bold text-outline uppercase tracking-wider">
              Infrastructure
            </span>
          </div>
          <p className="text-on-surface-variant font-label-md mb-1">
            System Integrity
          </p>
          <div className="flex items-center gap-3">
            <h4 className="text-headline-md font-headline-md text-primary">
              Online
            </h4>
            <span
              className="material-symbols-outlined text-green-600 font-bold"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </div>
          <p className="text-label-sm text-outline mt-1 italic">
            Local Sync Ready - Encrypted Path Active
          </p>
          <div className="mt-4 flex gap-2">
            <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant">
              SUPABASE
            </span>
            <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant">
              CLERK
            </span>
          </div>
        </div>
      </section>

      {/* Secondary Content Area (Bento Grid Style) */}
      <section className="mt-gutter grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 card-elevation min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-headline-md text-headline-md">
              Your Voting History
            </h5>
            <button className="text-secondary font-bold text-label-md flex items-center gap-1 hover:underline">
              View All
              <span className="material-symbols-outlined text-[18px]">
                open_in_new
              </span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center overflow-hidden">
                  <img
                    alt="Guild Delegate Election"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvC34WijZjNin5rY7MKYqq5W6P-NVZSYglyh6rAptNUT3CpE512I62wuCIJ0pyE8PndLcssQPHK_8rzJw4gzeVeRqFj_pwL1OEfDpK6-ntd_gtPFLShrxFd3xrlA71xsRDKqN6X522AZdWn8xGncmPUZJA8HP5fNgN7IKMzjxeL8rx-CoNxr5r9y4BvwWFyfES6zL6PCm6hQtzCByUgpcrISjTLJ9R8S9qdbDuFQZN4wCijxHaiQg8R0i2opfdTHq5T91jHTVyvLs"
                  />
                </div>
                <div>
                  <p className="font-label-md font-bold text-primary">
                    Guild Delegate Mock Election
                  </p>
                  <p className="text-label-sm text-outline">
                    Feb 28, 2026 • 02:45 PM
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-full">
                VOTE CAST
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center overflow-hidden">
                  <img
                    alt="Mental Health President Election"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4o6VEPuEjhmWWHay8ldY-pl9G_OOH1g6pFesGyPDXE-mkhlmhixbx3Zua2xuPUMRk1W2vTD6LmNQVAW2OFDiLVj790kp_kL-DryqdFPkHpTbtSwUbC3qFlUbk49AKyWyjOMhTG39F0Jjb580LXzJW5WL1R3cw5tWBzhGQ_T1JocWUxlLsSYP2cEoBVU0QvVB_GKg9v7YQr7i31011teLno_Lx4K0A5H3eFrPbDrmjAwmE3JYHVRtfLXYZVjP5zEF_YtEq39Jrjfc"
                  />
                </div>
                <div>
                  <p className="font-label-md font-bold text-primary">
                    Mental Health Club Presidential Election
                  </p>
                  <p className="text-label-sm text-outline">
                    Mar 7, 2026 • 10:25 AM
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-full">
                VOTE CAST
              </span>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-gutter">
          <div className="bg-primary-container text-on-primary p-stack-lg rounded-xl card-elevation relative overflow-hidden flex-grow">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0 0 L100 100 M-20 80 L80 180 M20 -80 L120 20"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                ></path>
              </svg>
            </div>
            <h6 className="text-label-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-70">
              Support Hub
            </h6>
            <p className="font-headline-md text-headline-md leading-tight mb-stack-md">
              Need assistance with your e-vote?
            </p>
            <p className="font-body-md opacity-80 mb-stack-lg">
              Our dedicated student support team is available 24/7 during the
              election period.
            </p>
            <a
              className="inline-flex items-center gap-2 font-bold hover:gap-4 transition-all"
              href="/help-centre"
            >
              Contact Office of the University Electoral Commisision
              <span className="material-symbols-outlined">east</span>
            </a>
          </div>
          <div className="bg-secondary-container text-on-secondary p-stack-lg rounded-xl card-elevation">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined">security</span>
              <h6 className="font-bold">Privacy Note</h6>
            </div>
            <p className="text-label-sm leading-relaxed opacity-90">
              Your vote is anonymous and encrypted using military-grade
              SHA-256 hashing. Not even the system administrators can view
              individual ballots.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
