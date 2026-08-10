import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import NavbarClient from './navbar-client';

export interface NavbarCategory {
  title: string;
  icon: string;
  tags: {
    name: string;
    desc: string;
    image: string;
    slug: string;
  }[];
}

export default async function Navbar() {
  const categories = await client.fetch<NavbarCategory[]>(
    groq`*[_type == "productCategory"] | order(title asc) {
      title,
      icon,
      "tags": *[_type == "productSubcategory" && references(^._id)] {
        name,
        desc,
        "image": image.asset->url,
        "slug": slug.current
      }
    }`,
  );

  return <NavbarClient categories={categories} />;
}
