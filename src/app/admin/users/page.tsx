import { clerkClient } from '@clerk/nextjs/server';
import UsersClient, { UserData } from './UsersClient';

export const metadata = {
  title: 'User & Role Management | e-Vote Admin',
};

export default async function UsersAndRoles() {
  const client = await clerkClient();

  // Fetch all users from Clerk (max 100)
  const userList = await client.users.getUserList({ limit: 100 });

  const users: UserData[] = userList.data.map((user) => {
    const role = (user.publicMetadata?.role as string | undefined) ?? 'voter';
    const firstName = user.firstName ?? '';
    const lastName = user.lastName ?? '';
    const name = `${firstName} ${lastName}`.trim() || 'Unnamed User';
    const email = user.emailAddresses?.[0]?.emailAddress ?? '';

    return {
      id: user.id,
      name,
      email,
      role,
      active: !user.banned,
      imageUrl: user.imageUrl ?? '',
    };
  });

  return <UsersClient initialUsers={users} />;
}
