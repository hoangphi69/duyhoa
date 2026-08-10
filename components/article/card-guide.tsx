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
      className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
    >
      <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

      <div className="relative bg-muted/5 border-border border-b aspect-[4/3] overflow-hidden">
        <img
          src={guide.imageUrl}
          alt={guide.title}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 grow">
        <h3 className="font-heading group-hover/card:text-primary-foreground text-lg line-clamp-3 leading-snug transition-colors">
          {guide.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 mt-auto font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
          {guide.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="bg-muted/30 group-hover/card:bg-transparent px-2 py-1 border border-border group-hover/card:border-primary-foreground/20"
            >
              {tag}
            </span>
          ))}
          <span className="flex items-center gap-1 ml-auto shrink-0">
            <Clock className="w-3 h-3" /> {readTime} phút
          </span>
        </div>

        <div className="flex items-center gap-1 pt-4 border-border/50 border-t font-mono font-bold text-primary group-hover/card:text-primary-foreground text-xs uppercase tracking-widest transition-colors">
          Đọc cẩm nang{' '}
          <ArrowRight className="w-3 h-3 transition-transform group-hover/card:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
