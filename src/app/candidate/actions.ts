'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function updateCandidateId(candidateId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Not authenticated');
  }

  const client = await clerkClient();
  
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      candidateId,
    },
  });

  return { success: true };
}
