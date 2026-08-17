import { PROJECT_CATEGORIES } from '@/app/(site)/contact/validation';
import { HousePlus } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'projectContact',
  title: 'Đăng ký Báo giá dự án',
  icon: HousePlus,
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Công ty / Đơn vị',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactPerson',
      title: 'Người liên hệ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectName',
      title: 'Tên dự án',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Địa điểm dự án',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Hạng mục quan tâm',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: PROJECT_CATEGORIES.map((c) => ({ title: c, value: c })),
      },
    }),
    defineField({
      name: 'scale',
      title: 'Quy mô dự án',
      type: 'string',
    }),
    defineField({
      name: 'note',
      title: 'Ghi chú',
      type: 'text',
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
    }),
  ],
  preview: {
    select: { title: 'projectName', phone: 'phone', status: 'status' },
    prepare({ title, phone, status }) {
      return { title, subtitle: `${phone} · ${status}` };
    },
  },
});
