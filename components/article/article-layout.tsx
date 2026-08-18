import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Breadcrumbs } from '../breadcrumb';

interface ArticleListLayoutProps {
  breadcrumbName: string;
  categoryName: string;
  title: ReactNode;
  description: string;
  gridClassName?: string;
  children: ReactNode;
  isEmpty: boolean;
  emptyIcon: ReactNode;
  currentPage: number;
  totalPages: number;
  paginationPath: string;
}

export function ArticleListLayout({
  breadcrumbName,
  categoryName,
  title,
  description,
  gridClassName = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  children,
  isEmpty,
  emptyIcon,
  currentPage,
  totalPages,
  paginationPath,
}: ArticleListLayoutProps) {
  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      <Breadcrumbs
        items={[
          { name: 'Tin tức', href: '/article' },
          { name: breadcrumbName, href: paginationPath },
        ]}
      />

      {/* Page Header */}
      <section className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center self-start gap-2 bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              {categoryName}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.1] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        <div
          className={cn(
            'gap-px grid bg-border border border-border w-full',
            gridClassName,
          )}
        >
          {children}
        </div>

        {/* Empty State */}
        {isEmpty && (
          <div className="flex flex-col justify-center items-center bg-card py-24 border border-border border-t-0 text-center">
            <div className="mb-4 text-muted-foreground/30">{emptyIcon}</div>
            <h3 className="mb-2 font-heading text-2xl">
              Không có bài viết nào
            </h3>
            <p className="text-muted-foreground">
              Hiện tại chuyên mục này chưa có nội dung.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center bg-card mt-px p-4 border border-border border-t-0">
            {currentPage > 1 ? (
              <Link
                href={`${paginationPath}?page=${currentPage - 1}`}
                className="flex items-center gap-2 font-mono font-medium hover:text-primary text-xs uppercase tracking-widest transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Trang trước
              </Link>
            ) : (
              <div className="w-[100px]" />
            )}

            <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
              Trang {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`${paginationPath}?page=${currentPage + 1}`}
                className="flex items-center gap-2 font-mono font-medium hover:text-primary text-xs uppercase tracking-widest transition-colors"
              >
                Trang tiếp <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="w-[100px]" />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
