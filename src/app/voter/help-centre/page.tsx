"use client";

import { useState, useMemo } from "react";

const FAQ_ITEMS = [
  {
    question: "How do I reset my voting PIN?",
    answer:
      "You can reset your PIN by clicking on the 'Forgot PIN' link on the login screen. A temporary code will be sent to your registered university email address. Follow the link to create a new 6-digit secure PIN.",
    tags: ["pin", "reset", "forgot", "login"],
  },
  {
    question: "Can I change my vote after casting it?",
    answer:
      "To ensure the integrity of the election, votes cannot be modified once they are submitted and cryptographically sealed on Supabase. Please review your selection carefully before confirming.",
    tags: ["vote", "change", "cast", "modify"],
  },
  {
    question: "Is my vote anonymous?",
    answer:
      "Yes. The system uses zero-knowledge proofs to verify your eligibility to vote without linking your identity to the specific candidates you select. Your privacy is guaranteed by system architecture.",
    tags: ["anonymous", "privacy", "security", "identity"],
  },
  {
    question: "System says I'm not eligible to vote. Why?",
    answer:
      "Eligibility is based on the current semester registration status provided by the Registrar's office. If you believe this is an error, please visit the UEC office with your current student ID and registration proof.",
    tags: ["eligible", "eligibility", "registration", "error"],
  },
  {
    question: "How to verify my vote receipt?",
    answer:
      "Go to 'My Verification Receipt' in the side menu. You will see a QR code and a transaction hash. You can use the UEC Audit Tool to verify that your hash is included in the final tally without revealing your vote.",
    tags: ["verify", "receipt", "transaction", "qr", "audit"],
  },
  {
    question: "What is System Security?",
    answer:
      "e-Vote uses end-to-end encryption and military-grade Supabase ledger hashing. Every vote is timestamped and immutably sealed. Our zero-knowledge architecture means no one — not even administrators — can see your individual vote.",
    tags: ["security", "encryption", "system", "supabase"],
  },
];

export default function HelpCentre() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.includes(q))
    );
  }, [searchQuery]);

  return (
    <>
      <div className="max-w-container-max mx-auto space-y-stack-lg">
        {/* Hero Search Section — redesigned with deep dark gradient */}
        <section className="relative rounded-2xl overflow-hidden text-center shadow-2xl"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
          {/* Decorative glow blobs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 py-16 px-6 md:px-12 space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              Help Centre
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              How can we help<br />you today?
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed">
              Access 24/7 support resources and guides to ensure your voice is
              heard during the e-Vote process.
            </p>
            {/* Search Bar */}
            <div className="relative mt-4 max-w-2xl mx-auto group">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-[22px] pointer-events-none">
                search
              </span>
              <input
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/40 border border-white/20 focus:border-white/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-lg text-base font-medium"
                placeholder="Search: 'How to vote', 'Forgot PIN', 'System Security'..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>
            {/* Quick suggestion chips */}
            {!searchQuery && (
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["Forgot PIN", "Eligibility", "Anonymous vote", "Receipt"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchQuery(chip)}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-sm hover:bg-white/20 hover:text-white transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Support Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Video Guides */}
          <div className="lg:col-span-2 space-y-stack-md">
            <div className="flex justify-between items-end">
              <h3 className="font-headline-md text-headline-md">
                Instructional Videos
              </h3>
              <a className="text-secondary font-label-md hover:underline" href="#">
                View all videos
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bento-card bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="aspect-video bg-surface-container relative group cursor-pointer">
                  <img
                    className="w-full h-full object-cover"
                    alt="A Beginner's Guide to e-Voting thumbnail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRN2Hq4wlwg5IGgwGzncm8n24U4cxN8vebejdZDkP29Lqv7sbp2f9BCF34dXPEPIQaG2InDSb7tEnRynEmEEnDvqKMlbl7jx5wky7hrqWknTy6gsRcbMsZfk-_d9205lZwmUeJpdb6ZEvUr20BMfWo0BAQhCtu85HwiWOu8HGuXY22cKSTjjsA2ObzmijZP7iNntWZ2F2CtsF9bCuxv1UOroi8nVeI6p_VlXwlxXjN6guiK9JTpDnwcGbr2SMb8XBfqoOJ4A9aHYo"
                  />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-on-primary text-5xl">
                      play_circle
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-primary/80 text-on-primary px-2 py-1 rounded text-label-sm">
                    2:45
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-body-md">
                    A Beginner&apos;s Guide to e-Voting
                  </p>
                  <p className="text-on-surface-variant text-label-sm">
                    Step-by-step walkthrough for first-time voters.
                  </p>
                </div>
              </div>
              <div className="bento-card bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="aspect-video bg-surface-container relative group cursor-pointer">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ensuring Your Vote is Secure thumbnail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEz_SmmIHzHXqwhglKv5Z2_uNwzxqidQED4cSoa5LNYaw8NRtU3Taz2TgR4DhnrUJ5i4mDpecVhViWUgFC5kK_FXZqPrtjqdTDkfB1PUxBSA8McLwT9Xqj0gAC456mcVsafxtS0IDwXAzFE8PsC41pMvnRfi8D5kytjkUIMYaaBe6eJvGG9etX9ru1EqR3d2SWHR-gvYe_ZpcoR9WetSv0UzmOH_v_qSXKq0Jsat05CLXbC1IIGCoYU6z7Cl_rzz9GszwnBzSzweg"
                  />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-on-primary text-5xl">
                      play_circle
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-primary/80 text-on-primary px-2 py-1 rounded text-label-sm">
                    1:20
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-body-md">
                    Ensuring Your Vote is Secure
                  </p>
                  <p className="text-on-surface-variant text-label-sm">
                    Understanding Supabase verification and security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & UEC Details */}
          <div className="space-y-stack-md">
            <h3 className="font-headline-md text-headline-md">Contact Support</h3>
            <div className="bento-card bg-white dark:bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  support_agent
                </span>
                <div>
                  <p className="font-bold text-label-md">Live Chat Support</p>
                  <p className="text-label-sm text-on-surface-variant">
                    Available: 8AM - 6PM
                  </p>
                </div>
                <button className="ml-auto bg-secondary text-on-secondary px-4 py-2 rounded-full font-label-sm active:scale-95 transition-all">
                  Chat
                </button>
              </div>
              <div className="space-y-3">
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider">
                  UEC Official Contacts
                </p>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">mail</span>
                  <p className="text-body-md">uec@cavendish.ac.ug</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">call</span>
                  <p className="text-body-md">+256 (0) 414 123 456</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">location_on</span>
                  <p className="text-body-md">Student Affairs Office, Ggaba Rd</p>
                </div>
              </div>
              <hr className="border-outline-variant/30" />
              <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold font-label-md hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">description</span>
                Submit Support Ticket
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-stack-md pb-20">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md">
              Frequently Asked Questions
            </h3>
            {searchQuery && (
              <p className="text-label-md text-on-surface-variant">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
              <span className="material-symbols-outlined text-[64px] text-outline mb-4 block">
                search_off
              </span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                No results found
              </h4>
              <p className="text-on-surface-variant text-body-md max-w-sm mx-auto">
                No FAQs match &quot;{searchQuery}&quot;. Try different keywords or{" "}
                <button onClick={() => setSearchQuery("")} className="text-secondary font-bold hover:underline">
                  clear your search
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {filteredFaqs.slice(0, Math.ceil(filteredFaqs.length / 2)).map((item, idx) => (
                  <details
                    key={idx}
                    className="faq-item group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden [&[open]_summary_.expand-icon]:rotate-180"
                  >
                    <summary className="flex justify-between items-center p-5 cursor-pointer list-none hover:bg-surface-container-low transition-colors gap-4">
                      <span className="font-bold text-body-md text-on-surface">
                        {item.question}
                      </span>
                      <span className="material-symbols-outlined expand-icon transition-transform flex-shrink-0 text-outline">
                        expand_more
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-on-surface text-body-md border-t border-outline-variant/20 pt-4 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
              <div className="space-y-4">
                {filteredFaqs.slice(Math.ceil(filteredFaqs.length / 2)).map((item, idx) => (
                  <details
                    key={idx}
                    className="faq-item group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden [&[open]_summary_.expand-icon]:rotate-180"
                  >
                    <summary className="flex justify-between items-center p-5 cursor-pointer list-none hover:bg-surface-container-low transition-colors gap-4">
                      <span className="font-bold text-body-md text-on-surface">
                        {item.question}
                      </span>
                      <span className="material-symbols-outlined expand-icon transition-transform flex-shrink-0 text-outline">
                        expand_more
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-on-surface text-body-md border-t border-outline-variant/20 pt-4 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
                {/* Didn't find what you need card */}
                {!searchQuery && (
                  <div className="p-5 bg-secondary/5 border border-secondary/10 rounded-xl flex items-center gap-4 transition-all hover:bg-secondary/10">
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      support_agent
                    </span>
                    <div className="text-left">
                      <h4 className="font-bold text-body-md text-on-surface">
                        Didn&apos;t find what you need?
                      </h4>
                      <button className="text-secondary font-bold hover:underline text-label-sm flex items-center gap-1 mt-1">
                        Contact the Help Desk directly
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
