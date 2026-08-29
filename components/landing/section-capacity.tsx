'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const AUTO_CYCLE_MS = 6 * 1000;

const commitments = [
  {
    title: 'Đủ quy cách, không thiếu cỡ',
    desc: 'Duy Hoà giữ tồn thường trực toàn bộ quy cách thông dụng theo catalogue của hãng. Đại lý không phải nhận đơn rồi đi tìm cỡ thiếu ở nơi khác.',
    image: '/capacity-01.jpg',
  },
  {
    title: 'Có hàng trong ngày',
    desc: 'Đơn đặt trước 10h sáng — giao trong ngày tại Quảng Ninh. Các mã đặc chủng ngoài danh mục thường trực: xác nhận thời gian có hàng trong vòng 2 giờ.',
    image: '/capacity-02.jpg',
  },
  {
    title: 'Nhập trực tiếp từ nhà máy',
    desc: 'Là NPP cấp 1, Duy Hoà đặt hàng thẳng nhà máy theo kế hoạch tháng. Không phụ thuộc tồn kho của bên trung gian, không đứt hàng vào mùa cao điểm.',
    image: '/capacity-03.jpg',
  },
  {
    title: 'Cấp hàng theo tiến độ công trình',
    desc: 'Nhận đặt hàng theo giai đoạn thi công, giữ hàng cho công trình, giao đúng lịch.',
    image: '/capacity-04.jpg',
  },
];

export default function SupplyCapacitySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    // Clear existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    // Progress bar ticks every 50ms
    const progressStep = 50 / AUTO_CYCLE_MS;
    progressRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + progressStep, 1));
    }, 50);

    // Auto-advance
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % commitments.length);
      setProgress(0);
    }, AUTO_CYCLE_MS);
  }, []);

  // Start auto-cycle on mount
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startTimer]);

  // Reset timer whenever activeIndex changes (from click)
  useEffect(() => {
    startTimer();
  }, [activeIndex, startTimer]);

  const handleClick = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <section className="py-10 md:py-20 container">
      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-10 md:mb-14">
        <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
          supply capacity
        </div>
        <h2 className="max-w-3xl font-heading text-foreground text-3xl sm:text-4xl leading-[1.3]">
          Gọi là có hàng — năng lực cung ứng được xây dựng để đại lý không bao
          giờ phải chờ
        </h2>
      </div>

      {/* Image container with overlaid accordion */}
      <div className="relative w-full min-h-100 sm:min-h-120 md:min-h-150 lg:min-h-170 overflow-hidden">
        {/* SVG grain filter */}
        <svg className="absolute size-0" aria-hidden="true">
          <filter id="capacity-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        {/* Background images — cross-fade */}
        {commitments.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === activeIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="content-center w-full h-full object-cover font-mono text-muted-foreground text-center italic"
            />
          </div>
        ))}

        {/* Dark gradient overlay from bottom and top */}
        <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-transparent to-foreground/90" />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ filter: 'url(#capacity-grain)' }}
        />

        {/* Title — top left */}
        <div className="top-4 md:top-6 left-4 md:left-6 z-10 absolute">
          <span className="font-mono text-background text-xs md:text-sm tracking-widest">
            {commitments[activeIndex].title}
          </span>
        </div>

        {/* Number badge — top right */}
        <div className="top-4 md:top-6 right-4 md:right-6 z-10 absolute">
          <span className="font-mono text-background text-xs md:text-sm tracking-widest">
            0{activeIndex + 1} / 0{commitments.length}
          </span>
        </div>

        {/* Accordion overlaid at the bottom */}
        <div className="bottom-0 left-0 z-10 absolute items-end gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-4 p-4 md:p-6 w-full">
          {commitments.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                className="group text-left transition-colors duration-300 cursor-pointer"
                onClick={() => handleClick(idx)}
              >
                <div className="pb-3 md:pb-4">
                  {/* Number + Title side by side */}
                  <div className="flex items-start gap-3">
                    <span
                      className={`font-mono text-xs tabular-nums tracking-widest transition-colors duration-200 mt-1 shrink-0 ${
                        isActive ? 'text-primary' : 'text-background/40'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      className={`font-heading text-base md:text-lg tracking-tight transition-colors duration-200 ${
                        isActive
                          ? 'text-background'
                          : 'text-background/70 group-hover:text-background'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Description — accordion expand/collapse */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive
                        ? 'max-h-48 opacity-100 mt-2'
                        : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <p className="pl-8 text-background/70 text-xs md:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Progress bar — only on active item */}
                <div className="relative bg-background/20 w-full h-px">
                  <div
                    className="left-0 absolute inset-y-0 bg-primary transition-none"
                    style={{
                      width: isActive ? `${progress * 100}%` : '0%',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
