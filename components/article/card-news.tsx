import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { News } from '@/types/sanity';

export function NewsCard({ post }: { post: News }) {
  return (
    <Link
      href={`/article/${post.slug}`}
      className="group/card flex flex-col bg-card hover:shadow-[5px_5px_0_var(--primary)] hover:ring hover:ring-foreground transition-all hover:-translate-y-1 duration-200"
    >
      {/* Thumbnail */}
      <div className="relative bg-muted/5 border-border border-b w-full aspect-16/6 overflow-hidden shrink-0">
        {post.isFeatured && (
          <div className="top-4 left-4 absolute flex items-center gap-2 bg-primary px-3 py-2 font-mono text-foreground text-xs uppercase tracking-widest">
            Tin nổi bật
          </div>
        )}
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-muted/40 w-full h-full font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Đang cập nhật
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-5 sm:p-6 grow">
        <h3 className="mb-3 font-heading font-bold text-foreground text-xl leading-snug">
          {post.title}
        </h3>

        <p className="mb-5 max-w-prose text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4 border-muted-foreground border-t border-dashed font-mono text-muted-foreground text-xs uppercase">
          <span>
            {new Date(post.publishedAt)
              .toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              .replaceAll('/', '.')}
          </span>
          <span className="flex items-center gap-1 font-medium text-muted-foreground group-hover/card:text-foreground tracking-widest transition-colors">
            Đọc thêm <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
