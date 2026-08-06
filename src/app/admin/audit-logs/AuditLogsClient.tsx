'use client';

import { useState, useMemo } from 'react';

type AuditLog = {
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
  initialLogs: AuditLog[];
  totalEvents: number;
  securityAlerts: number;
};

const PAGE_SIZE = 20;

export function AuditLogsClient({ initialLogs, totalEvents, securityAlerts }: Props) {
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('all');
  const [eventType, setEventType] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return initialLogs.filter(log => {
      const matchSearch = !search ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        (log.actor_role || '').toLowerCase().includes(search.toLowerCase()) ||
        (log.details || '').toLowerCase().includes(search.toLowerCase());
      const matchSeverity = severity === 'all' || log.severity === severity;
      const matchEventType = eventType === 'all' || log.action.toLowerCase().includes(eventType.toLowerCase());
      return matchSearch && matchSeverity && matchEventType;
    });
  }, [initialLogs, search, severity, eventType]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    const headers = ['Timestamp', 'Action', 'Actor Role', 'IP Address', 'Status', 'Severity', 'Details'];
    const rows = filtered.map(log => [
      new Date(log.timestamp).toLocaleString(),
      log.action,
      log.actor_role,
      log.ip_address || '',
      log.status,
      log.severity,
      (log.details || '').replace(/,/g, ';'),
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusColor = (s: string) => s === 'success' ? 'var(--green)' : s === 'blocked' ? 'var(--red)' : 'var(--amber)';
  const severityColor = (s: string) => s === 'critical' ? 'var(--red)' : s === 'warning' ? 'var(--amber)' : 'var(--blue)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>

      {/* Page Header */}
      <div style={{ position: 'relative', background: 'var(--surface)', borderRadius: 24, padding: '32px 40px', border: '1px solid var(--border)', boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>history_edu</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Compliance</p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>System Audit Logs</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>Every administrative action is recorded with cryptographic integrity.</p>
        </div>
      </div>

      {/* Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--sh-sm)' }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue)', margin: '0 0 8px 0' }}>Immutable Ledger</h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', margin: 0, maxWidth: 500 }}>
              Monitor access patterns and configuration changes across the eVote ecosystem.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--surface-2)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 4px 0', fontWeight: 700 }}>TOTAL EVENTS (ALL TIME)</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--blue)', margin: 0 }}>{totalEvents.toLocaleString()}</p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 4px 0', fontWeight: 700 }}>SECURITY ALERTS</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: securityAlerts > 0 ? 'var(--red)' : 'var(--green)', margin: 0 }}>{securityAlerts}</p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 4px 0', fontWeight: 700 }}>FILTERED RESULTS</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{filtered.length.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--blue)', color: '#fff', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--sh-blue)' }}>
          <div>
            <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>shield_with_heart</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px 0' }}>Compliance Status</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
              Fully compliant with UEC security protocols. All logs are cryptographically sealed.
            </p>
          </div>
          <button
            onClick={handleExport}
            style={{ width: '100%', marginTop: 24, background: 'var(--surface)', color: 'var(--blue)', padding: '12px 0', borderRadius: 8, fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Export Full Audit Trail
          </button>
        </div>
      </div>

      {/* Filters */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--sh-sm)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>Search Action or Admin</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: 18 }}>search</span>
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                style={{ width: '100%', padding: '10px 16px 10px 36px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text-1)' }}
              />
            </div>
          </div>
          <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>Severity</label>
            <select value={severity} onChange={e => { setSeverity(e.target.value); setPage(1); }} style={{ width: '100%', padding: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text-1)' }}>
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button
              onClick={() => { setSearch(''); setSeverity('all'); setEventType('all'); setPage(1); }}
              style={{ background: 'transparent', color: 'var(--text-2)', padding: '10px 16px', borderRadius: 8, fontWeight: 700, border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              Reset
            </button>
            <button
              onClick={handleExport}
              style={{ background: 'var(--blue)', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              Export CSV
            </button>
          </div>
        </div>
      </section>

      {/* Table */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead style={{ background: 'var(--surface-2)' }}>
              <tr>
                {['Timestamp', 'Severity', 'Action', 'Actor Role', 'IP Address', 'Status', 'Details'].map(h => (
                  <th key={h} style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-3)' }}>No logs match your filters.</td></tr>
              ) : paginated.map((log, i) => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-2)' }}>
                  <td style={{ padding: '14px 24px', fontSize: 13, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ padding: '3px 10px', background: 'var(--surface-3)', color: severityColor(log.severity), fontSize: 11, fontWeight: 700, borderRadius: 99, textTransform: 'capitalize' }}>
                      {log.severity}
                    </span>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-1)', maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {log.action}
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--text-2)', textTransform: 'capitalize' }}>{log.actor_role}</td>
                  <td style={{ padding: '14px 24px', fontSize: 13, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap' }}>
                    {log.ip_address || '—'}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: statusColor(log.status) }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                        {log.status === 'success' ? 'check_circle' : log.status === 'blocked' ? 'block' : 'info'}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{log.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 12, color: 'var(--text-3)', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {log.details || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '16px 24px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()} results
          </span>
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{ width: 36, height: 36, background: page === p ? 'var(--blue)' : 'var(--surface)', border: page === p ? 'none' : '1px solid var(--border)', color: page === p ? '#fff' : 'var(--text-1)', fontWeight: page === p ? 700 : 400, borderRadius: 8, cursor: 'pointer' }}
                >
                  {p}
                </button>
              ))}
              {totalPages > 5 && <span style={{ padding: '0 4px', color: 'var(--text-1)' }}>...</span>}
              {totalPages > 5 && (
                <button
                  onClick={() => setPage(totalPages)}
                  style={{ width: 36, height: 36, background: page === totalPages ? 'var(--blue)' : 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-1)', borderRadius: 8, cursor: 'pointer' }}
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
