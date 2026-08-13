import { clsx, type ClassValue } from 'clsx';
import { Droplets, Package, Plug, Toilet, Wrench } from 'lucide-react';
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

// Generates a URL-safe slug from text (e.g., "Cách chọn dây" -> "cach-chon-day")
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Collapse whitespace and replace by -
    .replace(/-+/g, '-') // Collapse dashes
    .trim();
}

// Extracts H2 and H3 blocks to build the ToC
export function generateToC(blocks: PortableTextBlock[]) {
  if (!blocks) return [];
  return blocks
    .filter(
      (block) =>
        block._type === 'block' && ['h2', 'h3'].includes(block.style as string),
    )
    .map((block) => {
      // Safely extract text from the block's children
      const text =
        (block.children as any[])?.map((child) => child.text).join('') || '';
      return {
        id: slugify(text),
        text,
        level: block.style, // 'h2' or 'h3'
      };
    });
}

// --- Icon Mapper ---
export const IconMapper = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  switch (name) {
    case 'Plug':
      return <Plug className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Toilet':
      return <Toilet className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    default:
      return <Package className={className} />;
  }
};

// --- Ánh xạ màu sắc theo tên Icon thay vì tên Category ---
export const getCategoryStyle = (iconName: string) => {
  switch (iconName) {
    case 'Plug':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    case 'Droplets':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    case 'Toilet':
      return 'text-teal-500 bg-teal-500/10 border-teal-500/30';
    case 'Wrench':
      return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
    default:
      return 'text-foreground bg-muted/10 border-border';
  }
};
