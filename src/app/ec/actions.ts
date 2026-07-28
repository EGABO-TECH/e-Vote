'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function updateEcProfile(profile: {
  firstName: string;
  lastName: string;
  phone: string;
  officerTitle: string;
  jurisdiction: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');
  const client = await clerkClient();

  await client.users.updateUser(userId, {
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      phone: profile.phone,
      officerTitle: profile.officerTitle,
      jurisdiction: profile.jurisdiction,
    },
  });

  return { success: true };
}
