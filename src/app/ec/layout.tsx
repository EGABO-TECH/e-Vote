'use client';

import { useState } from 'react';
import EcSidebar from '@/components/EcSidebar';
import EcHeader from '@/components/EcHeader';
import { ReactNode } from 'react';
import styles from './layout.module.css';

export default function EcLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      <div 
        className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      />

      <EcSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      
      <div className={styles.mainContent}>
        <EcHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className={styles.pageContainer}>
          {children}
        </main>
      </div>
    </div>
  );
}
