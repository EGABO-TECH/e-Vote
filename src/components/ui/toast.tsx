'use client';

import { useState, useCallback } from 'react';

export type Toast = { id: string; message: string; type: 'success' | 'error' | 'info' };

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

export function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 360,
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 18px',
          borderRadius: 12,
          background: t.type === 'success' ? '#166534' : t.type === 'error' ? '#7f1d1d' : '#1e3a8a',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          animation: 'slideInRight 0.25s ease-out',
          border: `1px solid ${t.type === 'success' ? '#16a34a44' : t.type === 'error' ? '#ef444444' : '#3b82f644'}`,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, flexShrink: 0, fontVariationSettings: '"FILL" 1' }}>
            {t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'info'}
          </span>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{t.message}</span>
          <button
            onClick={() => onRemove(t.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 0, flexShrink: 0 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
