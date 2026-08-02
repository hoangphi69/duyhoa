import { clsx, type ClassValue } from 'clsx';
import { PortableTextBlock } from 'sanity';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadTime(blocks: PortableTextBlock[]): number {
  if (!blocks || !Array.isArray(blocks)) return 1;

  // Extract raw text from Sanity block content
  const plainText = blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      // Asserting child as any to access the text property safely in this context
      return (block.children as any[]).map((child) => child.text).join('');
    })
    .join(' ');

  // Calculate word count
  const wordCount = plainText.trim().split(/\s+/).length;

  // Calculate read time (assuming 200 words per minute)
  const readTime = Math.ceil(wordCount / 200);

  return readTime === 0 ? 1 : readTime;
}
