export default function UsersAndRoles() {
  return (
    <div className="flex-1 max-w-max-width mx-auto w-full space-y-6 lg:space-y-8 pt-2">

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm mb-2 section-card">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
              shield_person
            </span>
            <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
              Access Control
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
            User & Role Management
          </h1>
          <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
            Manage administrator accounts and RBAC role permissions.
          </p>
        </div>
      </div>

      {/* Hero Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl shadow-sm card-hover">
          <p className="text-label-md text-outline mb-1 uppercase tracking-widest leading-tight">Total Admin Users</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-2xl lg:text-display font-display text-primary">24</h3>
            <span className="text-on-tertiary-container text-body-md font-bold mb-1 hidden sm:block">+2 this month</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl shadow-sm card-hover">
          <p className="text-label-md text-outline mb-1 uppercase tracking-widest leading-tight">Active Sessions</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-2xl lg:text-display font-display text-primary">07</h3>
            <span className="text-secondary text-body-md font-bold mb-1 hidden sm:block">Real-time</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl shadow-sm card-hover">
          <p className="text-label-md text-outline mb-1 uppercase tracking-widest leading-tight">Defined Roles</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-2xl lg:text-display font-display text-primary">05</h3>
            <span className="text-outline text-body-md font-bold mb-1 hidden sm:block">RBAC Active</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary-container to-black border border-outline-variant p-4 lg:p-6 rounded-xl shadow-sm card-hover">
          <p className="text-label-md text-on-primary-container mb-1 uppercase tracking-widest leading-tight">System Integrity</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-2xl lg:text-display font-display text-on-primary">100%</h3>
            <span className="text-on-tertiary-container text-body-md font-bold mb-1 hidden sm:block">Verified</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="relative group flex-1 max-w-full sm:max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors text-[18px]">search</span>
          <input
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-body-md text-on-surface"
            placeholder="Search by name, email or role..."
            type="text"
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-surface-container-lowest border border-secondary text-secondary font-bold rounded-lg hover:bg-secondary-fixed transition-all text-body-md flex items-center justify-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all text-body-md flex items-center justify-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add User
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-gutter">
        {/* User List Table */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
            <div className="px-4 lg:px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
              <h4 className="text-headline-md font-headline-md text-on-surface">Administrative Users</h4>
              <span className="text-label-md text-outline">1-8 of 24</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[480px]">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant font-bold uppercase tracking-wider">User Details</th>
                    <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Role</th>
                    <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Status</th>
                    <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant font-bold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {[
                    { initials: "KM", bg: "bg-secondary-fixed-dim", name: "Kasumba Michael", email: "m.kasumba@cavendish.ac.ug", role: "Super Admin", roleColor: "bg-primary-fixed text-on-primary-fixed", active: true },
                    { initials: "JN", bg: "bg-tertiary-fixed-dim", name: "Joy Namubiru", email: "j.namubiru@cavendish.ac.ug", role: "Regional Coordinator", roleColor: "bg-secondary-fixed text-on-secondary-fixed", active: true },
                    { initials: "AO", bg: "bg-surface-variant", name: "Allan Okello", email: "a.okello@audit.gov.ug", role: "Auditor", roleColor: "bg-surface-variant text-on-surface-variant", active: false },
                    { initials: "SM", bg: "bg-secondary-fixed-dim", name: "Sarah Musoke", email: "s.musoke@cavendish.ac.ug", role: "Regional Coordinator", roleColor: "bg-secondary-fixed text-on-secondary-fixed", active: true },
                  ].map((user) => (
                    <tr key={user.email} className="hover:bg-surface-container-low transition-all hover:translate-x-1 duration-200 ease-out cursor-pointer">
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full ${user.bg} flex items-center justify-center font-bold text-on-secondary-fixed text-xs flex-shrink-0`}>
                            {user.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-on-surface text-body-md truncate">{user.name}</p>
                            <p className="text-label-md text-outline truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className={`px-2 py-0.5 lg:px-3 lg:py-1 ${user.roleColor} rounded-full text-label-md font-bold uppercase whitespace-nowrap`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${user.active ? 'bg-on-tertiary-container' : 'bg-outline'}`}></span>
                          <span className={`text-body-md font-medium ${user.active ? 'text-on-tertiary-container' : 'text-outline'}`}>
                            {user.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <button className="text-outline hover:text-secondary p-1 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="text-outline hover:text-error p-1 transition-colors ml-1">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 lg:px-6 py-4 bg-surface-container-low text-center border-t border-outline-variant">
              <button className="text-secondary font-bold text-body-md hover:underline">
                View All Administrators
              </button>
            </div>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col card-hover">
            <div className="px-4 lg:px-6 py-4 border-b border-outline-variant bg-surface-container-low/50">
              <h4 className="text-headline-md font-headline-md text-on-surface">Role Permissions</h4>
              <p className="text-label-md text-outline">RBAC Configuration</p>
            </div>
            <div className="p-4 lg:p-6 space-y-4 flex-1">
              <div>
                <label className="text-label-md font-bold uppercase text-outline block mb-2">Select Role</label>
                <div className="relative">
                  <select className="w-full p-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md outline-none focus:ring-2 focus:ring-secondary text-on-surface appearance-none pr-8">
                    <option>Super Admin</option>
                    <option>Regional Coordinator</option>
                    <option>Auditor</option>
                    <option>Election Official</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[16px]">expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: "how_to_vote", label: "Manage Elections", granted: true },
                  { icon: "group", label: "User Management", granted: true },
                  { icon: "analytics", label: "View Real-time Results", granted: true },
                  { icon: "receipt_long", label: "Audit Log Export", granted: true },
                  { icon: "settings_suggest", label: "Core System Settings", granted: false },
                ].map((perm) => (
                  <div
                    key={perm.label}
                    className={`p-3 rounded-lg border border-outline-variant flex items-center justify-between transition-all ${!perm.granted ? 'opacity-50 bg-surface-container' : 'hover:bg-surface-container-low'}`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <span className={`material-symbols-outlined text-[18px] ${perm.granted ? 'text-secondary' : 'text-outline'}`}>{perm.icon}</span>
                      <span className="text-body-md font-semibold text-on-surface">{perm.label}</span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[18px] ${perm.granted ? 'text-on-tertiary-container' : 'text-error'}`}
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {perm.granted ? 'check_circle' : 'cancel'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 lg:p-6 bg-surface-container-low border-t border-outline-variant">
              <button className="w-full py-2.5 lg:py-3 bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95">
                <span className="material-symbols-outlined text-[18px]">edit_square</span>
                Modify Role Permissions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-6 lg:p-8 rounded-2xl bg-surface-container-highest border border-outline-variant relative overflow-hidden card-hover">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[80px] lg:text-[120px]">security</span>
        </div>
        <div className="relative z-10">
          <h4 className="text-headline-md font-bold mb-2 text-on-surface">Immutable Security Protocols</h4>
          <p className="text-body-md lg:text-body-lg text-on-surface-variant max-w-2xl mb-5 lg:mb-6">
            All administrative actions are cryptographically signed and stored in the audit trail. These records cannot be altered or deleted by any user, including Super Admins.
          </p>
          <div className="flex flex-wrap gap-3 lg:gap-4">
            <div className="flex items-center gap-2 text-label-md font-bold text-secondary uppercase tracking-widest bg-surface-container-lowest px-3 lg:px-4 py-2 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              MFA Enforcement
            </div>
            <div className="flex items-center gap-2 text-label-md font-bold text-secondary uppercase tracking-widest bg-surface-container-lowest px-3 lg:px-4 py-2 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-[18px]">history_edu</span>
              Digital Signatures
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
