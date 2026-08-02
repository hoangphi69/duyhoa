import { PortableTextBlock } from 'sanity';

// Base interface for shared fields
interface BaseSanityDocument {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  content: PortableTextBlock[];
}

// 1. Type for News (Tin Duy Hoà)
export interface News extends BaseSanityDocument {
  _type: 'news';
  publishedAt: string;
  isFeatured: boolean;
}

// 2. Type for Events (Sự kiện)
export interface Event extends BaseSanityDocument {
  _type: 'event';
  eventDate: string; // ISO Datetime string
  location: string;
}

// 3. Type for Guides (Kiến thức)
export interface Guide extends BaseSanityDocument {
  _type: 'guide';
  tags: string[]; // Updated to array of strings
}
