'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import styles from './CandidateSidebar.module.css';

import Image from 'next/image';

export default function CandidateSidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean; setMobileOpen?: (val: boolean) => void }) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const links = [
    { name: 'Dashboard', href: '/candidate/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Manifesto', href: '/candidate/manifesto', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Preview', href: '/candidate/preview', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { name: 'Support', href: '/candidate/support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Settings', href: '/candidate/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''}`}>
      <div className={styles.top}>
        <Link href="/" className={styles.logo}>
          <div className={styles.mark} style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <Image src="/logo.jpeg" alt="e-Vote Logo" width={48} height={48} style={{ objectFit: 'cover', borderRadius: 'inherit' }} />
          </div>
          <span className={styles.brand}>e-Vote</span>
        </Link>
        
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              onClick={() => setMobileOpen?.(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={link.icon} />
              </svg>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <button 
          onClick={() => signOut({ redirectUrl: '/sign-in' })} 
          className={styles.signOutLink} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}
