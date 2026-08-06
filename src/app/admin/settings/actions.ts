'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function getSettings() {
  const { data, error } = await supabaseAdmin
    .from('system_settings')
    .select('*')
    .eq('id', 1)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching settings:', error);
  }
  return data || { institution: 'Cavendish University Uganda', enforce_2fa: false, session_timeout: 15 };
}

export async function updateSettings(settings: {
  institution: string;
  enforce_2fa: boolean;
  session_timeout: number;
}) {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'admin') {
    throw new Error("Unauthorized");
  }

  const { error } = await supabaseAdmin
    .from('system_settings')
    .upsert({
      id: 1,
      ...settings,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error updating settings:', error);
    throw new Error('Failed to update settings');
  }
  
  return { success: true };
}
