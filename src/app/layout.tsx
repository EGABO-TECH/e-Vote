import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'e-Vote — Secure Electronic Voting System',
  description:
    'A secure, offline-first electronic voting platform for academic and institutional elections at Cavendish University Uganda.',
  icons: {
    icon: [{ url: '/assets/e-Vote-Logo.png', type: 'image/png' }],
    apple: '/assets/e-Vote-Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
