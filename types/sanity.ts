import { PortableTextBlock } from 'sanity';

// Base interface for shared fields
interface BaseSanityDocument {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: 'news' | 'event' | 'guide';
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  content: PortableTextBlock[];
  seoKeywords?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface News extends BaseSanityDocument {
  _type: 'news';
  publishedAt: string;
  isFeatured: boolean;
}

export interface Event extends BaseSanityDocument {
  _type: 'event';
  eventDate: string;
  location: string;
}

export interface Guide extends BaseSanityDocument {
  _type: 'guide';
  tags: string[];
}
