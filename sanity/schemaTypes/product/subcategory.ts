import { defineField, defineType } from 'sanity';
import { Tags } from 'lucide-react';

export default defineType({
  name: 'productSubcategory',
  title: 'Phân loại (Subcategory)',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'name',
      title: 'Tên phân loại (Subcategory Name)',
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
      name: 'category',
      title: 'Thuộc Danh mục (Category)',
      type: 'reference',
      to: [{ type: 'productCategory' }], // Tham chiếu tới Danh mục chính
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Ảnh minh họa',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
