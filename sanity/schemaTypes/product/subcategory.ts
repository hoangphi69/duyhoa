import { defineField, defineType } from 'sanity';
import { Tags } from 'lucide-react';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import * as LucideIcons from 'lucide-react';

export default defineType({
  name: 'productSubcategory',
  title: 'Phân loại (Subcategory)',
  type: 'document',
  icon: Tags,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'productSubcategory' }),
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
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title', // Lấy tên của Danh mục để làm subtitle
      image: 'image',
      iconName: 'category.icon', // Truy xuất trường 'icon' từ document category
    },
    prepare({ title, subtitle, image, iconName }) {
      // Dựng component Icon tương tự như bên Category
      const IconComponent = iconName
        ? LucideIcons[iconName as keyof typeof LucideIcons]
        : null;

      return {
        title: title,
        subtitle: subtitle ? `${subtitle}` : 'Chưa có danh mục',
        // Thứ tự ưu tiên hiển thị: Ảnh minh họa của Subcategory -> Icon của Category -> Icon mặc định
        media: image || IconComponent || Tags,
      };
    },
  },
});
