import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ProductsSectionClient from './section-products-client';

export interface BrandLogo {
  name: string;
  logo: string;
}

export interface SubcategoryItem {
  name: string;
  slug: string;
  image: string;
  categoryTitle: string;
  categorySlug: string;
  categoryIcon: string;
  brands: BrandLogo[];
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
        "categoryIcon": category->icon,
        "brands": *[_type == "product" && references(^._id)].brand->{
          name,
          "logo": logo.asset->url
        } | order(name asc)
      }`,
      { count: DISPLAY_COUNT },
    ),
    client.fetch<number>(
      groq`count(*[_type == "productSubcategory"])`,
    ),
  ]);

  // Deduplicate brands per subcategory (GROQ returns one per product)
  const deduped = subcategories.map((sub) => ({
    ...sub,
    brands: sub.brands
      .filter((b) => b.logo)
      .filter(
        (b, i, arr) => arr.findIndex((x) => x.name === b.name) === i,
      ),
  }));

  const remainingCount = totalCount - deduped.length;

  return (
    <ProductsSectionClient
      subcategories={deduped}
      remainingCount={remainingCount}
    />
  );
}
