import { Package } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { SpecsInput } from '../../components/SpecsInput';

export default defineType({
  name: 'product',
  title: 'Sản phẩm',
  type: 'document',
  icon: Package,
  fields: [
    defineField({
      name: 'name',
      title: 'Tên sản phẩm',
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
      name: 'brand',
      title: 'Thương hiệu',
      type: 'reference',
      to: [{ type: 'brand' }], // Tham chiếu tới Document Brand
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Phân loại (Subcategory)',
      type: 'reference',
      to: [{ type: 'productSubcategory' }], // Tham chiếu tới Document Subcategory
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Trạng thái',
      type: 'string',
      options: {
        list: [
          { title: 'Còn hàng', value: 'Còn hàng' },
          { title: 'Hết hàng', value: 'Hết hàng' },
          { title: 'Ngừng kinh doanh', value: 'Ngừng kinh doanh' },
        ],
      },
      initialValue: 'Còn hàng',
    }),
    defineField({
      name: 'images',
      title: 'Thư viện ảnh',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả chi tiết',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt (cải thiện SEO)',
              description: 'Chữ thay thế khi hình ảnh lỗi',
              options: { isHighlighted: true },
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Chú thích',
            },
          ],
        },
        defineArrayMember({
          name: 'richTableBlock',
          title: 'Bảng',
          type: 'richTableBlock',
        }),
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Thông số kỹ thuật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Tên thông số', type: 'string' },
            { name: 'value', title: 'Giá trị', type: 'string' },
          ],
        },
      ],
      components: { input: SpecsInput },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name', // Hiển thị tên thương hiệu thay cho SKU đã bị xoá
      media: 'images.0',
    },
  },
});
