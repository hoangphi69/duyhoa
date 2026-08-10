import { calculateReadTime } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { Event, Guide, News } from '@/types/sanity';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Lightbulb,
  MapPin,
  Newspaper,
  PartyPopper,
} from 'lucide-react';
import { groq } from 'next-sanity';
import Link from 'next/link';

// Fetch functions returning strict types
async function getNews(): Promise<News[]> {
  return client.fetch(groq`*[_type == "news"] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, isFeatured, excerpt, "imageUrl": image.asset->url
  }`);
}

async function getEvents(): Promise<Event[]> {
  return client.fetch(groq`*[_type == "event"] | order(eventDate asc) {
    _id, title, "slug": slug.current, eventDate, location, excerpt, "imageUrl": image.asset->url
  }`);
}

async function getGuides(): Promise<Guide[]> {
  return client.fetch(groq`*[_type == "guide"] | order(_createdAt desc) {
    _id, title, "slug": slug.current, tags, readTime, excerpt, "imageUrl": image.asset->url
  }`);
}

export default async function ArticlesPage() {
  const news = await getNews();
  const events = await getEvents();
  const guides = await getGuides();

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Breadcrumb Header */}
      <header className="bg-muted/10 py-6 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-bold text-foreground">Tin tức</span>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <header className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              News & Updates
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.1] tracking-tight">
              Tin tức & <br /> Kiến thức ngành
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Cập nhật các hoạt động mới nhất từ Duy Hoà 68, chuỗi sự kiện đối
              tác và chia sẻ cẩm nang kỹ thuật vật tư toàn diện.
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 1: TIN DUY HOÀ */}
      <section className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4 pb-4">
          <div className="bg-primary p-2 border border-border text-primary-foreground">
            <Newspaper className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-3xl uppercase tracking-tight">
            Tin Duy Hoà
          </h2>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-3 bg-border border border-border w-full">
          {/* Featured Post (Spans 2 columns) */}
          {news
            .filter((post) => post.isFeatured)
            .map((post) => (
              <Link
                key={post._id}
                href={`/article/${post.slug}`}
                className="group/card relative flex flex-col lg:col-span-2 bg-card hover:bg-primary overflow-hidden transition-colors duration-300"
              >
                {/* Inner Hover Glow */}
                <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

                <div className="relative bg-muted/5 border-border border-b w-full aspect-video lg:aspect-21/9 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  />
                  <div className="top-4 left-4 absolute bg-background px-3 py-1.5 border border-border font-mono font-bold text-xs uppercase tracking-widest">
                    Tin nổi bật
                  </div>
                </div>

                <div className="flex flex-col p-6 md:p-10 grow">
                  <div className="flex items-center gap-3 mb-4 font-mono text-muted-foreground group-hover/card:text-primary-foreground/80 text-xs uppercase tracking-widest transition-colors">
                    <Calendar className="w-4 h-4" /> {post.publishedAt}
                  </div>
                  <h3 className="mb-4 font-heading group-hover/card:text-primary-foreground text-3xl md:text-4xl line-clamp-2 leading-snug transition-colors">
                    {post.title}
                  </h3>
                  <p className="mb-8 text-muted-foreground group-hover/card:text-primary-foreground/80 text-base md:text-lg line-clamp-3 leading-relaxed transition-colors">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-auto font-mono font-bold text-primary group-hover/card:text-primary-foreground text-sm uppercase tracking-widest transition-colors">
                    Đọc tiếp{' '}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/card:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}

          {/* Standard Posts (Stack in 1 column next to featured on Desktop) */}
          <div className="flex flex-col gap-px lg:col-span-1 bg-border h-full">
            {news
              .filter((post) => !post.isFeatured)
              .map((post) => (
                <Link
                  key={post._id}
                  href={`/article/${post.slug}`}
                  className="group/card relative flex flex-col flex-1 bg-card hover:bg-primary transition-colors duration-300"
                >
                  {/* Inner Hover Glow */}
                  <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

                  <div className="relative bg-muted/5 border-border border-b w-full aspect-video overflow-hidden shrink-0">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex flex-col p-6 grow">
                    <div className="flex items-center gap-2 mb-3 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                      <Calendar className="w-3 h-3" /> {post.publishedAt}
                    </div>
                    <h3 className="mb-3 font-heading group-hover/card:text-primary-foreground text-xl line-clamp-2 leading-snug transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-auto font-mono font-bold text-foreground group-hover/card:text-primary-foreground text-xs uppercase tracking-widest transition-colors">
                      Đọc tiếp{' '}
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/card:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* View All News */}
        <div className="flex justify-end bg-card mt-px p-4 border border-border border-t-0">
          <Link
            href="/article/news"
            className="flex items-center gap-2 font-mono font-medium text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest transition-colors"
          >
            Xem tất cả Tin Duy Hoà <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 2: SỰ KIỆN */}
      <section className="mx-auto mt-20 px-4 sm:px-6 lg:px-8 container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4 pb-4">
          <div className="bg-primary p-2 border border-border text-primary-foreground">
            <PartyPopper className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-3xl uppercase tracking-tight">
            Sự kiện & Hội nghị
          </h2>
        </div>

        {/* List Layout inside Grid */}
        <div className="gap-px grid grid-cols-1 bg-border border border-border w-full">
          {events.map((event) => (
            <Link
              href={`/article/${event.slug}`}
              key={event._id}
              className="group/card relative flex md:flex-row flex-col bg-card hover:bg-muted/10 transition-colors duration-300"
            >
              {/* Inner Hover Glow */}
              <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

              {/* Date Block (Rigid Square) */}
              <div className="flex md:flex-col justify-center items-center gap-2 md:gap-0 bg-muted/10 group-hover/card:bg-primary p-6 border-border md:border-r border-b md:border-b-0 md:w-48 group-hover/card:text-primary-foreground transition-colors duration-300 shrink-0">
                {(() => {
                  const date = new Date(event.eventDate);
                  return (
                    <>
                      <span className="font-mono font-bold text-4xl md:text-5xl tracking-tighter">
                        {date.getDate()}
                      </span>
                      <span className="opacity-80 mt-0 md:mt-2 font-mono text-xs uppercase tracking-widest">
                        Tháng {date.getMonth() + 1} {date.getFullYear()}
                      </span>
                    </>
                  );
                })()}
              </div>

              {/* Event Info */}
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

              {/* Event Image Thumbnail (Right side on large screens) */}
              <div className="hidden lg:block relative bg-muted/5 p-6 border-border border-l w-72 overflow-hidden shrink-0">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="opacity-80 group-hover/card:opacity-100 grayscale group-hover/card:grayscale-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Su Kien */}
        <div className="flex justify-end bg-card mt-px p-4 border border-border border-t-0">
          <Link
            href="/article/event"
            className="flex items-center gap-2 font-mono font-medium text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest transition-colors"
          >
            Xem tất cả Sự kiện <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 3: KIẾN THỨC */}
      <section className="mx-auto mt-20 mb-12 px-4 sm:px-6 lg:px-8 container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4 pb-4">
          <div className="bg-primary p-2 border border-border text-primary-foreground">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-3xl uppercase tracking-tight">
            Kiến thức & Cẩm nang
          </h2>
        </div>

        {/* Product-style 4-Column Grid for Articles */}
        <div className="gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-border border border-border w-full">
          {guides.map((guide) => (
            <Link
              href={`/article/${guide.slug}`}
              key={guide._id}
              className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
            >
              {/* Inner Hover Glow */}
              <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

              {/* Image Area */}
              <div className="relative bg-muted/5 border-border border-b aspect-4/3 overflow-hidden">
                <img
                  src={guide.imageUrl}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Area */}
              <div className="flex flex-col gap-4 p-6 grow">
                <h3 className="font-heading group-hover/card:text-primary-foreground text-lg line-clamp-3 leading-snug transition-colors">
                  {guide.title}
                </h3>

                {guide.tags && guide.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-muted px-2 py-1 border border-border font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 mt-auto pt-6 font-mono font-bold text-primary group-hover/card:text-primary-foreground text-xs uppercase tracking-widest transition-colors">
                  Đọc bài viết{' '}
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/card:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Kien thuc */}
        <div className="flex justify-center lg:justify-end bg-card mt-px p-4 border border-border border-t-0">
          <Link
            href="/article/guide"
            className="flex items-center gap-2 font-mono font-medium text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest transition-colors"
          >
            Đọc thêm kiến thức <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
