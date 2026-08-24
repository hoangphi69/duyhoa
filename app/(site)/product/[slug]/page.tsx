import { Breadcrumbs } from '@/components/breadcrumb';
import { ProductCard } from '@/components/product/card-product';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  cn,
  createMetadata,
  formatPhoneNumber,
  getCategoryStyle,
  IconMapper,
} from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { ArrowRight, Check, Package, ShieldCheck, Truck } from 'lucide-react';
import { Metadata } from 'next';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from './product-gallery';

// --- DATA FETCHING ---
async function getProduct(slug: string) {
  return await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      status,
      "images": images[].asset->url,
      description,
      specs,
      "brand": brand->name,
      "subcategory": subcategory->name,
      "category": subcategory->category->title,
      "categoryIcon": subcategory->category->icon,
    }`,
    { slug: String(slug) },
  );
}

async function getRelatedProducts(
  subcategoryId: string,
  currentProductId: string,
) {
  // Lấy 3 sản phẩm cùng subcategory
  return client.fetch(
    groq`*[_type == "product" && subcategory->name == $subcategoryId && _id != $currentProductId][0...3] {
      _id,
      name,
      "slug": slug.current,
      "brand": brand->name,
      "subcategory": subcategory->name,
      "image": images[0].asset->url,
      "categoryIcon": subcategory->category->icon
    }`,
    { subcategoryId, currentProductId },
  );
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) return { title: 'Sản phẩm không tồn tại | Duy Hoà 68' };

  return createMetadata({
    title: product.name,
    description:
      product.description?.substring(0, 160) ||
      `Sản phẩm ${product.name} chính hãng từ ${product.brand}`,
    path: `/article/${product.slug}`,
    keywords: [
      product.name,
      product.brand,
      product.category,
      product.subcategory,
    ],
    // image: '/og/og-product.png',
    type: 'website',
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.subcategory,
    product._id,
  );

  // JSON-LD cho Product
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      availability:
        product.status === 'Còn hàng'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Sản phẩm', href: '/product' },
          { name: product.name, href: `/product/${product.slug}` },
        ]}
      />

      <main className="mx-auto mt-8 px-4 sm:px-6 lg:px-8 container">
        {/* Main Hero Bento Grid */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-2 bg-border border border-border w-full">
          {/* LEFT: Image Gallery (Client Component) */}
          <ProductGallery images={product.images || []} brand={product.brand} />

          {/* RIGHT: Product Info */}
          <div className="flex flex-col bg-card h-full">
            <div className="flex flex-col p-8 md:p-12 lg:p-14 grow">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span
                  title={product.category}
                  className={cn(
                    'flex justify-center items-center gap-2 px-2 border h-6 transition-colors',
                    getCategoryStyle(product.categoryIcon),
                    'group-hover/card:bg-card',
                    'font-mono text-[10px] uppercase tracking-widest',
                  )}
                >
                  <IconMapper
                    name={product.categoryIcon}
                    className="w-3.5 h-3.5"
                  />
                  {product.subcategory}
                </span>
                <span className="flex items-center gap-1 bg-emerald-600/10 px-2 border border-emerald-600/20 h-6 font-mono font-bold text-[10px] text-emerald-600 uppercase tracking-widest">
                  <Check className="w-3 h-3" /> {product.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-8 font-heading text-3xl sm:text-4xl leading-[1.2] tracking-tight">
                {product.name}
              </h1>

              {/* Quick Perks */}
              <ul className="flex flex-col gap-4 bg-muted/50 mb-10 p-6 border-border border-y">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="font-semibold text-foreground">
                      Chính hãng 100%:
                    </strong>{' '}
                    Đầy đủ giấy tờ CO/CQ, VAT.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Truck className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="font-semibold text-foreground">
                      Giao hàng hoả tốc:
                    </strong>{' '}
                    Giao tuyến cố định hàng tuần khu vực Đông Bắc Bộ.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Package className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="font-semibold text-foreground">
                      Đủ quy cách:
                    </strong>{' '}
                    Năng lực tổng kho không đứt gãy nguồn cung.
                  </span>
                </li>
              </ul>

              {/* Pricing & CTA */}
              <div className="mt-auto">
                <div className="mb-6">
                  <span className="block mb-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                    Mức giá đại lý
                  </span>
                  <span className="font-semibold text-primary text-3xl">
                    Liên hệ báo giá
                  </span>
                </div>

                <div className="flex sm:flex-row flex-col gap-4">
                  <Button className="flex-1 rounded-none h-14 font-mono text-sm uppercase tracking-wider">
                    Thêm vào báo giá
                  </Button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-4 font-mono text-muted-foreground text-sm">
                  Hoặc gọi hotline:{' '}
                  <strong className="text-foreground">
                    {formatPhoneNumber(siteConfig.contact.hotline)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Bento Grid */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-3 mt-12 bg-border border border-border w-full">
          {/* LEFT: Technical Specs */}
          <div className="flex flex-col lg:col-span-1 bg-card">
            <div className="bg-muted/10 p-6 border-border border-b">
              <h3 className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
                Thông số kỹ thuật
              </h3>
            </div>
            <div className="flex flex-col">
              {product.specs && product.specs.length > 0 ? (
                product.specs.map((spec: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start p-6 border-border/50 last:border-0 border-b text-sm"
                  >
                    <span className="font-medium text-muted-foreground">
                      {spec.label}
                    </span>
                    <span className="max-w-[60%] font-semibold text-foreground text-right">
                      {spec.value}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-muted-foreground text-sm">
                  Đang cập nhật...
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Description */}
          <div className="flex flex-col lg:col-span-2 bg-background">
            <div className="bg-muted/10 p-6 border-border border-b">
              <h3 className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
                Mô tả chi tiết
              </h3>
            </div>
            <div className="dark:prose-invert p-6 max-w-none prose prose-zinc">
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {product.description || 'Đang cập nhật mô tả sản phẩm...'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-heading text-3xl uppercase tracking-tight">
                Sản phẩm cùng danh mục
              </h2>
              <Link
                href="/product"
                className="flex items-center gap-2 font-mono text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest transition-colors"
              >
                Xem tất cả <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-border border border-border">
              {relatedProducts.map((related: any) => (
                <ProductCard key={related._id} product={related} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
