import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--surface)' }}>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
