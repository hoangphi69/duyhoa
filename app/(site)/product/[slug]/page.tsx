import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import {
  ChevronRight,
  MessageCircle,
  FileText,
  ShieldCheck,
  Truck,
  Package,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      "category": subcategory->category->title
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
      "image": images[0].asset->url
    }`,
    { subcategoryId, currentProductId },
  );
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Duy Hoà 68`,
    description:
      product.description?.substring(0, 160) ||
      `Sản phẩm ${product.name} chính hãng từ ${product.brand}`,
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160),
      url: `https://duyhoa.vn/product/${product.slug}`,
      siteName: 'Duy Hoà 68',
      images: product.images
        ? [{ url: product.images[0], width: 800, height: 800 }]
        : [],
      locale: 'vi_VN',
      type: 'website',
    },
  };
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

      {/* Breadcrumb Header */}
      <header className="bg-muted/5 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/product"
              className="hover:text-primary transition-colors"
            >
              Sản phẩm
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-bold text-foreground">{product.name}</span>
          </nav>
        </div>
      </header>

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
                <span className="flex items-center bg-muted/30 px-2 border border-border h-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  {product.subcategory}
                </span>
                <span className="flex items-center gap-1 bg-emerald-600/10 px-2 border border-emerald-600/20 h-6 font-mono font-bold text-[10px] text-emerald-600 uppercase tracking-widest">
                  <Check className="w-3 h-3" /> {product.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-8 font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.2] tracking-tight">
                {product.name}
              </h1>

              {/* Quick Perks */}
              <ul className="flex flex-col gap-4 mb-10 py-6 border-border border-y">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="text-foreground">
                      Chính hãng 100%:
                    </strong>{' '}
                    Đầy đủ giấy tờ CO/CQ, VAT.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="text-foreground">
                      Giao hàng hoả tốc:
                    </strong>{' '}
                    Giao tuyến cố định hàng tuần khu vực Đông Bắc Bộ.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Đủ quy cách:</strong>{' '}
                    Năng lực tổng kho không đứt gãy nguồn cung.
                  </span>
                </li>
              </ul>

              {/* Pricing & CTA */}
              <div className="mt-auto">
                <div className="mb-6">
                  <span className="block mb-1 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                    Mức giá đại lý
                  </span>
                  <span className="font-mono font-bold text-primary text-3xl">
                    Liên hệ báo giá
                  </span>
                </div>

                <div className="flex sm:flex-row flex-col gap-4">
                  <Button className="flex-1 rounded-none h-14 font-mono font-bold text-sm uppercase tracking-wider">
                    <FileText className="mr-2 w-4 h-4" />
                    Thêm vào báo giá
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 border-blue-600 rounded-none h-14 font-mono font-bold text-white hover:text-white text-sm uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Zalo Tư Vấn
                  </Button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-4 font-mono text-muted-foreground text-sm">
                  Hoặc gọi hotline:{' '}
                  <strong className="text-foreground">0333.455.889</strong>
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
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest">
                Thông số kỹ thuật
              </h3>
            </div>
            <div className="flex flex-col">
              {product.specs && product.specs.length > 0 ? (
                product.specs.map((spec: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start p-4 border-border/50 last:border-0 border-b text-sm"
                  >
                    <span className="font-medium text-muted-foreground">
                      {spec.label}
                    </span>
                    <span className="max-w-[60%] font-bold text-foreground text-right">
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
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest">
                Mô tả chi tiết
              </h3>
            </div>
            <div className="dark:prose-invert p-8 md:p-12 max-w-none prose prose-zinc">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
                {product.description || 'Đang cập nhật mô tả sản phẩm...'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl uppercase tracking-tight">
                Sản phẩm cùng danh mục
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-1 font-mono font-bold hover:text-primary text-sm uppercase tracking-widest transition-colors"
              >
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-border border border-border">
              {relatedProducts.map((related: any) => (
                <Link
                  href={`/product/${related.slug}`}
                  key={related._id}
                  className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
                >
                  <div className="relative bg-muted/5 border-border border-b aspect-square overflow-hidden">
                    {related.image && (
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-6 grow">
                    <h3 className="mb-6 min-h-12 font-heading group-hover/card:text-primary-foreground text-lg line-clamp-2 leading-snug transition-colors">
                      {related.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-auto">
                      <span className="flex items-center bg-muted/30 group-hover/card:bg-transparent px-2 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                        {related.subcategory}
                      </span>
                      <span className="flex items-center bg-muted/30 group-hover/card:bg-transparent px-2 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                        {related.brand}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
