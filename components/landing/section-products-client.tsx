'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconMapper } from '@/lib/utils';
import type { SubcategoryItem } from './section-products';

export default function ProductsSectionClient({
  subcategories,
  remainingCount,
}: {
  subcategories: SubcategoryItem[];
  remainingCount: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = subcategories[activeIndex];

  return (
    <section className="py-10 md:py-20 max-w-[100vw] overflow-hidden">
      {/* Header */}
      <div className="items-end space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 mx-auto mb-12 container">
        <div className="flex flex-col gap-4">
          <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
            product lines
          </div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl leading-[1.3]">
            Các dòng sản phẩm
          </h2>
        </div>
        <p className="max-w-[33ch] text-muted-foreground grow">
          Cung cấp toàn diện vật tư cho mọi công trình, từ dân dụng đến công
          nghiệp.
        </p>
      </div>

      <div className="mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: Reactive images */}
          <div className="flex flex-col justify-between lg:mr-20">
            {/* Brand logos overlay — top area */}
            {active?.brands.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {active.brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex justify-center items-center h-16"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-20 max-h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}

            <div className="relative bg-card aspect-video overflow-hidden">
              {/* SVG grain filter — hidden, referenced by the overlay */}
              <svg className="absolute size-0" aria-hidden="true">
                <filter id="grain-noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </svg>

              {/* Render all images, only show active */}
              {subcategories.map((sub, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    i === activeIndex
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {sub.image ? (
                    <>
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="brightness-80 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="flex justify-center items-center bg-muted/10 w-full h-full font-mono text-muted-foreground text-xs uppercase tracking-widest">
                      Đang cập nhật
                    </div>
                  )}
                </div>
              ))}

              {/* Grain noise overlay */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
                style={{ filter: 'url(#grain-noise)' }}
              />

              {/* Bottom-left label overlay */}
              <div className="bottom-0 left-0 z-10 absolute p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex justify-center items-center">
                    <IconMapper
                      name={active?.categoryIcon || ''}
                      className="size-4 text-background"
                    />
                  </div>
                  <span className="font-mono text-background text-xs uppercase tracking-widest">
                    {active?.categoryTitle}
                  </span>
                </div>
                <h3 className="font-heading text-background text-2xl md:text-3xl tracking-tight">
                  {active?.name}
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT: Numbered list */}
          <div className="flex flex-col bg-card">
            {subcategories.map((sub, i) => (
              <Link
                key={i}
                href={`/product?subcategory=${encodeURIComponent(sub.slug)}`}
                className={`group/item flex items-center gap-4 md:gap-6 py-4 md:py-5 border-b border-border transition-colors duration-200 ${
                  i === activeIndex ? 'border-primary' : 'hover:bg-muted/50'
                }`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {/* Number */}
                <span
                  className={`font-mono text-sm tabular-nums w-6 shrink-0 transition-colors duration-200 ${
                    i === activeIndex
                      ? 'text-foreground'
                      : 'text-muted-foreground/50 group-hover/item:text-muted-foreground'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <span
                  className={`text-base md:text-lg tracking-tight transition-colors duration-200 font-heading grow ${
                    i === activeIndex
                      ? 'text-primary'
                      : 'text-foreground group-hover/item:text-foreground'
                  }`}
                >
                  {sub.name}
                </span>
              </Link>
            ))}

            {/* View all link */}
            <div className="flex sm:flex-row flex-col sm:justify-between gap-2 sm:gap-0 mt-auto">
              {remainingCount > 0 && (
                <span className="inline-block py-4 md:py-5 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                  ...{remainingCount} dòng sản phẩm khác
                </span>
              )}
              <Link
                href="/product"
                className="flex items-center gap-2 py-4 md:py-5 font-mono text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest transition-colors"
              >
                Xem tất cả sản phẩm
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
