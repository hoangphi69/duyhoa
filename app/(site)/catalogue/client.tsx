'use client';

import { Breadcrumbs } from '@/components/breadcrumb';
import {
  CatalogueCard,
  CatalogueDoc,
} from '@/components/product/card-catalogue';
import { cn } from '@/lib/utils';
import { FileX } from 'lucide-react';
import { useState } from 'react';

interface CatalogueClientProps {
  initialData: CatalogueDoc[];
  brands: string[];
  categories: string[];
}

export function CatalogueClient({
  initialData,
  brands,
  categories,
}: CatalogueClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredData = initialData.filter((doc) => {
    if (activeFilter === 'ALL') return true;
    return doc.brandName === activeFilter || doc.categoryName === activeFilter;
  });

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      <Breadcrumbs items={[{ name: 'Bảng giá', href: '/catalogue' }]} />

      {/* Page Header */}
      <section className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              catalogue
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.1] tracking-tight">
              Danh sách bảng giá
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Cập nhật liên tục catalogue mới nhất từ các nhà cung cấp và thương
              hiệu đối tác.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pb-6">
          <span className="mr-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
            Lọc theo:
          </span>
          <button
            onClick={() => setActiveFilter('ALL')}
            className={cn(
              'px-4 py-1.5 border font-mono text-xs uppercase tracking-widest transition-colors',
              activeFilter === 'ALL'
                ? 'bg-foreground text-background border-foreground'
                : 'bg-card text-foreground border-border hover:border-foreground',
            )}
          >
            Tất cả
          </button>

          {brands.map((brand) => (
            <button
              key={`brand-${brand}`}
              onClick={() => setActiveFilter(brand)}
              className={cn(
                'px-4 py-1.5 border font-mono text-xs uppercase tracking-widest transition-colors',
                activeFilter === brand
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary hover:text-primary',
              )}
            >
              {brand}
            </button>
          ))}

          {categories.map((cat) => (
            <button
              key={`cat-${cat}`}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'px-4 py-1.5 border font-mono text-xs uppercase tracking-widest transition-colors',
                activeFilter === cat
                  ? 'bg-muted-foreground text-background border-muted-foreground'
                  : 'bg-card text-foreground border-border hover:border-muted-foreground hover:text-muted-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        {filteredData.length > 0 ? (
          <div className="gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-border border border-border w-full">
            {filteredData.map((doc) => (
              <CatalogueCard key={doc._id} doc={doc} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col justify-center items-center bg-card py-24 border border-border text-center">
            <div className="mb-4 text-muted-foreground/30">
              <FileX className="w-12 h-12" />
            </div>
            <h3 className="mb-2 font-heading text-2xl uppercase">
              Không có tài liệu
            </h3>
            <p className="font-mono text-muted-foreground text-sm">
              Hiện tại bộ lọc này chưa có catalogue nào được tải lên.
            </p>
            <button
              onClick={() => setActiveFilter('ALL')}
              className="hover:bg-foreground mt-6 px-6 py-2 border border-foreground font-mono hover:text-background text-xs uppercase tracking-widest transition-colors"
            >
              Xem tất cả
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
