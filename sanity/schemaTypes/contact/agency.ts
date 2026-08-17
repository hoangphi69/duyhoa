import { defineField, defineType } from 'sanity';
import { AGENCY_CATEGORIES } from '@/app/(site)/contact/validation';
import { User2 } from 'lucide-react';

export default defineType({
  name: 'agencyContact',
  title: 'Đăng ký Đại lý',
  type: 'document',
  icon: User2,
  fields: [
    defineField({
      name: 'storeName',
      title: 'Tên cửa hàng / Công ty',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Khu vực kinh doanh',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Ngành hàng quan tâm',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: AGENCY_CATEGORIES.map((c) => ({ title: c, value: c })),
      },
    }),
    defineField({
      name: 'note',
      title: 'Ghi chú thêm',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'status',
      title: 'Trạng thái xử lý',
      type: 'string',
      options: {
        list: [
          { title: 'Mới', value: 'new' },
          { title: 'Đã liên hệ', value: 'contacted' },
          { title: 'Đã duyệt', value: 'approved' },
          { title: 'Từ chối', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Thời gian gửi',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'storeName', phone: 'phone', status: 'status' },
    prepare({ title, phone, status }) {
      return { title, subtitle: `${phone} · ${status}` };
    },
  },
});
