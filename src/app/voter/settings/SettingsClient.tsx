'use client';

import { useState } from 'react';
import { updatePreference, suspendVotingRights, setVotingPin } from './actions';

export function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [twoFactor, setTwoFactor] = useState(initialSettings?.two_factor_enabled || false);
  const [pushNotifs, setPushNotifs] = useState(initialSettings?.push_notifications_enabled || false);
  const [darkMode, setDarkMode] = useState(initialSettings?.dark_mode_enabled || false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isSuspending, setIsSuspending] = useState(false);

  const handleToggle = async (key: 'two_factor_enabled' | 'push_notifications_enabled' | 'dark_mode_enabled', currentValue: boolean, setter: any) => {
    const newValue = !currentValue;
    setter(newValue);
    try {
      await updatePreference(key, newValue);
    } catch (e) {
      setter(currentValue); // revert on error
      console.error(e);
      alert('Failed to update preference');
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert('PIN must be at least 4 characters');
      return;
    }
    try {
      await setVotingPin(newPin);
      setIsChangingPin(false);
      setNewPin('');
      alert('Voting PIN updated successfully');
    } catch (e) {
      console.error(e);
      alert('Failed to update PIN');
    }
  };

  const handleSuspend = async () => {
    if (confirm('Are you absolutely sure you want to suspend your voting rights? This action requires immediate re-verification at the ICT office.')) {
      setIsSuspending(true);
      try {
        await suspendVotingRights();
        alert('Voting rights suspended.');
      } catch (e) {
        console.error(e);
        alert('Failed to suspend voting rights');
        setIsSuspending(false);
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Voting PIN
          </label>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 8px 0' }}>
            Used to authorize your ballot submission. {initialSettings?.hasPin ? '(PIN is currently set)' : '(No PIN set)'}
          </p>
          {!isChangingPin ? (
            <button onClick={() => setIsChangingPin(true)} style={{ width: '100%', padding: '12px', background: 'var(--text-1)', color: 'var(--surface)', borderRadius: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>password</span>
              Change Voting PIN
            </button>
          ) : (
            <form onSubmit={handlePinSubmit} style={{ display: 'flex', gap: 8 }}>
              <input 
                type="password" 
                value={newPin} 
                onChange={(e) => setNewPin(e.target.value)} 
                placeholder="Enter new PIN"
                style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-1)' }}
                autoFocus
              />
              <button type="submit" style={{ padding: '0 24px', background: 'var(--blue)', color: '#fff', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>Save</button>
              <button type="button" onClick={() => setIsChangingPin(false)} style={{ padding: '0 24px', background: 'transparent', color: 'var(--text-1)', border: '1px solid var(--border)', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </form>
          )}
        </div>
        <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Two-Factor Authentication</span>
            <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Requires a code sent to your university email.</span>
          </div>
          <div onClick={() => handleToggle('two_factor_enabled', twoFactor, setTwoFactor)} style={{ width: 48, height: 24, background: twoFactor ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: twoFactor ? 2 : 'auto', left: twoFactor ? 'auto' : 2, transition: 'all 0.2s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Porting the preferences section toggles as well */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, boxShadow: 'var(--sh-sm)', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--blue)' }}>
            settings_accessibility
          </span>
          <h4 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Preferences</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              System Language
            </label>
            <select style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-2)', color: 'var(--text-1)', outline: 'none' }}>
              <option>English (United Kingdom)</option>
              <option>Swahili</option>
              <option>French</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Push Notifications</span>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Election start and end alerts.</span>
            </div>
            <div onClick={() => handleToggle('push_notifications_enabled', pushNotifs, setPushNotifs)} style={{ width: 44, height: 24, background: pushNotifs ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: pushNotifs ? 2 : 'auto', left: pushNotifs ? 'auto' : 2, transition: 'all 0.2s' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Dark Mode</span>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Switch to the dark visual theme.</span>
            </div>
            <div onClick={() => handleToggle('dark_mode_enabled', darkMode, setDarkMode)} style={{ width: 44, height: 24, background: darkMode ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: darkMode ? 2 : 'auto', left: darkMode ? 'auto' : 2, transition: 'all 0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section style={{ gridColumn: '1 / -1', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 16, padding: 32, boxShadow: 'var(--sh-sm)', marginTop: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h4 style={{ fontSize: 24, fontWeight: 800, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <span className="material-symbols-outlined">warning</span>
              Deactivate Voting Session
            </h4>
            <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
              If you suspect your account has been compromised, you can
              temporarily suspend your voting ability. This action requires
              immediate re-verification at the ICT office.
            </p>
          </div>
          <button 
            onClick={handleSuspend}
            disabled={isSuspending || initialSettings?.voting_suspended}
            style={{ padding: '12px 24px', border: '2px solid var(--red)', color: initialSettings?.voting_suspended ? 'var(--text-3)' : 'var(--red)', borderColor: initialSettings?.voting_suspended ? 'var(--border)' : 'var(--red)', background: 'transparent', fontWeight: 700, borderRadius: 12, cursor: initialSettings?.voting_suspended ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: isSuspending ? 0.5 : 1 }}>
            {initialSettings?.voting_suspended ? 'Voting Suspended' : isSuspending ? 'Suspending...' : 'Suspend Voting Rights'}
          </button>
        </div>
      </section>
    </>
  );
}
