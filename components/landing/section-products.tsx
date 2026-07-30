'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/components/data';

export default function ProductsSection() {
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
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8 mb-12">
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
      <div className="flex flex-col">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group flex lg:flex-row flex-col bg-background border-y w-full"
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
                  <cat.icon className="stroke-[1.5] size-4 text-foreground" />
                </div>
              </div>

              {/* Title Row */}
              <div className="bg-card p-6">
                <h3 className="font-heading text-2xl xl:text-3xl tracking-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Image Row */}
              <div className="relative flex justify-center items-center bg-muted/5 p-6 border-border border-b lg:border-b-0 lg:border-b-border h-48 xl:h-64 overflow-hidden">
                {/* Placeholder for actual line art. Using an abstract SVG with primary color stroke */}
                <svg
                  className="opacity-80 w-full h-full text-primary"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 90 L40 40 L60 60 L90 10 M10 70 L40 20 L60 40 L90 -10 M30 90 L60 40 L80 60 L110 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="40" cy="40" r="3" fill="currentColor" />
                  <circle cx="60" cy="60" r="3" fill="currentColor" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-background/50 to-transparent pointer-events-none" />
              </div>

              {/* Description Row (Grow to fill remaining space if needed) */}
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
                  {cat.tags?.map(({ name }, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="group/card flex flex-col bg-background border border-border w-60 xl:w-70 h-80 cursor-pointer shrink-0"
                    >
                      <div className="flex justify-center items-center bg-muted/30 p-6 overflow-hidden text-center grow">
                        <div className="flex justify-center items-center border border-border border-dashed rounded-full w-24 h-24 group-hover/card:scale-110 transition-transform duration-500">
                          <cat.icon className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-card px-4 border-border border-t h-16">
                        <span className="mr-4 font-mono text-xs truncate uppercase tracking-wider">
                          {name}
                        </span>
                        <ChevronRight className="opacity-0 group-hover/card:opacity-100 w-4 h-4 text-muted-foreground transition-opacity shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands & Link */}
              <div className="flex bg-background border-border border-t w-full h-14 overflow-hidden">
                {/* Brands Container (Scrollable) */}
                <div className="flex overflow-x-auto grow scrollbar-hide">
                  {cat.brands.map((brand: string, bIdx: number) => (
                    <div
                      key={bIdx}
                      className="flex justify-center items-center p-4 h-full shrink-0"
                    >
                      <img
                        src={brand}
                        alt="brand logo"
                        className="opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 dark:invert max-w-full max-h-full object-contain transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Category Link */}
                <Link
                  href="#"
                  className="group/link flex items-center gap-2 bg-background hover:bg-primary opacity-0 group-hover:opacity-100 px-4 sm:px-6 border-border border-l h-full font-mono text-xs uppercase transition-all duration-300 shrink-0"
                >
                  <span className="hidden sm:inline">Xem chi tiết</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
