import { ProjectDoc } from '@/components/project/card-project';
import { createMetadata } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { ProjectsClient } from './client';

const PROJECT_FIELDS = groq`
  _id,
  name,
  location,
  tags,
  scope,
  featured,
  "images": images[].asset->url
`;

export const metadata = createMetadata({
  title: 'Dự án & công trình tiêu biểu',
  description:
    'Duy Hoà 68 cung cấp vật tư điện – nước cho công trình dân dụng và dự án, giao hàng tận chân công trình bằng đội xe riêng trong khu vực miền Bắc tới Thanh Hoá.',
  path: '/projects',
  keywords: [
    'cung cấp vật tư công trình',
    'vật tư điện nước dự án',
    'nhà cung cấp ống nước dự án',
    'giao hàng tận chân công trình',
    'vật tư xây dựng Quảng Ninh Hải Phòng',
  ],
  // image: '/og/og-projects.png',
});

export default async function ProjectsPage() {
  // Query separately for featured vs non-featured (paginated) projects
  const data = await client.fetch<{
    featured: ProjectDoc[];
    normal: ProjectDoc[];
    totalNormal: number;
  }>(
    groq`{
      "featured": *[_type == "project" && featured == true] | order(orderRank) { ${PROJECT_FIELDS} },
      "normal": *[_type == "project" && (featured != true || !defined(featured))] | order(orderRank) [0...15] { ${PROJECT_FIELDS} },
      "totalNormal": count(*[_type == "project" && (featured != true || !defined(featured))])
    }`,
    {},
    { next: { revalidate: 60 } },
  );

  // Load more only fetches non-featured projects
  async function fetchMoreProjects(
    offset: number,
    limit: number,
  ): Promise<ProjectDoc[]> {
    'use server';
    const end = offset + limit;
    return await client.fetch(
      groq`*[_type == "project" && (featured != true || !defined(featured))] | order(orderRank) [$offset...$end] { ${PROJECT_FIELDS} }`,
      { offset, end },
    );
  }

  return (
    <ProjectsClient
      featuredProjects={data.featured || []}
      initialProjects={data.normal || []}
      totalNormalProjects={data.totalNormal || 0}
      fetchMoreAction={fetchMoreProjects}
    />
  );
}
