import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export type VoterRecord = {
  id: string;
  clerk_id: string;
  email: string;
  full_name: string | null;
  voting_suspended: boolean | null;
};

export async function getOrCreateVoterRecord(clerkId: string): Promise<{
  voter: VoterRecord | null;
  error: string | null;
}> {
  const { data: existingVoter, error: lookupError } = await supabaseAdmin
    .from('voters')
    .select('id, clerk_id, email, full_name, voting_suspended')
    .eq('clerk_id', clerkId)
    .maybeSingle();

  if (existingVoter) return { voter: existingVoter, error: null };
  if (lookupError) {
    console.error('Failed to look up voter record:', lookupError);
    return { voter: null, error: 'Unable to look up your voter account.' };
  }

  const clerkUser = await currentUser();
  if (!clerkUser || clerkUser.id !== clerkId) {
    return { voter: null, error: 'Unable to verify your voter account.' };
  }

  const primaryEmail = clerkUser.emailAddresses.find(
    (address) => address.id === clerkUser.primaryEmailAddressId,
  );
  const email = primaryEmail?.emailAddress.trim().toLowerCase();
  if (!email) {
    return { voter: null, error: 'Add a primary email to your account before voting.' };
  }

  const fullName = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null;
  const studentId = email.split('@')[0] || null;
  const { data: newVoter, error: createError } = await supabaseAdmin
    .from('voters')
    .upsert({
      clerk_id: clerkId,
      email,
      full_name: fullName,
      role: 'voter',
      student_id: studentId,
    }, { onConflict: 'clerk_id' })
    .select('id, clerk_id, email, full_name, voting_suspended')
    .single();

  if (newVoter) return { voter: newVoter, error: null };

  if (createError?.code === '23505' && primaryEmail?.verification?.status === 'verified') {
    const { data: emailMatch, error: emailLookupError } = await supabaseAdmin
      .from('voters')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (emailLookupError) console.error('Failed to resolve duplicate voter email:', emailLookupError);
    if (emailMatch) {
      const { data: recoveredVoter, error: recoverError } = await supabaseAdmin
        .from('voters')
        .update({ clerk_id: clerkId, full_name: fullName })
        .eq('id', emailMatch.id)
        .select('id, clerk_id, email, full_name, voting_suspended')
        .single();

      if (recoveredVoter) return { voter: recoveredVoter, error: null };
      if (recoverError) console.error('Failed to recover voter record:', recoverError);
    }
  }

  console.error('Failed to create voter record:', createError);
  return { voter: null, error: 'Unable to resolve voter account. Verify your primary email or contact an administrator.' };
}