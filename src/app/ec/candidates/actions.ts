'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { createNotifications } from '@/lib/notifications';

export async function getCandidates() {
  const user = await currentUser();
  if (!user || !['ec', 'admin'].includes(String(user.publicMetadata?.role || ''))) throw new Error('Unauthorized');

  const { data, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching candidates:', error);
    return [];
  }

  return data;
}

export async function updateCandidateStatus(id: string, status: 'approved' | 'rejected' | 'pending', reviewerNote = '') {
  const user = await currentUser();
  if (!user || !['ec', 'admin'].includes(String(user.publicMetadata?.role || ''))) throw new Error('Unauthorized');

  const { data: candidate, error } = await supabaseAdmin
    .from('candidates')
    .update({
      status,
      reviewer_note: status === 'pending' ? reviewerNote.trim() || null : null,
    })
    .eq('id', id)
    .select('election_id, clerk_id, name')
    .single();

  if (error) {
    console.error('Error updating candidate:', error);
    throw new Error('Failed to update candidate');
  }

  revalidatePath('/ec/candidates');
  revalidatePath('/candidate');
  revalidatePath('/candidate/manifesto');
  revalidatePath('/candidate/preview');
  revalidatePath('/voter/active-election');
  if (candidate.election_id) revalidatePath(`/voter/active-election/${candidate.election_id}`);

  if (candidate.clerk_id) {
    const requestedChanges = status === 'pending' && Boolean(reviewerNote.trim());
    await createNotifications([candidate.clerk_id], {
      type: 'candidate_review',
      title: requestedChanges ? 'EC requested profile changes' : `Candidacy ${status}`,
      message: requestedChanges
        ? reviewerNote.trim()
        : status === 'approved'
          ? 'Your candidate profile was approved and is now visible to voters.'
          : status === 'rejected'
            ? 'Your candidate application was rejected by the Electoral Commission.'
            : 'Your candidate profile is pending Electoral Commission review.',
      href: '/candidate/manifesto',
    });
  }

  return { success: true };
}
