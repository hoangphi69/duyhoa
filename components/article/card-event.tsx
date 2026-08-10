import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Event } from '@/types/sanity';

export function EventCard({ event }: { event: Event }) {
  const date = new Date(event.eventDate);

  return (
    <Link
      href={`/article/${event.slug}`}
      className="group/card relative flex md:flex-row flex-col bg-card hover:bg-muted/10 transition-colors duration-300"
    >
      <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

      {/* Date Block */}
      <div className="flex md:flex-col justify-center items-center gap-2 md:gap-0 bg-muted/10 group-hover/card:bg-primary p-6 border-border md:border-r border-b md:border-b-0 md:w-48 group-hover/card:text-primary-foreground transition-colors duration-300 shrink-0">
        <span className="font-mono font-bold text-4xl md:text-5xl tracking-tighter">
          {date.getDate()}
        </span>
        <span className="opacity-80 mt-0 md:mt-2 font-mono text-xs uppercase tracking-widest">
          Tháng {date.getMonth() + 1}, {date.getFullYear()}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col p-6 md:p-8 grow">
        <h3 className="mb-3 font-heading group-hover/card:text-primary text-2xl md:text-3xl leading-snug transition-colors">
          {event.title}
        </h3>
        <p className="mb-6 max-w-3xl text-muted-foreground text-sm md:text-base leading-relaxed">
          {event.excerpt}
        </p>
        <div className="flex sm:flex-row flex-col sm:items-center gap-4 mt-auto pt-4 border-border/50 border-t">
          <span className="flex items-center gap-2 font-mono font-bold text-foreground text-xs uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-primary" /> {event.location}
          </span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="hidden lg:block relative bg-muted/5 p-6 border-border border-l w-72 overflow-hidden shrink-0">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="opacity-80 group-hover/card:opacity-100 grayscale group-hover/card:grayscale-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
        />
      </div>
    </Link>
  );
}
