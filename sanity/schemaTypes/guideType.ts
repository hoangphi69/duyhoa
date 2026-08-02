import { defineField, defineType } from 'sanity';
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
      of: [{ type: 'block' }],
    }),
  ],
});
