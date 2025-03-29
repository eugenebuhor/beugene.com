'use server';

import prisma from '@/lib/prisma';
import { getUserUUID } from '@/lib/users';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { USER_UUID_COOKIE_KEY, USER_UUID_COOKIE_MAX_AGE } from '@/constants';
import { cookies } from 'next/headers';

export async function createUserIfNotExists(): Promise<User | null> {
  try {
    let userUUID = await getUserUUID();

    if (!userUUID) {
      const cookieStore = cookies();

      userUUID = uuidv4();
      cookieStore.set(USER_UUID_COOKIE_KEY, userUUID, {
        httpOnly: true,
        path: '/',
        maxAge: USER_UUID_COOKIE_MAX_AGE,
        sameSite: 'lax',
        secure: true,
      });
    }

    let user = await prisma.user.findUnique({
      where: { uuid: userUUID },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { uuid: userUUID },
      });
    }

    return user;
  } catch (err) {
    console.error('Database Error:', err);
    return null;
  }
}
