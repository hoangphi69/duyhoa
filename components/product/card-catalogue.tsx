import { cn, getCategoryStyle, IconMapper } from '@/lib/utils'; // Adjust import path as needed
import { ArrowRight } from 'lucide-react';

export interface CatalogueDoc {
  _id: string;
  title: string;
  brandName: string;
  categoryName: string;
  categoryIcon?: string;
  pdfUrl: string;
  type: string;
  pageCount: number;
  dateUpdated: string;
}

export function CatalogueCard({ doc }: { doc: CatalogueDoc }) {
  const pages = doc.pageCount ? `${doc.pageCount} TRANG` : '—';
  const dateFormatted = doc.dateUpdated
    ? new Date(doc.dateUpdated).toLocaleString('vi-VN', { dateStyle: 'short' })
    : '—';

  return (
    <article className="group relative bg-card hover:shadow-[6px_6px_0_var(--primary)] p-5 ring-border ring hover:ring-foreground transition-all hover:-translate-y-0.75 duration-150 ease-out">
      {/* Corner registration ticks — the signature motif */}
      <span className="-top-px -left-px absolute border-muted-foreground/30 border-t border-l size-2.5 transition-colors duration-150" />
      <span className="-top-px -right-px absolute border-muted-foreground/30 border-t border-r size-2.5 transition-colors duration-150" />
      <span className="-bottom-px -left-px absolute border-muted-foreground/30 border-b border-l size-2.5 transition-colors duration-150" />
      <span className="-right-px -bottom-px absolute border-muted-foreground/30 border-r border-b size-2.5 transition-colors duration-150" />

      {/* Tags Section (Replaced Eyebrow/Code with ProductCard tag style) */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Category Tag */}
        {doc.categoryIcon ? (
          <span
            title={doc.categoryName}
            className={cn(
              'flex justify-center items-center gap-2 px-2 border h-6 transition-colors',
              getCategoryStyle(doc.categoryIcon),
              'font-mono text-[10px] uppercase tracking-widest',
            )}
          >
            <IconMapper name={doc.categoryIcon} className="w-3.5 h-3.5" />
            {doc.categoryName}
          </span>
        ) : (
          <span className="flex items-center bg-muted/30 px-2 border border-border h-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {doc.categoryName}
          </span>
        )}

        {/* Type Tag */}
        {doc.type && (
          <span className="flex items-center bg-muted/30 px-2 border border-border h-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {doc.type}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2 mb-4 min-h-12 text-[22px] text-foreground uppercase leading-[1.05]">
        <span className="font-heading font-bold">{doc.title}</span>
        <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          {doc.brandName}
        </span>
      </div>

      <div className="my-3.5 border-muted-foreground border-t border-dashed" />

      {/* Meta info */}
      <div className="flex justify-between items-center mb-4 font-mono text-[10.5px] text-muted-foreground uppercase tracking-[0.03em]">
        <span>CẬP NHẬT {dateFormatted}</span>
        <span>{pages}</span>
      </div>

      {/* Download Button */}
      <a
        href={doc.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="group/dl flex justify-between items-center hover:bg-foreground px-3.5 py-2.5 border border-foreground font-mono text-foreground hover:text-background text-xs uppercase tracking-[0.06em] transition-colors"
      >
        <span>Xem pdf</span>
        <ArrowRight className="size-4 transition-transform group-hover/dl:translate-x-0.5 duration-150" />
      </a>
    </article>
  );
}
