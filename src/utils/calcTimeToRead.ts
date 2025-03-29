import MarkdownIt from 'markdown-it';

export const calcTimeToRead = (markdownContent: string): number => {
  // Convert markdown to plain text
  const md = new MarkdownIt();
  const renderedContent = md.render(markdownContent);
  // Remove HTML tags
  const textContent = renderedContent.replace(/<[^>]*>/g, '');

  // Count words
  const words = textContent.trim().split(/\s+/).length;

  // Calculate reading time
  const wordsPerMinute = 200;
  const minimumMinutes = 1;
  const minutes = Math.max(minimumMinutes, Math.ceil(words / wordsPerMinute));

  return minutes;
};
