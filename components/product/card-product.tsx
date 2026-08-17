import Link from 'next/link';
import { cn, getCategoryStyle, IconMapper } from '@/lib/utils'; // Adjust this import path as needed

export interface Product {
  _id: string;
  slug: string;
  name: string;
  image?: string;
  subcategory?: string;
  brand?: string;
  category?: string;
  categoryIcon?: string;
  categorySlug?: string;
  // Newly added optional fields based on the new layout design
  sku?: string;
  price?: string;
  unit?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group/card hover:z-10 relative flex flex-col bg-card hover:shadow-[6px_6px_0_var(--primary)] ring-border ring hover:ring-foreground overflow-hidden transition-all hover:-translate-y-0.75 duration-150 ease-out"
    >
      {/* Swatch (Image Section) */}
      <div className="relative bg-muted/5 border-border border-b aspect-square overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex justify-center items-center bg-muted/40 w-full h-full font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Đang cập nhật
          </div>
        )}

        {/* Top Right: Code / Brand */}
        {(product.sku || product.brand) && (
          <span className="top-2 right-2.5 absolute bg-background/85 backdrop-blur-sm px-1.5 py-0.5 font-mono text-[9.5px] text-foreground">
            {product.sku || product.brand}
          </span>
        )}
      </div>

      {/* Content Section (prod-body) */}
      <div className="flex flex-col items-start gap-4 p-5 grow">
        {/* Eyebrow: Subcategory */}
        {product.categoryIcon ? (
          <span
            title={product.category}
            className={cn(
              'flex justify-center items-center gap-2 px-2 border h-6 transition-colors',
              getCategoryStyle(product.categoryIcon), // Ensure this function is in scope
              'font-mono text-[10px] uppercase tracking-widest',
            )}
          >
            <IconMapper name={product.categoryIcon} className="w-3.5 h-3.5" />
            {product.subcategory}
          </span>
        ) : (
          <span className="flex items-center bg-muted/30 group-hover/card:bg-card px-2 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
            {product.subcategory}
          </span>
        )}

        {/* Title */}
        <h3 className="mb-1.5 min-h-12 font-heading font-bold text-lg line-clamp-2 leading-snug transition-colors">
          {product.name}
        </h3>

        {/* Divider */}
        <div className="my-3 border-muted-foreground border-t border-dashed w-full" />

        {/* Price Row */}
        <div className="flex justify-between items-baseline">
          <span className="font-mono font-medium text-[18px] text-primary">
            {product.price ? product.price : 'Liên hệ'}
            {product.price && (
              <span className="ml-1 text-[11px] text-muted-foreground">đ</span>
            )}
          </span>
          {product.unit && (
            <span className="font-mono text-[11px] text-muted-foreground">
              / {product.unit}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
