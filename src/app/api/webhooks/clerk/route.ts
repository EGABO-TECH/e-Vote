import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  if (evt.type !== 'user.created') {
    return new Response('', { status: 200 });
  }

  const { id, email_addresses, first_name, last_name, public_metadata } = evt.data;
  const primaryEmail = email_addresses.find((email) => email.id === evt.data.primary_email_address_id)?.email_address;

  if (!primaryEmail) {
    return new Response('No primary email found', { status: 400 });
  }

  const emailDomain = primaryEmail.split('@')[1]?.toLowerCase();
  if (emailDomain !== 'cavendish.ac.ug') {
    return new Response('Only Cavendish University Uganda emails are allowed.', { status: 403 });
  }

  const role = (public_metadata?.role as string | undefined) || 'voter';
  const fullName = `${first_name || ''} ${last_name || ''}`.trim() || null;

  const { error } = await supabaseAdmin.from('voters').upsert(
    [{
      clerk_id: id,
      email: primaryEmail,
      full_name: fullName,
      role,
      student_id: primaryEmail.split('@')[0] || null,
    }],
    { onConflict: 'clerk_id' }
  );

  if (error) {
    console.error('Error inserting/updating user in Supabase:', error);
    return new Response('Error inserting user', { status: 500 });
  }

  try {
    const client = await clerkClient();
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });
    console.log(`User ${id} synced with role: ${role}`);
  } catch (roleErr) {
    console.error('Failed to assign default role to user:', roleErr);
  }

  return new Response('', { status: 200 });
}
