import { ArticleListLayout } from '@/components/article/article-layout';
import { NewsCard } from '@/components/article/card-news';
import { createMetadata } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { News } from '@/types/sanity';
import { Newspaper } from 'lucide-react';
import { groq } from 'next-sanity';

const ITEMS_PER_PAGE = 9;

async function getPaginatedNews(
  page: number,
): Promise<{ news: News[]; total: number }> {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const [news, total] = await Promise.all([
    client.fetch(
      groq`*[_type == "news"] | order(publishedAt desc) [$start...$end] {
        _id, title, "slug": slug.current, publishedAt, isFeatured, excerpt, "imageUrl": image.asset->url
      }`,
      { start, end },
    ),
    client.fetch(groq`count(*[_type == "news"])`),
  ]);

  return { news, total };
}

export const metadata = createMetadata({
  title: 'Tin tức Duy Hoà & Thị trường vật liệu',
  description:
    'Cập nhật tin tức nội bộ Duy Hoà 68, biến động thị trường vật liệu xây dựng, chính sách giá mới và thông tin ngành điện nước, thiết bị vệ sinh.',
  path: '/article/news',
  keywords: [
    'tin tức Duy Hoà 68',
    'tin tức thị trường điện nước',
    'báo giá vật liệu xây dựng',
    'tin tức ngành thiết bị vệ sinh',
  ],
  image: '/og/og-news.jpg',
});

export default async function NewsArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { news, total } = await getPaginatedNews(currentPage);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <ArticleListLayout
      breadcrumbName="Tin Duy Hoà"
      categoryName="articles"
      title={
        <>
          Cập nhật nội bộ & <br /> Hoạt động đối tác
        </>
      }
      description="Theo dõi những bước tiến mới nhất, các chính sách ưu đãi và hoạt động mở rộng mạng lưới phân phối của Duy Hoà 68."
      gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      isEmpty={news.length === 0}
      emptyIcon={<Newspaper className="w-12 h-12" />}
      currentPage={currentPage}
      totalPages={totalPages}
      paginationPath="/article/news"
    >
      {news.map((post) => (
        <NewsCard key={post._id} post={post} />
      ))}
    </ArticleListLayout>
  );
}
