import type { Tag } from '@prisma/client';
import getBaseUrl from '@/utils/getBaseUrl';

const baseUrl = getBaseUrl();

export async function getTags(q?: string): Promise<Tag[]> {
  const queryParams = new URLSearchParams();

  if (q) queryParams.append('q', q);

  const res = await fetch(`${baseUrl}/api/tags?${queryParams.toString()}`, {
    method: 'GET',
    next: { revalidate: 300 }, // 5 minutes
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch tags');
  }

  return await res.json();
}
