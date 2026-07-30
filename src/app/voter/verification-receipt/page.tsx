import Link from "next/link";

export default function VerificationReceipt() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
        {/* Institutional Notice */}
        <section style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 24 }}>
            verified_user
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
              Cryptographic Assurance
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 800, margin: 0, lineHeight: 1.5 }}>
              These digital receipts serve as immutable proof of your
              participation in the democratic process. Each transaction ID can
              be verified against the secure Supabase ledger at the University
              Audit Office.
            </p>
          </div>
        </section>

        {/* Receipts Grid/List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Receipt Item 1 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--sh-sm)' }}>
            {/* Top row: election name + date */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Election Name
                </span>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '4px 0' }}>
                  Student Guild President 2026
                </h4>
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 99, color: 'var(--blue)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Verified Receipt</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Date &amp; Time
                </span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Oct 12, 2026</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>08:32 EAT</p>
              </div>
            </div>
            {/* Transaction ID row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Transaction ID
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '8px 8px 8px 16px', borderRadius: 12 }}>
                <code style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  4a5e9f8b7c6d5a4e3f2b1a0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f
                </code>
                <button style={{ flexShrink: 0, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>content_copy</span>
                </button>
              </div>
            </div>
            {/* Download button */}
            <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--blue)', color: '#fff', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>

          {/* Receipt Item 2 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Election Name
                </span>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '4px 0' }}>
                  Faculty of Law Representative
                </h4>
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 99, color: 'var(--blue)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Verified Receipt</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Date &amp; Time
                </span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Oct 07, 2026</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>09:15 EAT</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Transaction ID
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '8px 8px 8px 16px', borderRadius: 12 }}>
                <code style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3
                </code>
                <button style={{ flexShrink: 0, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>content_copy</span>
                </button>
              </div>
            </div>
            <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--blue)', color: '#fff', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>

          {/* Receipt Item 3 (Historical) */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Election Name
                </span>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '4px 0' }}>
                  Sports Committee Referendum
                </h4>
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 99, color: 'var(--blue)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Verified Receipt</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Date &amp; Time
                </span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>May 05, 2026</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>11:58 EAT</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Transaction ID
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '8px 8px 8px 16px', borderRadius: 12 }}>
                <code style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f4a5e9f8b7c6d5a4e3f2b1a0d
                </code>
                <button style={{ flexShrink: 0, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>content_copy</span>
                </button>
              </div>
            </div>
            <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--blue)', color: '#fff', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Visual: Data Integrity Visualization */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, background: 'linear-gradient(135deg, var(--blue), #1e293b)', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 48px', boxShadow: 'var(--sh-blue)' }}>
          <div style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.15, pointerEvents: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 280, color: '#fff' }}>
              security
            </span>
          </div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h5 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 16px 0', lineHeight: 1.1 }}>
              Audit-Ready Democracy
            </h5>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', maxWidth: 600, lineHeight: 1.5, margin: 0 }}>
              Your data is secured using military-grade encryption. Every vote
              cast at Cavendish University is timestamped and hashed to ensure
              the absolute integrity of our electoral system.
            </p>
          </div>
        </div>

        {/* Footer-like support link */}
        <div style={{ textAlign: 'center', paddingBottom: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
            Having trouble verifying your receipt?{" "}
            <Link href="/voter/rules#privacy" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>
              Contact System Audit
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
