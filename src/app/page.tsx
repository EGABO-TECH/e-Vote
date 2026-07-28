export default function Dashboard() {
  return (
    <div className="flex-grow space-y-6 lg:space-y-8">

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm mb-2 section-card">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
              monitoring
            </span>
            <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
              Operations Center
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
            Infrastructure Monitor
          </h1>
          <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
            Real-time operational oversight for the University Electoral Commission. Ensuring data integrity and terminal uptime across all active nodes.
          </p>
        </div>
      </div>

      {/* Hero Section - Bento Inspired */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 lg:p-8 border border-outline-variant shadow-sm relative overflow-hidden group card-hover">
          {/* Background Decor */}
          <div className="absolute -right-20 -bottom-20 w-64 lg:w-96 h-64 lg:h-96 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-700 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-on-tertiary-container/10 text-on-tertiary-container rounded-full mb-4">
              <span className="w-2 h-2 bg-on-tertiary-container rounded-full animate-pulse"></span>
              <span className="text-label-md font-bold uppercase tracking-wider">
                Infrastructure Status: ONLINE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-display font-display text-primary leading-tight mb-3 uppercase">
              2026 NODE MONITORING
            </h2>
            <p className="text-body-md lg:text-body-lg text-on-surface-variant max-w-lg">
              Ensuring data integrity, terminal uptime, and secure cryptographic handshakes across all active nodes.
            </p>
          </div>
        </div>

        {/* Secondary Hero Feature */}
        <div className="lg:col-span-4 bg-primary-container rounded-xl p-6 lg:p-8 border border-outline-variant shadow-sm text-on-primary relative overflow-hidden card-hover">
          <h4 className="text-label-md font-bold text-secondary-fixed tracking-[0.2em] mb-4 uppercase">
            Security Protocols
          </h4>
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-start gap-3 lg:gap-4">
              <span className="material-symbols-outlined text-secondary-fixed flex-shrink-0">verified_user</span>
              <div>
                <p className="font-bold text-body-md lg:text-body-lg">End-to-End Encryption</p>
                <p className="text-on-primary-container text-body-md">AES-256 active for all transit payloads.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 lg:gap-4">
              <span className="material-symbols-outlined text-secondary-fixed flex-shrink-0">lan</span>
              <div>
                <p className="font-bold text-body-md lg:text-body-lg">Mesh-Node Validation</p>
                <p className="text-on-primary-container text-body-md">P2P node verification cycles every 120ms.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <button className="w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-all py-2.5 rounded-lg font-bold text-label-md active:scale-95">
                View Security Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-5 lg:p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 lg:gap-6 hover:border-secondary transition-colors group card-hover">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-[24px] lg:text-[32px]">dns</span>
          </div>
          <div>
            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-1">Active Nodes</p>
            <h5 className="text-headline-lg font-bold text-primary">
              124 <span className="text-outline font-normal text-headline-md">/ 128</span>
            </h5>
            <p className="text-[10px] text-on-tertiary-container font-bold mt-1">96.8% Uptime</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-5 lg:p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 lg:gap-6 hover:border-secondary transition-colors group card-hover">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-[24px] lg:text-[32px]">speed</span>
          </div>
          <div>
            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-1">Throughput</p>
            <h5 className="text-headline-lg font-bold text-primary">
              8,420 <span className="text-outline font-normal text-headline-md">req/s</span>
            </h5>
            <p className="text-[10px] text-secondary font-bold mt-1">+12% Peak Surge</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-5 lg:p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 lg:gap-6 hover:border-secondary transition-colors group card-hover">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-[24px] lg:text-[32px]">cloud_sync</span>
          </div>
          <div>
            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-1">Sync Queue</p>
            <h5 className="text-headline-lg font-bold text-primary">
              42 <span className="text-outline font-normal text-headline-md">payloads</span>
            </h5>
            <p className="text-[10px] text-on-tertiary-container font-bold mt-1">Processing</p>
          </div>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden card-hover">
        <div className="p-4 lg:p-6 border-b border-outline-variant flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-surface-container-low">
          <h4 className="text-headline-md font-bold text-on-surface">Node Connectivity Status</h4>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 text-label-md font-bold bg-surface-container-lowest border border-outline-variant rounded-lg hover:bg-surface-container transition-all text-on-surface">
              Filter
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 text-label-md font-bold bg-primary text-on-primary rounded-lg hover:opacity-90 transition-all">
              Export Logs
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead className="bg-surface-container-low text-label-md text-outline uppercase tracking-wider">
              <tr>
                <th className="px-4 lg:px-6 py-4 font-bold">Node</th>
                <th className="px-4 lg:px-6 py-4 font-bold">Location</th>
                <th className="px-4 lg:px-6 py-4 font-bold">Latency</th>
                <th className="px-4 lg:px-6 py-4 font-bold">Last Sync</th>
                <th className="px-4 lg:px-6 py-4 font-bold">Status</th>
                <th className="px-4 lg:px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-2 h-2 bg-on-tertiary-container rounded-full flex-shrink-0"></div>
                    <span className="font-bold text-primary">CU-SI-001</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface">Main Campus</td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-tertiary-container">12ms</td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-outline">Just now</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-on-tertiary-container/10 text-on-tertiary-container uppercase">Verified</span>
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <button className="text-secondary hover:underline text-label-md">Diagnostic</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-2 h-2 bg-on-tertiary-container rounded-full flex-shrink-0"></div>
                    <span className="font-bold text-primary">CU-MC-042</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface">Mukono Campus</td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-tertiary-container">24ms</td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-outline">2m ago</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-on-tertiary-container/10 text-on-tertiary-container uppercase">Verified</span>
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <button className="text-secondary hover:underline text-label-md">Diagnostic</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-2 h-2 bg-error rounded-full animate-pulse flex-shrink-0"></div>
                    <span className="font-bold text-primary">CU-KGC-009</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface">Kingsgate Campus</td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-error">Timeout</td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-outline">14m ago</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container uppercase">Offline</span>
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <button className="text-secondary hover:underline text-label-md">Diagnostic</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
