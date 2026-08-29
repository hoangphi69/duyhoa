'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Map from '@/public/vietnam-map.svg';

function decodeUnicodeEscapes(str: string): string {
  return (
    str
      // \xHH → character
      .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      )
      // \uHHHH → character
      .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      )
  );
}

/* ── Key distribution region IDs ─────────────────────────────── */
const ACTIVE_REGIONS: Record<string, { name: string; desc: string }> = {
  'VN-QN': {
    name: 'Quảng Ninh',
    desc: 'Trụ sở chính & tổng kho 6.000m². Giao hàng trong ngày.',
  },
  'VN-HP': {
    name: 'Hải Phòng',
    desc: 'Tuyến giao hàng cố định hàng ngày. Đội sale thị trường tại chỗ.',
  },
  'VN-61': {
    name: 'Hải Dương',
    desc: 'Tuyến giao hàng cố định hàng ngày. Đội sale thị trường tại chỗ.',
  },
};

const ACTIVE_IDS = new Set(Object.keys(ACTIVE_REGIONS));

interface TooltipData {
  name: string;
  desc?: string;
  isActive: boolean;
  x: number;
  y: number;
}

export default function DistributionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<SVGGElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  /**
   * On mount:
   * 1. Mark active distribution regions with CSS class.
   * 2. For every pixel <rect>, inject a slightly larger transparent
   *    "hit-area" rect that captures pointer events, sized to close
   *    the gap to its neighboring cells. The original visual rect
   *    gets pointer-events disabled so only the hit-area responds.
   *    This removes the dead zones between cells that caused hover
   *    flicker, without inflating the hit region beyond the pixel
   *    grid itself (unlike a per-region bounding box).
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const allRects = Array.from(
      container.querySelectorAll<SVGRectElement>('#pixels rect'),
    );
    if (allRects.length === 0) return;

    // Derive the grid step from the smallest positive gap between
    // distinct x-positions, so hit-areas exactly meet their neighbors.
    const xs = Array.from(
      new Set(allRects.map((r) => parseFloat(r.getAttribute('x') || '0'))),
    ).sort((a, b) => a - b);
    let step = 0;
    for (let i = 1; i < xs.length; i++) {
      const diff = xs[i] - xs[i - 1];
      if (diff > 0 && (step === 0 || diff < step)) step = diff;
    }

    allRects.forEach((rect) => {
      const x = parseFloat(rect.getAttribute('x') || '0');
      const y = parseFloat(rect.getAttribute('y') || '0');
      const width = parseFloat(rect.getAttribute('width') || '0');
      const height = parseFloat(rect.getAttribute('height') || '0');
      const pad = step > width ? (step - width) / 2 : 0;

      // Only the hit-area should receive pointer events.
      rect.style.pointerEvents = 'none';

      const hitRect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      );
      hitRect.setAttribute('x', String(x - pad));
      hitRect.setAttribute('y', String(y - pad));
      hitRect.setAttribute('width', String(width + pad * 2));
      hitRect.setAttribute('height', String(height + pad * 2));
      hitRect.setAttribute('fill', 'transparent');
      hitRect.setAttribute('stroke', 'transparent');
      hitRect.style.pointerEvents = 'all';
      hitRect.classList.add('hit-area');
      rect.parentElement?.insertBefore(hitRect, rect);
    });

    // Mark active regions
    container.querySelectorAll<SVGGElement>('g.land').forEach((g) => {
      const id = g.getAttribute('id') || '';
      if (ACTIVE_IDS.has(id)) g.classList.add('is-active');
    });
  }, []);

  /**
   * Find the closest <g class="land"> ancestor of a target element.
   */
  const findRegionGroup = useCallback(
    (target: EventTarget | null): SVGGElement | null => {
      let el = target as Element | null;
      while (el && el !== containerRef.current) {
        if (el instanceof SVGGElement && el.classList.contains('land')) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    },
    [],
  );

  /**
   * Resolve the display name for a region.
   * Priority: ACTIVE_REGIONS name → decoded SVG title → region ID fallback.
   */
  const getRegionName = useCallback((group: SVGGElement): string => {
    const regionId = group.getAttribute('id') || '';
    const activeInfo = ACTIVE_REGIONS[regionId];
    if (activeInfo) return activeInfo.name;

    // Try <title> child element (SVGR may convert title attr to this)
    const titleEl = group.querySelector('title');
    const rawTitle = titleEl?.textContent || group.getAttribute('title') || '';

    if (rawTitle) return decodeUnicodeEscapes(rawTitle);
    return regionId;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const group = findRegionGroup(e.target);
      const container = containerRef.current;
      if (!container) return;

      const pixelsGroup = container.querySelector('#pixels');

      if (!group) {
        // Not hovering any region — clear state
        if (hoveredRef.current) {
          hoveredRef.current.classList.remove('is-hovered');
          hoveredRef.current = null;
        }
        pixelsGroup?.classList.remove('has-hover');
        setTooltip(null);
        return;
      }

      // Update hover classes (only if region changed)
      if (hoveredRef.current !== group) {
        hoveredRef.current?.classList.remove('is-hovered');
        group.classList.add('is-hovered');
        hoveredRef.current = group;
      }
      pixelsGroup?.classList.add('has-hover');

      const regionId = group.getAttribute('id') || '';
      const activeInfo = ACTIVE_REGIONS[regionId];

      // Position tooltip relative to container
      const containerRect = container.getBoundingClientRect();
      setTooltip({
        name: getRegionName(group),
        desc: activeInfo?.desc,
        isActive: ACTIVE_IDS.has(regionId),
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      });
    },
    [findRegionGroup, getRegionName],
  );

  const handlePointerLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    hoveredRef.current?.classList.remove('is-hovered');
    hoveredRef.current = null;
    container.querySelector('#pixels')?.classList.remove('has-hover');
    setTooltip(null);
  }, []);

  return (
    <section className="py-10 md:py-20 container">
      {/* Section Header — centered */}
      <div className="flex flex-col items-center gap-4 mb-10 md:mb-20 text-center">
        <div className="self-center bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
          distribution
        </div>
        <h2 className="max-w-3xl font-heading text-foreground text-3xl sm:text-4xl leading-[1.1] tracking-tight">
          Nhận cung ứng các dự án trên toàn quốc
        </h2>
        <p className="max-w-lg text-muted-foreground leading-relaxed">
          Gần 20 đầu xe, phủ kín tam giác Quảng Ninh – Hải Phòng – Hải Dương.
          Giao hàng công trình toàn miền Bắc, tới Thanh Hoá.
        </p>
      </div>

      {/* Map + legend layout */}
      <div className="items-start gap-12 grid grid-cols-1 lg:grid-cols-[1fr_auto]">
        {/* Interactive Map */}
        <div
          ref={containerRef}
          className="relative text-muted-foreground/60"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <Map className="w-full h-auto max-h-[70vh] text-primary" />

          {/* Tooltip */}
          {tooltip && (
            <div
              className="z-50 absolute pointer-events-none"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translate(12px, -50%)',
              }}
            >
              <div className="bg-foreground shadow-lg px-3 py-2 min-w-40 max-w-60 text-background">
                <div className="flex items-center gap-2">
                  {tooltip.isActive && (
                    <span className="inline-block bg-primary rounded-full w-2 h-2 shrink-0" />
                  )}
                  <span className="font-heading font-semibold text-sm">
                    {tooltip.name}
                  </span>
                </div>
                {tooltip.desc && (
                  <p className="mt-1 text-background/70 text-xs leading-relaxed">
                    {tooltip.desc}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Legend — key regions */}
        <div className="gap-3 lg:gap-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:pt-8">
          <div className="mb-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
            Vùng phân phối chính
          </div>
          {Object.entries(ACTIVE_REGIONS).map(([id, region]) => (
            <div key={id} className="flex items-start gap-3 lg:min-w-48">
              <span className="bg-primary mt-1.5 rounded-full w-2.5 h-2.5 shrink-0" />
              <div>
                <div className="font-heading font-semibold text-foreground text-sm">
                  {region.name}
                </div>
                <p className="max-w-52 text-muted-foreground text-xs leading-relaxed">
                  {region.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
