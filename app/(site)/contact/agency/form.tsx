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
import { agencyRegistrationAction } from '../actions';
import {
  AGENCY_CATEGORIES,
  AgencyFormValues,
  agencySchema,
} from '../validation';
import { siteConfig } from '@/config/site';
import { analytics } from '@/components/analytics/google-analytics';

const CONFIRMATION_DURATION_MS = 3000;

// Reserve a fixed line of space for field errors so they don't push layout
// when they appear/disappear.
function FieldError({ message }: { message?: string }) {
  return (
    <p className="min-h-4 text-red-500 text-xs leading-tight">
      {message ?? '\u00A0'}
    </p>
  );
}

export default function AgencyForm() {
  const [isPending, startTransition] = useTransition();
  const [justSubmitted, setJustSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AgencyFormValues>({
    resolver: zodResolver(agencySchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      storeName: '',
      phone: '',
      region: '',
      categories: [],
      note: '',
    },
  });

  function onSubmit(data: AgencyFormValues) {
    startTransition(async () => {
      const result = await agencyRegistrationAction(data);

      if (!result.success) {
        if (result.message) {
          setError('root.server', { message: result.message });
        }
        for (const [field, message] of Object.entries(result.errors)) {
          setError(field as keyof AgencyFormValues, {
            type: 'server',
            message,
          });
        }
        // Track failed submission
        analytics.trackFormSubmission('agency_contact_form', false);
        return;
      }

      setJustSubmitted(true);
      // Track successful submission
      analytics.trackFormSubmission('agency_contact_form', true);
    });
  }

  // After showing the confirmation for a bit, reset the form and go back.
  useEffect(() => {
    if (!justSubmitted) return;
    const timer = setTimeout(() => {
      reset();
      setJustSubmitted(false);
    }, CONFIRMATION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [justSubmitted, reset]);

  return (
    <div className="relative lg:col-span-8">
      <div
        aria-hidden={!justSubmitted}
        className={`absolute inset-0 z-10 flex flex-col justify-center items-center gap-3 lg:col-span-8 backdrop-blur-lg p-6 sm:p-8 text-center transition-all duration-300 ease-out ${
          justSubmitted
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        <p className="font-heading font-bold text-foreground text-xl">
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
        <div className="mb-8 pb-3 border-muted-foreground border-b border-dashed font-mono text-primary text-xs uppercase tracking-widest">
          01 — Thông tin Đăng ký
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-foreground text-xs uppercase tracking-wider">
              Tên cửa hàng / Công ty <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="VD: Cửa hàng VLXD Tuấn Phát"
              {...register('storeName')}
              className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
            />
            <FieldError message={errors.storeName?.message} />
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
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
            <div className="flex flex-col gap-2">
              <label className="font-mono text-foreground text-xs uppercase tracking-wider">
                Khu vực kinh doanh <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="Quận/Huyện, Tỉnh/Thành phố"
                {...register('region')}
                className="bg-muted-foreground/15 p-3 border border-border focus:border-foreground outline-none font-sans text-foreground text-sm transition-colors"
              />
              <FieldError message={errors.region?.message} />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="mb-1 font-mono text-foreground text-xs uppercase tracking-wider">
              Ngành hàng quan tâm
            </label>
            <div className="flex flex-wrap gap-2">
              {AGENCY_CATEGORIES.map((cat, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    id={`cat-${idx}`}
                    value={cat}
                    {...register('categories')}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`cat-${idx}`}
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
              Ghi chú thêm
            </label>
            <textarea
              placeholder="Để lại lời nhắn, câu hỏi hoặc yêu cầu tư vấn cụ thể..."
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
                <RotateCcw className="w-4 h-4 animate-spin shimmer-reverse" />
              </>
            ) : (
              <>
                Gửi yêu cầu đại lý
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
              href="/contact/project"
              className="flex justify-center items-center gap-2 bg-muted/30 hover:bg-muted p-3 border border-border font-mono text-foreground text-xs uppercase tracking-widest transition-colors"
            >
              Báo giá dự án
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
