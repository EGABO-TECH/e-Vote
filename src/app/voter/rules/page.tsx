export default function Rules() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 lg:px-6">
        <section className="mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-label-sm uppercase tracking-[0.2em] text-secondary-container font-bold mb-2">
                Policy Hub
              </p>
              <h1 className="text-headline-lg font-bold text-on-surface">
                Privacy Policy, Election Rules, and Terms of Service
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-on-surface-variant leading-relaxed">
                Transparent, secure, and accessible governance for every Cavendish
                University voter. This page brings together the policy suite used
                by the e-Vote platform.
              </p>
            </div>
            <div className="rounded-3xl bg-surface-container-highest border border-outline-variant/60 p-6 shadow-sm w-full md:w-auto">
              <p className="text-label-sm uppercase tracking-[0.2em] text-secondary-container font-semibold mb-2">
                Last Updated
              </p>
              <p className="text-headline-md font-bold text-on-surface">July 2026</p>
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
              e-Vote collects voter registration and authentication data necessary
              to provide secure online voting services. We process student
              identifiers, email addresses, and voting activity only for election
              administration, audit, and security purposes.
            </p>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Data Collection
                </h3>
                <ul className="list-disc list-outside ml-5 text-base leading-relaxed space-y-3 text-on-surface-variant">
                  <li>Student identifiers, email, and verification receipts.</li>
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
                  <li>Verify voter eligibility and prevent duplicate voting.</li>
                  <li>Support audit trails and election integrity reviews.</li>
                  <li>Send election notifications and access updates.</li>
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
                    Voters may request corrections to their contact information.
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
                  Standards each voter and candidate must follow.
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
                  Voter Eligibility
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Only currently registered Cavendish University students may
                  vote. Eligibility is confirmed by the Registrar and validated
                  through the authentication process before ballot access is
                  granted.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Voting Process
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Voting occurs only during the approved election window. Each
                  voter may submit one ballot per election, and votes are sealed
                  immediately after confirmation to preserve ballot secrecy.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Fair Conduct
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Candidates and voters must avoid coercion, vote buying, or
                  sharing of unauthorized campaign materials. Any violation may
                  result in disqualification or disciplinary action.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Results & Appeals
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Election results are certified by the University Electoral
                  Commission. Disputes may be reported through the official
                  appeals process within three business days after publication of
                  results.
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
                  The rules for using the e-Vote platform.
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-on-surface mb-8">
              By using e-Vote, you agree to these terms of service. The platform
              is provided to support student voting at Cavendish University, and
              access is limited to authorized users in good standing.
            </p>
            <div className="space-y-6">
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Access & Use
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Users must access the platform only with their assigned
                  credentials. Unauthorized sharing of login information or
                  attempts to breach the system are strictly prohibited.
                </p>
              </div>
              <div className="bg-surface-container-high/30 p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xl font-bold text-primary mb-3">
                  User Responsibilities
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  Voters are responsible for ensuring their account details are
                  correct and for reporting any security concerns immediately. The
                  platform is intended for legitimate election participation only.
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
