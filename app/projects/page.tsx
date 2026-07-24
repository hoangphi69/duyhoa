import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import construction from '@/public/construction.png';

export default function Projects() {
  return (
    <div className="space-y-10 mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 container">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <h1 className="font-heading font-extrabold text-foreground text-4xl md:text-5xl">
          Dự án
        </h1>
        <p className="max-w-[60ch] text-muted-foreground text-lg">
          Các dự án tiêu biểu mà chúng tôi đã đồng hành và thực hiện.
        </p>
      </div>

      {/* Blocky Under Construction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 bg-card border border-border">
        {/* Left Column: Icon/Status Block */}
        <div className="flex flex-col justify-center items-center bg-muted/50 border-border md:border-r border-b md:border-b-0 min-h-62.5">
          <Image
            src={construction}
            alt="coming soon"
            className="size-full object-cover"
          />
        </div>

        {/* Right Column: Content Block */}
        <div className="flex flex-col justify-center md:col-span-3 bg-slate-900 p-8 md:p-12 lg:p-16 text-slate-50">
          <h2 className="mb-4 font-bold text-2xl md:text-3xl">
            Trang đang được xây dựng
          </h2>

          <p className="mb-10 max-w-[60ch] text-slate-300 text-lg leading-relaxed">
            Hồ sơ năng lực và danh sách các dự án tiêu biểu mà Duy Hoà đã cung
            cấp vật tư đang được tổng hợp và thiết kế. Vui lòng quay lại sau!
          </p>

          {/* Action Area */}
          <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4 mt-auto pt-8 border-white/10 border-t">
            <span className="mr-4 font-mono text-primary text-sm uppercase tracking-widest">
              Khám phá các mục khác
            </span>
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'rounded-none bg-transparent border-white/20 text-white hover:bg-white hover:text-black',
              )}
            >
              Về Trang chủ
            </Link>
            <Link
              href="/brands"
              className={cn(
                buttonVariants({
                  variant: 'default',
                }),
                'rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold',
              )}
            >
              Xem Thương hiệu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
