export default function Rules() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 lg:px-6">
        <section className="mb-10">
          <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm section-card">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
                    policy
                  </span>
                  <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
                    Policy Hub
                  </p>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
                  Privacy Policy, Election Rules, and Terms of Service
                </h1>
                <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                  Transparent, secure, and accessible governance for every Cavendish University administrator. This page brings together the policy suite used by the e-Vote platform.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-container-highest/50 border border-outline-variant/60 p-5 shadow-sm w-full md:w-auto backdrop-blur-sm self-start mt-4 md:mt-0">
                <p className="text-label-sm uppercase tracking-widest text-secondary font-bold mb-1">
                  Last Updated
                </p>
                <p className="text-headline-sm font-bold text-on-surface">July 2026</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8">
          <article
            id="privacy"
            className="section-card bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 lg:p-10 scroll-mt-28 soft-shadow"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/30 pb-4">
              <span className="material-symbols-outlined text-secondary-container text-4xl">
                privacy_tip
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
                  Privacy Policy
                </h2>
                <p className="text-base text-outline font-medium mt-1">
                  How we collect, use, and protect personal data.
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-on-surface mb-8">
              e-Vote collects registration and authentication data necessary
              to provide secure online voting services. We process user
              identifiers, email addresses, and administrative activity only for election
              administration, audit, and security purposes.
            </p>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Data Collection
                </h3>
                <ul className="list-disc list-outside ml-5 text-base leading-relaxed space-y-3 text-on-surface-variant">
                  <li>User identifiers, email, and verification receipts.</li>
                  <li>
                    Ballot submissions are stored anonymously once cast.
                  </li>
                  <li>
                    System performance data is collected to maintain availability
                    and security.
                  </li>
                </ul>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Use of Data
                </h3>
                <ul className="list-disc list-outside ml-5 text-base leading-relaxed space-y-3 text-on-surface-variant">
                  <li>Verify eligibility and prevent unauthorized access.</li>
                  <li>Support audit trails and election integrity reviews.</li>
                  <li>Send system notifications and access updates.</li>
                </ul>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Security & Rights
                </h3>
                <ul className="list-disc list-outside ml-5 text-base leading-relaxed space-y-3 text-on-surface-variant">
                  <li>
                    Data is secured with industry-standard encryption and access
                    controls.
                  </li>
                  <li>
                    Users may request corrections to their contact information.
                  </li>
                  <li>
                    Information is retained only as long as necessary for
                    election administration.
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <article
            id="rules"
            className="section-card bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 lg:p-10 scroll-mt-28 soft-shadow"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/30 pb-4">
              <span className="material-symbols-outlined text-secondary-container text-4xl">
                gavel
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
                  Election Rules
                </h2>
                <p className="text-base text-outline font-medium mt-1">
                  Standards each participant must follow.
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-on-surface mb-8">
              These election rules ensure a fair, inclusive, and auditable
              voting process. All participants must comply with the University
              Electoral Commission requirements and the e-Vote platform terms.
            </p>
            <div className="space-y-6">
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  System Access
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Only authorized Cavendish University administrators may
                  manage elections. Access is provisioned by the Electoral Commission
                  and validated through the authentication process.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Administrative Process
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  System configurations occur only during approved windows.
                  All administrative actions are logged in the immutable audit
                  trail to preserve transparency and system integrity.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Fair Conduct
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Administrators must act impartially. Any violation, unauthorized
                  configuration change, or system abuse may result in immediate
                  revocation of access and disciplinary action.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Results & Auditing
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Election results are automatically tallied and certified by the
                  University Electoral Commission. Audit logs are available for
                  review to ensure complete transparency of the voting process.
                </p>
              </div>
            </div>
          </article>

          <article
            id="terms"
            className="section-card bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 lg:p-10 scroll-mt-28 soft-shadow"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/30 pb-4">
              <span className="material-symbols-outlined text-secondary-container text-4xl">
                article
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
                  Terms of Service
                </h2>
                <p className="text-base text-outline font-medium mt-1">
                  The rules for using the e-Vote administration platform.
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-on-surface mb-8">
              By using the e-Vote admin portal, you agree to these terms of service.
              The platform is provided to support election management at Cavendish
              University, and access is limited to authorized administrators.
            </p>
            <div className="space-y-6">
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Access & Use
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Administrators must access the platform only with their assigned
                  credentials. Unauthorized sharing of login information or
                  attempts to breach the system are strictly prohibited.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  User Responsibilities
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Administrators are responsible for ensuring system configurations are
                  correct and for reporting any security concerns immediately. The
                  platform is intended for legitimate election administration only.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Intellectual Property
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  All design, content, and software on the e-Vote platform are
                  owned or licensed by Cavendish University. Reuse or distribution
                  without written permission is prohibited.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Legal Limitations
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
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
