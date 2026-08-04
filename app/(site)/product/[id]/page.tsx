'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
  Truck,
  Package,
  Zap,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- Mock Data ---
const PRODUCT_DATA = {
  id: 'SP-1024',
  name: 'Ống nhựa uPVC Tiền Phong hệ mét Class 2 (PN 6)',
  sku: 'DH-TP-UPVC-C2',
  brand: 'Tiền Phong',
  category: 'Vật tư nước',
  tag: 'Ống Cấp & Thoát Nước',
  price: 'Liên hệ báo giá',
  status: 'Còn hàng',
  warranty: '12 tháng',
  images: [
    'https://picsum.photos/800/800?random=10',
    'https://picsum.photos/800/800?random=11',
    'https://picsum.photos/800/800?random=12',
    'https://picsum.photos/800/800?random=13',
  ],
  description: `Ống nhựa uPVC Tiền Phong được sản xuất theo tiêu chuẩn ISO 1452:2009 (TCVN 8491:2011) trên dây chuyền công nghệ hiện đại của Châu Âu. Sản phẩm có đặc tính cơ lý ưu việt, chịu được áp lực cao, chống ăn mòn hóa học và không bị đóng cặn trong quá trình sử dụng.

Thích hợp ứng dụng trong các hệ thống cấp nước sạch, hệ thống thoát nước thải, hệ thống ống dẫn công nghiệp và hệ thống tưới tiêu nông nghiệp.`,
  specs: [
    { label: 'Thương hiệu', value: 'Nhựa Tiền Phong' },
    { label: 'Chất liệu', value: 'Nhựa uPVC cao cấp' },
    { label: 'Đường kính ngoài', value: 'Từ 21mm đến 500mm' },
    { label: 'Áp suất làm việc', value: 'PN6, PN8, PN10, PN12.5, PN16, PN25' },
    { label: 'Tiêu chuẩn', value: 'ISO 1452:2009 / TCVN 8491:2011' },
    { label: 'Nhiệt độ sử dụng', value: '0°C đến 45°C' },
    { label: 'Tuổi thọ', value: 'Trên 50 năm' },
  ],
};

const RELATED_PRODUCTS = [
  {
    id: 1,
    name: 'Phụ kiện Cút uPVC Tiền Phong',
    brand: 'Tiền Phong',
    tag: 'Phụ Kiện Nối Ống',
    image: 'https://picsum.photos/400/400?random=20',
  },
  {
    id: 2,
    name: 'Ống nhựa chịu nhiệt PPR Tiền Phong',
    brand: 'Tiền Phong',
    tag: 'Ống Cấp & Thoát Nước',
    image: 'https://picsum.photos/400/400?random=21',
  },
  {
    id: 3,
    name: 'Van bi nhựa rắc co PVC',
    brand: 'Tiền Phong',
    tag: 'Van Nước',
    image: 'https://picsum.photos/400/400?random=22',
  },
];

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Breadcrumb Header */}
      <header className="bg-muted/5 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Sản phẩm
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/products?category=${PRODUCT_DATA.category}`}
              className="hover:text-primary transition-colors"
            >
              {PRODUCT_DATA.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-bold text-foreground">
              {PRODUCT_DATA.brand}
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto mt-8 px-4 sm:px-6 lg:px-8 container">
        {/* Main Hero Bento Grid */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-2 bg-border border border-border w-full">
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col bg-background h-full">
            {/* Main Active Image */}
            <div className="relative flex justify-center items-center bg-card p-8 border-border border-b aspect-square">
              <img
                src={PRODUCT_DATA.images[activeImage]}
                alt={PRODUCT_DATA.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <div className="top-4 left-4 absolute flex gap-2">
                <span className="bg-blue-500/10 px-3 py-1 border border-blue-500/30 font-mono font-bold text-blue-500 text-xs uppercase tracking-widest">
                  {PRODUCT_DATA.brand}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="gap-px grid grid-cols-4 bg-border shrink-0">
              {PRODUCT_DATA.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    'relative bg-card aspect-square overflow-hidden transition-all duration-300',
                    activeImage === idx
                      ? 'ring-2 ring-primary ring-inset z-10'
                      : 'hover:bg-muted/50 opacity-70 hover:opacity-100',
                  )}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col bg-card h-full">
            <div className="flex flex-col p-8 md:p-12 lg:p-14 grow">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="flex items-center bg-muted/30 px-2 border border-border h-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Mã SP: {PRODUCT_DATA.sku}
                </span>
                <span className="flex items-center bg-muted/30 px-2 border border-border h-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  {PRODUCT_DATA.tag}
                </span>
                <span className="flex items-center gap-1 bg-emerald-600/10 px-2 border border-emerald-600/20 h-6 font-mono font-bold text-[10px] text-emerald-600 uppercase tracking-widest">
                  <Check className="w-3 h-3" /> {PRODUCT_DATA.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-8 font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.2] tracking-tight">
                {PRODUCT_DATA.name}
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
                    Có hàng trong ngày tại Quảng Ninh.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Đủ quy cách:</strong>{' '}
                    Không lo đứt gãy nguồn cung công trình.
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
                    {PRODUCT_DATA.price}
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
          {/* LEFT: Technical Specs (Rigid Table look) */}
          <div className="flex flex-col lg:col-span-1 bg-card">
            <div className="bg-muted/10 p-6 border-border border-b">
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest">
                Thông số kỹ thuật
              </h3>
            </div>
            <div className="flex flex-col">
              {PRODUCT_DATA.specs.map((spec, idx) => (
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
              ))}
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
                {PRODUCT_DATA.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
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
            {RELATED_PRODUCTS.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
              >
                <div className="relative bg-muted/5 border-border border-b aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 grow">
                  <h3 className="mb-6 min-h-12 font-heading group-hover/card:text-primary-foreground text-lg line-clamp-2 leading-snug transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-auto">
                    <span className="flex items-center bg-muted/30 group-hover/card:bg-transparent px-2 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                      {product.tag}
                    </span>
                    <span className="flex items-center bg-muted/30 group-hover/card:bg-transparent px-2 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                      {product.brand}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
