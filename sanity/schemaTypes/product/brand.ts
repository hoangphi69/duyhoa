import { defineField, defineType } from 'sanity';
import { Award } from 'lucide-react';

export default defineType({
  name: 'brand',
  title: 'Thương hiệu',
  type: 'document',
  icon: Award,
  fields: [
    defineField({
      name: 'name',
      title: 'Tên thương hiệu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo thương hiệu',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
