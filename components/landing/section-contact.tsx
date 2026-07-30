'use client';

import { Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

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
    <section
      id="contact-section"
      className="py-10 md:py-20 max-w-[100vw] overflow-hidden container"
    >
      {/* Outer Grid Wrapper to maintain sharp borders */}
      <div className="gap-px grid grid-cols-1 lg:grid-cols-5 bg-border border border-border w-full">
        {/* LEFT COLUMN: Split into Header Block and Benefits Block */}
        <div className="flex flex-col gap-px lg:col-span-2 bg-border">
          {/* Header Block */}
          <div className="flex flex-col justify-center gap-6 bg-card p-8 md:p-12 lg:p-14 min-h-[300px]">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              contact
            </div>
            <h2 className="font-heading text-foreground text-4xl sm:text-5xl leading-[1.15] tracking-tight">
              Trở thành đại lý của Duy Hoà
            </h2>
            <p>
              Ðể lại thông tin, nhân viên phụ trách khu vực liên hệ trong 2 giờ
              làm việc.
            </p>
          </div>

          {/* Benefits Block */}
          <div className="flex flex-col justify-center bg-muted/10 p-8 md:p-12 lg:p-14 grow">
            <h3 className="mb-8 pb-4 border-border border-b font-mono font-bold text-foreground text-sm uppercase tracking-widest">
              Quyền lợi đại lý mới
            </h3>

            <ul className="space-y-6 text-sm">
              {[
                'Chiết khấu ưu đãi cho đơn hàng đầu tiên',
                'Hỗ trợ bảng hiệu, sản phẩm trưng bày tại cửa hàng',
                'Chính sách công nợ linh hoạt cho đại lý uy tín',
                'Nhân viên tư vấn ghé tận nơi, giao hàng tận cửa',
              ].map((benefit, idx) => (
                <li key={idx} className="group flex items-start gap-4">
                  <div className="flex justify-center items-center bg-background border border-border group-hover:border-primary w-6 h-6 transition-colors duration-300 shrink-0">
                    <Check className="opacity-80 group-hover:opacity-100 w-4 h-4 text-primary" />
                  </div>
                  <span className="pt-0.5 text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="flex flex-col justify-center lg:col-span-3 bg-card p-8 md:p-12 lg:p-16">
          <form id="contact" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-6 lg:gap-8">
              <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2">
                {/* Agency Name */}
                <Controller
                  name="agency"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="mb-2 font-mono font-semibold text-xs uppercase tracking-widest"
                        htmlFor="contact-agency"
                      >
                        Tên cửa hàng
                      </FieldLabel>
                      <Input
                        {...field}
                        id="contact-agency"
                        className="bg-background border-border focus-visible:border-primary rounded-none focus-visible:ring-0 h-14 transition-colors"
                        aria-invalid={fieldState.invalid}
                        placeholder="Cửa hàng Điện nước..."
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
                        className="mb-2 font-mono font-semibold text-xs uppercase tracking-widest"
                        htmlFor="contact-phone"
                      >
                        Số điện thoại
                      </FieldLabel>
                      <Input
                        {...field}
                        id="contact-phone"
                        type="tel"
                        className="bg-background border-border focus-visible:border-primary rounded-none focus-visible:ring-0 h-14 transition-colors"
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
              </div>

              {/* Area */}
              <Controller
                name="area"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="mb-2 font-mono font-semibold text-xs uppercase tracking-widest"
                      htmlFor="contact-area"
                    >
                      Khu vực
                    </FieldLabel>
                    <Input
                      {...field}
                      id="contact-area"
                      className="bg-background border-border focus-visible:border-primary rounded-none focus-visible:ring-0 h-14 transition-colors"
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

              {/* Categories Grid (Using blocky layout) */}
              <Controller
                name="categories"
                control={form.control}
                render={({ field, fieldState }) => {
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
                      className="space-y-2 mt-2"
                    >
                      <FieldLabel className="mb-2 font-mono font-semibold text-xs uppercase tracking-widest">
                        Ngành hàng quan tâm
                      </FieldLabel>

                      {/* Blocky Gap-based Grid for Categories */}
                      <div className="gap-px grid grid-cols-2 xl:grid-cols-4 bg-border border border-border">
                        {categories.map((cat, idx) => {
                          const isSelected = (field.value || []).includes(cat);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleToggle(cat)}
                              className={`h-14 px-2 text-xs text-center transition-colors uppercase font-mono tracking-tight flex items-center justify-center
                                ${
                                  isSelected
                                    ? 'bg-primary text-primary-foreground font-bold'
                                    : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
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
              <div className="flex sm:flex-row flex-col gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 rounded-none h-14 font-mono font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Gửi yêu cầu
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-[#0068FF] hover:bg-[#0054cc] rounded-none h-14 font-mono font-bold text-white text-sm uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Nhắn Zalo
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
}
