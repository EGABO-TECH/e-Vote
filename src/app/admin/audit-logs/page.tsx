export default function AuditLogs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>

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
              history_edu
            </span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Compliance
            </p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>
            System Audit Logs
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Every administrative action is recorded with cryptographic integrity.
          </p>
        </div>
      </div>

      {/* Audit Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--sh-sm)' }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue)', margin: '0 0 8px 0' }}>Immutable Ledger</h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', margin: 0, maxWidth: 500 }}>
              Monitor access patterns and configuration changes across the eVote ecosystem.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--surface-2)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 4px 0', fontWeight: 700 }}>TOTAL EVENTS (24H)</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--blue)', margin: 0 }}>1,284</p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 4px 0', fontWeight: 700 }}>SECURITY ALERTS</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--red)', margin: 0 }}>0</p>
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
              Fully compliant with UEC security protocols as of 2026-10-15.
            </p>
          </div>
          <button style={{ width: '100%', marginTop: 24, background: 'var(--surface)', color: 'var(--blue)', padding: '12px 0', borderRadius: 8, fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Export Full Audit Trail
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--sh-sm)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>Search Action or Admin</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: 18 }}>search</span>
              <input type="text" placeholder="Filter by keyword..." style={{ width: '100%', padding: '10px 16px 10px 36px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none' }} />
            </div>
          </div>
          <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>Severity</label>
            <select style={{ width: '100%', padding: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none' }}>
              <option>All Levels</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High (Critical)</option>
            </select>
          </div>
          <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>Event Type</label>
            <select style={{ width: '100%', padding: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none' }}>
              <option>All Events</option>
              <option>Security</option>
              <option>Config Change</option>
              <option>User Access</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button style={{ background: 'var(--blue)', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Apply Filters
            </button>
            <button style={{ background: 'transparent', color: 'var(--text-2)', padding: '10px 16px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* High-Density Data Table */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead style={{ background: 'var(--surface-2)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timestamp</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event Type</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Administrator</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action Details</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IP Address</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap' }}>2026-10-24 14:22:05</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 10px', background: 'var(--surface-3)', color: 'var(--blue)', fontSize: 12, fontWeight: 600, borderRadius: 99 }}>Config Change</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface-3)' }}></div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', whiteSpace: 'nowrap' }}>K. Mukasa (SUP-01)</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Updated 'voter_registration_cutoff' to 2026-11-01</td>
                <td style={{ padding: '16px 24px', fontSize: 14, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap' }}>192.168.1.104</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--blue)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Success</span>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap' }}>2026-10-24 14:18:42</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 10px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: 12, fontWeight: 600, borderRadius: 99 }}>Security</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface-3)' }}></div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', whiteSpace: 'nowrap' }}>System Auth</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Brute-force attempt: 3 failed logins for 'J. Doe'</td>
                <td style={{ padding: '16px 24px', fontSize: 14, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap' }}>45.76.102.15</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--red)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>block</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Blocked</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: '16px 24px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Showing 1 to 4 of 1,284 results</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
            <button style={{ width: 36, height: 36, background: 'var(--surface-3)', border: 'none', color: 'var(--blue)', fontWeight: 700, borderRadius: 8, cursor: 'pointer' }}>1</button>
            <button style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-1)', borderRadius: 8, cursor: 'pointer' }}>2</button>
            <button style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-1)', borderRadius: 8, cursor: 'pointer' }}>3</button>
            <span style={{ padding: '0 4px', color: 'var(--text-1)' }}>...</span>
            <button style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-1)', borderRadius: 8, cursor: 'pointer' }}>321</button>
            <button style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
