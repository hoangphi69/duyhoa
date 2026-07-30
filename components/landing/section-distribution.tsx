'use client';

import Map from '@/public/vietnam-map.svg';

export default function DistributionSection() {
  return (
    <section className="gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-3 py-10 md:py-20">
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8">
        <div className="flex flex-col gap-4">
          <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
            distribution
          </div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl">
            Nhận cung ứng các dự án trên toàn quốc
          </h2>
        </div>
      </div>
      <Map className="w-full h-full" />
      <p className="max-w-[33ch] text-muted-foreground text-lg">
        12 đầu xe, phủ kín tam giác Quảng Ninh – Hải Phòng – Hải Dương
      </p>
    </section>
  );
}
