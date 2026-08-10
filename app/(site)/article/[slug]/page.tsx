import { Button } from '@/components/ui/button';
import { calculateReadTime, generateToC, slugify } from '@/lib/utils';
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
  ListMinus,
  MapPin,
  User,
} from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type ArticleType = News | Event | Guide;

type RichTableCell = {
  _key: string;
  content: PortableTextBlock[];
};

type RichTableRow = {
  _key: string;
  cells: RichTableCell[];
};

type RichTableColumnHeader = {
  _key: string;
  cellIndex: number;
  title: string;
};

type RichTableBlockValue = {
  columnHeaders?: RichTableColumnHeader[];
  hasColumnTitles?: boolean;
  hasRowTitles?: boolean;
  rows: RichTableRow[];
};

// --- FETCH DATA ---
async function getArticle(slug: string): Promise<ArticleType | null> {
  if (!slug) return null;

  const query = `
    *[_type in ['news', 'event', 'guide'] && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      excerpt,
      "imageUrl": image.asset->url,
      content,
      seoKeywords,
      faqs,
      tags,
      publishedAt,
      isFeatured,
      eventDate,
      location
    }
  `;

  return await client.fetch(query, { slug: String(slug) });
}

// --- DYNAMIC METADATA ---
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) return { title: 'Bài viết không tồn tại | Duy Hoà 68' };

  return {
    title: `${article.title} | Duy Hoà 68`,
    description: article.excerpt,
    keywords: article.seoKeywords || [],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://duyhoa.vn/article/${article.slug}`,
      siteName: 'Duy Hoà 68',
      images: article.imageUrl
        ? [
            {
              url: article.imageUrl,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
      locale: 'vi_VN',
      type: 'article',
      publishedTime:
        article._type === 'news' ? article.publishedAt : article._createdAt,
      modifiedTime: article._updatedAt,
      authors: ['Đội ngũ Duy Hoà'],
    },
  };
}

// --- CUSTOM PORTABLE TEXT COMPONENTS ---
// Automatically injects ids into h2 and h3 so the ToC links work
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

  // temporarily, in getArticle or the page component
  console.log(
    JSON.stringify(
      article?.content?.find((b) => b._type === 'richTableBlock'),
      null,
      2,
    ),
  );

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="font-bold text-2xl">Không tìm thấy bài viết</h1>
      </div>
    );
  }

  // Derived Values
  const categoryMap = {
    news: 'Tin Duy Hoà',
    event: 'Sự kiện & Hội nghị',
    guide: 'Kiến thức & Cẩm nang',
  };
  const displayCategory = categoryMap[article._type];

  const displayDate = new Date(
    article._type === 'news' ? article.publishedAt : article._createdAt,
  ).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const readTime = article.content ? calculateReadTime(article.content) : 1;
  const toc = generateToC(article.content);

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
    publisher: {
      '@type': 'Organization',
      name: 'Công ty TNHH Thương mại Duy Hoà 68',
      logo: { '@type': 'ImageObject', url: 'https://duyhoa.vn/logo.png' },
    },
    description: article.excerpt,
  };

  const faqJsonLd = article.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-clip scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <header className="bg-muted/10 py-6 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/article" className="hover:text-primary transition-colors cursor-default">
              Tin tức
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="max-w-50 sm:max-w-none font-bold text-foreground truncate">
              {article.title}
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 container">
        <div className="flex flex-col gap-6 mx-auto mb-12 max-w-4xl text-center">
          <div className="bg-foreground mx-auto p-1 px-2 w-fit font-mono text-primary text-xs uppercase tracking-widest">
            {displayCategory}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-4 py-4 border-border border-y font-mono text-muted-foreground text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {displayDate}
            </span>
            <span className="hidden sm:block text-border">|</span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> Đội ngũ Duy Hoà
            </span>
            <span className="hidden sm:block text-border">|</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {readTime} phút đọc
            </span>
          </div>

          {article._type === 'event' && (
            <div className="flex sm:flex-row flex-col justify-center gap-4 mt-2">
              <span className="flex justify-center items-center gap-2 bg-muted/30 px-4 py-2 border border-border font-medium text-muted-foreground text-sm">
                <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                {new Date(article.eventDate).toLocaleString('vi-VN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
              <span className="flex justify-center items-center gap-2 bg-muted/30 px-4 py-2 border border-border font-medium text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                {article.location}
              </span>
            </div>
          )}
        </div>

        {article.imageUrl && (
          <div className="relative bg-muted/5 mb-12 border border-border w-full aspect-video md:aspect-21/9 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="gap-px grid grid-cols-1 lg:grid-cols-4 bg-border border border-border w-full">
          <aside className="flex flex-col lg:col-span-1 bg-background border-border border-b lg:border-b-0 h-full">
            <div className="lg:top-24 lg:sticky flex flex-col w-full h-full lg:h-[calc(100vh-6rem)]">
              <div className="flex items-center gap-2 bg-muted/10 p-6 border-border border-b shrink-0">
                <ListMinus className="w-5 h-5 text-primary" />
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest">
                  Nội dung bài viết
                </h3>
              </div>

              <nav className="flex flex-col gap-4 p-6 overflow-y-auto scrollbar-hide grow">
                {toc.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`#${item.id}`}
                    replace
                    className={`font-medium text-muted-foreground hover:text-primary text-sm leading-relaxed transition-colors ${item.level === 'h3' ? 'pl-4' : ''}`}
                  >
                    {item.text}
                  </Link>
                ))}
                {article.faqs && article.faqs.length > 0 && (
                  <Link
                    href="#faq"
                    replace
                    className="font-medium text-muted-foreground hover:text-primary text-sm leading-relaxed transition-colors"
                  >
                    Câu hỏi thường gặp (FAQ)
                  </Link>
                )}
              </nav>
            </div>
          </aside>

          <div className="flex flex-col lg:col-span-3 bg-card p-8 md:p-12 lg:p-16">
            {article._type === 'guide' &&
              article.tags &&
              article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-12">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-muted px-3 py-1 border border-border font-mono text-muted-foreground text-xs uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            {article.excerpt && (
              <div className="bg-muted/20 mb-12 p-6 border-primary border-l-4 font-medium text-lg leading-relaxed answer-box">
                {article.excerpt}
              </div>
            )}

            <div className="prose-th:bg-muted/10 dark:prose-invert prose-h2:mt-12 prose-h2:mb-6 prose-td:p-4 prose-th:p-4 prose-h2:pb-4 prose-table:border prose-td:border prose-th:border prose-h2:border-border prose-table:border-border prose-td:border-border prose-th:border-border prose-h2:border-b prose-table:w-full max-w-none prose-h2:font-heading prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-lg prose-p:text-lg prose-h2:text-3xl prose-th:text-left prose-h2:uppercase prose-p:leading-relaxed prose-h2:tracking-tight scroll-smooth prose-table:border-collapse prose prose-zinc">
              <PortableText
                value={article.content}
                components={portableTextComponents}
              />
            </div>

            {article.faqs && article.faqs.length > 0 && (
              <div
                id="faq"
                className="mt-16 pt-12 border-border border-t scroll-mt-24"
              >
                <h2 className="mb-8 font-heading text-3xl uppercase tracking-tight">
                  Câu hỏi thường gặp
                </h2>
                <div className="flex flex-col gap-px bg-border border border-border w-full">
                  {article.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-background hover:bg-muted/5 p-6 transition-colors"
                    >
                      <h3 className="mb-2 font-bold text-foreground text-lg">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-center gap-6 bg-primary mt-12 p-8 md:p-12 border border-border text-primary-foreground">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight">
              Cần tư vấn vật tư cho công trình?
            </h3>
            <p className="opacity-90">
              Liên hệ ngay để nhận báo giá đại lý tốt nhất khu vực Quảng Ninh -
              Hải Phòng - Hải Dương.
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-background hover:bg-muted px-8 rounded-none h-14 font-mono font-bold text-foreground uppercase tracking-widest shrink-0"
          >
            Liên hệ ngay
          </Button>
        </div>
      </main>
    </div>
  );
}
