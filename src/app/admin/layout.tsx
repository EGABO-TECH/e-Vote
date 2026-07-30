import { ReactNode } from 'react';
import SideNavBar from '@/components/layout/SideNavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import BottomNavBar from '@/components/layout/BottomNavBar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-2)' }}>
      <SideNavBar />
      {/* Main content area — offset by sidebar width */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '256px' }}>
        <TopNavBar />
        <main style={{ flex: 1, padding: '2rem 2.5rem' }}>
          {children}
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
}
