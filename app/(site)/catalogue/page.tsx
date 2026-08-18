import { CatalogueDoc } from '@/components/product/card-catalogue';
import { createMetadata } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { CatalogueClient } from './client';

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

export const metadata = createMetadata({
  title: 'Bảng giá & Catalogue',
  description:
    'Tra cứu và tải bảng giá niêm yết, catalogue mới nhất của các hãng do Duy Hoà 68 phân phối. Giá đại lý và chiết khấu theo sản lượng liên hệ trực tiếp.',
  path: '/catalogue',
  keywords: [
    'bảng giá thiết bị điện',
    'bảng giá ống nước Tiền Phong',
    'catalogue thiết bị vệ sinh',
    'báo giá vật tư điện nước',
    'bảng giá đại lý',
  ],
  image: '/og/og-catalogue.jpg',
});

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
