export default function Rules() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0 80px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
        <section style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 8px 0' }}>
                Policy Hub
              </p>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-1)', margin: 0, lineHeight: 1.1 }}>
                Privacy Policy, Election Rules, and Terms of Service
              </h1>
              <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 600, margin: '16px 0 0 0', lineHeight: 1.6 }}>
                Transparent, secure, and accessible governance for every Cavendish
                University voter. This page brings together the policy suite used
                by the e-Vote platform.
              </p>
            </div>
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--sh-sm)' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 8px 0' }}>
                Last Updated
              </p>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>July 2026</p>
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
              e-Vote collects voter registration and authentication data necessary
              to provide secure online voting services. We process student
              identifiers, email addresses, and voting activity only for election
              administration, audit, and security purposes.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 16px 0' }}>
                  Data Collection
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Student identifiers, email, and verification receipts.</li>
                  <li>Ballot submissions are stored anonymously once cast.</li>
                  <li>System performance data is collected to maintain availability and security.</li>
                </ul>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 16px 0' }}>
                  Use of Data
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Verify voter eligibility and prevent duplicate voting.</li>
                  <li>Support audit trails and election integrity reviews.</li>
                  <li>Send election notifications and access updates.</li>
                </ul>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 16px 0' }}>
                  Security & Rights
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Data is secured with industry-standard encryption and access controls.</li>
                  <li>Voters may request corrections to their contact information.</li>
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
                  Standards each voter and candidate must follow.
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
                  Voter Eligibility
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Only currently registered Cavendish University students may
                  vote. Eligibility is confirmed by the Registrar and validated
                  through the authentication process before ballot access is
                  granted.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Voting Process
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Voting occurs only during the approved election window. Each
                  voter may submit one ballot per election, and votes are sealed
                  immediately after confirmation to preserve ballot secrecy.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Fair Conduct
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Candidates and voters must avoid coercion, vote buying, or
                  sharing of unauthorized campaign materials. Any violation may
                  result in disqualification or disciplinary action.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Results & Appeals
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Election results are certified by the University Electoral
                  Commission. Disputes may be reported through the official
                  appeals process within three business days after publication of
                  results.
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
                  The rules for using the e-Vote platform.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)', marginBottom: 32 }}>
              By using e-Vote, you agree to these terms of service. The platform
              is provided to support student voting at Cavendish University, and
              access is limited to authorized users in good standing.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  Access & Use
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Users must access the platform only with their assigned
                  credentials. Unauthorized sharing of login information or
                  attempts to breach the system are strictly prohibited.
                </p>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', margin: '0 0 12px 0' }}>
                  User Responsibilities
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Voters are responsible for ensuring their account details are
                  correct and for reporting any security concerns immediately. The
                  platform is intended for legitimate election participation only.
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
