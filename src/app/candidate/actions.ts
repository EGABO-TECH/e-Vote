'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

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

  return { success: true };
}
