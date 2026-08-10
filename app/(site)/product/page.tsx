import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ProductsClient from './client';

// Định nghĩa Types tĩnh cho dữ liệu trả về
export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  subcategory: string;
  category: string;
  image: string;
}

export interface SanityCategory {
  title: string;
  icon: string;
  tags: string[];
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
  // Fetch toàn bộ dữ liệu song song (Parallel Data Fetching)
  const [products, categories, brands] = await Promise.all([
    client.fetch<SanityProduct[]>(
      groq`*[_type == "product"] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        "brand": brand->name,
        "subcategory": subcategory->name,
        "category": subcategory->category->title,
        "image": images[0].asset->url
      }`,
    ),
    client.fetch<SanityCategory[]>(
      groq`*[_type == "productCategory"] | order(title asc) {
        title,
        icon,
        "tags": *[_type == "productSubcategory" && references(^._id)].name
      }`,
    ),
    client.fetch<{ name: string }[]>(
      groq`*[_type == "brand"] | order(name asc) { name }`,
    ),
  ]);

  // Chuyển mảng object brands thành mảng string đơn giản cho Client
  const brandNames = brands.map((b) => b.name);

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
      brands={brandNames}
      initialFilters={{
        category: resolvedParams.category || '',
        subcategory: resolvedParams.subcategory || '',
        brand: resolvedParams.brand || '',
      }}
    />
  );
}
