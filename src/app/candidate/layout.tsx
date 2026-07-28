'use client';

import { useState } from 'react';
import CandidateSidebar from '@/components/CandidateSidebar';
import CandidateHeader from '@/components/CandidateHeader';
import { ReactNode } from 'react';
import styles from './layout.module.css';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      <div 
        className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      />

      <CandidateSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      
      <div className={styles.mainContent}>
        <CandidateHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className={styles.pageContainer}>
          {children}
        </main>
      </div>
    </div>
  );
}
