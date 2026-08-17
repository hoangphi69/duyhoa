import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { Event } from '@/types/sanity';
import { cn } from '@/lib/utils';

export function EventCard({ event }: { event: Event }) {
  const date = new Date(event.eventDate);
  const isUpcoming = date > new Date(); // Basic status logic

  return (
    <Link
      href={`/article/${event.slug}`}
      className="group/card relative flex md:flex-row flex-col bg-card hover:shadow-[5px_5px_0_var(--primary)] hover:ring hover:ring-foreground transition-all hover:-translate-y-1 duration-200"
    >
      {/* Date Block (Ticket Stub Left) */}
      <div className="relative flex md:flex-col md:justify-center items-baseline md:items-center gap-2 bg-foreground p-6 md:w-60 overflow-hidden text-background shrink-0">
        <span className="font-mono font-bold text-5xl leading-none">
          {date.getDate().toString().padStart(2, '0')}
        </span>
        <div className="flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-widest">
            Tháng {date.getMonth() + 1} {date.getFullYear()}
          </span>
        </div>
        <div
          className={cn(
            'ml-auto md:ml-0 px-2 py-1 font-mono text-xs uppercase tracking-widest whitespace-nowrap',
            isUpcoming
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted-foreground text-background',
          )}
        >
          {isUpcoming ? 'Sắp diễn ra' : 'Đã diễn ra'}
        </div>

        {/* Perforation Effect for Desktop */}
        <div className="hidden md:block top-0 -right-2 bottom-0 absolute border-muted-foreground border-r-4 border-dashed" />
      </div>

      {/* Info Block (Middle) */}
      <div className="flex flex-col p-6 sm:p-8 grow">
        <h3 className="mb-4 font-heading font-bold text-foreground text-xl leading-snug">
          {event.title}
        </h3>

        <p className="mb-6 max-w-prose text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {event.excerpt}
        </p>

        <div className="flex flex-col gap-3 mt-auto pt-5 border-muted-foreground border-t border-dashed font-mono text-muted-foreground text-xs">
          <div className="flex items-center gap-2 uppercase tracking-widest">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 uppercase tracking-widest">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              {date.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail (Right) */}
      <div className="hidden lg:block relative bg-muted/5 border-border border-l w-72 overflow-hidden shrink-0">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-muted/40 w-full h-full font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Đang cập nhật
          </div>
        )}
      </div>
    </Link>
  );
}
