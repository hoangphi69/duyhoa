import { defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';

export default defineType({
  name: 'news',
  title: 'Tin Duy Hoà',
  type: 'document',
  icon: Newspaper,
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Tin nổi bật',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Nội dung',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
