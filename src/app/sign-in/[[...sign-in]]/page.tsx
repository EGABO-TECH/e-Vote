'use client';

import { SignInCard } from '@/components/SignInCard';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      <div className="w-full max-w-[30rem] rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <SignInCard />
      </div>
    </div>
  );
}
