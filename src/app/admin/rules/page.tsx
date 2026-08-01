export default function Rules() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
        <section style={{ marginBottom: 24 }}>
          <div style={{
            position: 'relative',
            background: 'var(--surface)',
            borderRadius: 24,
            padding: '32px 40px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--sh-md)',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>
                    policy
                  </span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    Policy Hub
                  </p>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>
                  Privacy Policy, Election Rules, and Terms of Service
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
                  Transparent, secure, and accessible governance for every Cavendish University administrator. This page brings together the policy suite used by the e-Vote platform.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--sh-sm)' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>
                  Last Updated
                </p>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>July 2026</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Privacy Policy */}
          <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 24, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--blue)' }}>
                privacy_tip
              </span>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>
                  Privacy Policy
                </h2>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-3)', margin: '8px 0 0 0' }}>
                  How we collect, use, and protect personal data.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)', marginBottom: 32 }}>
              e-Vote collects registration and authentication data necessary
              to provide secure online voting services. We process user
              identifiers, email addresses, and administrative activity only for election
              administration, audit, and security purposes.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 16px 0' }}>
                  Data Collection
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>User identifiers, email, and verification receipts.</li>
                  <li>Ballot submissions are stored anonymously once cast.</li>
                  <li>System performance data is collected to maintain availability and security.</li>
                </ul>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 16px 0' }}>
                  Use of Data
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Verify eligibility and prevent unauthorized access.</li>
                  <li>Support audit trails and election integrity reviews.</li>
                  <li>Send system notifications and access updates.</li>
                </ul>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 16px 0' }}>
                  Security & Rights
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Data is secured with industry-standard encryption and access controls.</li>
                  <li>Users may request corrections to their contact information.</li>
                  <li>Information is retained only as long as necessary for election administration.</li>
                </ul>
              </div>
            </div>
          </article>

          {/* Election Rules */}
          <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 24, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--blue)' }}>
                gavel
              </span>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>
                  Election Rules
                </h2>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-3)', margin: '8px 0 0 0' }}>
                  Standards each participant must follow.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)', marginBottom: 32 }}>
              These election rules ensure a fair, inclusive, and auditable
              voting process. All participants must comply with the University
              Electoral Commission requirements and the e-Vote platform terms.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  System Access
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Only authorized Cavendish University administrators may
                  manage elections. Access is provisioned by the Electoral Commission
                  and validated through the authentication process.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Administrative Process
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  System configurations occur only during approved windows.
                  All administrative actions are logged in the immutable audit
                  trail to preserve transparency and system integrity.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Fair Conduct
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Administrators must act impartially. Any violation, unauthorized
                  configuration change, or system abuse may result in immediate
                  revocation of access and disciplinary action.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Results & Auditing
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Election results are automatically tallied and certified by the
                  University Electoral Commission. Audit logs are available for
                  review to ensure complete transparency of the voting process.
                </p>
              </div>
            </div>
          </article>

          {/* Terms of Service */}
          <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 24, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--blue)' }}>
                article
              </span>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>
                  Terms of Service
                </h2>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-3)', margin: '8px 0 0 0' }}>
                  The rules for using the e-Vote administration platform.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)', marginBottom: 32 }}>
              By using the e-Vote admin portal, you agree to these terms of service.
              The platform is provided to support election management at Cavendish
              University, and access is limited to authorized administrators.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Access & Use
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Administrators must access the platform only with their assigned
                  credentials. Unauthorized sharing of login information or
                  attempts to breach the system are strictly prohibited.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  User Responsibilities
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Administrators are responsible for ensuring system configurations are
                  correct and for reporting any security concerns immediately. The
                  platform is intended for legitimate election administration only.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Intellectual Property
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  All design, content, and software on the e-Vote platform are
                  owned or licensed by Cavendish University. Reuse or distribution
                  without written permission is prohibited.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Legal Limitations
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  The system is provided &quot;as is&quot; for election
                  administration. Cavendish University is not liable for indirect
                  damages, and the platform is governed by Ugandan law and
                  University policy.
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
