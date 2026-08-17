import { defineType, defineField } from 'sanity';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { Building } from 'lucide-react';

export default defineType({
  name: 'project',
  title: 'Dự án',
  type: 'document',
  icon: Building,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    defineField({
      name: 'featured',
      title: 'Dự án nổi bật',
      type: 'boolean',
      description: 'Hiển thị ưu tiên ở đầu trang với kích thước lớn hơn',
      initialValue: false,
    }),
    defineField({
      name: 'name',
      title: 'Tên dự án',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Vị trí',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags (Loại hình, Thẻ, ...)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // Allows for easy comma-separated tag input in Sanity Studio
      },
    }),
    defineField({
      name: 'scope',
      title: 'Hạng mục cung ứng',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Hình ảnh',
      description: 'Vui lòng chọn ít nhất 3 hình ảnh cho layout bento',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'images.0',
    },
  },
});
