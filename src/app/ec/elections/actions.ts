'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { localElectionDateTimeToUtc } from '@/lib/date-time';

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
  if (!data.opens || !data.closes) throw new Error('Choose both election opening and closing times.');
  const starts_at = localElectionDateTimeToUtc(data.opens);
  const ends_at = localElectionDateTimeToUtc(data.closes);
  if (new Date(ends_at) <= new Date(starts_at)) throw new Error('The end date must be after the start date.');

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
      starts_at,
      ends_at,
      time_zone: 'Africa/Kampala',
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
