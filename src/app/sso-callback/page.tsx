'use client';

import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SSOCallbackPage() {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    (async () => {
      if (!clerk.loaded || hasRun.current) return;
      hasRun.current = true;

      const finalizeSignIn = async () => {
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

      const finalizeSignUp = async () => {
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
      };

      if (signIn.status === 'complete') {
        await finalizeSignIn();
        return;
      }

      if (signUp.isTransferable) {
        await signIn.create({ transfer: true });
        if ((signIn.status as string) === 'complete') {
          await finalizeSignIn();
          return;
        }
        router.push('/sign-in');
        return;
      }

      if (
        signIn.status === 'needs_first_factor' &&
        !signIn.supportedFirstFactors?.every((f) => f.strategy === 'enterprise_sso')
      ) {
        router.push('/sign-in');
        return;
      }

      if (signIn.isTransferable) {
        await signUp.create({ transfer: true });
        if (signUp.status === 'complete') {
          await finalizeSignUp();
          return;
        }
        router.push('/sign-up');
        return;
      }

      if (signUp.status === 'complete') {
        await finalizeSignUp();
        return;
      }

      if (signIn.status === 'needs_second_factor' || signIn.status === 'needs_new_password') {
        router.push('/sign-in');
        return;
      }

      if (signIn.existingSession || signUp.existingSession) {
        const sessionId =
          signIn.existingSession?.sessionId || signUp.existingSession?.sessionId;
        if (sessionId) {
          await clerk.setActive({
            session: sessionId,
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
        }
      }
    })();
  }, [clerk, signIn, signUp, router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <p className="text-sm font-semibold text-slate-500">Completing sign-in...</p>
      <div id="clerk-captcha" />
    </div>
  );
}
