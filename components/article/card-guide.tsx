import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Guide } from '@/types/sanity';

export function GuideCard({
  guide,
  readTime,
}: {
  guide: Guide;
  readTime: number;
}) {
  return (
    <Link
      href={`/article/${guide.slug}`}
      className="group/card relative flex flex-col bg-card hover:shadow-[5px_5px_0_var(--primary)] hover:ring hover:ring-foreground transition-all hover:-translate-y-1 duration-200"
    >
      <div className="relative bg-muted/5 border-border border-b w-full aspect-16/6 overflow-hidden shrink-0">
        {guide.imageUrl ? (
          <img
            src={guide.imageUrl}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-muted/40 w-full h-full font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Đang cập nhật
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-col p-5 sm:p-6 grow">
        {/* Title */}
        <h3 className="mb-3 font-heading font-bold text-foreground text-xl line-clamp-2 leading-snug">
          {guide.title}
        </h3>

        {/* Tags (Chip Style) */}
        <div className="flex flex-wrap gap-2 mb-6">
          {guide.tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-muted/20 px-2.5 py-1 border border-border group-hover/card:border-foreground/30 font-mono text-[10px] text-muted-foreground group-hover/card:text-foreground uppercase tracking-widest transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider & Meta Data */}
        <div className="flex justify-between items-center mt-auto pt-4 border-muted-foreground border-t border-dashed font-mono text-muted-foreground text-xs">
          {/* Left: Read Time */}
          <span className="flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5" /> {readTime} phút đọc
          </span>

          {/* Right: CTA Button */}
          <span className="flex items-center gap-1 font-medium text-muted-foreground group-hover/card:text-foreground uppercase tracking-widest transition-colors">
            Đọc bài viết <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
