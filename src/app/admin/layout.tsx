import { ReactNode } from 'react';
import SideNavBar from '@/components/layout/SideNavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import BottomNavBar from '@/components/layout/BottomNavBar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <SideNavBar />
      {/* Main content area — offset by sidebar width on large screens */}
      <div className="flex flex-col flex-1 lg:ml-64">
        <TopNavBar />
        <main className="flex-1 px-4 py-6 lg:px-margin-desktop lg:py-8">
          {children}
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
}
