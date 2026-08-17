import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

export interface ProjectDoc {
  _id: string;
  name: string;
  location: string;
  tags: string[];
  scope: string;
  featured: boolean;
  images: string[];
}

// Reusable Card Component handling both Normal and Featured layouts
export function ProjectCard({
  p,
  isFeatured = false,
}: {
  p: ProjectDoc;
  isFeatured?: boolean;
}) {
  return (
    <article
      className={cn(
        'group/card hover:z-10 relative flex bg-card hover:shadow-[6px_6px_0_var(--primary)] hover:ring hover:ring-foreground transition-all hover:-translate-y-0.75 duration-150 ease-out',
        isFeatured
          ? 'flex-col lg:flex-row col-span-1 lg:col-span-2'
          : 'flex-col',
      )}
    >
      <div
        className={cn(
          'gap-px grid grid-cols-3 grid-rows-2 bg-border border-muted-foreground border-dashed shrink-0',
          isFeatured
            ? 'border-b lg:border-b-0 lg:border-r lg:w-[55%] h-64 sm:h-96'
            : 'border-b h-64 sm:h-80',
        )}
      >
        <div className="relative col-span-2 row-span-2 bg-muted/50 overflow-hidden">
          {p.images?.[0] ? (
            <img
              src={p.images[0]}
              alt={`${p.name} - 1`}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <span className="right-2 bottom-2 z-10 absolute bg-background/85 px-[5px] py-[1px] font-mono text-[9px] text-foreground tracking-[0.06em]">
                01
              </span>
              <div className="flex justify-center items-center w-full h-full font-mono text-[8.5px] text-muted-foreground uppercase">
                Đang cập nhật
              </div>
            </>
          )}
        </div>

        <div className="relative col-span-1 row-span-1 bg-muted/40 overflow-hidden">
          {p.images?.[1] ? (
            <img
              src={p.images[1]}
              alt={`${p.name} - 2`}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <span className="right-2 bottom-2 z-10 absolute bg-background/85 px-[5px] py-[1px] font-mono text-[9px] text-foreground tracking-[0.06em]">
                02
              </span>
              <div className="flex justify-center items-center w-full h-full font-mono text-[8.5px] text-muted-foreground uppercase">
                Đang cập nhật
              </div>
            </>
          )}
        </div>

        <div className="relative col-span-1 row-span-1 bg-muted/30 overflow-hidden">
          {p.images?.[2] ? (
            <img
              src={p.images[2]}
              alt={`${p.name} - 3`}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <span className="right-2 bottom-2 z-10 absolute bg-background/85 px-[5px] py-[1px] font-mono text-[9px] text-foreground tracking-[0.06em]">
                03
              </span>
              <div className="flex justify-center items-center w-full h-full font-mono text-[8.5px] text-muted-foreground uppercase">
                Đang cập nhật
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content Body (Padded) */}
      <div
        className={cn(
          'flex flex-col grow',
          isFeatured
            ? 'p-[24px] sm:p-[32px] lg:w-[45%] lg:justify-center'
            : 'p-[20px]',
        )}
      >
        {/* Multiple Tags System */}
        <div className="flex flex-wrap gap-2 mb-3">
          {isFeatured && (
            <span className="inline-block bg-primary px-[9px] py-[3px] font-mono font-bold text-[10px] text-primary-foreground uppercase tracking-[0.08em]">
              ★ NỔI BẬT
            </span>
          )}
          {p.tags?.map((tag, idx) => (
            <span
              key={`${p._id}-tag-${idx}`}
              className="inline-block px-[9px] py-[3px] border border-muted-foreground font-mono text-[10px] text-muted-foreground uppercase tracking-[0.08em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Location */}
        <h3
          className={cn(
            'mb-1 font-heading font-bold text-foreground uppercase',
            isFeatured ? 'text-[32px]' : 'text-[26px] line-clamp-2',
          )}
        >
          {p.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-4 font-mono text-[11.5px] text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{p.location}</span>
        </div>

        {/* Divider */}
        <div className="mb-3.5 border-muted-foreground border-t border-dashed" />

        <p
          className={cn(
            'text-[14px] text-muted-foreground leading-[1.65]',
            isFeatured ? '' : 'line-clamp-3',
          )}
        >
          {p.scope}
        </p>
      </div>
    </article>
  );
}
