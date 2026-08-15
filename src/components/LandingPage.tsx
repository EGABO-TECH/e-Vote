"use client";

import Image from 'next/image';
import { CheckCircle, Lock, Smartphone, Shield } from 'lucide-react';
import { SignInCard } from '@/components/SignInCard';

const metrics = [
  { label: 'System availability', icon: CheckCircle },
  { label: 'End-to-end encryption', icon: Lock },
  { label: 'No ballot tampering', icon: Smartphone },
  { label: 'Public auditability', icon: Shield },
];

export default function LandingPage() {
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

          {/* Right Panel — live Clerk sign-in */}
          <div className="flex flex-1 flex-col items-center justify-center bg-[#f8fafc] px-6 py-12 sm:px-10 lg:w-[47%]">
            <div className="w-full max-w-[28rem] sm:max-w-[30rem] rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <SignInCard showFooter={false} />
            </div>

            <span className="text-slate-400 font-bold tracking-[0.25em] text-[9px] mt-6 text-center block">
              THE E-VOTE ELECTRONIC VOTING SYSTEM
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
