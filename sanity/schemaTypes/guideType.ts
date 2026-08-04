import { defineArrayMember, defineField, defineType } from 'sanity';
import { Lightbulb } from 'lucide-react';

export default defineType({
  name: 'guide',
  title: 'Kiến thức & Cẩm nang',
  type: 'document',
  icon: Lightbulb,
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề bài viết',
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
      name: 'tags',
      title: 'Thẻ phân loại (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // Enables dynamic tag creation in the Studio
      },
    }),
    defineField({
      name: 'image',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Mô tả ngắn (Khối trả lời SEO)',
      type: 'text',
      rows: 4,
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
