import { defineField, defineType } from 'sanity';
import { Layers } from 'lucide-react';

export default defineType({
  name: 'productCategory',
  title: 'Danh mục chính (Category)',
  type: 'document',
  icon: Layers,
  fields: [
    defineField({
      name: 'title',
      title: 'Tên danh mục',
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
      name: 'desc',
      title: 'Mô tả chi tiết',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Tên Icon (Lucide)',
      type: 'string',
      description: 'Ví dụ: Zap, Droplets, Bath, Wrench',
    }),
  ],
});
