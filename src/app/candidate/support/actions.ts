'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function submitSupportTicket(data: { subject: string; message: string }) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabaseAdmin
    .from('support_tickets')
    .insert({
      clerk_id: user.id,
      subject: data.subject,
      message: data.message,
    });

  if (error) {
    console.error('Error submitting ticket:', error);
    throw new Error('Failed to submit ticket');
  }

  return { success: true };
}
