'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { projectQuoteAction } from '../actions';
import {
  PROJECT_CATEGORIES,
  ProjectFormValues,
  projectSchema,
} from '../validation';
import { siteConfig } from '@/config/site';
import { analytics } from '@/components/analytics/google-analytics';

const CONFIRMATION_DURATION_MS = 3000;

function FieldError({ message }: { message?: string }) {
  return (
    <p className="min-h-4 text-red-500 text-xs leading-tight">
      {message ?? '\u00A0'}
    </p>
  );
}

export default function ProjectForm() {
  const [isPending, startTransition] = useTransition();
  const [justSubmitted, setJustSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      companyName: '',
      contactPerson: '',
      phone: '',
      projectName: '',
      location: '',
      categories: [],
      scale: '',
      note: '',
    },
  });

  function onSubmit(data: ProjectFormValues) {
    startTransition(async () => {
      const result = await projectQuoteAction(data);

      if (!result.success) {
        if (result.message) {
          setError('root.server', { message: result.message });
        }
        for (const [field, message] of Object.entries(result.errors)) {
          setError(field as keyof ProjectFormValues, {
            type: 'server',
            message,
          });
        }
        // Track failed submission
        analytics.trackFormSubmission('project_contact_form', false);
        return;
      }

      setJustSubmitted(true);
      // Track successful submission
      analytics.trackFormSubmission('project_contact_form', true);
    });
  }

  useEffect(() => {
    if (!justSubmitted) return;
    const timer = setTimeout(() => {
      reset();
      setJustSubmitted(false);
    }, CONFIRMATION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [justSubmitted, reset]);

  return (
    <div className="relative lg:order-2 lg:col-span-8">
      <div
        aria-hidden={!justSubmitted}
        className={`absolute inset-0 z-10 flex flex-col justify-center items-center gap-3 backdrop-blur-sm p-6 sm:p-8 text-center transition-all duration-300 ease-out ${
          justSubmitted
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <CheckCircle2 className="w-10 h-10 text-green-600" />
        <p className="font-heading font-semibold text-foreground text-lg">
          Đã gửi yêu cầu thành công!
        </p>
        <p className="max-w-sm text-muted-foreground text-sm">
          Chúng tôi sẽ liên hệ sớm. Cảm ơn bạn đã quan tâm.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card p-6 sm:p-8 border border-border"
      >
        {/* Section 01 */}
        <div className="mb-4 pb-3 border-muted-foreground border-b border-dashed font-mono text-primary text-xs uppercase tracking-widest">
          01 — Thông tin Liên hệ
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-foreground text-xs uppercase tracking-wider">
              Tên công ty / Đơn vị <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="VD: CTCP Xây dựng..."
              {...register('companyName')}
              className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
            />
            <FieldError message={errors.companyName?.message} />
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-foreground text-xs uppercase tracking-wider">
                Người liên hệ <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="Họ và tên"
                {...register('contactPerson')}
                className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
              />
              <FieldError message={errors.contactPerson?.message} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-foreground text-xs uppercase tracking-wider">
                Số điện thoại <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                placeholder="09xx.xxx.xxx"
                {...register('phone')}
                className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
              />
              <FieldError message={errors.phone?.message} />
            </div>
          </div>
        </div>

        {/* Section 02 */}
        <div className="mb-4 pb-3 border-muted-foreground border-b border-dashed font-mono text-primary text-xs uppercase tracking-widest">
          02 — Thông tin Dự án
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-foreground text-xs uppercase tracking-wider">
                Tên dự án <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="Tên công trình"
                {...register('projectName')}
                className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
              />
              <FieldError message={errors.projectName?.message} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-foreground text-xs uppercase tracking-wider">
                Địa điểm dự án <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="Vị trí thi công"
                {...register('location')}
                className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
              />
              <FieldError message={errors.location?.message} />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="mb-1 font-mono text-foreground text-xs uppercase tracking-wider">
              Hạng mục quan tâm
            </label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="relative">
                  <input
                    type="checkbox"
                    id={`proj-cat-${idx}`}
                    value={cat}
                    {...register('categories')}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`proj-cat-${idx}`}
                    className="block peer-checked:bg-foreground px-4 py-2 border border-border hover:not-peer-checked:border-primary peer-checked:border-foreground font-mono text-muted-foreground hover:not-peer-checked:text-foreground peer-checked:text-background text-xs transition-colors cursor-pointer"
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <label className="font-mono text-foreground text-xs uppercase tracking-wider">
              Quy mô / Khối lượng dự kiến
            </label>
            <input
              type="text"
              placeholder="VD: 320 căn hộ, 12 tầng..."
              {...register('scale')}
              className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
            />
            <FieldError message={errors.scale?.message} />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="font-mono text-foreground text-xs uppercase tracking-wider">
              Ghi chú thêm
            </label>
            <textarea
              placeholder="Mô tả thêm yêu cầu kỹ thuật, tiến độ, hoặc link tài liệu tham khảo..."
              {...register('note')}
              className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none min-h-24 font-sans text-foreground text-sm transition-colors resize-y"
            />
            <FieldError message={errors.note?.message} />
            <FieldError message={errors.root?.server?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            type="submit"
            disabled={isPending}
            className="flex justify-center items-center gap-2 bg-foreground hover:bg-primary disabled:opacity-50 p-4 border border-foreground hover:border-primary w-full font-mono font-medium text-background hover:text-primary-foreground text-sm uppercase tracking-widest transition-colors cursor-pointer"
          >
            {isPending ? (
              <>
                Đang gửi...
                <RotateCcw className="w-4 h-4 animate-[spin_1s_linear_infinite_reverse]" />
              </>
            ) : (
              <>
                Gửi yêu cầu báo giá
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="gap-3 grid grid-cols-2">
            <Link
              href={siteConfig.links.social[1].href}
              target="_blank"
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 p-3 font-mono font-medium text-white text-xs uppercase tracking-widest transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat Zalo
            </Link>
            <Link
              href="/contact/agency"
              className="flex justify-center items-center gap-2 bg-muted/30 hover:bg-muted p-3 border border-border font-mono text-foreground text-xs uppercase tracking-widest transition-colors"
            >
              Đăng ký đại lý
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
