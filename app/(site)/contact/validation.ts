import { z } from 'zod';

export const AGENCY_CATEGORIES = [
  'Cáp & dây điện',
  'Đèn LED & Chiếu sáng',
  'Thiết bị & ổ cắm',
  'Bếp từ & hút mùi',
  'Quạt & sưởi',
  'Vật tư ngành nước',
  'Thiết bị vệ sinh',
  'Máy cầm tay & công cụ',
  'Khác',
];

export const PROJECT_CATEGORIES = [
  'Cáp & dây điện',
  'Đèn LED & Chiếu sáng',
  'Thiết bị & ổ cắm',
  'Bếp từ & hút mùi',
  'Quạt & sưởi',
  'Vật tư ngành nước',
  'Thiết bị vệ sinh',
  'Máy cầm tay & công cụ',
  'Khác',
];

export const agencySchema = z.object({
  storeName: z.string().trim().min(2, 'Tên cửa hàng phải có ít nhất 2 ký tự'),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  region: z.string().trim().min(3, 'Vui lòng nhập khu vực kinh doanh'),
  categories: z.array(z.string()).default([]),
  note: z
    .string()
    .trim()
    .max(1000, 'Ghi chú tối đa 1000 ký tự')
    .optional()
    .or(z.literal('')),
});

export const projectSchema = z.object({
  companyName: z.string().min(1, 'Vui lòng nhập tên công ty / đơn vị'),
  contactPerson: z.string().min(1, 'Vui lòng nhập tên người liên hệ'),
  phone: z.string().regex(/^0\d{9,10}$/, 'Số điện thoại không hợp lệ'),
  projectName: z.string().min(1, 'Vui lòng nhập tên dự án'),
  location: z.string().min(1, 'Vui lòng nhập địa điểm dự án'),
  categories: z.array(z.string()).default([]),
  scale: z.string().optional(),
  note: z.string().optional(),
});

export type AgencyFormValues = z.input<typeof agencySchema>;
export type ProjectFormValues = z.input<typeof projectSchema>;
