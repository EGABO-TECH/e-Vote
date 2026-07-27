import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Topbar from '@/components/Topbar';
import LandingContent from '@/components/LandingContent';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <>
      <Topbar />
      <LandingContent />
    </>
  );
}
