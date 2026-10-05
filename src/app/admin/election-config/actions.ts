'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import { localElectionDateTimeToUtc } from '@/lib/date-time';
import { createNotifications, getNotificationRecipients } from '@/lib/notifications';

const IMAGE_BUCKET = 'election-media';
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

async function requireAdmin() {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== 'admin') throw new Error('Unauthorized');
}

async function uploadImage(value: FormDataEntryValue | null, folder: string) {
  if (!(value instanceof File) || value.size === 0) return null;
  const extension = IMAGE_EXTENSIONS[value.type];
  if (!extension) throw new Error('Use a JPG, PNG, WebP, or AVIF image.');
  if (value.size > MAX_IMAGE_SIZE) throw new Error('Images must be 4 MB or smaller.');

  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabaseAdmin.storage.from(IMAGE_BUCKET).upload(path, value, {
    contentType: value.type,
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);

  return supabaseAdmin.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function createElection(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const startsAtLocal = String(formData.get('starts_at') || '');
  const endsAtLocal = String(formData.get('ends_at') || '');
  const status = String(formData.get('status') || 'draft');

  if (!title || !startsAtLocal || !endsAtLocal) throw new Error('Missing required fields');
  const starts_at = localElectionDateTimeToUtc(startsAtLocal);
  const ends_at = localElectionDateTimeToUtc(endsAtLocal);
  if (new Date(ends_at) <= new Date(starts_at)) throw new Error('The end date must be after the start date.');
  if (!['draft', 'live'].includes(status)) throw new Error('Invalid election status.');

  const banner_url = await uploadImage(formData.get('banner'), 'elections');

  const { data: election, error } = await supabaseAdmin.from('elections').insert({
    title, description: description || null, starts_at, ends_at, status, banner_url, time_zone: 'Africa/Kampala',
  }).select('id').single();

  if (error) throw error;

  if (['live', 'active'].includes(status) && election) {
    const recipients = await getNotificationRecipients(['voter', 'candidate']);
    await createNotifications(recipients, {
      type: 'election_live',
      title: 'Election published',
      message: `${title} is available in the voter portal. Voting opens at its scheduled time.`,
      href: `/voter/active-election/${election.id}`,
    });
  }

  revalidatePath('/admin/election-config');
}

export async function updateElectionStatus(id: string, status: string) {
  await requireAdmin();
  if (!['draft', 'live', 'active', 'closed'].includes(status)) throw new Error('Invalid election status.');

  const { data: election, error } = await supabaseAdmin
    .from('elections')
    .update({ status })
    .eq('id', id)
    .select('id, title')
    .single();
  if (error) throw error;
  if (['live', 'active'].includes(status) && election) {
    const recipients = await getNotificationRecipients(['voter', 'candidate']);
    await createNotifications(recipients, {
      type: 'election_live',
      title: 'Election published',
      message: `${election.title} is available in the voter portal. Voting opens at its scheduled time.`,
      href: `/voter/active-election/${election.id}`,
    });
  }
  revalidatePath('/admin/election-config');
}

export async function deleteElection(id: string) {
  await requireAdmin();

  const { error } = await supabaseAdmin.from('elections').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/election-config');
}

export async function updateElectionBanner(electionId: string, formData: FormData) {
  await requireAdmin();
  const removeBanner = formData.get('remove_banner') === 'on';
  const bannerUrl = removeBanner ? null : await uploadImage(formData.get('banner'), `elections/${electionId}`);

  if (bannerUrl === null && !removeBanner) {
    throw new Error('Choose a banner image or select Remove current banner.');
  }

  const { error } = await supabaseAdmin.from('elections').update({ banner_url: bannerUrl }).eq('id', electionId);
  if (error) throw error;
  revalidatePath('/admin/election-config');
  revalidatePath(`/admin/election-config/${electionId}`);
  revalidatePath('/voter/active-election');
  revalidatePath(`/voter/active-election/${electionId}`);
  return bannerUrl;
}

export async function saveElectionCandidate(electionId: string, candidateId: string | null, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get('name') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const status = String(formData.get('status') || 'pending');
  if (!name || !category) throw new Error('Candidate name and position are required.');
  if (!['pending', 'approved', 'rejected'].includes(status)) throw new Error('Invalid candidate status.');

  let photo_url: string | null | undefined;
  if (formData.get('remove_photo') === 'on') {
    photo_url = null;
  } else {
    photo_url = await uploadImage(formData.get('photo'), `candidates/${electionId}`) ?? undefined;
  }

  const candidateData = {
    election_id: electionId,
    name,
    category,
    slogan: String(formData.get('slogan') || '').trim() || null,
    statement: String(formData.get('statement') || '').trim() || null,
    manifesto: String(formData.get('manifesto') || '').trim() || null,
    goals: String(formData.get('goals') || '').trim() || null,
    status,
    ...(photo_url !== undefined ? { photo_url } : {}),
  };

  const result = candidateId
    ? await supabaseAdmin.from('candidates').update(candidateData).eq('id', candidateId).eq('election_id', electionId).select('*').single()
    : await supabaseAdmin.from('candidates').insert(candidateData).select('*').single();

  if (result.error) throw result.error;
  revalidatePath(`/admin/election-config/${electionId}`);
  revalidatePath('/voter/active-election');
  revalidatePath(`/voter/active-election/${electionId}`);
  return result.data;
}

export async function deleteElectionCandidate(electionId: string, candidateId: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('candidates')
    .delete()
    .eq('id', candidateId)
    .eq('election_id', electionId);
  if (error) throw error;
  revalidatePath(`/admin/election-config/${electionId}`);
  revalidatePath('/voter/active-election');
  revalidatePath(`/voter/active-election/${electionId}`);
}
