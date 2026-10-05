'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { createNotifications, getNotificationRecipients } from '@/lib/notifications';

export async function updateCandidateId(candidateId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { candidateId },
  });
  return { success: true };
}

export async function updateCandidateProfile(profile: {
  firstName: string;
  lastName: string;
  phone: string;
  faculty: string;
  yearOfStudy: string;
  bio: string;
  studentId: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');
  const client = await clerkClient();

  // Update name fields on the Clerk user
  await client.users.updateUser(userId, {
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  // Store the rest in publicMetadata so it's accessible server-side
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      phone: profile.phone,
      faculty: profile.faculty,
      yearOfStudy: profile.yearOfStudy,
      bio: profile.bio,
      studentId: profile.studentId,
    },
  });

  const { supabaseAdmin } = await import('@/lib/supabase');
  const candidateName = `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim();
  const { data: candidate, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .select('id, name')
    .eq('clerk_id', userId);
  if (candidateError) throw candidateError;
  if (candidate?.[0] && candidate[0].name !== candidateName) {
    const { error } = await supabaseAdmin
      .from('candidates')
      .update({ name: candidateName, status: 'pending' })
      .eq('clerk_id', userId);
    if (error) throw error;
  }

  const { revalidatePath } = await import('next/cache');
  revalidatePath('/candidate');
  revalidatePath('/candidate/manifesto');
  revalidatePath('/candidate/preview');
  revalidatePath('/voter/active-election');

  return { success: true };
}

export async function applyForElection(electionId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');
  
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Candidate';

  const { supabaseAdmin } = await import('@/lib/supabase');
  
  // Check if they already applied
  const { data: existing } = await supabaseAdmin
    .from('candidates')
    .select('id')
    .eq('clerk_id', userId)
    .single();
    
  if (existing) {
    throw new Error('You have already applied or registered as a candidate.');
  }

  const { error } = await supabaseAdmin
    .from('candidates')
    .insert({
      clerk_id: userId,
      election_id: electionId,
      name: fullName,
      status: 'pending',
      photo_url: user.imageUrl || null
    });

  if (error) {
    console.error('Failed to apply for election', error);
    throw new Error('Failed to submit application');
  }

  const reviewers = await getNotificationRecipients(['admin', 'ec']);
  await createNotifications(reviewers, {
    type: 'candidate_application',
    title: 'New candidate application',
    message: `${fullName} applied for candidacy and is awaiting review.`,
    href: '/ec/candidates',
  });

  return { success: true };
}
