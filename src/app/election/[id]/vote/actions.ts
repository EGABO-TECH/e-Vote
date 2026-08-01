'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function castVoteAction(electionId: string, candidateId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: 'Unauthorized. Please log in.' };
  }

  // 1. Get the internal voter ID for this Clerk user
  const { data: voter, error: voterError } = await supabaseAdmin
    .from('voters')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (voterError || !voter) {
    return { error: 'Voter profile not found in database.' };
  }

  // 2. Check if the election is actually live
  const { data: election, error: electionError } = await supabaseAdmin
    .from('elections')
    .select('status, ends_at')
    .eq('id', electionId)
    .single();
    
  if (electionError || !election) {
    return { error: 'Election not found.' };
  }
  
  if (election.status !== 'live') {
    return { error: 'This election is not currently open for voting.' };
  }
  
  if (new Date(election.ends_at) < new Date()) {
    return { error: 'This election has already ended.' };
  }

  // 3. Insert the vote
  const { error: voteError } = await supabaseAdmin
    .from('votes')
    .insert({
      election_id: electionId,
      voter_id: voter.id,
      candidate_id: candidateId
    });

  // Supabase unique constraint (election_id, voter_id) will throw error if already voted
  if (voteError) {
    if (voteError.code === '23505') { // Postgres unique violation code
      return { error: 'You have already voted in this election.' };
    }
    console.error('Vote Error:', voteError);
    return { error: 'An error occurred while casting your vote. Please try again.' };
  }

  revalidatePath(`/election/${electionId}/vote`);
  return { success: true };
}
