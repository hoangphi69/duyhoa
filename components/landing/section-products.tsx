import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ProductsSectionClient from './section-products-client';

export interface CategoryData {
  _id: string;
  title: string;
  desc: string;
  icon: string;
  image: string;
  slug: string;
  brands: {
    name: string;
    logoUrl: string;
  }[];
  subcategories: {
    name: string;
    slug: string;
    image: string;
  }[];
}

export default async function ProductsSection() {
  // GIẢI THÍCH GROQ QUERY:
  // 1. Lấy danh sách Categories.
  // 2. subcategories: Tìm các Subcategory trỏ 'category._ref' tới Category hiện tại (^._id).
  // 3. brands: Lọc các Brand độc lập mà ID của nó tồn tại (in) trong mảng brand._ref
  //    của các Product. Điều kiện của Product là 'subcategory->category._ref' phải
  //    trùng với ID của Category hiện tại (^.^._id). Việc truy vấn Document Brand trực
  //    tiếp sẽ tự động loại bỏ trùng lặp (deduplicate).
  const categories = await client.fetch<CategoryData[]>(
    groq`*[_type == "productCategory"] | order(orderRank) {
      _id,
      title,
      desc,
      icon,
      "slug": slug.current,
      "image": image.asset->url,
      "subcategories": *[_type == "productSubcategory" && category._ref == ^._id] | order(name asc) {
        name,
        "slug": slug.current,
        "image": image.asset->url
      },
      "brands": *[_type == "brand" && _id in *[_type == "product" && subcategory->category._ref == ^.^._id].brand._ref] | order(name asc) {
        name,
        "logoUrl": logo.asset->url
      }
    }`,
  );

  return <ProductsSectionClient categories={categories} />;
}
