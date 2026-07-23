'use client';

import { useState, MouseEvent } from 'react';
import Map from '@/public/map.svg';

// Helper to fix \uXXXX and \xXX encoded strings from the SVG attributes
const decodeSVGText = (text: string | null) => {
  if (!text) return null;
  try {
    return text
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      )
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      );
  } catch (e) {
    return text;
  }
};

export default function VietnamMapSection() {
  const [hoveredData, setHoveredData] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;

    // ONLY target <g> elements that explicitly have the 'active' class
    const group = target.closest('g.active');

    if (group) {
      const rawTitle = group.getAttribute('title');
      const id = group.getAttribute('id');
      const decodedTitle = decodeSVGText(rawTitle);

      // Only update state if we moved to a new active province to prevent unnecessary renders
      if (decodedTitle && id && decodedTitle !== hoveredData?.title) {
        setHoveredData({ id, title: decodedTitle });
        return;
      }
    } else if (hoveredData !== null) {
      // Clear it if we hover over an empty gap or a non-active area
      setHoveredData(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <section className="py-10 md:py-20">
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8 xl:-mb-16">
        <h2 className="font-heading text-foreground text-3xl sm:text-4xl">
          Mạng lưới phân phối phủ khắp Miền Bắc
        </h2>
        <p className="max-w-[30ch] text-muted-foreground text-lg">
          Với đội xe hùng hậu và tổng kho rộng lớn tại vị trí chiến lược, Duy
          Hoà đảm bảo thời gian giao hàng nhanh chóng nhất đến tay đại lý tại
          các tỉnh thành phía Bắc.
        </p>
      </div>

      <div className="relative py-4 w-full map-wrapper">
        {hoveredData && (
          <style>{`
            .visual-layer #${hoveredData.id} {
              fill: var(--muted-foreground) !important;
              stroke: var(--muted-foreground) !important;
            }
          `}</style>
        )}

        {/* 1. VISUAL LAYER */}
        <Map className="block z-0 w-full h-auto pointer-events-none visual-layer" />

        {/* 2. HIT LAYER */}
        <Map
          className="top-0 left-0 z-10 absolute opacity-0 w-full h-full hit-layer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* 3. STATIC BOTTOM-RIGHT INDICATOR */}
        <div className="right-0 bottom-0 z-20 absolute flex flex-col items-end pointer-events-none">
          <span className="mb-4 font-medium text-muted-foreground text-sm uppercase tracking-widest">
            Khu vực
          </span>
          <span
            className="font-heading font-bold text-primary text-4xl md:text-5xl transition-all duration-300"
            key={hoveredData?.title || 'default'}
          >
            {hoveredData?.title || 'Miền Bắc'}
          </span>
        </div>
      </div>
    </section>
  );
}
