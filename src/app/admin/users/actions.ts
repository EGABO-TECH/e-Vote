'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function updateUserRole(userId: string, role: string) {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: { role }
  });
  
  // Refresh the users page so it gets the latest data
  revalidatePath('/admin/users');
}

export async function createUser(firstName: string, lastName: string, email: string, role: string) {
  const client = await clerkClient();
  
  // Generate a random temporary password
  const tempPassword = crypto.randomUUID() + 'aA1!'; 
  
  await client.users.createUser({
    firstName,
    lastName,
    emailAddress: [email],
    password: tempPassword,
    publicMetadata: { role },
    skipPasswordChecks: true
  });
  
  revalidatePath('/admin/users');
  return tempPassword;
}
