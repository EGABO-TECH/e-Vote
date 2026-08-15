"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Lock, Sparkles, Eye, EyeOff, Mail, CheckCircle, Smartphone, Shield } from 'lucide-react';

const metrics = [
  { label: 'System availability', icon: CheckCircle },
  { label: 'End-to-end encryption', icon: Lock },
  { label: 'No ballot tampering', icon: Smartphone },
  { label: 'Public auditability', icon: Shield },
];

export default function LandingPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <section className="relative overflow-visible min-h-screen flex flex-col lg:flex-row">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.12),_transparent_36%)] pointer-events-none" />
        <div className="relative w-full flex flex-col lg:flex-row min-h-screen">
          {/* Left Panel */}
          <div className="relative flex flex-1 flex-col justify-center overflow-visible bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-12 xl:px-16 lg:w-[53%]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,31,63,0.96),rgba(0,51,102,0.92)_45%,rgba(0,80,157,0.88))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_40%)]" />

            <div className="relative z-10 max-w-3xl space-y-8 lg:space-y-6 xl:space-y-8">
              {/* Brand Header */}
              <div className="flex flex-row items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm p-1">
                    <Image
                      src="/assets/e-Vote-Logo.png"
                      alt="e-Vote logo"
                      width={44}
                      height={44}
                      className="h-10 w-10 object-contain"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-wide text-white leading-none">e-Vote</h1>
                  <p className="mt-1.5 text-[10px] font-extrabold tracking-[0.22em] text-white/90 leading-none">
                    YOUR ONLINE VOTING PARTNER
                  </p>
                </div>
              </div>

              {/* Hero Header */}
              <div className="space-y-3">
                <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                  Paper Belongs in Class.
                  <span className="block text-slate-950">Not in Elections.</span>
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base sm:leading-relaxed">
                  Leave slow queues and manual ballot boxes behind. Experience a fast, cryptographically secure campus election where your vote is locked in instantly.
                </p>
              </div>

              {/* Metrics Grid (2x2) */}
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => {
                  const IconComponent = metric.icon;
                  return (
                    <div key={metric.label} className="rounded-3xl border border-[#214371] bg-[#0c2e59] p-5 shadow-sm flex flex-col items-center justify-center text-center min-h-[120px]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white mb-3 shadow-inner">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#86aedc]">
                        {metric.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-1 flex-col items-center justify-center bg-[#f8fafc] px-6 py-12 sm:px-10 lg:w-[47%]">
            <div className="w-full max-w-[28rem] sm:max-w-[30rem] rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <Image
                    src="/assets/Cavendish-University-Uganda-Logo.png"
                    alt="Cavendish University Uganda logo"
                    width={64}
                    height={64}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                  Access the voting portal using your institutional credentials.
                </p>
              </div>

              {/* Social Login */}
              <div className="mt-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-5 flex items-center text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="mx-3 text-[10px] font-bold uppercase tracking-[0.2em]">OR USE EMAIL</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Form fields */}
              <form className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                      placeholder="name@students.cavendish.ac.ug"
                      type="email"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      PASSWORD
                    </label>
                    <Link href="/sign-in" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#000080] hover:underline">
                      FORGOT?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="h-5 w-5" />
                    </span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 border-none outline-none p-0 focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#000080] py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#000066]"
                >
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm font-semibold text-slate-500">
                New to e-Vote?{' '}
                <Link href="/sign-up" className="font-bold text-[#000080] hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            {/* Page Footer */}
            <span className="text-slate-400 font-bold tracking-[0.25em] text-[9px] mt-6 text-center block">
              THE E-VOTE ELECTRONIC VOTING SYSTEM
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
