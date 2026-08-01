'use client';

import { useState } from 'react';
import { updateUserRole, createUser } from './actions';

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  imageUrl: string;
};

export default function UsersClient({ initialUsers }: { initialUsers: UserData[] }) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [search, setSearch] = useState('');
  
  // State for Add User modal
  const [showAddUser, setShowAddUser] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('voter');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempPassword, setTempPassword] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = async (userId: string, newRole: string) => {
    // Optimistic update
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    
    try {
      await updateUserRole(userId, newRole);
    } catch (e) {
      console.error("Failed to update role", e);
      // Revert on failure
      setUsers(initialUsers);
      alert("Failed to update user role.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTempPassword('');
    try {
      const pwd = await createUser(newFirstName, newLastName, newEmail, newRole);
      setTempPassword(pwd);
      // We don't close the modal immediately so the admin can see the temporary password
      
      // The server action revalidates the path, but we also can optimistically add or just let Next.js refresh it.
      // A full page refresh might be needed to get the new user ID from Clerk, or the Server Component will automatically refresh the data.
    } catch (e: any) {
      console.error(e);
      alert("Failed to create user: " + (e.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAddUserModal = () => {
    setShowAddUser(false);
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewRole('voter');
    setTempPassword('');
    // trigger a hard reload to fetch new users from Clerk if we just created one
    if (tempPassword) {
      window.location.reload();
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'admin':
      case 'super_admin':
        return { bg: 'var(--blue)', color: '#fff' };
      case 'auditor':
        return { bg: 'var(--surface-3)', color: 'var(--text-1)' };
      case 'ec':
        return { bg: 'rgba(22, 163, 74, 0.1)', color: 'var(--green)' };
      case 'candidate':
        return { bg: 'rgba(217, 119, 6, 0.1)', color: '#D97706' };
      case 'voter':
      default:
        return { bg: 'var(--surface-3)', color: 'var(--blue)' };
    }
  };

  const adminCount = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length;

  return (
    <div className="users-shell" style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>

      {/* Page Header */}
      <div style={{
        position: 'relative',
        background: 'var(--surface)',
        borderRadius: 24,
        padding: '32px 40px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--sh-md)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>
              shield_person
            </span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Access Control
            </p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>
            User & Role Management
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Manage user accounts and RBAC role permissions system-wide.
          </p>
        </div>
      </div>

      {/* Hero Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Total System Users</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue)', margin: 0 }}>{users.length}</h3>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Admin Users</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue)', margin: 0 }}>{adminCount}</h3>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Defined Roles</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue)', margin: 0 }}>5</h3>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-3)', paddingBottom: 4 }}>RBAC Active</span>
          </div>
        </div>
        <div style={{ background: 'var(--blue)', padding: 24, borderRadius: 16, boxShadow: 'var(--sh-blue)', color: '#fff' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>System Integrity</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <h3 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>100%</h3>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', paddingBottom: 4 }}>Verified</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="users-toolbar" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: 400 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: 18, pointerEvents: 'none' }}>search</span>
          <input 
            type="text" 
            placeholder="Search by name, email or role..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 36px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none' }} 
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowAddUser(true)}
            style={{ padding: '10px 16px', background: 'var(--blue)', border: 'none', color: '#fff', fontWeight: 700, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
            Create User
          </button>
        </div>
      </div>

      {/* User List Table */}
      <div className="users-table-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>System Users</h4>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{filteredUsers.length} users</span>
        </div>
        <div className="users-table-wrap" style={{ overflowX: 'auto' }}>
          <table className="users-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: 620 }}>
            <thead style={{ background: 'var(--surface-2)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>User Details</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Current Role</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Assign New Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const style = getRoleBadgeStyle(user.role);
                return (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {user.imageUrl ? (
                          <img src={user.imageUrl} alt={user.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--blue)', fontSize: 14 }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)', margin: 0 }}>{user.name}</p>
                          <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ padding: '6px 12px', background: style.bg, color: style.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', borderRadius: 99, whiteSpace: 'nowrap' }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <select 
                        value={user.role} 
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        style={{ padding: '8px 12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-1)', outline: 'none', cursor: 'pointer', minWidth: 160 }}
                      >
                        <option value="voter">Voter</option>
                        <option value="candidate">Candidate</option>
                        <option value="ec">Electoral Commission</option>
                        <option value="auditor">Auditor</option>
                        <option value="admin">System Administrator</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-3)' }}>
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal overlay */}
      {showAddUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: 'var(--surface)', width: '100%', maxWidth: 500, borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--sh-lg)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-2)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Create New User</h2>
              <button onClick={closeAddUserModal} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-3)' }}>close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} style={{ padding: '32px' }}>
              {tempPassword ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ padding: 16, background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.2)', borderRadius: 12, color: 'var(--green)' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="material-symbols-outlined">check_circle</span>
                      User Created Successfully
                    </h3>
                    <p style={{ margin: 0, fontSize: 14 }}>The user has been provisioned. Please share this temporary password securely with the user.</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Temporary Password</label>
                    <div style={{ padding: 16, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'monospace', fontSize: 18, color: 'var(--text-1)', fontWeight: 700, textAlign: 'center', letterSpacing: 2 }}>
                      {tempPassword}
                    </div>
                  </div>
                  
                  <button type="button" onClick={closeAddUserModal} style={{ marginTop: 16, padding: 14, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                    Done
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>First Name</label>
                      <input required value={newFirstName} onChange={e => setNewFirstName(e.target.value)} type="text" style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-1)', outline: 'none' }} placeholder="Jane" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Last Name</label>
                      <input required value={newLastName} onChange={e => setNewLastName(e.target.value)} type="text" style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-1)', outline: 'none' }} placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Email Address</label>
                    <input required value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-1)', outline: 'none' }} placeholder="jane@example.com" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase' }}>Initial Role</label>
                    <select value={newRole} onChange={e => setNewRole(e.target.value)} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-1)', outline: 'none' }}>
                      <option value="voter">Voter (Default)</option>
                      <option value="candidate">Candidate</option>
                      <option value="ec">Electoral Commission</option>
                      <option value="auditor">Auditor</option>
                      <option value="admin">System Administrator</option>
                    </select>
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} style={{ marginTop: 16, padding: 14, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Provisioning User...' : 'Create User'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
