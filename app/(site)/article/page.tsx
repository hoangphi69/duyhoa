import { calculateReadTime, createMetadata } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { Event, Guide, News } from '@/types/sanity';
import { ArrowRight, Lightbulb, Mail, PartyPopper } from 'lucide-react';
import { groq } from 'next-sanity';
import Link from 'next/link';

// Adjust this import path to match where you saved the refactored card components
import { EventCard } from '@/components/article/card-event';
import { GuideCard } from '@/components/article/card-guide';
import { NewsCard } from '@/components/article/card-news';
import { Breadcrumbs } from '@/components/breadcrumb';

// Fetch functions returning strict types
async function getNews(): Promise<News[]> {
  return client.fetch(groq`*[_type == "news"] | order(publishedAt desc) [0...3] {
    _id, title, "slug": slug.current, publishedAt, isFeatured, excerpt, "imageUrl": image.asset->url
  }`);
}

async function getEvents(): Promise<Event[]> {
  return client.fetch(groq`*[_type == "event"] | order(eventDate asc) [0...3] {
    _id, title, "slug": slug.current, eventDate, location, excerpt, "imageUrl": image.asset->url
  }`);
}

async function getGuides(): Promise<Guide[]> {
  return client.fetch(groq`*[_type == "guide"] | order(_createdAt desc) [0...3] {
    _id, title, "slug": slug.current, tags, readTime, excerpt, "imageUrl": image.asset->url
  }`);
}

export const metadata = createMetadata({
  title: 'Tin tức, Sự kiện & Cẩm nang ngành điện nước',
  description:
    'Cập nhật thông tin mới nhất về thị trường vật liệu xây dựng, chuỗi sự kiện đối tác và chia sẻ cẩm nang kỹ thuật vật tư toàn diện từ Duy Hoà 68.',
  path: '/article',
  keywords: [
    'tin tức vật liệu xây dựng',
    'sự kiện ngành điện nước',
    'cẩm nang kỹ thuật',
    'kiến thức điện nước',
    'tin tức Duy Hoà 68',
  ],
  image: '/og/og-article.jpg',
});

export default async function ArticlesPage() {
  const news = await getNews();
  const events = await getEvents();
  const guides = await getGuides();

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      <Breadcrumbs items={[{ name: 'Tin tức', href: '/article' }]} />

      {/* Page Header */}
      <header className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              articles
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
          <div className="p-2 border border-border">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-3xl uppercase tracking-tight">
            Tin Duy Hoà
          </h2>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-3 bg-border border border-border w-full">
          {/* Featured Post (Spans 2 columns on desktop) */}
          {news
            .filter((post) => post.isFeatured)
            .map((post) => (
              <div
                key={post._id}
                className="flex flex-col lg:col-span-2 h-full"
              >
                <NewsCard post={post} />
              </div>
            ))}

          {/* Standard Posts (Stack in 1 column next to featured on Desktop) */}
          <div className="flex flex-col gap-px lg:col-span-1 bg-border h-full">
            {news
              .filter((post) => !post.isFeatured)
              .map((post) => (
                <div key={post._id} className="flex flex-col flex-1">
                  <NewsCard post={post} />
                </div>
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
          <div className="p-2 border border-border">
            <PartyPopper className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-3xl uppercase tracking-tight">
            Sự kiện & Hội nghị
          </h2>
        </div>

        {/* List Layout inside Grid */}
        <div className="gap-px grid grid-cols-1 bg-border border border-border w-full">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {/* View All Sự Kiện */}
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
          <div className="p-2 border border-border">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="font-heading text-3xl uppercase tracking-tight">
            Kiến thức & Cẩm nang
          </h2>
        </div>

        {/* Product-style 4-Column Grid for Articles */}
        <div className="gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-border border border-border w-full">
          {guides.map((guide) => (
            <GuideCard
              key={guide._id}
              guide={guide}
              readTime={calculateReadTime(guide.content)}
            />
          ))}
        </div>

        {/* View All Kiến thức */}
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
