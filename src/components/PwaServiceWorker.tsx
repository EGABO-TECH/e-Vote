'use client';

import { useEffect } from 'react';

export function PwaServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .catch((error: unknown) => console.error('PWA service worker registration failed:', error));
  }, []);

  return null;
}