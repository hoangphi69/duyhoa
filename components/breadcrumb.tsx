import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbJsonLd } from './seo/JsonLd';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      {/* JSON-LD */}
      <BreadcrumbJsonLd items={items} />

      {/* Render UI */}
      <header className="bg-muted/10 py-6 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>

            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;

              return (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 shrink-0" />

                  {!isLast ? (
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="max-w-50 sm:max-w-none font-medium text-foreground truncate">
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
