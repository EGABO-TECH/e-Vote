import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'e-Vote | Your Secure Online Voting Partner',
  description:
    'An offline-first electronic voting platform built specifically for academic and institutional elections at Cavendish University Uganda.',
};

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return <LandingPage />;
}
