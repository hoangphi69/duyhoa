import { ArticleListLayout } from '@/components/article/article-layout';
import { GuideCard } from '@/components/article/card-guide';
import { calculateReadTime, createMetadata } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { Guide } from '@/types/sanity';
import { Lightbulb } from 'lucide-react';
import { groq } from 'next-sanity';

const ITEMS_PER_PAGE = 8;

async function getPaginatedGuides(
  page: number,
): Promise<{ guides: Guide[]; total: number }> {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const [guides, total] = await Promise.all([
    client.fetch(
      groq`*[_type == "guide"] | order(_createdAt desc) [$start...$end] {
        _id, title, "slug": slug.current, tags, excerpt, "imageUrl": image.asset->url, content
      }`,
      { start, end },
    ),
    client.fetch(groq`count(*[_type == "guide"])`),
  ]);

  return { guides, total };
}

export const metadata = createMetadata({
  title: 'Cẩm nang kỹ thuật & Kiến thức ngành',
  description:
    'Kiến thức chuyên môn chọn dây cáp, ống nước, thiết bị vệ sinh và kinh nghiệm mở cửa hàng vật liệu điện nước — tổng hợp bởi đội ngũ kỹ thuật Duy Hoà 68.',
  path: '/article/guide',
  keywords: [
    'kiến thức điện nước',
    'cách chọn dây cáp điện',
    'kinh nghiệm mở cửa hàng vật liệu điện nước',
    'hướng dẫn lắp đặt thiết bị vệ sinh',
    'cẩm nang vật tư công trình',
  ],
  // image: '/og/og-guide.png',
});

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const { guides, total } = await getPaginatedGuides(currentPage);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <ArticleListLayout
      breadcrumbName="Kiến thức"
      categoryName="articles"
      title={
        <>
          Cẩm nang Vật tư & <br /> Hướng dẫn Kỹ thuật
        </>
      }
      description="Các bài viết tối ưu, chia sẻ kinh nghiệm lựa chọn thiết bị, hướng dẫn thi công và bóc tách dự toán vật tư chuẩn xác."
      gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // Guides use a 4-column grid
      isEmpty={guides.length === 0}
      emptyIcon={<Lightbulb className="w-12 h-12" />}
      currentPage={currentPage}
      totalPages={totalPages}
      paginationPath="/article/guide"
    >
      {guides.map((guide) => (
        <GuideCard
          key={guide._id}
          guide={guide}
          readTime={calculateReadTime(guide.content)}
        />
      ))}
    </ArticleListLayout>
  );
}
