import type { Category } from '@prisma/client';
import getBaseUrl from '@/utils/getBaseUrl';

const baseUrl = getBaseUrl();

export async function getCategories(q?: string): Promise<Category[]> {
  const queryParams = new URLSearchParams();

  if (q) queryParams.append('q', q);

  const res = await fetch(`${baseUrl}/api/categories?${queryParams.toString()}`, {
    method: 'GET',
    next: { revalidate: 300 }, // 5 minutes
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch categories');
  }

  return await res.json();
}
