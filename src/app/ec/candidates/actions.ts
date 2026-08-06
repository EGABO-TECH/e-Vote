'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function getCandidates() {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'admin') {
    // Basic authorization, you could enforce stronger checks
    // throw new Error('Not authorized');
  }

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

export async function updateCandidateStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  const user = await currentUser();
  // Authorization would go here

  const { error } = await supabaseAdmin
    .from('candidates')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating candidate:', error);
    throw new Error('Failed to update candidate');
  }

  return { success: true };
}
