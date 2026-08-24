import { EventCard } from '@/components/article/card-event';
import { GuideCard } from '@/components/article/card-guide';
import { NewsCard } from '@/components/article/card-news';
import { TableOfContents } from '@/components/article/table-of-contents';
import { Breadcrumbs } from '@/components/breadcrumb';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import {
  calculateReadTime,
  createMetadata,
  generateToC,
  slugify,
} from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { Event, Guide, News } from '@/types/sanity';
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from '@portabletext/react';
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  User,
} from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import { groq } from 'next-sanity';
import Link from 'next/link';

type ArticleType = News | Event | Guide;

// (Keep your RichTable types here...)
type RichTableCell = { _key: string; content: PortableTextBlock[] };
type RichTableRow = { _key: string; cells: RichTableCell[] };
type RichTableColumnHeader = { _key: string; cellIndex: number; title: string };
type RichTableBlockValue = {
  columnHeaders?: RichTableColumnHeader[];
  hasColumnTitles?: boolean;
  hasRowTitles?: boolean;
  rows: RichTableRow[];
};

// --- FETCH DATA ---
async function getArticle(slug: string): Promise<ArticleType | null> {
  if (!slug) return null;
  const query = groq`
    *[_type in ['news', 'event', 'guide'] && slug.current == $slug][0] {
      _id, _type, _createdAt, _updatedAt, title, "slug": slug.current,
      excerpt, "imageUrl": image.asset->url, content, seoKeywords,
      faqs, tags, publishedAt, isFeatured, eventDate, location
    }
  `;
  return await client.fetch(query, { slug: String(slug) });
}

// Fetch 3 related articles of the same type, excluding the current one
async function getRelatedArticles(
  type: string,
  currentSlug: string,
): Promise<ArticleType[]> {
  const query = groq`
    *[_type == $type && slug.current != $slug] | order(_createdAt desc) [0...3] {
      _id, _type, title, "slug": slug.current, excerpt, "imageUrl": image.asset->url,
      publishedAt, isFeatured, eventDate, location, tags, readTime
    }
  `;
  return await client.fetch(query, { type, slug: currentSlug });
}

// --- DYNAMIC METADATA ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) return { title: 'Bài viết không tồn tại | Duy Hoà 68' };

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article/${article.slug}`,
    keywords: article.seoKeywords,
    // image: article.imageUrl ?? '/og/og-article.png',
    type: 'article',
  });
}

// --- CUSTOM PORTABLE TEXT COMPONENTS ---
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ value, children }) => {
      const text = (value.children as any[]).map((c) => c.text).join('');
      return (
        <h2 id={slugify(text)} className="scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ value, children }) => {
      const text = (value.children as any[]).map((c) => c.text).join('');
      return (
        <h3 id={slugify(text)} className="scroll-mt-24">
          {children}
        </h3>
      );
    },
  },
  types: {
    richTableBlock: ({ value }) => {
      const table = value as RichTableBlockValue;
      const sortedHeaders = table.hasColumnTitles
        ? [...(table.columnHeaders ?? [])].sort(
            (a, b) => a.cellIndex - b.cellIndex,
          )
        : [];

      return (
        <div className="my-8 overflow-x-auto">
          <table>
            {sortedHeaders.length > 0 && (
              <thead>
                <tr>
                  {sortedHeaders.map((header) => (
                    <th key={header._key} className="text-left">
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {table.rows?.map((row) => (
                <tr key={row._key}>
                  {row.cells?.map((cell, cellIdx) => {
                    const isRowHeader = table.hasRowTitles && cellIdx === 0;
                    return isRowHeader ? (
                      <th key={cell._key} scope="row" className="text-left">
                        <PortableText value={cell.content} />
                      </th>
                    ) : (
                      <td key={cell._key}>
                        <PortableText value={cell.content} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="font-bold text-2xl">Không tìm thấy bài viết</h1>
      </div>
    );
  }

  // Fetch related articles
  const relatedArticles = await getRelatedArticles(article._type, article.slug);

  // Derived Values
  const categoryMap = {
    news: 'Tin Duy Hoà',
    event: 'Sự kiện',
    guide: 'Kiến thức',
  };
  const displayCategory =
    categoryMap[article._type as keyof typeof categoryMap];

  const displayDate = new Date(
    article._type === 'news'
      ? (article as News).publishedAt
      : article._createdAt,
  )
    .toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replaceAll('/', '.');

  const readTime = article.content ? calculateReadTime(article.content) : 1;
  const toc = generateToC(article.content || []);

  const hasFaqs = !!(article.faqs && article.faqs.length > 0);

  // JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': article._type === 'news' ? 'NewsArticle' : 'Article',
    headline: article.title,
    image: article.imageUrl,
    datePublished:
      article._type === 'news' ? article.publishedAt : article._createdAt,
    dateModified: article._updatedAt,
    author: { '@type': 'Organization', name: 'Đội ngũ Duy Hoà' },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    description: article.excerpt,
  };

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-clip scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {article.faqs && article.faqs.length > 0 && (
        <FAQJsonLd faqs={article.faqs} />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Tin tức', href: '/article' },
          { name: article.title, href: `/article/${article.slug}` },
        ]}
      />

      <main className="mx-auto mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 container">
        {/* Article Header (Title, Meta, Image) */}
        <div className="flex flex-col gap-6 mx-auto mb-12 max-w-4xl">
          <div className="bg-foreground p-1 px-2 w-fit font-mono text-primary text-xs uppercase tracking-widest">
            {displayCategory}
          </div>

          <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl uppercase leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 font-mono text-muted-foreground text-xs uppercase tracking-wide">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> Đội ngũ Duy Hoà
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {displayDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {readTime} phút đọc
            </span>
          </div>

          {article._type === 'event' && (
            <div className="flex sm:flex-row flex-col justify-center gap-4 mt-2">
              <span className="flex justify-center items-center gap-2 bg-muted/30 px-4 py-2 border border-border font-medium text-muted-foreground text-sm">
                <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                {new Date((article as Event).eventDate).toLocaleString(
                  'vi-VN',
                  { dateStyle: 'medium', timeStyle: 'short' },
                )}
              </span>
              <span className="flex justify-center items-center gap-2 bg-muted/30 px-4 py-2 border border-border font-medium text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                {(article as Event).location}
              </span>
            </div>
          )}
        </div>

        <div className="relative bg-muted/5 mb-12 border-border border-y w-full aspect-video md:aspect-[16/5] overflow-hidden">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-muted/40 w-full h-full font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Đang cập nhật
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-4 bg-border border border-border w-full">
          {/* Sidebar / Table of Contents */}
          <aside className="flex flex-col lg:col-span-1 bg-background border-border border-b lg:border-b-0 h-full">
            <div className="lg:top-24 lg:sticky flex flex-col w-full h-full lg:h-[calc(100vh-6rem)]">
              <div className="flex items-center gap-2 bg-muted/10 p-6 border-border border-b shrink-0">
                <h3 className="font-mono font-medium text-sm uppercase tracking-widest">
                  Nội dung bài viết
                </h3>
              </div>

              {/* Replace old ToC with the new Client Component */}
              <TableOfContents toc={toc} hasFaq={hasFaqs} />
            </div>
          </aside>

          {/* Article Content */}
          <div className="flex flex-col lg:col-span-3 bg-card p-8 md:p-12 lg:p-16">
            {article.excerpt && (
              <div className="mb-10 max-w-none prose">
                <blockquote className="border-primary">
                  {article.excerpt}
                </blockquote>
              </div>
            )}

            <div className="prose-tr:even:bg-muted/30 max-w-none prose-headings:font-heading prose">
              <PortableText
                value={article.content || []}
                components={portableTextComponents}
              />
            </div>

            {hasFaqs && (
              <div
                id="faq"
                className="mt-12 pt-12 border-muted-foreground border-t border-dashed scroll-mt-24"
              >
                <h2 className="mb-6 font-heading font-bold text-2xl">
                  Câu hỏi thường gặp
                </h2>
                <div className="flex flex-col gap-px bg-border border-border border-y w-full">
                  {article.faqs!.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-background hover:bg-background/80 py-6 transition-colors"
                    >
                      <h3 className="mb-2 font-heading font-bold text-foreground text-lg">
                        {faq.question}
                      </h3>
                      <p className="text-foreground/70">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {article._type === 'guide' &&
              article.tags &&
              article.tags.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-12 pt-6">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-muted-foreground text-xs uppercase tracking-widest"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>

        {/* RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8 pb-4 border-border border-b">
              <h2 className="font-heading font-bold text-3xl uppercase tracking-tight">
                Bài viết liên quan
              </h2>
            </div>

            {/* Display grid depending on the content type */}
            <div
              className={`gap-px grid grid-cols-1 md:grid-cols-2 ${article._type === 'news' ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} bg-border border border-border`}
            >
              {relatedArticles.map((related) => {
                if (related._type === 'news') {
                  return <NewsCard key={related._id} post={related as News} />;
                }
                if (related._type === 'event') {
                  return (
                    <EventCard key={related._id} event={related as Event} />
                  );
                }
                if (related._type === 'guide') {
                  return (
                    <GuideCard
                      key={related._id}
                      guide={related as Guide}
                      readTime={
                        calculateReadTime((related as Guide).content) || 5
                      }
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
