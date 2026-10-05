import { supabaseAdmin } from '@/lib/supabase';

export type NotificationInput = {
  type: 'candidate_application' | 'candidate_review' | 'election_live' | 'vote_recorded';
  title: string;
  message: string;
  href: string;
};

export async function createNotifications(recipientClerkIds: string[], notification: NotificationInput) {
  const recipients = [...new Set(recipientClerkIds.filter(Boolean))];
  if (recipients.length === 0) return;

  const { error } = await supabaseAdmin.from('notifications').insert(
    recipients.map((recipient_clerk_id) => ({ ...notification, recipient_clerk_id })),
  );

  if (error) console.error('Failed to create in-app notifications:', error);
}

export async function getNotificationRecipients(roles: string[]) {
  const { data, error } = await supabaseAdmin
    .from('voters')
    .select('clerk_id')
    .in('role', roles);

  if (error) {
    console.error('Failed to resolve notification recipients:', error);
    return [];
  }

  return (data || []).map((row) => row.clerk_id).filter(Boolean);
}