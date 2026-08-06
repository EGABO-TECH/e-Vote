import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch real counts from Supabase
  const [votersRes, electionsRes, candidatesRes, votesRes, auditLogsRes] = await Promise.all([
    supabaseAdmin.from('voters').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('elections').select('id, title, status', { count: 'exact' }),
    supabaseAdmin.from('candidates').select('id, status', { count: 'exact' }),
    supabaseAdmin.from('votes').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('audit_logs').select('id, action, actor_role, ip_address, status, timestamp, severity').order('timestamp', { ascending: false }).limit(5),
  ]);

  const totalVoters = votersRes.count ?? 0;
  const totalElections = electionsRes.count ?? 0;
  const liveElections = (electionsRes.data ?? []).filter(e => e.status === 'live').length;
  const totalCandidates = candidatesRes.count ?? 0;
  const pendingCandidates = (candidatesRes.data ?? []).filter(c => c.status === 'pending').length;
  const totalVotes = votesRes.count ?? 0;
  const recentLogs = auditLogsRes.data ?? [];

  const stats = [
    { label: 'Registered Voters', value: totalVoters.toLocaleString(), sub: 'System-wide', icon: 'groups', color: 'var(--blue)' },
    { label: 'Total Elections', value: `${liveElections} Live / ${totalElections}`, sub: 'All elections', icon: 'how_to_vote', color: 'var(--green)' },
    { label: 'Candidates', value: `${pendingCandidates} Pending`, sub: `${totalCandidates} registered`, icon: 'person_raised_hand', color: 'var(--amber)' },
    { label: 'Votes Cast', value: totalVotes.toLocaleString(), sub: 'All elections combined', icon: 'verified_user', color: 'var(--navy-mid)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
        borderRadius: 'var(--r-lg)',
        padding: '2rem 2.5rem',
        color: '#fff',
        boxShadow: 'var(--sh-lg)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '240px', height: '240px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--blue-glow)' }}>monitoring</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue-glow)' }}>
            Operations Center
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
          Infrastructure Monitor
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: 1.6 }}>
          Real-time operational oversight for the University Electoral Commission. Ensuring data integrity across all active elections.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginTop: '1rem', padding: '5px 14px',
          background: 'rgba(22,163,74,0.2)', borderRadius: '999px',
          border: '1px solid rgba(22,163,74,0.4)',
        }}>
          <span style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>Infrastructure Status: ONLINE</span>
        </div>
      </div>

      {/* Stats Grid — Real Data */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border)',
            boxShadow: 'var(--sh-sm)',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            <div style={{
              width: '44px', height: '44px',
              borderRadius: 'var(--r-md)',
              background: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '4px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#fff', fontVariationSettings: '"FILL" 1' }}>
                {s.icon}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
            <p style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Audit Log + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

        {/* Recent Audit Activity */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--sh-sm)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' }}>Recent System Activity</p>
            <Link href="/admin/audit-logs" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>
              View all logs
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  {['Timestamp', 'Action', 'Role', 'Status'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLogs.length > 0 ? recentLogs.map((log, i) => (
                  <tr key={log.id} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface-2)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text-2)', fontFamily: 'monospace', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-1)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {log.action}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-2)' }}>{log.actor_role}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '3px 10px', borderRadius: '999px',
                        fontSize: '0.72rem', fontWeight: 700,
                        color: log.status === 'success' ? 'var(--green)' : 'var(--red)',
                        background: log.status === 'success' ? 'var(--green-bg)' : 'var(--red-bg)',
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: log.status === 'success' ? 'var(--green)' : 'var(--red)' }} />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)' }}>No recent activity.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Panel + Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
            borderRadius: 'var(--r-lg)',
            padding: '1.75rem',
            color: '#fff',
            boxShadow: 'var(--sh-md)',
          }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue-glow)', marginBottom: '1.25rem' }}>
              Security Protocols
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: 'verified_user', title: 'End-to-End Encryption', desc: 'AES-256 active for all transit payloads.' },
                { icon: 'lan', title: 'Mesh-Node Validation', desc: 'P2P node verification cycles every 120ms.' },
                { icon: 'security_update_good', title: 'Integrity Checks', desc: 'Hash verification on every payload.' },
              ].map((p) => (
                <div key={p.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--blue-glow)', flexShrink: 0, fontVariationSettings: '"FILL" 1' }}>{p.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/audit-logs" style={{
              display: 'inline-block', marginTop: '1.5rem',
              padding: '8px 18px',
              background: 'var(--blue)', color: '#fff',
              borderRadius: 'var(--r-sm)', fontSize: '0.82rem', fontWeight: 700,
              textDecoration: 'none', boxShadow: 'var(--sh-blue)',
            }}>View Security Audit</Link>
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', padding: '1.5rem', boxShadow: 'var(--sh-sm)' }}>
            <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)', marginBottom: '1rem' }}>Quick Actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Configure Election', icon: 'how_to_vote', href: '/admin/election-config' },
                { label: 'Manage Users', icon: 'group', href: '/admin/users' },
                { label: 'View Audit Logs', icon: 'receipt_long', href: '/admin/audit-logs' },
                { label: 'Offline Sync', icon: 'sync_alt', href: '/admin/offline-sync' },
                { label: 'System Settings', icon: 'settings', href: '/admin/settings' },
              ].map((a) => (
                <Link key={a.href} href={a.href} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 14px',
                  background: 'var(--surface-2)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--r-sm)',
                  fontSize: '0.85rem', fontWeight: 600,
                  color: 'var(--text-1)',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
