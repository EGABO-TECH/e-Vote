'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignIn } from '@clerk/nextjs';

export default function LandingAuthCard() {
  const pathname = usePathname();
  const isSignInRoute = pathname?.startsWith('/sign-in');

  return (
    <div className="space-y-4">
      {isSignInRoute ? (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                rootBox: { width: '100%' },
                cardBox: { boxShadow: 'none', borderRadius: '1.5rem' },
                card: { width: '100%', padding: '0', background: 'transparent' },
                header: { display: 'none' },
                footer: { display: 'none' },
              },
            }}
          />
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm leading-6 text-slate-600">
            Ready to participate in the election? Sign in with your institutional
            credentials or create an account to get started.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:justify-center sm:gap-4">
            <Link
              href="/sign-in"
              className="inline-flex justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Create account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
