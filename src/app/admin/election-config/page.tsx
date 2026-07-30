export default function ElectionConfig() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Header Section */}
      <div style={{
        position: 'relative',
        background: 'var(--surface)',
        borderRadius: 24,
        padding: '32px 40px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--sh-md)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>
                event_available
              </span>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                Management Console
              </p>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>
              Election Lifecycles
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
              Configure upcoming electoral events, set definitive timelines, and manage verified candidate registrations for the 2026 academic year.
            </p>
          </div>
          <button style={{
            background: 'var(--blue)', color: '#fff', padding: '16px 32px', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: 'var(--sh-blue)',
            whiteSpace: 'nowrap'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
            CREATE NEW ELECTION
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {/* Stat Card 1 */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              pending_actions
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', background: 'var(--surface-3)', padding: '2px 8px', borderRadius: 4 }}>
              Active Now
            </span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Scheduled</p>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>04</h4>
        </div>

        {/* Stat Card 2 */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--text-2)', background: 'var(--surface-2)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              person_check
            </span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Candidates</p>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>28</h4>
        </div>

        {/* Stat Card 3 */}
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--text-2)', background: 'var(--surface-2)', padding: 8, borderRadius: 8, fontSize: 24 }}>
              event_repeat
            </span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Completed</p>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>12</h4>
        </div>

        {/* Stat Card 4 */}
        <div style={{ background: 'var(--blue)', color: '#fff', padding: 24, borderRadius: 16, boxShadow: 'var(--sh-blue)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Next Deadline</p>
            <h4 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Guild Elections</h4>
            <p style={{ fontSize: 14, margin: '4px 0 0 0', opacity: 0.9 }}>Closes in 4d</p>
          </div>
          <span className="material-symbols-outlined" style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 100, opacity: 0.1, pointerEvents: 'none' }}>
            schedule
          </span>
        </div>
      </section>

      {/* Main Table Section */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
        <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Election Repository</h4>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ padding: '4px 12px', background: 'var(--surface-3)', color: 'var(--blue)', fontSize: 12, fontWeight: 700, borderRadius: 99, cursor: 'pointer' }}>All</span>
              <span style={{ padding: '4px 12px', background: 'transparent', color: 'var(--text-3)', fontSize: 12, fontWeight: 600, borderRadius: 99, cursor: 'pointer' }}>Draft</span>
              <span style={{ padding: '4px 12px', background: 'transparent', color: 'var(--text-3)', fontSize: 12, fontWeight: 600, borderRadius: 99, cursor: 'pointer' }}>Active</span>
              <span style={{ padding: '4px 12px', background: 'transparent', color: 'var(--text-3)', fontSize: 12, fontWeight: 600, borderRadius: 99, cursor: 'pointer' }}>Completed</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: 18 }}>search</span>
            <input type="text" placeholder="Search elections..." style={{ padding: '8px 16px 8px 36px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', width: 250 }} />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead style={{ background: 'var(--surface-2)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Election Name</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Candidates</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Student Guild President 2026</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase' }}>General Election</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>Oct 12 — Oct 14, 2026</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--surface-3)', color: 'var(--blue)', fontSize: 12, fontWeight: 700, borderRadius: 99 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)' }}></span>Active
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', marginLeft: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--surface)', background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--blue)', marginLeft: -8 }}>JD</div>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--surface)', background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--blue)', marginLeft: -8 }}>MS</div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginRight: 16 }}>Manage</button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Faculty of Law Rep</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase' }}>Internal Poll</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>Nov 02 — Nov 03, 2026</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--surface-2)', color: 'var(--text-3)', fontSize: 12, fontWeight: 700, borderRadius: 99 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-3)' }}></span>Draft
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-3)', fontStyle: 'italic' }}>Registration Open</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginRight: 16 }}>Edit</button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
