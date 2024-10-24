import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { USER_UUID_COOKIE_KEY, USER_UUID_COOKIE_MAX_AGE } from '@/constants';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  let userUUID = req.cookies.get(USER_UUID_COOKIE_KEY)?.value;

  if (!userUUID) {
    userUUID = uuidv4();
    res.cookies.set(USER_UUID_COOKIE_KEY, userUUID, {
      httpOnly: true,
      path: '/',
      maxAge: USER_UUID_COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: true,
    });
  }

  return res;
}
