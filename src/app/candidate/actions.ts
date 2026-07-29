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
