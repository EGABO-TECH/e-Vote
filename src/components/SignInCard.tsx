'use client';

import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react';

type View = 'sign-in' | 'verify-device' | 'forgot-password';

type SignInCardProps = {
  showFooter?: boolean;
  initialView?: View;
};

export function SignInCard({ showFooter = true, initialView = 'sign-in' }: SignInCardProps) {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [view, setView] = useState<View>(initialView);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [error, setError] = useState('');

  const loading = fetchStatus === 'fetching';

  const finalizeSession = async () => {
    if (!signIn) return;
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return;
        const url = decorateUrl('/dashboard');
        if (url.startsWith('http')) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  };

  const getErrorMessage = () => {
    if (error) return error;
    const fieldError =
      errors.fields.identifier?.message ||
      errors.fields.password?.message ||
      errors.fields.code?.message;
    if (fieldError) return fieldError;
    const globalError = errors.global?.[0]?.message;
    if (globalError) return globalError;
    return '';
  };

  const displayError = getErrorMessage();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');

    const { error: signInError } = await signIn.password({
      emailAddress,
      password,
    });
    if (signInError) {
      setError(signInError.message || 'Invalid email or password.');
      return;
    }

    if (signIn.status === 'complete') {
      await finalizeSession();
      return;
    }

    if (signIn.status === 'needs_client_trust') {
      const hasEmailCode = signIn.supportedSecondFactors?.some(
        (factor) => factor.strategy === 'email_code',
      );
      if (hasEmailCode) {
        const { error: sendCodeError } = await signIn.mfa.sendEmailCode();
        if (sendCodeError) {
          setError(sendCodeError.message || 'Failed to send verification code.');
          return;
        }
        setView('verify-device');
        return;
      }
    }

    if (signIn.status === 'needs_second_factor') {
      setError('Additional verification is required. Please contact support.');
      return;
    }

    setError('Sign-in could not be completed. Please try again.');
  };

  const handleVerifyDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');

    const { error: verifyError } = await signIn.mfa.verifyEmailCode({ code });
    if (verifyError) {
      setError(verifyError.message || 'Verification failed.');
      return;
    }

    if (signIn.status === 'complete') {
      await finalizeSession();
    } else {
      setError('Verification was not completed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded || !signIn) return;
    setError('');

    const { error: ssoError } = await signIn.sso({
      strategy: 'oauth_google',
      redirectCallbackUrl: '/sso-callback',
      redirectUrl: '/dashboard',
    });
    if (ssoError) {
      setError(ssoError.message || 'Google sign-in failed.');
    }
  };

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');

    const { error: createError } = await signIn.create({
      identifier: emailAddress,
    });
    if (createError) {
      setError(createError.message || 'Could not find an account with that email.');
      return;
    }

    const { error: sendCodeError } = await signIn.resetPasswordEmailCode.sendCode();
    if (sendCodeError) {
      setError(sendCodeError.message || 'Failed to send reset code.');
      return;
    }

    setResetCodeSent(true);
    setCode('');
  };

  const handleVerifyResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');

    const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({ code });
    if (verifyError) {
      setError(verifyError.message || 'Invalid reset code.');
    }
  };

  const handleSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');

    const { error: submitError } = await signIn.resetPasswordEmailCode.submitPassword({
      password: newPassword,
      signOutOfOtherSessions: true,
    });
    if (submitError) {
      setError(submitError.message || 'Could not update password.');
      return;
    }

    if (signIn.status === 'complete') {
      await finalizeSession();
    }
  };

  const resetToSignIn = () => {
    setView('sign-in');
    setResetCodeSent(false);
    setCode('');
    setNewPassword('');
    setError('');
    signIn?.reset();
  };

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="mb-3">
          <Image
            src="/assets/Cavendish-University-Uganda-Logo.png"
            alt="Cavendish University Uganda logo"
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {view === 'forgot-password' ? 'Reset Password' : 'Welcome'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
          {view === 'forgot-password'
            ? 'Enter your email to receive a password reset code.'
            : view === 'verify-device'
              ? 'Verify this device to continue signing in.'
              : 'Access the voting portal using your institutional credentials.'}
        </p>
      </div>

      {displayError && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-800 text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{displayError}</span>
        </div>
      )}

      {view === 'sign-in' && (
        <>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative my-5 flex items-center text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="mx-3 text-[10px] font-bold uppercase tracking-[0.2em]">OR USE EMAIL</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                  placeholder="name@students.cavendish.ac.ug"
                  type="email"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  PASSWORD
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setResetCodeSent(false);
                    setCode('');
                    setNewPassword('');
                    setView('forgot-password');
                  }}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#000080] hover:underline bg-transparent border-0 p-0"
                >
                  FORGOT?
                </button>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 outline-none p-0 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#000080] py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#000066] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-semibold text-slate-500">
            New to e-Vote?{' '}
            <Link href="/sign-up" className="font-bold text-[#000080] hover:underline">
              Create an account
            </Link>
          </p>
        </>
      )}

      {view === 'verify-device' && (
        <form onSubmit={handleVerifyDevice} className="mt-6 space-y-4">
          <p className="text-sm text-slate-500">
            We sent a verification code to{' '}
            <span className="font-semibold text-slate-700">{emailAddress}</span>.
          </p>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              VERIFICATION CODE
            </label>
            <input
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 text-center tracking-[0.5em] text-lg font-bold"
              type="text"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-[#000080] py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#000066] disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
          <button
            type="button"
            onClick={resetToSignIn}
            className="w-full text-sm font-semibold text-slate-500 hover:text-slate-800 bg-transparent border-0"
          >
            Back to Sign In
          </button>
        </form>
      )}

      {view === 'forgot-password' && (
        <div className="mt-6 space-y-4">
          {signIn?.status !== 'needs_new_password' ? (
            <>
              {!resetCodeSent ? (
                <form onSubmit={handleSendResetCode} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="h-5 w-5" />
                      </span>
                      <input
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                        placeholder="name@students.cavendish.ac.ug"
                        type="email"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-[#000080] py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#000066] disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Reset Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyResetCode} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      RESET CODE
                    </label>
                    <input
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="123456"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 text-center tracking-[0.5em] text-lg font-bold"
                      type="text"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-[#000080] py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#000066] disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>
                </form>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmitNewPassword} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  NEW PASSWORD
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-5 w-5" />
                  </span>
                  <input
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#000080] py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#000066] disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Set New Password'}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={resetToSignIn}
            className="w-full text-sm font-semibold text-slate-500 hover:text-slate-800 bg-transparent border-0"
          >
            Back to Sign In
          </button>
        </div>
      )}

      {showFooter && (
        <span className="text-slate-400 font-bold tracking-[0.25em] text-[9px] mt-6 text-center block">
          THE E-VOTE ELECTRONIC VOTING SYSTEM
        </span>
      )}
    </>
  );
}
