export default function OfflineSync() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{
        position: 'relative',
        background: 'var(--surface)',
        borderRadius: 24,
        padding: '32px 40px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--sh-md)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>
              cloud_sync
            </span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Infrastructure
            </p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>
            Offline Sync Management
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Monitor synchronization health across regional clusters and resolve data conflicts.
          </p>
        </div>
      </div>

      {/* Sync Health Overview */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {/* Status Card: Global */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Health</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              dns
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Optimal</h4>
            <div style={{ width: 8, height: 8, background: 'var(--blue)', borderRadius: '50%' }}></div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>98.2% synchronized</p>
        </div>
        
        {/* Status Card: Pending */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conflicts</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--red)', background: 'var(--red-bg)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              warning
            </span>
          </div>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>12</h4>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>Manual reconciliation</p>
        </div>

        {/* Status Card: Last Sync */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Push</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              cloud_upload
            </span>
          </div>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>4m ago</h4>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>Supabase Edge Network</p>
        </div>

        {/* Status Card: Latency */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Latency</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              speed
            </span>
          </div>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>142ms</h4>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '4px 0 0 0' }}>Dexie → Supabase</p>
        </div>
      </section>

      {/* Regional Clusters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Regional Clusters</h2>
              <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>public</span>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>Kampala Central</span>
                  <span style={{ fontSize: 12, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, background: 'var(--blue)', borderRadius: '50%' }}></span>Healthy
                  </span>
                </div>
                <button style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sync</span>
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>Gulu Satellite</span>
                  <span style={{ fontSize: 12, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, background: 'var(--red)', borderRadius: '50%' }}></span>Latency Warning
                  </span>
                </div>
                <button style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sync</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Log Table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Live Transaction Log</h2>
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0 }}>Real-time reconciliation stream</p>
            </div>
            <button style={{ background: 'var(--blue)', color: '#fff', padding: '8px 16px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              Export
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead style={{ background: 'var(--surface-2)' }}>
                <tr>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Timestamp</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Resource</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Action</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Node</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)' }}>11:30:18 PM</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>tbl_heartbeat_sync</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: 'var(--blue)' }}>PING</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-1)' }}>SYS-HEARTBEAT</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 8px', background: 'var(--surface-3)', color: 'var(--blue)', fontSize: 10, fontWeight: 700, borderRadius: 99 }}>OK</span>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)' }}>11:30:01 PM</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>tbl_voter_registry</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: 'var(--text-3)' }}>UPSERT</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-1)' }}>CU-SI-001</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 8px', background: 'var(--surface-2)', color: 'var(--text-3)', fontSize: 10, fontWeight: 700, borderRadius: 99 }}>SYNCED</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
