import { defineField, defineType } from 'sanity';
import { CalendarDays } from 'lucide-react';

export default defineType({
  name: 'event',
  title: 'Sự kiện & Hội nghị',
  type: 'document',
  icon: CalendarDays,
  fields: [
    defineField({
      name: 'title',
      title: 'Tên sự kiện',
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
      name: 'eventDate',
      title: 'Ngày tổ chức',
      type: 'datetime',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Địa điểm tổ chức',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Ảnh sự kiện',
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
      of: [{ type: 'block' }],
    }),
  ],
});
