import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StatisticsSection() {
  return (
    <section className="relative flex flex-col py-10 md:py-20 container">
      {/* TOP ROW: Heading + Two featured stats side-by-side */}
      <div className="gap-px grid grid-cols-2 lg:grid-cols-4 w-full">
        {/* Left: Title & CTA */}
        <div className="gap-px gap-y-8 grid grid-cols-subgrid col-span-2 bg-card py-8 md:py-12 grow">
          <div className="flex flex-col gap-4 col-span-2">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              statistics
            </div>
            <h2 className="max-w-3xl font-heading text-foreground text-3xl sm:text-4xl leading-[1.3] tracking-tight">
              Mạng lưới phân phối vững chắc, phục vụ hàng nghìn đối tác toàn khu
              vực
            </h2>
          </div>
          <Link
            href="/contact/agency"
            className="inline-flex justify-between items-center bg-primary hover:bg-primary/90 mt-2 px-8 h-12 font-mono text-primary-foreground text-sm text-nowrap transition-colors"
          >
            Trở thành đại lý
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        {/* Right: Two featured stats side-by-side */}
        <div className="flex xl:flex-row flex-col gap-2 xl:gap-10 col-span-2 bg-card mt-10 px-6 md:px-8 py-8 md:py-12">
          <span className="font-mono text-primary text-5xl md:text-8xl tracking-tighter">
            2.500+{' '}
          </span>
          <div className="space-y-2 mt-3 text-nowrap">
            <span className="font-mono font-medium text-muted-foreground text-2xl md:text-5xl">
              đại lý
            </span>
            <br />
            <span className="font-medium text-muted-foreground text-sm sm:text-base leading-tight">
              Nhập hàng thường xuyên
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: 4-column stats grid (3 stats, spanning evenly) */}
      <div className="gap-px grid grid-cols-2 lg:grid-cols-4 lg:mt-20 bg-border border-t w-full">
        {[
          {
            value: '120+',
            unit: 'thương hiệu',
            desc: 'Được phân phối rộng rãi',
          },
          {
            value: '6.000',
            unit: 'm²',
            desc: 'Sàn kho, tính toàn bộ các tầng',
          },
          {
            value: '15+',
            unit: 'năm',
            desc: 'Phân phối chính hãng',
          },
          {
            value: '20',
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
              <span className="font-medium text-muted-foreground text-xl md:text-2xl">
                {stat.unit}
              </span>
            </span>
            <span className="mt-1 font-medium text-muted-foreground text-sm leading-tight">
              {stat.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
