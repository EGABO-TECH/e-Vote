export default function AuditLogs() {
  return (
    <div className="flex-grow max-w-max-width mx-auto w-full space-y-6 lg:space-y-8 pt-2">

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm mb-2 section-card">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
              history_edu
            </span>
            <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
              Compliance
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
            System Audit Logs
          </h1>
          <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
            Every administrative action is recorded with cryptographic integrity.
          </p>
        </div>
      </div>

      {/* Audit Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-gutter">
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 lg:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm card-hover min-h-[200px]">
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-display font-display text-primary mb-2">Immutable Ledger</h2>
            <p className="text-body-md lg:text-body-lg text-on-surface-variant max-w-md">
              Monitor access patterns and configuration changes across the eVote ecosystem.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 lg:gap-4">
              <div className="bg-surface-container p-3 lg:p-4 rounded-lg border border-outline-variant">
                <p className="text-label-md text-outline mb-1">TOTAL EVENTS (24H)</p>
                <p className="text-headline-lg font-headline-lg text-primary">1,284</p>
              </div>
              <div className="bg-surface-container p-3 lg:p-4 rounded-lg border border-outline-variant">
                <p className="text-label-md text-outline mb-1">SECURITY ALERTS</p>
                <p className="text-headline-lg font-headline-lg text-error">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-primary text-white rounded-xl p-5 lg:p-8 flex flex-col justify-between shadow-sm card-hover">
          <div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 lg:mb-6">
              <span className="material-symbols-outlined text-white text-[22px] lg:text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>shield_with_heart</span>
            </div>
            <h3 className="text-headline-md font-headline-md mb-2">Compliance Status</h3>
            <p className="text-body-md text-white/70">
              Fully compliant with UEC security protocols as of 2026-10-15.
            </p>
          </div>
          <button className="w-full mt-6 bg-secondary-container text-white py-2.5 lg:py-3 rounded-lg font-label-md hover:bg-secondary-container/90 transition-all flex items-center justify-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Full Audit Trail
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 lg:p-6 shadow-sm card-hover">
        <div className="flex flex-wrap gap-3 lg:gap-4 items-end">
          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-label-md text-on-surface-variant px-1">Search Action or Admin</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors text-[18px]">search</span>
              <input
                className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none text-body-md text-on-surface"
                placeholder="Filter by keyword..."
                type="text"
              />
            </div>
          </div>
          <div className="w-full sm:w-40 space-y-1.5">
            <label className="text-label-md text-on-surface-variant px-1">Severity</label>
            <div className="relative">
              <select className="w-full pl-3 pr-8 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary outline-none text-body-md appearance-none text-on-surface">
                <option>All Levels</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High (Critical)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[16px]">expand_more</span>
            </div>
          </div>
          <div className="w-full sm:w-40 space-y-1.5">
            <label className="text-label-md text-on-surface-variant px-1">Event Type</label>
            <div className="relative">
              <select className="w-full pl-3 pr-8 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary outline-none text-body-md appearance-none text-on-surface">
                <option>All Events</option>
                <option>Security</option>
                <option>Config Change</option>
                <option>User Access</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[16px]">expand_more</span>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <button className="bg-primary text-white px-4 lg:px-6 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all whitespace-nowrap">
              Apply Filters
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container px-3 py-2 rounded-lg font-label-md transition-all">
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* High-Density Data Table */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Timestamp</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Event Type</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Administrator</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Action Details</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">IP Address</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">2026-10-24 14:22:05</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Config Change</span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 rounded-full bg-surface-container-highest flex-shrink-0"></div>
                    <span className="text-body-md font-semibold text-primary whitespace-nowrap">K. Mukasa (SUP-01)</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface-variant max-w-[200px] truncate">Updated 'voter_registration_cutoff' to 2026-11-01</td>
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">192.168.1.104</td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center text-on-tertiary-container gap-1 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="text-label-md">Success</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">2026-10-24 14:18:42</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Security</span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 rounded-full bg-surface-container-highest flex-shrink-0"></div>
                    <span className="text-body-md font-semibold text-primary whitespace-nowrap">System Auth</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface-variant max-w-[200px] truncate">Brute-force attempt: 3 failed logins for 'J. Doe'</td>
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">45.76.102.15</td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center text-error gap-1 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[16px]">block</span>
                    <span className="text-label-md">Blocked</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">2026-10-24 13:55:12</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">User Access</span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 rounded-full bg-surface-container-highest flex-shrink-0"></div>
                    <span className="text-body-md font-semibold text-primary whitespace-nowrap">S. Nakato (SUP-04)</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface-variant max-w-[200px] truncate">Login session established (Token: CU-8821)</td>
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">192.168.1.15</td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center text-on-tertiary-container gap-1 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="text-label-md">Success</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">2026-10-24 13:40:01</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Offline Sync</span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 rounded-full bg-surface-container-highest flex-shrink-0"></div>
                    <span className="text-body-md font-semibold text-primary whitespace-nowrap">Batch Worker A</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface-variant max-w-[200px] truncate">Synchronized 142 records from Station CU-NORTH</td>
                <td className="px-4 lg:px-6 py-4 text-body-md font-mono text-on-surface whitespace-nowrap">10.0.4.22</td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex items-center text-on-tertiary-container gap-1 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="text-label-md">Success</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 lg:px-6 py-4 bg-surface-container-lowest border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-label-md text-on-surface-variant">Showing 1 to 4 of 1,284 results</span>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <button className="p-1.5 lg:p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-all text-on-surface">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-9 h-9 bg-secondary-container text-on-secondary-container rounded-lg text-label-md font-bold">1</button>
            <button className="w-9 h-9 border border-outline-variant rounded-lg text-label-md hover:bg-surface-container transition-all text-on-surface">2</button>
            <button className="w-9 h-9 border border-outline-variant rounded-lg text-label-md hover:bg-surface-container transition-all text-on-surface">3</button>
            <span className="px-1 text-on-surface">...</span>
            <button className="w-9 h-9 border border-outline-variant rounded-lg text-label-md hover:bg-surface-container transition-all text-on-surface">321</button>
            <button className="p-1.5 lg:p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-all text-on-surface">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
