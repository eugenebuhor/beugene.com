'use server';

// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import type { Like } from '@prisma/client';
import { CacheKeys, CacheTags, USER_UUID_COOKIE_KEY } from '@/constants';
import { InternalError } from '@/lib/errors';

const GET_USER_LIKES_REVALIDATE_TIMEOUT = 300; // 5 minutes

export const getUserUUID = async (): Promise<string | undefined> => {
  const cookieStore = cookies();
  return cookieStore.get(USER_UUID_COOKIE_KEY)?.value;
};

export const getUserLikes = async (userUUID: string): Promise<Like[]> => {
  const userLikes = await _getUserLikes(userUUID);

  if (userLikes === null) {
    throw new InternalError('Internal server error');
  }

  return userLikes;
};

export const _getUserLikes = unstable_cache(
  async (userUUID: string): Promise<Like[] | null> => {
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
      return null;
    }
  },
  [CacheKeys.GET_USER_LIKES],
  {
    revalidate: GET_USER_LIKES_REVALIDATE_TIMEOUT,
    tags: [CacheTags.USER_LIKES],
  },
);
