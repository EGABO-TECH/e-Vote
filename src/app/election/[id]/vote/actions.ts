'use server';

import { auth } from '@clerk/nextjs/server';
import { createHash } from 'crypto';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { getOrCreateVoterRecord } from '@/lib/voter-record';
import { createNotifications } from '@/lib/notifications';

export async function castVoteAction(electionId: string, candidateId: string) {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'Unauthorized. Please log in.' };
  }

  const { data: election, error: electionError } = await supabaseAdmin
    .from('elections')
    .select('id, status, starts_at, ends_at, title')
    .eq('id', electionId)
    .single();

  if (electionError || !election) {
    return { error: 'Election not found.' };
  }

  const activeStatus = election.status === 'active' || election.status === 'live';
  if (!activeStatus) {
    return { error: 'This election is not currently open for voting.' };
  }

  const now = new Date();
  const startsAt = new Date(election.starts_at);
  const endsAt = new Date(election.ends_at);
  if (startsAt > now) return { error: 'This election has not started yet.' };
  if (endsAt <= now) {
    return { error: 'This election has already ended.' };
  }

  const { voter, error: voterError } = await getOrCreateVoterRecord(userId);
  if (!voter) return { error: voterError || 'Unable to identify your voter registration.' };
  if (voter.voting_suspended) return { error: 'Your voting access is currently suspended.' };
  const voterId = voter.id;

  const [{ data: ballotState, error: registryLookupError }, { data: existingVote, error: voteLookupError }] = await Promise.all([
    supabaseAdmin
      .from('voter_registry')
      .select('id, has_voted')
      .eq('voter_id', voterId)
      .eq('election_id', electionId)
      .maybeSingle(),
    supabaseAdmin
      .from('votes')
      .select('id')
      .eq('election_id', electionId)
      .eq('voter_id', voterId)
      .maybeSingle(),
  ]);

  if (registryLookupError || voteLookupError) {
    return { error: 'Unable to verify your ballot status. Please try again.' };
  }
  if (ballotState?.has_voted || existingVote) {
    return { error: 'You have already voted in this election.' };
  }

  const { data: candidate, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .select('id')
    .eq('id', candidateId)
    .eq('election_id', electionId)
    .eq('status', 'approved')
    .single();

  if (candidateError || !candidate) {
    return { error: 'The chosen candidate is not approved for this election.' };
  }

  const receiptHash = `EVOTE-${createHash('sha256')
    .update(`${voterId}-${electionId}-${candidateId}-${Date.now()}-${process.env.BALLOT_SECRET_KEY || 'dev-secret'}`)
    .digest('hex')
    .slice(0, 24)
    .toUpperCase()}`;

  const { error: voteError } = await supabaseAdmin
    .from('votes')
    .insert([{ election_id: electionId, voter_id: voterId, candidate_id: candidateId }]);

  if (voteError) {
    if (voteError.code === '23505') return { error: 'You have already voted in this election.' };
    console.error('Vote insert error:', voteError);
    return { error: 'Failed to record your ballot.' };
  }

  const { error: registryError } = await supabaseAdmin
    .from('voter_registry')
    .upsert(
      [{ voter_id: voterId, election_id: electionId, has_voted: true, voted_at: new Date().toISOString() }],
      { onConflict: 'voter_id,election_id' },
    );

  if (registryError) {
    await supabaseAdmin.from('votes').delete().eq('election_id', electionId).eq('voter_id', voterId);
    console.error('Registry error:', registryError);
    return { error: 'Unable to register your vote status.' };
  }

  const { error: receiptError } = await supabaseAdmin
    .from('receipts')
    .insert([{ receipt_hash: receiptHash, voter_id: voterId, election_id: electionId }]);

  if (receiptError) {
    await supabaseAdmin.from('votes').delete().eq('election_id', electionId).eq('voter_id', voterId);
    if (ballotState) {
      await supabaseAdmin.from('voter_registry').update({ has_voted: false, voted_at: null }).eq('id', ballotState.id);
    } else {
      await supabaseAdmin.from('voter_registry').delete().eq('voter_id', voterId).eq('election_id', electionId);
    }
    console.error('Receipt insert error:', receiptError);
    return { error: 'Failed to issue verification receipt. Your ballot was not recorded; please try again.' };
  }

  await createNotifications([userId], {
    type: 'vote_recorded',
    title: 'Vote recorded',
    message: `Your ballot for ${election.title} was recorded. Your receipt is ready.`,
    href: '/voter/verification-receipt',
  });

  // Audit Log for Vote Casting
  await supabaseAdmin
    .from('audit_logs')
    .insert([
      {
        action: 'Vote Cast',
        actor_role: 'voter',
        status: 'success',
        severity: 'info',
        details: `Voter ${voterId} cast a ballot in election ${electionId}`,
      },
    ]);

  revalidatePath(`/election/${electionId}/vote`);
  revalidatePath('/voter');
  revalidatePath('/voter/active-election');
  revalidatePath('/voter/verification-receipt');

  return { success: true, receiptHash };
}
