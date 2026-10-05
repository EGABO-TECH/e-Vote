import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'e-Vote — Secure Electronic Voting System',
    short_name: 'e-Vote',
    description: 'Secure electronic voting for Cavendish University Uganda.',
    start_url: '/voter',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#f8faff',
    theme_color: '#1d4ed8',
    categories: ['education'],
    icons: [
      { src: '/assets/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/assets/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/assets/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}