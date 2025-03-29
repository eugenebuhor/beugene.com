export const slugify = (content: string): string => {
  return content.trim().toLowerCase().replace(/\s+/g, '-');
};
