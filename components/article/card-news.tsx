import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { News } from '@/types/sanity';

export function NewsCard({ post }: { post: News }) {
  return (
    <Link
      href={`/article/${post.slug}`}
      className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
    >
      {/* Inner Hover Glow */}
      <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

      <div className="relative bg-muted/5 border-border border-b w-full aspect-4/3 overflow-hidden shrink-0">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
        />
        {post.isFeatured && (
          <div className="top-4 left-4 absolute bg-background px-3 py-1.5 border border-border font-mono font-bold text-xs uppercase tracking-widest">
            Tin nổi bật
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 grow">
        <div className="flex items-center gap-2 mb-3 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
          <Calendar className="w-3 h-3" /> {post.publishedAt}
        </div>
        <h3 className="mb-3 font-heading group-hover/card:text-primary-foreground text-xl line-clamp-2 leading-snug transition-colors">
          {post.title}
        </h3>
        <p className="mb-6 text-muted-foreground group-hover/card:text-primary-foreground/80 text-sm line-clamp-3 leading-relaxed transition-colors">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1 mt-auto font-mono font-bold text-foreground group-hover/card:text-primary-foreground text-xs uppercase tracking-widest transition-colors">
          Đọc tiếp{' '}
          <ArrowRight className="w-3 h-3 transition-transform group-hover/card:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
