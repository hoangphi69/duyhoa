import { Receipt } from 'lucide-react';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'catalogue',
  title: 'Bảng giá',
  type: 'document',
  icon: Receipt,
  fields: [
    defineField({
      name: 'title',
      title: 'Tên bảng giá',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Thương hiệu',
      type: 'reference',
      to: [{ type: 'brand' }], // Make sure you have a 'brand' schema type created
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'productCategory' }], // Make sure you have a 'category' schema type created
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'File PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Phân loại',
      type: 'string',
      options: { list: ['Bảng giá', 'Catalogue'] },
      initialValue: 'Bảng giá',
    }),
    defineField({
      name: 'pageCount',
      title: 'Số trang',
      type: 'number',
    }),
    defineField({
      name: 'dateUpdated',
      title: 'Ngày cập nhật',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dateUpdated',
      brand: 'brand.name', // Assumes your brand schema has a 'name' field
    },
    prepare(selection) {
      const { title, subtitle, brand } = selection;
      return {
        title: title,
        subtitle: `${brand ? brand + ' - ' : ''}${subtitle ? subtitle : 'No date'}`,
      };
    },
  },
});
