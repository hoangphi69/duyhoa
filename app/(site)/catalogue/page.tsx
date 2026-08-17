import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { CatalogueClient } from './client';
import { CatalogueDoc } from '@/components/product/card-catalogue';

// Updated GROQ query to target "catalogue" and pull category->icon
const dataQuery = groq`{
  "catalogues": *[_type == "catalogue"] | order(dateUpdated desc) {
    _id,
    title,
    "brandName": brand->name,
    "categoryName": category->title,
    "categoryIcon": category->icon,
    "pdfUrl": pdfFile.asset->url,
    type,
    pageCount,
    dateUpdated
  }
}`;

export default async function CataloguePage() {
  const data = await client.fetch<{ catalogues: CatalogueDoc[] }>(
    dataQuery,
    {},
    { next: { revalidate: 60 } },
  );

  const catalogues = data.catalogues || [];

  // Extract unique brands and categories for the filter chips
  const uniqueBrands = Array.from(
    new Set(catalogues.map((doc) => doc.brandName).filter(Boolean)),
  );

  const uniqueCategories = Array.from(
    new Set(catalogues.map((doc) => doc.categoryName).filter(Boolean)),
  );

  return (
    <CatalogueClient
      initialData={catalogues}
      brands={uniqueBrands}
      categories={uniqueCategories}
    />
  );
}
