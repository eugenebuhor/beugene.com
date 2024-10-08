import { NextResponse } from 'next/server';

export function handleError(error: unknown) {
  console.error('API Error:', error);

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
