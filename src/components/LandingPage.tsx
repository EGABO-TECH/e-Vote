import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  Cloud,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const navLinks = [
  { href: '#security', label: 'Security' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#about', label: 'About' },
];

const metrics = [
  { value: '99.99%', label: 'System availability' },
  { value: 'AES-256', label: 'End-to-end encryption' },
  { value: 'Fair', label: 'No ballot tampering' },
  { value: 'Real-time', label: 'Public auditability' },
];

const trustSignals = [
  {
    title: 'Tamper-proof ballot storage',
    description:
      'Write-once records and immutable audit trails keep every vote verifiable from cast to count.',
    icon: ShieldCheck,
  },
  {
    title: 'Offline resilience',
    description:
      'Local-first synchronization keeps elections operational when connectivity is inconsistent.',
    icon: Cloud,
  },
  {
    title: 'Verified access control',
    description:
      'Institutional identity checks ensure only eligible voters can sign in and participate.',
    icon: Lock,
  },
  {
    title: 'Live audit visibility',
    description:
      'Administrators and auditors can track election health without compromising ballot secrecy.',
    icon: BarChart3,
  },
];

const steps = [
  {
    title: 'Authenticate securely',
    description:
      'Students and staff enter through Clerk-backed institutional sign-in pages.',
  },
  {
    title: 'Cast a single verified vote',
    description:
      'Each ballot is captured once, protected immediately, and linked to the election rules.',
  },
  {
    title: 'Review with confidence',
    description:
      'Auditors and election officials inspect transparent records and outcome summaries in real time.',
  },
];

function FeatureIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }) {
  return <Icon className="h-5 w-5" strokeWidth={2.2} />;
}

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/e-Vote-Logo.png"
              alt="e-Vote"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover shadow-sm"
              priority
            />
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-950">e-Vote</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Secure voting system
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 lg:flex">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-emerald-600">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
            >
              Create account
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden lg:min-h-[calc(100vh-73px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.12),_transparent_36%)]" />
        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] lg:min-h-[calc(100vh-73px)]">
          <div className="relative flex items-center overflow-hidden bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-12 xl:px-16">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.9)_55%,rgba(5,150,105,0.36))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />

            <div className="relative z-10 max-w-xl space-y-6 lg:max-w-[34rem]">
              <div className="flex items-center gap-3 lg:gap-4">
                <Image
                  src="/assets/e-Vote-Logo.png"
                  alt="e-Vote logo"
                  width={88}
                  height={88}
                  className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10 lg:h-20 lg:w-20"
                  priority
                />
                <div>
                  <p className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">e-Vote</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-xs lg:text-sm">
                    Electronic voting system
                  </p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-5">
                <h1 className="max-w-xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.9rem] xl:text-[4.25rem]">
                  Paper belongs in class.
                  <span className="block text-emerald-400">Not in elections.</span>
                </h1>
                <p className="max-w-lg text-base leading-7 text-white/[0.78] sm:text-lg lg:text-[1.05rem]">
                  Leave slow queues and manual ballot boxes behind. Experience a fast, cryptographically secure campus election where your vote is locked in instantly.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm lg:p-5">
                    <div className="text-xl font-bold text-white lg:text-2xl">{metric.value}</div>
                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/60 lg:text-[10px]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] text-white/80 sm:text-xs lg:gap-3 lg:text-sm">
                {['Institution-grade controls', 'Offline-ready workflow', 'Auditable result trail'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 lg:px-4 lg:py-2">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-300 lg:h-4 lg:w-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center bg-[#f8fafc] px-0 py-8 sm:px-6 lg:px-0 lg:py-0">
            <div className="w-full max-w-[32rem] rounded-none border-0 bg-white px-6 py-8 shadow-none sm:rounded-[2rem] sm:border sm:border-slate-200 sm:px-8 sm:py-8 sm:shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:mx-0 lg:max-w-[35rem] lg:min-h-full lg:rounded-none lg:border-0 lg:px-8 lg:py-6 lg:shadow-none xl:px-10">
              <div className="flex flex-col gap-5 text-center lg:gap-4">
                <div className="flex justify-center">
                  <Image
                    src="/assets/Cavendish-University-Uganda-Logo.png"
                    alt="Cavendish University Uganda logo"
                    width={112}
                    height={112}
                    className="h-20 w-20 rounded-3xl object-cover shadow-sm lg:h-24 lg:w-24"
                  />
                </div>

                <div className="space-y-1.5 lg:space-y-2">
                  <h2 className="text-xl font-bold tracking-tight text-slate-950 lg:text-2xl">
                    Sign in to your account
                  </h2>
                  <p className="text-sm leading-6 text-slate-600 lg:text-[0.95rem]">
                    Access the voting portal using your institutional credentials.
                  </p>
                </div>

                <div className="space-y-2.5 text-left lg:space-y-3">
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                      <span className="text-xs font-black text-slate-900">G</span>
                    </span>
                    Continue with Google
                  </Link>
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    Use institutional email
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="relative flex items-center py-0.5 lg:py-1">
                  <div className="flex-1 border-t border-slate-200" />
                  <span className="mx-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                    or
                  </span>
                  <div className="flex-1 border-t border-slate-200" />
                </div>

                <div className="space-y-3 text-left lg:space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Enter your institution email address"
                        type="email"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                        Password
                      </label>
                      <Link href="/sign-in" className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-700 hover:underline">
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                  </div>

                  <Link
                    href="/sign-in"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700"
                  >
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="text-sm text-slate-600">
                  New to e-Vote?{' '}
                  <Link href="/sign-up" className="font-semibold text-emerald-700 hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="bg-white px-6 py-20 sm:px-8 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Institutional grade
              </div>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Uncompromising integrity for campus elections.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                The platform is designed around zero-trust principles, clear auditability, and election workflows that remain dependable even when infrastructure conditions are not perfect.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustSignals.slice(0, 2).map((signal) => (
                <article key={signal.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <FeatureIcon icon={signal.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{signal.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustSignals.map((signal) => (
              <article key={signal.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FeatureIcon icon={signal.icon} />
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{signal.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Engineered for transparency.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every stage of the election flow is structured so administrators, auditors, and voters can trust the process from sign-in to result publication.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
                  <span className="text-sm font-bold">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <Check className="h-4 w-4" />
                  Verifiable by design
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-12 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
                  Ready to get started
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Modernize campus elections without sacrificing trust.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-400"
                >
                  Sign in now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="about" className="border-t border-slate-200 bg-white px-6 py-10 sm:px-8 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/e-Vote-Logo.png"
              alt="e-Vote logo"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-slate-950">e-Vote</p>
              <p className="text-sm text-slate-600">
                The official electronic voting platform for Cavendish University Uganda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <a href="#security" className="transition hover:text-emerald-700">
              Security
            </a>
            <a href="#how-it-works" className="transition hover:text-emerald-700">
              How it works
            </a>
            <Link href="/sign-in" className="transition hover:text-emerald-700">
              Sign in
            </Link>
            <Link href="/sign-up" className="transition hover:text-emerald-700">
              Create account
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-[1440px] border-t border-slate-200 pt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
          © 2026 eVote Cavendish University Uganda. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
