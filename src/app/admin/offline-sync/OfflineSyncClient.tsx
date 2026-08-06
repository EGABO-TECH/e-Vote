'use client';

import { useState, useTransition } from 'react';
import { triggerSync } from './actions';

type SyncLog = {
  id: string;
  timestamp: string;
  action: string;
  actor_role: string;
  ip_address: string | null;
  status: string;
  details: string | null;
  severity: string;
};

type Props = {
  initialLogs: SyncLog[];
  totalVoters: number;
  totalElections: number;
  totalVotes: number;
};

const clusters = [
  { name: 'Kampala Central', code: 'KMP-01', status: 'healthy' as const },
  { name: 'Gulu Satellite', code: 'GUL-02', status: 'warning' as const },
  { name: 'Mbarara Node', code: 'MBA-03', status: 'healthy' as const },
];

export function OfflineSyncClient({ initialLogs, totalVoters, totalElections, totalVotes }: Props) {
  const [logs, setLogs] = useState(initialLogs);
  const [syncingCluster, setSyncingCluster] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [lastSync, setLastSync] = useState<Record<string, Date>>({});

  const handleSync = (cluster: string) => {
    setSyncingCluster(cluster);
    startTransition(async () => {
      try {
        await triggerSync(cluster);
        setLastSync(prev => ({ ...prev, [cluster]: new Date() }));
        // Add a new log entry
        const newLog: SyncLog = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          action: `Manual sync triggered for cluster: ${cluster}`,
          actor_role: 'admin',
          ip_address: null,
          status: 'success',
          details: `Triggered manually`,
          severity: 'info',
        };
        setLogs(prev => [newLog, ...prev]);
      } finally {
        setSyncingCluster(null);
      }
    });
  };

  const handleExport = () => {
    const headers = ['Timestamp', 'Action', 'Role', 'IP', 'Status', 'Details'];
    const rows = logs.map(l => [
      new Date(l.timestamp).toLocaleString(),
      l.action,
      l.actor_role,
      l.ip_address || '',
      l.status,
      (l.details || '').replace(/,/g, ';'),
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sync-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Compute derived stats
  const syncSuccess = logs.filter(l => l.status === 'success').length;
  const syncTotal = logs.length;
  const healthPct = syncTotal > 0 ? Math.round((syncSuccess / syncTotal) * 100) : 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{ position: 'relative', background: 'var(--surface)', borderRadius: 24, padding: '32px 40px', border: '1px solid var(--border)', boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>cloud_sync</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Infrastructure</p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>Offline Sync Management</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Monitor synchronization health across regional clusters and resolve data conflicts.
          </p>
        </div>
      </div>

      {/* Sync Health Overview — Real Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Health</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>dns</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{healthPct >= 95 ? 'Optimal' : healthPct >= 80 ? 'Degraded' : 'Critical'}</h4>
            <div style={{ width: 8, height: 8, background: healthPct >= 95 ? 'var(--green)' : healthPct >= 80 ? 'var(--amber)' : 'var(--red)', borderRadius: '50%' }}></div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>{healthPct}% synchronized</p>
        </div>

        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registered Voters</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>groups</span>
          </div>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{totalVoters.toLocaleString()}</h4>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>In voter registry</p>
        </div>

        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Votes Cast</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--green)', background: 'var(--green-bg)', padding: 8, borderRadius: 8, fontSize: 24 }}>how_to_vote</span>
          </div>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{totalVotes.toLocaleString()}</h4>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>Across all elections</p>
        </div>

        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Elections</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>speed</span>
          </div>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{totalElections}</h4>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>Total in system</p>
        </div>
      </section>

      {/* Regional Clusters + Log Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        {/* Left: Clusters */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Regional Clusters</h2>
            <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>public</span>
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {clusters.map(cluster => (
              <div key={cluster.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>{cluster.name}</span>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-3)' }}>{cluster.code}</span>
                  {lastSync[cluster.name] ? (
                    <span style={{ fontSize: 12, color: 'var(--green)', marginTop: 2 }}>
                      Last synced: {lastSync[cluster.name].toLocaleTimeString()}
                    </span>
                  ) : (
                    <span style={{ fontSize: 12, color: cluster.status === 'healthy' ? 'var(--blue)' : 'var(--red)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <span style={{ width: 6, height: 6, background: cluster.status === 'healthy' ? 'var(--blue)' : 'var(--red)', borderRadius: '50%' }}></span>
                      {cluster.status === 'healthy' ? 'Healthy' : 'Latency Warning'}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleSync(cluster.name)}
                  disabled={syncingCluster === cluster.name || isPending}
                  title={`Sync ${cluster.name}`}
                  style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', opacity: (syncingCluster === cluster.name) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18, animation: syncingCluster === cluster.name ? 'spin 1s linear infinite' : 'none' }}>sync</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Transaction Log */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Live Transaction Log</h2>
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0 }}>Real-time reconciliation stream</p>
            </div>
            <button
              onClick={handleExport}
              style={{ background: 'var(--blue)', color: '#fff', padding: '8px 16px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              Export
            </button>
          </div>
          <div style={{ overflowX: 'auto', maxHeight: 400, overflowY: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead style={{ background: 'var(--surface-2)', position: 'sticky', top: 0 }}>
                <tr>
                  {['Timestamp', 'Action', 'Role', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)' }}>No sync activity found.</td></tr>
                ) : logs.slice(0, 50).map((log, i) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-2)' }}>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-2)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text-1)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {log.action}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)', textTransform: 'capitalize' }}>{log.actor_role}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        background: log.status === 'success' ? 'var(--surface-3)' : 'var(--red-bg)',
                        color: log.status === 'success' ? 'var(--blue)' : 'var(--red)',
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 99,
                        textTransform: 'uppercase',
                      }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
