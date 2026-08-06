'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';

export async function createElection(formData: FormData) {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== 'admin') throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const starts_at = formData.get('starts_at') as string;
  const ends_at = formData.get('ends_at') as string;
  const status = formData.get('status') as string || 'draft';

  if (!title || !starts_at || !ends_at) throw new Error('Missing required fields');

  const { error } = await supabaseAdmin.from('elections').insert({
    title, description, starts_at, ends_at, status,
  });

  if (error) throw error;

  revalidatePath('/admin/election-config');
}

export async function updateElectionStatus(id: string, status: string) {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== 'admin') throw new Error('Unauthorized');

  const { error } = await supabaseAdmin.from('elections').update({ status }).eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/election-config');
}

export async function deleteElection(id: string) {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== 'admin') throw new Error('Unauthorized');

  const { error } = await supabaseAdmin.from('elections').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/election-config');
}
