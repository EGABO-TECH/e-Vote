'use server';

import { auth } from '@clerk/nextjs/server';
import { createHash } from 'crypto';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

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

  const endsAt = new Date(election.ends_at ?? election.ends_at);
  if (!Number.isNaN(endsAt.getTime()) && endsAt < new Date()) {
    return { error: 'This election has already ended.' };
  }

  const { data: voterRow, error: voterError } = await supabaseAdmin
    .from('voters')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (voterError || !voterRow) {
    return { error: 'Unable to identify your voter registration.' };
  }

  const voterId = voterRow.id;

  const { data: ballotState } = await supabaseAdmin
    .from('voter_registry')
    .select('id, has_voted')
    .eq('voter_id', voterId)
    .eq('election_id', electionId)
    .maybeSingle();

  if (ballotState?.has_voted) {
    return { error: 'You have already voted in this election.' };
  }

  const { data: candidate, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .select('id')
    .eq('id', candidateId)
    .eq('election_id', electionId)
    .single();

  if (candidateError || !candidate) {
    return { error: 'The chosen candidate is invalid for this election.' };
  }

  const receiptHash = `EVOTE-${createHash('sha256')
    .update(`${voterId}-${electionId}-${candidateId}-${Date.now()}-${process.env.BALLOT_SECRET_KEY || 'dev-secret'}`)
    .digest('hex')
    .slice(0, 24)
    .toUpperCase()}`;

  const { error: registryError } = await supabaseAdmin
    .from('voter_registry')
    .upsert(
      [
        {
          voter_id: voterId,
          election_id: electionId,
          has_voted: true,
          voted_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'voter_id,election_id' }
    );

  if (registryError) {
    console.error('Registry error:', registryError);
    return { error: 'Unable to register your vote status.' };
  }

  const { error: voteError } = await supabaseAdmin
    .from('votes')
    .insert([
      {
        election_id: electionId,
        voter_id: voterId,
        candidate_id: candidateId,
      },
    ]);

  if (voteError) {
    console.error('Vote insert error:', voteError);
    return { error: 'Failed to record your ballot.' };
  }

  const { error: receiptError } = await supabaseAdmin
    .from('receipts')
    .insert([
      {
        receipt_hash: receiptHash,
        voter_id: voterId,
        election_id: electionId,
      },
    ]);

  if (receiptError) {
    console.error('Receipt insert error:', receiptError);
    return { error: 'Failed to issue verification receipt.' };
  }

  revalidatePath(`/election/${electionId}/vote`);
  revalidatePath('/voter');
  revalidatePath('/voter/active-election');
  revalidatePath('/voter/verification-receipt');

  return { success: true, receiptHash };
}
