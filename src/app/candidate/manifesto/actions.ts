'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function saveManifesto(data: {
  category: string;
  slogan: string;
  statement: string;
  manifesto: string;
  goals: string;
}) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  // Ensure candidate profile exists
  const { data: candidate, error: fetchError } = await supabaseAdmin
    .from('candidates')
    .select('id')
    .eq('clerk_id', user.id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  if (!candidate) {
    throw new Error('You must apply for candidacy first before editing your manifesto.');
  }

  const { error } = await supabaseAdmin
    .from('candidates')
    .update({
      category: data.category,
      slogan: data.slogan,
      statement: data.statement,
      manifesto: data.manifesto,
      goals: data.goals,
    })
    .eq('clerk_id', user.id);

  if (error) throw error;

  revalidatePath('/candidate/manifesto');
  return { success: true };
}

export async function getCandidateProfile() {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('clerk_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }

  return data;
}
