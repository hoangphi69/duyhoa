import { client } from '@/sanity/lib/client';
import { Event } from '@/types/sanity';
import { PartyPopper } from 'lucide-react';
import { groq } from 'next-sanity';
import { ArticleListLayout } from '@/components/article/article-layout';
import { EventCard } from '@/components/article/card-event';

const ITEMS_PER_PAGE = 5;

async function getPaginatedEvents(
  page: number,
): Promise<{ events: Event[]; total: number }> {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const [events, total] = await Promise.all([
    client.fetch(
      groq`*[_type == "event"] | order(eventDate asc) [$start...$end] {
        _id, title, "slug": slug.current, eventDate, location, excerpt, "imageUrl": image.asset->url
      }`,
      { start, end },
    ),
    client.fetch(groq`count(*[_type == "event"])`),
  ]);

  return { events, total };
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { events, total } = await getPaginatedEvents(currentPage);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <ArticleListLayout
      breadcrumbName="Sự kiện"
      categoryName="Sự kiện & Hội nghị"
      categoryIcon={<PartyPopper className="w-4 h-4" />}
      title={
        <>
          Lịch Trình Sự Kiện & <br /> Gắn Kết Đối Tác
        </>
      }
      description="Tham gia các buổi hội thảo kỹ thuật, chương trình tri ân đại lý và các sự kiện nổi bật được tổ chức bởi Duy Hoà 68."
      gridClassName="grid-cols-1" // Events stack in 1 column horizontally
      isEmpty={events.length === 0}
      emptyIcon={<PartyPopper className="w-12 h-12" />}
      currentPage={currentPage}
      totalPages={totalPages}
      paginationPath="/article/event"
    >
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </ArticleListLayout>
  );
}
