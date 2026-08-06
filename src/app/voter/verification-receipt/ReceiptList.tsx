'use client';

import { useState } from 'react';

export type ReceiptListRow = {
  id: string;
  election_title: string;
  receipt_hash: string;
  created_at: string;
  voter_email: string;
};

export function ReceiptList({ receipts }: { receipts: ReceiptListRow[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const downloadPdf = async (receipt: ReceiptListRow) => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById(`receipt-${receipt.id}`);

    if (!element) return;

    html2pdf()
      .set({
        margin: 12,
        filename: `e-Vote-Receipt-${receipt.election_title.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  const copyReceipt = async (receiptHash: string, id: string) => {
    await navigator.clipboard.writeText(receiptHash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  if (!receipts.length) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, boxShadow: 'var(--sh-sm)' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '1.4rem', fontWeight: 800 }}>No receipts yet</h3>
        <p style={{ margin: 0, color: 'var(--text-2)', lineHeight: 1.7 }}>
          Once you cast a ballot in an active election, your official verification receipt will appear here.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {receipts.map((receipt) => (
        <div key={receipt.id} id={`receipt-${receipt.id}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <div>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Election Name
              </p>
              <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{receipt.election_title}</h4>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'var(--surface-3)', color: 'var(--blue)', fontWeight: 700, marginTop: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                Verified Receipt
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Date & Time
              </p>
              <p style={{ margin: 0, fontWeight: 700 }}>{new Date(receipt.created_at).toLocaleString()}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Voter Identifier
            </p>
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px', fontWeight: 600 }}>{receipt.voter_email}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Ballot Proof
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px' }}>
              <code style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'monospace', fontSize: 14, fontWeight: 700 }}>{receipt.receipt_hash}</code>
              <button
                onClick={() => copyReceipt(receipt.receipt_hash, receipt.id)}
                style={{ flexShrink: 0, border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontWeight: 700 }}
              >
                {copiedId === receipt.id ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div style={{ paddingTop: 26, borderTop: '1px solid var(--border)', marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(receipt, null, 2));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download", `e-Vote-Receipt-${receipt.id}.json`);
                document.body.appendChild(downloadAnchorNode); // required for firefox
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', border: '1px solid var(--border)', borderRadius: 12, background: 'transparent', color: 'var(--text-1)', fontWeight: 800, cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined">data_object</span>
              Download JSON
            </button>
            <button
              onClick={() => downloadPdf(receipt)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', border: 'none', borderRadius: 12, background: 'var(--blue)', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
