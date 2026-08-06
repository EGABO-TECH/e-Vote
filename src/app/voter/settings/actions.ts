'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function getVoterSettings() {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabaseAdmin
    .from('voters')
    .select('voting_suspended, two_factor_enabled, push_notifications_enabled, dark_mode_enabled, voting_pin')
    .eq('clerk_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }

  return {
    ...data,
    hasPin: !!data.voting_pin,
  };
}

export async function updatePreference(key: 'two_factor_enabled' | 'push_notifications_enabled' | 'dark_mode_enabled', value: boolean) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabaseAdmin
    .from('voters')
    .update({ [key]: value })
    .eq('clerk_id', user.id);

  if (error) throw error;
  revalidatePath('/voter/settings');
}

export async function suspendVotingRights() {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabaseAdmin
    .from('voters')
    .update({ voting_suspended: true })
    .eq('clerk_id', user.id);

  if (error) throw error;
  revalidatePath('/voter/settings');
}

export async function setVotingPin(newPin: string) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  // Simple hash for demo purposes. In production, use bcrypt or similar.
  const hash = crypto.createHash('sha256').update(newPin).digest('hex');

  const { error } = await supabaseAdmin
    .from('voters')
    .update({ voting_pin: hash })
    .eq('clerk_id', user.id);

  if (error) throw error;
  revalidatePath('/voter/settings');
}
