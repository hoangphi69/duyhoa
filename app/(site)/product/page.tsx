import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ProductsClient from './client';

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  subcategory: string;
  subcategorySlug: string;
  category: string;
  categorySlug: string;
  image: string;
}

export interface SanityCategoryTag {
  name: string;
  slug: string;
}

export interface SanityCategory {
  title: string;
  slug: string;
  icon: string;
  tags: SanityCategoryTag[];
}

export interface SanityBrand {
  name: string;
  slug: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    brand?: string;
  }>;
}) {
  const resolvedParams = await searchParams;

  const [products, categories, brands] = await Promise.all([
    client.fetch<SanityProduct[]>(
      groq`*[_type == "product"] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        "brand": brand->name,
        "brandSlug": brand->slug.current,
        "subcategory": subcategory->name,
        "subcategorySlug": subcategory->slug.current,
        "category": subcategory->category->title,
        "categoryIcon": subcategory->category->icon,
        "categorySlug": subcategory->category->slug.current,
        "image": images[0].asset->url
      }`,
    ),
    client.fetch<SanityCategory[]>(
      groq`*[_type == "productCategory"] | order(orderRank) {
        title,
        "slug": slug.current,
        icon,
        "tags": *[_type == "productSubcategory" && references(^._id)] {
          name,
          "slug": slug.current
        }
      }`,
    ),
    client.fetch<SanityBrand[]>(
      groq`*[_type == "brand"] | order(name asc) {
        name,
        "slug": slug.current
      }`,
    ),
  ]);

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
      brands={brands}
      initialFilters={{
        category: resolvedParams.category || '',
        subcategory: resolvedParams.subcategory || '',
        brand: resolvedParams.brand || '',
      }}
    />
  );
}
