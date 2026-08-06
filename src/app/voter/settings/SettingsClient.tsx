'use client';

import { useState } from 'react';
import { updatePreference, suspendVotingRights, setVotingPin } from './actions';
import { useToast, ToastContainer } from '@/components/ui/toast';

export function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const { toasts, addToast, removeToast } = useToast();
  const [twoFactor, setTwoFactor] = useState(initialSettings?.two_factor_enabled || false);
  const [pushNotifs, setPushNotifs] = useState(initialSettings?.push_notifications_enabled || false);
  const [darkMode, setDarkMode] = useState(initialSettings?.dark_mode_enabled || false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSuspending, setIsSuspending] = useState(false);
  const [suspended, setSuspended] = useState(initialSettings?.voting_suspended || false);

  const handleToggle = async (
    key: 'two_factor_enabled' | 'push_notifications_enabled' | 'dark_mode_enabled',
    currentValue: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const newValue = !currentValue;
    setter(newValue);
    try {
      await updatePreference(key, newValue);
      addToast(`${key.replace(/_/g, ' ')} updated`, 'success');
    } catch (e) {
      setter(currentValue);
      console.error(e);
      addToast('Failed to update preference', 'error');
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      addToast('PIN must be at least 4 characters', 'error');
      return;
    }
    if (newPin !== confirmPin) {
      addToast('PINs do not match', 'error');
      return;
    }
    try {
      await setVotingPin(newPin);
      setIsChangingPin(false);
      setNewPin('');
      setConfirmPin('');
      addToast('Voting PIN updated successfully', 'success');
    } catch (e) {
      console.error(e);
      addToast('Failed to update PIN', 'error');
    }
  };

  const handleSuspend = async () => {
    if (!confirm('Are you absolutely sure you want to suspend your voting rights? This requires re-verification at the ICT office.')) return;
    setIsSuspending(true);
    try {
      await suspendVotingRights();
      setSuspended(true);
      addToast('Voting rights suspended. Visit the ICT office to reinstate.', 'info');
    } catch (e) {
      console.error(e);
      addToast('Failed to suspend voting rights', 'error');
    } finally {
      setIsSuspending(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Voting PIN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Voting PIN
          </label>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 8px 0' }}>
            Used to authorize your ballot submission.{' '}
            {initialSettings?.hasPin ? (
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>● PIN is set</span>
            ) : (
              <span style={{ color: 'var(--red)', fontWeight: 700 }}>● No PIN set</span>
            )}
          </p>
          {!isChangingPin ? (
            <button
              onClick={() => setIsChangingPin(true)}
              style={{ width: '100%', padding: '12px', background: 'var(--text-1)', color: 'var(--surface)', borderRadius: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>password</span>
              {initialSettings?.hasPin ? 'Change Voting PIN' : 'Set Voting PIN'}
            </button>
          ) : (
            <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter new PIN (min 4 chars)"
                maxLength={8}
                style={{ padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-1)', fontFamily: 'inherit', outline: 'none' }}
                autoFocus
              />
              <input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Confirm new PIN"
                maxLength={8}
                style={{ padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-1)', fontFamily: 'inherit', outline: 'none' }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '10px 24px', background: 'var(--blue)', color: '#fff', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Save PIN</button>
                <button type="button" onClick={() => { setIsChangingPin(false); setNewPin(''); setConfirmPin(''); }} style={{ padding: '10px 24px', background: 'transparent', color: 'var(--text-1)', border: '1px solid var(--border)', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              </div>
            </form>
          )}
        </div>

        <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }}></div>

        {/* 2FA Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Two-Factor Authentication</span>
            <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Requires a code sent to your university email.</span>
            <span style={{ fontSize: 12, color: twoFactor ? 'var(--green)' : 'var(--text-3)', marginTop: 2 }}>
              {twoFactor ? '✓ Enabled' : 'Disabled'}
            </span>
          </div>
          <div
            onClick={() => handleToggle('two_factor_enabled', twoFactor, setTwoFactor)}
            role="switch"
            aria-checked={twoFactor}
            style={{ width: 48, height: 24, background: twoFactor ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
          >
            <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: twoFactor ? 2 : 'auto', left: twoFactor ? 'auto' : 2, transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, boxShadow: 'var(--sh-sm)', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--blue)' }}>settings_accessibility</span>
          <h4 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Preferences</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Push Notifications Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Push Notifications</span>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Election start and end alerts.</span>
            </div>
            <div
              onClick={() => handleToggle('push_notifications_enabled', pushNotifs, setPushNotifs)}
              role="switch"
              aria-checked={pushNotifs}
              style={{ width: 44, height: 24, background: pushNotifs ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
            >
              <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: pushNotifs ? 2 : 'auto', left: pushNotifs ? 'auto' : 2, transition: 'all 0.2s' }}></div>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Dark Mode</span>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Switch to the dark visual theme.</span>
            </div>
            <div
              onClick={() => handleToggle('dark_mode_enabled', darkMode, setDarkMode)}
              role="switch"
              aria-checked={darkMode}
              style={{ width: 44, height: 24, background: darkMode ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
            >
              <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: darkMode ? 2 : 'auto', left: darkMode ? 'auto' : 2, transition: 'all 0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 16, padding: 32, boxShadow: 'var(--sh-sm)', marginTop: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h4 style={{ fontSize: 24, fontWeight: 800, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <span className="material-symbols-outlined">warning</span>
              Deactivate Voting Session
            </h4>
            <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
              If you suspect your account has been compromised, you can temporarily suspend your voting ability.
              This action requires re-verification at the ICT office.
            </p>
          </div>
          <button
            onClick={handleSuspend}
            disabled={isSuspending || suspended}
            style={{
              padding: '12px 24px',
              border: '2px solid',
              borderColor: suspended ? 'var(--border)' : 'var(--red)',
              color: suspended ? 'var(--text-3)' : 'var(--red)',
              background: 'transparent',
              fontWeight: 700,
              borderRadius: 12,
              cursor: suspended || isSuspending ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              opacity: isSuspending ? 0.5 : 1,
              fontFamily: 'inherit',
            }}
          >
            {suspended ? '⛔ Voting Suspended' : isSuspending ? 'Suspending...' : 'Suspend Voting Rights'}
          </button>
        </div>
      </section>
    </>
  );
}
