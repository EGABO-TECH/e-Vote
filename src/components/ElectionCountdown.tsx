'use client';

import { useEffect, useState } from 'react';

function formatTimeLeft(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return 'Closed';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export function ElectionCountdown({ endsAt, fallback = '—' }: { endsAt?: string | null; fallback?: string }) {
  const [timeLeft, setTimeLeft] = useState(fallback);

  useEffect(() => {
    if (!endsAt) {
      setTimeLeft(fallback);
      return;
    }

    setTimeLeft(formatTimeLeft(endsAt));
    const intervalId = window.setInterval(() => {
      setTimeLeft(formatTimeLeft(endsAt));
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, [endsAt, fallback]);

  return <>{timeLeft}</>;
}
