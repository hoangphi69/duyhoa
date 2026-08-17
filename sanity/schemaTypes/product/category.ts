import { defineField, defineType } from 'sanity';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import * as LucideIcons from 'lucide-react';

export default defineType({
  name: 'productCategory',
  title: 'Danh mục chính',
  type: 'document',
  icon: LucideIcons.Layers,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'productCategory' }),
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
      name: 'image',
      title: 'Hình ảnh',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Tên Icon (Lucide icon)',
      type: 'string',
      description: 'Ví dụ: Zap, Droplets, Bath, Wrench',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      iconName: 'icon', // Lấy giá trị của trường chuỗi 'icon'
    },
    prepare({ title, image, iconName }) {
      // Tìm Component tương ứng trong lucide-react dựa trên chuỗi iconName
      // Ép kiểu (as keyof typeof LucideIcons) để tránh lỗi TypeScript nếu bạn dùng TS
      const IconComponent = iconName
        ? LucideIcons[iconName as keyof typeof LucideIcons]
        : null;

      return {
        title: title,
        // Ưu tiên hiển thị Icon đã nhập. Nếu không có icon thì hiển thị Hình ảnh.
        // Nếu không có cả hai, Sanity sẽ tự lùi về dùng icon mặc định của Document (Layers).
        media: IconComponent ? IconComponent : image,
      };
    },
  },
});
