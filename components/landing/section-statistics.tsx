import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StatisticsSection() {
  return (
    <div className="z-10 relative flex flex-col mt-12 w-full">
      <div className="gap-px grid grid-cols-1 lg:grid-cols-2 bg-border border-y w-full">
        <div className="flex flex-col justify-between gap-12 bg-card py-8 md:py-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
                statistics
              </div>
              <h2 className="lg:max-w-[15ch] font-heading text-foreground text-3xl sm:text-4xl leading-[1.3] grow">
                Năng lực cung ứng
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
              Hệ thống cơ sở vật chất và mạng lưới phân phối được xây dựng vững
              chắc, đảm bảo khả năng cung cấp hàng hóa liên tục và ổn định cho
              hàng nghìn đối tác trên toàn khu vực.
            </p>
            <Link
              href="/#contact"
              className="inline-flex justify-center items-center bg-primary hover:bg-primary/90 mt-2 px-8 w-fit h-12 font-mono text-primary-foreground text-sm transition-colors"
            >
              Liên hệ
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats Grid */}
        <div className="gap-px grid grid-cols-2 h-full">
          {/* Featured Stat - Spans 2 columns */}
          <div className="flex flex-col justify-center gap-2 col-span-2 bg-card/80 px-6 md:px-8 py-8 md:py-12">
            <span className="font-mono text-primary text-6xl md:text-7xl tracking-tighter">
              6 thương hiệu
            </span>
            <span className="mt-4 font-medium text-muted-foreground text-sm sm:text-base leading-tight">
              Uỷ quyền cấp 1 khu vực
            </span>
          </div>

          {[
            {
              value: '1.500',
              unit: 'đại lý',
              desc: 'Nhập hàng thường xuyên',
            },
            {
              value: '6.000',
              unit: 'm²',
              desc: 'Sàn kho, tính toàn bộ các tầng',
            },
            {
              value: '15',
              unit: 'năm',
              desc: 'Phân phối chính hãng',
            },
            {
              value: '12',
              unit: 'đầu xe',
              desc: 'Tổng tải trọng gần 60 tấn',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-center gap-1 bg-card p-6 md:p-8"
            >
              <span className="font-mono text-primary text-3xl md:text-4xl">
                {stat.value}{' '}
                <span className="font-medium text-muted-foreground/50 text-xl md:text-2xl">
                  {stat.unit}
                </span>
              </span>
              <span className="mt-1 font-medium text-muted-foreground text-sm leading-tight">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
