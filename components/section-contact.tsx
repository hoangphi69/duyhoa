'use client';

import { Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const formSchema = z.object({
  agency: z.string().min(2, {
    message: 'Vui lòng nhập tên cửa hàng.',
  }),
  phone: z.string().min(10, {
    message: 'Số điện thoại không hợp lệ.',
  }),
  area: z.string().min(2, {
    message: 'Vui lòng nhập khu vực.',
  }),
  categories: z.array(z.string()).min(1, {
    message: 'Vui lòng chọn ít nhất một danh mục.',
  }),
});

export default function ContactSection() {
  const categories = ['Điện', 'Nước', 'Thiết bị vệ sinh', 'Dụng cụ cầm tay'];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agency: '',
      phone: '',
      area: '',
      categories: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <section id="contact-section" className="py-10 md:py-20 container">
      <div className="grid grid-cols-1 lg:grid-cols-5 border-y">
        {/* Left Column */}
        <div className="flex flex-col lg:col-span-2 lg:border-r border-b lg:border-b-0">
          <div className="flex flex-col gap-4 py-10 min-h-48 lg:min-h-64 grow">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary uppercase tracking-widest">
              contact
            </div>
            <h2 className="font-heading text-foreground text-3xl sm:text-4xl leading-[1.3]">
              Để lại thông tin Duy Hoà gửi bảng giá ngay
            </h2>
          </div>
          <div className="bg-muted/50 px-8 py-10 border-t">
            <h3 className="mb-8 font-mono font-semibold text-sm uppercase tracking-wider">
              Quyền lợi đại lý mới
            </h3>

            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <Check className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                <span className="leading-relaxed">
                  Chiết khấu ưu đãi cho đơn hàng đầu tiên
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Check className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                <span className="leading-relaxed">
                  Hỗ trợ bảng hiệu, sản phẩm trưng bày tại cửa hàng
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Check className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                <span className="leading-relaxed">
                  Chính sách công nợ linh hoạt cho đại lý uy tín
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Check className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                <span className="leading-relaxed">
                  Nhân viên tư vấn ghé tận nơi, giao hàng tận cửa
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="flex flex-col justify-center lg:col-span-3 p-6 sm:p-8 md:p-12 xl:p-16">
          <form id="contact" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Agency Name */}
              <Controller
                name="agency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="font-semibold uppercase tracking-wider"
                      htmlFor="contact-agency"
                    >
                      Tên cửa hàng
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-agency"
                      className="h-12"
                      aria-invalid={fieldState.invalid}
                      placeholder="Cửa hàng Điện nước Hùng Anh"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Phone Number */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="font-semibold uppercase tracking-wider"
                      htmlFor="contact-phone"
                    >
                      Số điện thoại
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-phone"
                      type="tel"
                      className="h-12"
                      aria-invalid={fieldState.invalid}
                      placeholder="09xx xxx xxx"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Area */}
              <Controller
                name="area"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="font-semibold uppercase tracking-wider"
                      htmlFor="contact-area"
                    >
                      Khu vực
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-area"
                      className="h-12"
                      aria-invalid={fieldState.invalid}
                      placeholder="Vĩnh Bảo, Hải Phòng"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Categories Grid */}
              <Controller
                name="categories"
                control={form.control}
                render={({ field, fieldState }) => {
                  // Direct toggle logic writing to the form's field state
                  const handleToggle = (cat: string) => {
                    const current = field.value || [];
                    const newValue = current.includes(cat)
                      ? current.filter((c) => c !== cat)
                      : [...current, cat];
                    field.onChange(newValue);
                  };

                  return (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="space-y-2"
                    >
                      <FieldLabel className="font-semibold uppercase tracking-wider">
                        Ngành hàng quan tâm
                      </FieldLabel>
                      <div className="gap-0 grid grid-cols-2 xl:grid-cols-4 bg-muted/20 border">
                        {categories.map((cat, idx) => {
                          const isSelected = (field.value || []).includes(cat);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleToggle(cat)}
                              className={`h-12 px-2 text-xs text-center transition-colors max-xl:odd:border-r max-xl:nth-[-n+2]:border-b xl:border-r xl:last:border-r-0 uppercase
                                ${
                                  isSelected
                                    ? 'bg-primary'
                                    : 'text-foreground hover:bg-muted'
                                }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Submit Buttons */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 rounded-none w-full h-14 font-bold text-primary-foreground text-base"
                >
                  Gửi thông tin nhận báo giá
                </Button>
                <Button
                  type="button"
                  className="bg-[#0068FF] hover:bg-[#0054cc] rounded-none w-full h-14 font-bold text-white text-base transition-colors"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Nhắn Zalo Duy Hoà
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
}
