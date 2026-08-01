'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SupportPage() {
  const [query, setQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: 'How do I edit my manifesto?', a: 'Navigate to the "Manifesto" section in your sidebar. All changes go through an EC review before going live.' },
    { q: 'When will my edits be reviewed?', a: 'The Electoral Commission typically reviews manifesto changes within 24 hours during the campaign period.' },
    { q: 'Can I change my running position?', a: 'Position changes must be submitted as a formal request via the Electoral Commission office. Contact them directly below.' },
    { q: 'How do I verify my profile is complete?', a: 'Your Dashboard displays a "Dossier Status" card. It should show 100% for your profile to be public.' },
    { q: 'What happens after the election closes?', a: 'Results are tabulated by the Electoral Commission and announced within 6 hours of the polls closing.' },
    { q: 'How is my manifesto data secured?', a: 'All data is stored on a Supabase secured ledger, encrypted in transit and at rest, with tamper-proof audit logs.' },
  ];

  const filteredFaqs = query
    ? faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()))
    : faqs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setTicketForm({ subject: '', message: '' });
  };

  return (
    <div className={styles.container}>
      
      {/* Help Hero */}
      <div className={styles.heroBanner}>
        <h1 className={styles.heroTitle}>'How can we help you today?</h1>
        <p className={styles.heroSubtitle}>Access candidate support resources during the election period.</p>
        <div className={styles.searchBar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search guides: 'Manifesto edit', 'EC Review', 'System Security'..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Grid: FAQs + Contact */}
      <div className={styles.contentGrid}>
        
        {/* FAQ Section */}
        <div>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </details>
            )) : (
              <div className={styles.noResults}>No results found for "{query}". Try a different keyword or submit a ticket below.</div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Contact Card */}
          <div className={styles.contactCard}>
            <h3 className={styles.contactTitle}>Contact Support</h3>

            <div className={styles.liveChatRow}>
              <div className={styles.liveChatInfo}>
                <div className={styles.liveChatLabel}>Live Chat Support</div>
                <div className={styles.liveChatSub}>Available: 8AM – 6PM</div>
              </div>
              <button className={styles.chatBtn} onClick={() => window.open('mailto:ec@evote.example.ac.ug?subject=Live%20Chat%20Support%20Request', '_blank')}>Chat</button>
            </div>

            <div className={styles.divider} />

            <div className={styles.officialContacts}>
              <div className={styles.contactsLabel}>EC OFFICIAL CONTACTS</div>
              <div className={styles.contactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                ec@evote.example.ac.ug
              </div>
              <div className={styles.contactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.08 6.08l1.02-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +256 (0) 414 123 456
              </div>
              <div className={styles.contactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
                Student Affairs Office
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className={styles.privacyCard}>
            <div className={styles.privacyIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <div className={styles.privacyTitle}>Privacy Note</div>
              <p className={styles.privacyText}>Your campaign data is anonymous and encrypted. Not even system administrators can view private correspondence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Support Ticket */}
      <div className={styles.ticketCard}>
        <h2 className={styles.ticketTitle}>Submit a Support Ticket</h2>
        <p className={styles.ticketSubtitle}>Can't find your answer above? Our EC support team will respond within 24 hours.</p>
        {submitted && (
          <div className={styles.successAlert}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Ticket submitted! We'll respond within 24 hours.
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.ticketForm}>
          <input
            type="text"
            className={styles.ticketInput}
            placeholder="Subject"
            value={ticketForm.subject}
            onChange={e => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
            required
          />
          <textarea
            className={styles.ticketTextarea}
            placeholder="Describe your issue in detail..."
            rows={5}
            value={ticketForm.message}
            onChange={e => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Submit Ticket
          </button>
        </form>
      </div>

    </div>
  );
}
