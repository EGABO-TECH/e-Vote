'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function getElections() {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'admin') {
    // Authorization
  }

  const { data, error } = await supabaseAdmin
    .from('elections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching elections:', error);
    return [];
  }

  return data;
}

export async function createElection(data: {
  title: string;
  scope: string;
  opens: string;
  closes: string;
  eligibility: string;
  biometric: boolean;
  categories: string[];
}) {
  const user = await currentUser();

  // Find the voter to associate with created_by
  const { data: voter } = await supabaseAdmin
    .from('voters')
    .select('id')
    .eq('clerk_id', user?.id)
    .single();

  const { error } = await supabaseAdmin
    .from('elections')
    .insert({
      title: data.title,
      scope: data.scope,
      starts_at: data.opens || new Date().toISOString(),
      ends_at: data.closes || new Date().toISOString(),
      eligibility: data.eligibility,
      biometric: data.biometric,
      categories: data.categories,
      status: 'draft',
      created_by: voter?.id,
    });

  if (error) {
    console.error('Error creating election:', error);
    throw new Error('Failed to create election');
  }

  return { success: true };
}
