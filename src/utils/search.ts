/**
 * Normalizes text for search purposes.
 * - Removes special characters
 * - Converts to lowercase
 * - Normalizes whitespace
 */
export const normalizeSearchText = (text: string = ''): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .replace(/\s+/g, ' ') // replace multiple spaces with a single space
    .trim();
};
