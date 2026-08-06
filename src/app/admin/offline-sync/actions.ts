'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';

export async function triggerSync(cluster: string) {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== 'admin') throw new Error('Unauthorized');

  // Log the sync action in audit_logs
  await supabaseAdmin.from('audit_logs').insert({
    action: `Manual sync triggered for cluster: ${cluster}`,
    actor_role: 'admin',
    ip_address: null,
    status: 'success',
    details: `Triggered by admin ${user.firstName} ${user.lastName}`,
    severity: 'info',
  });

  revalidatePath('/admin/offline-sync');
}

export async function exportSyncLogs(logs: any[]) {
  // Export is handled client-side
  return logs;
}
