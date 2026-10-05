'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const IMAGE_BUCKET = 'election-media';
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

async function uploadPortrait(file: FormDataEntryValue | null, userId: string) {
  if (!(file instanceof File) || file.size === 0) return null;
  const extension = IMAGE_EXTENSIONS[file.type];
  if (!extension) throw new Error('Use a JPG, PNG, WebP, or AVIF portrait.');
  if (file.size > MAX_IMAGE_SIZE) throw new Error('Portraits must be 4 MB or smaller.');

  const path = `candidate-profiles/${userId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabaseAdmin.storage.from(IMAGE_BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`Portrait upload failed: ${error.message}`);
  return supabaseAdmin.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

async function removeStoredPortrait(photoUrl: string | null) {
  if (!photoUrl) return;
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const markerIndex = photoUrl.indexOf(marker);
  if (markerIndex < 0) return;
  const path = decodeURIComponent(photoUrl.slice(markerIndex + marker.length));
  const { error } = await supabaseAdmin.storage.from(IMAGE_BUCKET).remove([path]);
  if (error) console.error('Failed to remove previous candidate portrait:', error);
}

export async function saveManifesto(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const name = String(formData.get('name') || '').trim();
  const electionId = String(formData.get('election_id') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const slogan = String(formData.get('slogan') || '').trim();
  const statement = String(formData.get('statement') || '').trim();
  const manifesto = String(formData.get('manifesto') || '').trim();
  const goals = String(formData.get('goals') || '').trim();
  const removePhoto = formData.get('remove_photo') === 'on';

  if (!name || !electionId || !category) throw new Error('Name, election, and position are required.');
  if (name.length > 120 || slogan.length > 180 || statement.length > 1000 || manifesto.length > 12000 || goals.length > 4000) {
    throw new Error('One or more profile fields exceed the allowed length.');
  }

  const [{ data: candidate, error: fetchError }, { data: election, error: electionError }] = await Promise.all([
    supabaseAdmin
      .from('candidates')
      .select('id, name, election_id, category, slogan, statement, manifesto, goals, photo_url, status')
      .eq('clerk_id', user.id)
      .maybeSingle(),
    supabaseAdmin
      .from('elections')
      .select('id')
      .eq('id', electionId)
      .in('status', ['draft', 'active', 'live'])
      .maybeSingle(),
  ]);

  if (fetchError) throw fetchError;
  if (electionError) throw electionError;
  if (!candidate) {
    throw new Error('You must apply for candidacy first before editing your manifesto.');
  }
  if (!election) throw new Error('The selected election could not be found.');

  const uploadedPhotoUrl = await uploadPortrait(formData.get('photo'), user.id);
  const photoUrl = removePhoto ? null : uploadedPhotoUrl ?? candidate.photo_url;
  const changed = name !== candidate.name
    || electionId !== candidate.election_id
    || category !== (candidate.category || '')
    || slogan !== (candidate.slogan || '')
    || statement !== (candidate.statement || '')
    || manifesto !== (candidate.manifesto || '')
    || goals !== (candidate.goals || '')
    || photoUrl !== candidate.photo_url;

  const { data: updatedCandidate, error: updateError } = await supabaseAdmin
    .from('candidates')
    .update({
      name,
      election_id: electionId,
      category,
      slogan: slogan || null,
      statement: statement || null,
      manifesto: manifesto || null,
      goals: goals || null,
      photo_url: photoUrl,
      reviewer_note: null,
      status: changed ? 'pending' : candidate.status,
    })
    .eq('clerk_id', user.id)
    .select('id, name, election_id, category, slogan, statement, manifesto, goals, photo_url, status')
    .single();

  if (updateError) {
    if (uploadedPhotoUrl) await removeStoredPortrait(uploadedPhotoUrl);
    throw updateError;
  }

  if (photoUrl !== candidate.photo_url) {
    await removeStoredPortrait(candidate.photo_url);
  }

  revalidatePath('/candidate');
  revalidatePath('/candidate/manifesto');
  revalidatePath('/candidate/preview');
  revalidatePath('/candidate/settings');
  revalidatePath('/ec/candidates');
  revalidatePath('/voter/active-election');
  revalidatePath(`/voter/active-election/${electionId}`);
  if (candidate.election_id && candidate.election_id !== electionId) {
    revalidatePath(`/voter/active-election/${candidate.election_id}`);
  }
  return { success: true, candidate: updatedCandidate };
}

export async function getCandidateProfile() {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('clerk_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }

  return data;
}
