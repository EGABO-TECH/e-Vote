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
    <main className="min-h-screen bg-gradient-to-r from-[#001428] from-[0%] via-[#0b2f5c] via-[42%] to-[#d4dce8] to-[100%] text-slate-900 selection:bg-emerald-600 selection:text-white">
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left — marketing (~58%) */}
        <div className="relative flex flex-[1.35] flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16 xl:py-16">
          <div className="relative z-10 max-w-2xl space-y-8 lg:space-y-10">
            {/* Brand */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">
                <Image
                  src="/assets/e-Vote-Logo.png"
                  alt="e-Vote logo"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-xl font-black tracking-wide text-white leading-none">e-Vote</p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7eb0e8] leading-none">
                  YOUR ONLINE VOTING PARTNER
                </p>
              </div>
            </div>

            {/* Hero */}
            <div className="space-y-4">
              <h1 className="text-[2.35rem] font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
                Paper Belongs in Class.
                <span className="mt-1 block text-white/95">Not in Elections.</span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-[0.95rem] sm:leading-relaxed">
                Leave slow queues and manual ballot boxes behind. Experience a fast,
                cryptographically secure campus election where your vote is locked in instantly.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid max-w-lg gap-3.5 sm:grid-cols-2 sm:gap-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex min-h-[108px] flex-col items-center justify-center rounded-[1.35rem] border border-white/10 bg-[#0a2548]/75 px-4 py-5 text-center backdrop-blur-sm"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                      <Icon className="h-[18px] w-[18px] stroke-[1.75]" />
                    </div>
                    <p className="text-[9px] font-semibold uppercase leading-snug tracking-[0.18em] text-[#8cb8e8] sm:text-[10px]">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — sign-in card (~42%) */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div className="w-full max-w-[22.5rem] rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:max-w-[24rem] sm:p-7">
            <SignInCard showFooter={false} />
          </div>

          <p className="mt-5 text-center text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500/80">
            THE E-VOTE ELECTRONIC VOTING SYSTEM
          </p>
        </div>
      </section>
    </main>
  );
}
