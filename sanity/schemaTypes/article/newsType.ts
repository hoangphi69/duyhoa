import { defineArrayMember, defineField, defineType } from 'sanity';
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
      name: 'seoKeywords',
      title: 'Từ khoá SEO',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
      title: 'Ảnh bìa',
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
      title: 'Nội dung chi tiết',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        defineArrayMember({
          name: 'richTableBlock',
          title: 'Bảng',
          type: 'richTableBlock',
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Câu hỏi thường gặp (FAQs)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Câu hỏi', type: 'string' },
            { name: 'answer', title: 'Câu trả lời', type: 'text' },
          ],
        },
      ],
    }),
  ],
});
