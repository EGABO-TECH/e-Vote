import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [notificationsResult, unreadResult] = await Promise.all([
    supabaseAdmin
      .from('notifications')
      .select('id, type, title, message, href, created_at, read_at')
      .eq('recipient_clerk_id', userId)
      .order('created_at', { ascending: false })
      .limit(30),
    supabaseAdmin
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('recipient_clerk_id', userId)
      .is('read_at', null),
  ]);

  if (notificationsResult.error || unreadResult.error) {
    console.error('Failed to load notifications:', notificationsResult.error || unreadResult.error);
    return NextResponse.json({ error: 'Unable to load notifications.' }, { status: 500 });
  }

  return NextResponse.json({
    notifications: notificationsResult.data || [],
    unreadCount: unreadResult.count || 0,
  });
}

export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let payload: { id?: string; markAll?: boolean };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  let update = supabaseAdmin
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('recipient_clerk_id', userId)
    .is('read_at', null);

  if (payload.markAll !== true) {
    if (typeof payload.id !== 'string' || payload.id.length === 0) {
      return NextResponse.json({ error: 'Provide a notification id or markAll.' }, { status: 400 });
    }
    update = update.eq('id', payload.id);
  }

  const { error } = await update;
  if (error) {
    console.error('Failed to mark notification read:', error);
    return NextResponse.json({ error: 'Unable to update notification.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}