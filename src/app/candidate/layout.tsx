import { ReactNode } from 'react';
import SideNavBar from '@/components/layout/SideNavBar';
import TopNavBar from '@/components/layout/TopNavBar';
import BottomNavBar from '@/components/layout/BottomNavBar';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-2)' }}>
      <SideNavBar />
      {/* .main-offset handles the 256px margin on tablet/desktop and 0 on mobile via CSS */}
      <div className="main-offset" style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <TopNavBar />
        <main className="main-content" style={{ flex: 1, padding: '2rem 2.5rem' }}>
          {children}
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
}
