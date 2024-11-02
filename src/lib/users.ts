'use server';

// eslint-disable-next-line camelcase
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import type { Like } from '@prisma/client';
import { USER_UUID_COOKIE_KEY } from '@/constants';
import { InternalError } from '@/lib/errors';

export const getUserUUID = async (): Promise<string | undefined> => {
  const cookieStore = cookies();
  return cookieStore.get(USER_UUID_COOKIE_KEY)?.value;
};

export const getUserLikes = async (userUUID: string): Promise<Like[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: userUUID },
      include: {
        likes: true,
      },
    });

    return user ? user.likes : [];
  } catch (err) {
    console.error('Database Error:', err);
    throw new InternalError('Internal server error');
  }
};
