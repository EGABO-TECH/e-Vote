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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
        {/* Hero Search Section */}
        <section style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
          <div style={{ position: 'absolute', top: 0, left: '25%', width: 256, height: 256, background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(48px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 256, height: 256, background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', filter: 'blur(48px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 10, padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800, margin: '0 auto' }}>
            <div style={{ alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>support_agent</span>
              Help Centre
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, textShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              How can we help<br />you today?
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Access 24/7 support resources and guides to ensure your voice is
              heard during the e-Vote process.
            </p>
            {/* Search Bar */}
            <div style={{ position: 'relative', marginTop: 16, maxWidth: 600, margin: '16px auto 0 auto', width: '100%' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 22, pointerEvents: 'none' }}>
                search
              </span>
              <input
                style={{ width: '100%', padding: '16px 48px 16px 56px', borderRadius: 16, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', outline: 'none', fontSize: 16, fontWeight: 500, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                placeholder="Search: 'How to vote', 'Forgot PIN'..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
                </button>
              )}
            </div>
            {/* Quick suggestion chips */}
            {!searchQuery && (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, paddingTop: 8 }}>
                {["Forgot PIN", "Eligibility", "Anonymous vote", "Receipt"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchQuery(chip)}
                    style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Support Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Video Guides */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>
                Instructional Videos
              </h3>
              <a href="#" style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                View all videos
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
              <div style={{ background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
                <div style={{ aspectRatio: '16/9', background: 'var(--surface-2)', position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    alt="A Beginner's Guide to e-Voting thumbnail"
                    src="/logo.svg"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 48 }}>play_circle</span>
                  </div>
                  <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>2:45</span>
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 4px 0' }}>A Beginner's Guide to e-Voting</p>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>Step-by-step walkthrough for first-time voters.</p>
                </div>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
                <div style={{ aspectRatio: '16/9', background: 'var(--surface-2)', position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    alt="Ensuring Your Vote is Secure thumbnail"
                    src="/logo.svg"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 48 }}>play_circle</span>
                  </div>
                  <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>1:20</span>
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 4px 0' }}>Ensuring Your Vote is Secure</p>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>Understanding Supabase verification and security.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & UEC Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Contact Support</h3>
          <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: 'rgba(59, 130, 246, 0.05)', borderRadius: 8, border: '1px solid rgba(59, 130, 246, 0.1)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 32 }}>support_agent</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Live Chat Support</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>Available: 8AM - 6PM</p>
              </div>
              <button style={{ marginLeft: 'auto', background: 'var(--blue)', color: '#fff', padding: '8px 16px', borderRadius: 99, fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer' }}>
                Chat
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>UEC Official Contacts</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>mail</span>
                <p style={{ fontSize: 14, color: 'var(--text-1)', margin: 0 }}>support@university.edu</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>call</span>
                <p style={{ fontSize: 14, color: 'var(--text-1)', margin: 0 }}>+256 (0) 414 123 456</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>location_on</span>
                <p style={{ fontSize: 14, color: 'var(--text-1)', margin: 0 }}>Student Affairs Office, Ggaba Rd</p>
              </div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 0 }} />
            <button style={{ width: '100%', padding: '12px', background: 'var(--text-1)', color: 'var(--surface)', borderRadius: 8, fontWeight: 700, fontSize: 14, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
              <span className="material-symbols-outlined">description</span>
              Submit Support Ticket
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Frequently Asked Questions</h3>
            {searchQuery && (
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0 }}>
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--text-3)', marginBottom: 16 }}>search_off</span>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 8px 0' }}>No results found</h4>
              <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 400, margin: '0 auto' }}>
                No FAQs match "{searchQuery}". Try different keywords or{" "}
                <button onClick={() => setSearchQuery("")} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                  clear your search
                </button>
                .
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filteredFaqs.slice(0, Math.ceil(filteredFaqs.length / 2)).map((item, idx) => (
                  <details key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, cursor: 'pointer', listStyle: 'none' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{item.question}</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>expand_more</span>
                    </summary>
                    <div style={{ padding: '0 20px 20px 20px', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, borderTop: '1px solid var(--border)' }}>
                      <div style={{ marginTop: 16 }}>{item.answer}</div>
                    </div>
                  </details>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filteredFaqs.slice(Math.ceil(filteredFaqs.length / 2)).map((item, idx) => (
                  <details key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, cursor: 'pointer', listStyle: 'none' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{item.question}</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>expand_more</span>
                    </summary>
                    <div style={{ padding: '0 20px 20px 20px', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, borderTop: '1px solid var(--border)' }}>
                      <div style={{ marginTop: 16 }}>{item.answer}</div>
                    </div>
                  </details>
                ))}
                {/* Didn't find what you need card */}
                {!searchQuery && (
                  <div style={{ padding: 20, background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 32 }}>support_agent</span>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: '0 0 4px 0' }}>Didn't find what you need?</h4>
                      <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Contact the Help Desk directly
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
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
