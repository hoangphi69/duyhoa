'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="">
        {/* Dải sọc cảnh báo (Hazard Stripe) phía trên */}
        <div
          className="opacity-90 w-full h-3.5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, var(--foreground), var(--foreground) 14px, var(--primary) 14px, var(--primary) 28px)',
          }}
        />
        <div className="bg-background/80 shadow-sm backdrop-blur-sm p-8 sm:p-12 border border-border max-w-160">
          <div className="inline-block mb-7 font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]">
            /ERR-404
          </div>

          <div className="mb-2 font-mono font-medium text-[clamp(90px,18vw,180px)] text-foreground uppercase leading-[0.85] tracking-tight">
            4<span className="text-primary">0</span>4
          </div>

          <h1 className="mb-4 font-heading font-bold text-[clamp(24px,4vw,34px)] text-foreground">
            Không Tìm Thấy Trang
          </h1>

          <p className="mx-auto mb-10 max-w-130 text-muted-foreground leading-relaxed">
            Đường dẫn này không tồn tại hoặc đã được di chuyển — giống như một
            tờ bản vẽ bị thất lạc khỏi bộ hồ sơ. Vui lòng kiểm tra lại đường dẫn
            hoặc quay về các trang chính bên dưới.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/"
              className="bg-foreground hover:bg-primary px-6 py-3.5 border border-foreground hover:border-primary font-mono font-medium text-[12.5px] text-background hover:text-primary-foreground uppercase tracking-widest transition-colors"
            >
              Về trang chủ
            </Link>
            <button
              onClick={() => router.back()}
              className="bg-transparent px-6 py-3.5 border border-border hover:border-primary font-mono text-[12.5px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors cursor-pointer"
            >
              Quay lại trang trước
            </button>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { name: '/Sản phẩm', href: '/product' },
              { name: '/Bảng giá', href: '/catalogue' },
              { name: '/Dự án', href: '/projects' },
              { name: '/Tin tức', href: '/article' },
              { name: '/Liên hệ', href: '/contact/agency' },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="bg-card hover:border-foreground font-mono text-[11px] text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
