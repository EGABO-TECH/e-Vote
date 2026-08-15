'use client';

import { useAuth, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, Phone, ArrowLeft, ShieldAlert } from 'lucide-react';

function formatPhoneNumber(input: string): string {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('+')) {
    return `+${digits}`;
  }
  if (digits.startsWith('256')) {
    return `+${digits}`;
  }
  if (digits.startsWith('0')) {
    return `+256${digits.slice(1)}`;
  }
  return `+256${digits}`;
}

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'email' | 'phone'>('email');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const loading = fetchStatus === 'fetching';

  const getErrorMessage = () => {
    if (error) return error;
    const fieldError =
      errors.fields.emailAddress?.message ||
      errors.fields.phoneNumber?.message ||
      errors.fields.password?.message ||
      errors.fields.code?.message;
    if (fieldError) return fieldError;
    const globalError = errors.global?.[0]?.message;
    if (globalError) return globalError;
    return '';
  };

  const displayError = getErrorMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!/^\+256\d{9}$/.test(formattedPhone)) {
      setError('Please enter a valid Ugandan contact number (e.g. +256 712 345 678).');
      return;
    }
    setError('');

    const { error: passwordError } = await signUp.password({
      firstName,
      lastName,
      emailAddress,
      password,
      phoneNumber: formattedPhone,
    });
    if (passwordError) {
      setError(passwordError.message || 'An error occurred during sign up.');
      return;
    }

    const { error: sendEmailError } = await signUp.verifications.sendEmailCode();
    if (sendEmailError) {
      setError(sendEmailError.message || 'Failed to send email verification code.');
      return;
    }

    const { error: sendPhoneError } = await signUp.verifications.sendPhoneCode();
    if (sendPhoneError) {
      setError(sendPhoneError.message || 'Failed to send SMS verification code.');
      return;
    }

    setVerificationStep('email');
    setPendingVerification(true);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    setError('');

    if (verificationStep === 'email') {
      const { error: verifyEmailError } = await signUp.verifications.verifyEmailCode({ code });
      if (verifyEmailError) {
        setError(verifyEmailError.message || 'Email verification failed.');
        return;
      }

      if (signUp.unverifiedFields.includes('phone_number')) {
        setVerificationStep('phone');
        setCode('');
        return;
      }
    } else {
      const { error: verifyPhoneError } = await signUp.verifications.verifyPhoneCode({ code });
      if (verifyPhoneError) {
        setError(verifyPhoneError.message || 'Phone verification failed.');
        return;
      }
    }

    if (signUp.status === 'complete') {
      await signUp.finalize({
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
    } else {
      setError('Verification was not completed. Please try again.');
    }
  };

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      <div className="w-full max-w-[34rem] rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)] overflow-hidden">
        {/* Header Block */}
        <div className="flex flex-col items-center bg-[#001b3d] px-6 pb-6 pt-8 text-center sm:px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2 shadow-sm mb-3">
            <Image
              src="/assets/Cavendish-University-Uganda-Logo.png"
              alt="Cavendish University Uganda logo"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Cavendish University Uganda
          </h2>
          <p className="mt-1 text-sm font-semibold tracking-wide text-slate-300">
            e-Vote Portal Enrollment Form
          </p>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 mt-3 block">
            CAPTURE YOUR IDENTITY MARKERS TO BEGIN
          </span>
        </div>

        {/* Content Block */}
        <div className="p-6 sm:p-8 bg-white">
          {displayError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-800 text-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{displayError}</span>
            </div>
          )}

          {!pendingVerification ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Primary Identity Section */}
              <div>
                <h3 className="text-base font-bold text-[#001b3d] border-b border-slate-100 pb-2 mb-4">
                  Primary Identity
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      FIRST NAME
                    </label>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      LAST NAME
                    </label>
                    <input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      UNIVERSITY EMAIL (@students.cavendish.ac.ug)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="h-5 w-5" />
                      </span>
                      <input
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="user@students.cavendish.ac.ug"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                        type="email"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Access Section */}
              <div>
                <h3 className="text-base font-bold text-[#001b3d] border-b border-slate-100 pb-2 mb-4">
                  Security & Access
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </span>
                      <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none outline-none p-0 focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      CONFIRM
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </span>
                      <input
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none outline-none p-0 focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Section */}
              <div>
                <h3 className="text-base font-bold text-[#001b3d] border-b border-slate-100 pb-2 mb-4">
                  Verification
                </h3>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    CONTACT NUMBER
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone className="h-5 w-5" />
                    </span>
                    <input
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+256 ..."
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
                      type="tel"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-[#001b3d] py-4 text-base font-bold text-white shadow-md transition hover:bg-[#001129] disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Finish Account Registration'}
              </button>

              <div className="flex justify-center mt-6">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#001b3d] border-b border-slate-100 pb-2 mb-4">
                  {verificationStep === 'email' ? 'Verify Email' : 'Verify Contact Number'}
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {verificationStep === 'email' ? (
                    <>
                      We&apos;ve sent a 6-digit verification code to{' '}
                      <span className="font-semibold text-slate-700">{emailAddress}</span>. Please enter it below.
                    </>
                  ) : (
                    <>
                      We&apos;ve sent a 6-digit verification code to{' '}
                      <span className="font-semibold text-slate-700">{formatPhoneNumber(phoneNumber)}</span>. Please enter it below to complete enrollment.
                    </>
                  )}
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-[#001b3d] py-4 text-base font-bold text-white shadow-md transition hover:bg-[#001129] disabled:opacity-50"
              >
                {loading ? 'Verifying...' : verificationStep === 'email' ? 'Verify Email' : 'Verify & Activate Account'}
              </button>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setPendingVerification(false);
                    setVerificationStep('email');
                    setCode('');
                  }}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition bg-transparent border-0 outline-none"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Edit Details
                </button>
              </div>
            </form>
          )}

          <div id="clerk-captcha" />
        </div>
      </div>
    </div>
  );
}
