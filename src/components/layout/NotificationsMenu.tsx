'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatEastAfricaTime } from '@/lib/date-time';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  href: string;
  created_at: string;
  read_at: string | null;
};

export function NotificationsMenu() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to load notifications.');
      setNotifications(payload.notifications || []);
      setUnreadCount(payload.unreadCount || 0);
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load notifications.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void refreshNotifications(), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const markRead = async (id?: string) => {
    const response = await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id ? { id } : { markAll: true }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'Unable to update notifications.');
    }
    const readAt = new Date().toISOString();
    setNotifications((current) => current.map((notification) => (
      !id || notification.id === id ? { ...notification, read_at: readAt } : notification
    )));
    setUnreadCount((current) => id
      ? Math.max(0, current - Number(notifications.some((notification) => notification.id === id && !notification.read_at)))
      : 0);
  };

  const openNotification = async (notification: Notification) => {
    if (!notification.read_at) {
      try {
        await markRead(notification.id);
      } catch (markError) {
        setError(markError instanceof Error ? markError.message : 'Unable to update notification.');
      }
    }
    setIsOpen(false);
    router.push(notification.href);
  };

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="topbar-notifications"
        title={unreadCount ? `Notifications (${unreadCount} unread)` : 'Notifications'}
        aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        aria-expanded={isOpen}
        aria-controls="topbar-notification-panel"
        onClick={() => {
          setIsOpen((open) => !open);
          void refreshNotifications();
        }}
        style={{
          width: '38px', height: '38px', borderRadius: '50%', border: '1.5px solid var(--border)',
          background: 'var(--surface-2)', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--text-2)', position: 'relative', transition: 'all 0.15s',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>notifications</span>
        {unreadCount > 0 && <span aria-hidden="true" style={{ position: 'absolute', top: 5, right: 5, minWidth: 8, height: 8, padding: unreadCount > 9 ? '0 4px' : 0, display: 'grid', placeItems: 'center', borderRadius: 999, background: 'var(--red)', border: '2px solid var(--surface)', color: '#fff', fontSize: 9, fontWeight: 800 }}>{unreadCount > 9 ? Math.min(unreadCount, 99) : ''}</span>}
      </button>

      {isOpen && (
        <section
          id="topbar-notification-panel"
          aria-label="Notifications"
          style={{ position: 'absolute', zIndex: 100, top: 'calc(100% + 10px)', right: 0, width: 'min(92vw, 380px)', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface)', boxShadow: 'var(--sh-lg)', color: 'var(--text-1)' }}
        >
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Notifications</h2>
              <p style={{ margin: '3px 0 0', color: 'var(--text-3)', fontSize: 11 }}>{unreadCount ? `${unreadCount} unread` : 'You are up to date'}</p>
            </div>
            {unreadCount > 0 && <button type="button" onClick={() => void markRead().catch((markError: unknown) => setError(markError instanceof Error ? markError.message : 'Unable to update notifications.'))} style={{ border: 0, background: 'none', color: 'var(--blue)', fontSize: 11, fontWeight: 750, cursor: 'pointer' }}>Mark all read</button>}
          </header>

          {error && <p role="alert" style={{ margin: 0, padding: '10px 16px', color: 'var(--red)', fontSize: 12 }}>{error}</p>}
          <div style={{ maxHeight: 'min(65vh, 420px)', overflowY: 'auto' }}>
            {isLoading ? (
              <p style={{ padding: 24, margin: 0, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>Loading notifications…</p>
            ) : notifications.length === 0 ? (
              <p style={{ padding: 24, margin: 0, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>System updates will appear here.</p>
            ) : notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => void openNotification(notification)}
                style={{ width: '100%', display: 'grid', gridTemplateColumns: '8px minmax(0, 1fr)', gap: 11, padding: '13px 16px', border: 0, borderBottom: '1px solid var(--border)', background: notification.read_at ? 'var(--surface)' : 'var(--surface-2)', color: 'inherit', textAlign: 'left', cursor: 'pointer' }}
              >
                <span aria-hidden="true" style={{ width: 7, height: 7, marginTop: 5, borderRadius: '50%', background: notification.read_at ? 'transparent' : 'var(--blue)' }} />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 800 }}>{notification.title}</span>
                  <span style={{ display: 'block', marginTop: 3, color: 'var(--text-2)', fontSize: 12, lineHeight: 1.45 }}>{notification.message}</span>
                  <span style={{ display: 'block', marginTop: 6, color: 'var(--text-3)', fontSize: 10 }}>{formatEastAfricaTime(notification.created_at)}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}