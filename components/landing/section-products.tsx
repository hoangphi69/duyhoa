import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ProductsSectionClient from './section-products-client';

export interface SubcategoryItem {
  name: string;
  slug: string;
  image: string;
  categoryTitle: string;
  categorySlug: string;
  categoryIcon: string;
}

const DISPLAY_COUNT = 10;

export default async function ProductsSection() {
  const [subcategories, totalCount] = await Promise.all([
    client.fetch<SubcategoryItem[]>(
      groq`*[_type == "productSubcategory"] | order(orderRank) [0...$count] {
        name,
        "slug": slug.current,
        "image": image.asset->url,
        "categoryTitle": category->title,
        "categorySlug": category->slug.current,
        "categoryIcon": category->icon
      }`,
      { count: DISPLAY_COUNT },
    ),
    client.fetch<number>(
      groq`count(*[_type == "productSubcategory"])`,
    ),
  ]);

  const remainingCount = totalCount - subcategories.length;

  return (
    <ProductsSectionClient
      subcategories={subcategories}
      remainingCount={remainingCount}
    />
  );
}
