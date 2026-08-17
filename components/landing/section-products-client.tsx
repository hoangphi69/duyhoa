'use client';

import { IconMapper } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { CategoryData } from './section-products';

export default function ProductsSectionClient({
  categories,
}: {
  categories: CategoryData[];
}) {
  // Use an array of refs to target the carousel of each category independently
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scroll = (idx: number, direction: 'left' | 'right') => {
    const node = carouselRefs.current[idx];
    if (node) {
      // Scroll by roughly one card width + gap (approx 280px)
      const scrollAmount = 280;
      node.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-10 md:py-20 max-w-[100vw] overflow-hidden">
      {/* Header Area */}
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8 mx-auto mb-12 container">
        <div className="flex flex-col gap-4">
          <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
            product lines
          </div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl leading-[1.3] grow">
            Hệ Sinh Thái Sản Phẩm Đa Dạng
          </h2>
        </div>
        <p className="max-w-[33ch] text-muted-foreground text-lg">
          Cung cấp toàn diện vật tư cho mọi công trình, từ dân dụng đến công
          nghiệp.
        </p>
      </div>

      {/* Blocky Vertical List */}
      <div className="flex flex-col mx-auto container">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group flex lg:flex-row flex-col bg-background border-border border-y w-full"
          >
            {/* LEFT COLUMN (approx 30%) */}
            <div className="flex flex-col border-border lg:border-r border-b lg:border-b-0 lg:w-87.5 xl:w-100 shrink-0">
              {/* Top Row: Number & Icon */}
              <div className="flex border-border border-b h-14">
                <div className="flex items-center px-6 border-border border-r grow">
                  <span className="font-mono text-primary text-sm tracking-widest">
                    0{idx + 1}
                  </span>
                </div>
                <div className="flex justify-center items-center bg-muted/10 w-14 shrink-0">
                  <IconMapper
                    name={cat.icon}
                    className="stroke-[1.5] size-4 text-foreground"
                  />
                </div>
              </div>

              {/* Title Row */}
              <div className="bg-card p-6">
                <h3 className="font-heading text-2xl xl:text-3xl tracking-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Image Row (Replaced Abstract Art with Category Image) */}
              <div className="relative flex justify-center items-center bg-muted/5 border-border border-b lg:border-b-0 lg:border-b-border h-48 xl:h-64 overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="opacity-80 group-hover:opacity-100 w-full h-full object-cover transition-opacity duration-500"
                  />
                ) : (
                  <div className="flex justify-center items-center bg-muted/10 w-full h-full font-mono text-muted-foreground text-xs uppercase tracking-widest">
                    Đang cập nhật
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              </div>

              {/* Description Row */}
              <div className="bg-card p-6 border-border border-t lg:border-t-0 grow">
                <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN (approx 70%) */}
            <div className="flex flex-col w-full overflow-hidden grow">
              {/* Top Area: Carousel of Product Lines */}
              <div className="relative flex flex-col justify-center bg-muted/80 min-h-[300px] grow">
                {/* Carousel Controls */}
                <div className="top-4 right-4 z-10 absolute flex gap-2">
                  <button
                    onClick={() => scroll(idx, 'left')}
                    type="button"
                    className="flex justify-center items-center bg-background hover:bg-muted border border-border w-10 h-10 transition-colors"
                    aria-label="Previous items"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll(idx, 'right')}
                    type="button"
                    className="flex justify-center items-center bg-background hover:bg-muted border border-border w-10 h-10 transition-colors"
                    aria-label="Next items"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Carousel Track */}
                <div
                  ref={(el) => {
                    carouselRefs.current[idx] = el;
                  }}
                  className="flex gap-4 p-14 w-full overflow-x-auto scroll-smooth scrollbar-hide"
                >
                  {cat.subcategories?.map((sub, sIdx) => (
                    <Link
                      href={`/product?subcategory=${encodeURIComponent(sub.slug)}`}
                      key={sIdx}
                      className="group/card flex flex-col bg-background border border-border w-60 xl:w-70 h-80 cursor-pointer shrink-0"
                    >
                      {/* Subcategory Image (Replaced Icon) */}
                      <div className="relative flex justify-center items-center bg-muted/5 border-border border-b overflow-hidden text-center grow">
                        {sub.image ? (
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex justify-center items-center border border-muted-foreground border-dashed rounded-full w-24 h-24 group-hover/card:scale-110 transition-transform duration-500">
                            <IconMapper
                              name={cat.icon}
                              className="w-8 h-8 text-muted-foreground/50"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center bg-card px-4 border-border border-t h-16">
                        <span className="mr-4 font-medium group-hover/card:text-primary text-sm truncate tracking-wider transition-colors">
                          {sub.name}
                        </span>
                        <ChevronRight className="opacity-0 group-hover/card:opacity-100 w-4 h-4 text-primary transition-opacity shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands & Link */}
              <div className="flex bg-background border-border border-t w-full h-16 overflow-hidden">
                {/* Brands Container (Scrollable) */}
                <div className="flex items-center gap-8 px-6 overflow-x-auto grow scrollbar-hide">
                  {cat.brands?.map((brand, bIdx) =>
                    brand.logoUrl ? (
                      <img
                        key={bIdx}
                        src={brand.logoUrl}
                        alt="brand logo"
                        className="opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 dark:invert h-6 object-contain transition-all duration-300 shrink-0"
                      />
                    ) : (
                      <span
                        className="font-mono text-muted-foreground group-hover:text-foreground text-xs uppercase transition-colors"
                        key={bIdx}
                      >
                        {brand.name}
                      </span>
                    ),
                  )}
                </div>

                {/* Category Link */}
                <Link
                  href={`/product?category=${encodeURIComponent(cat.slug)}`}
                  className="group/link flex items-center gap-2 bg-background hover:bg-primary opacity-0 group-hover:opacity-100 px-4 sm:px-6 border-border border-l h-full font-mono text-xs uppercase transition-all duration-300 shrink-0"
                >
                  <span className="hidden sm:inline group-hover/link:text-primary-foreground transition-colors">
                    Xem chi tiết
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover/link:text-primary-foreground transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
