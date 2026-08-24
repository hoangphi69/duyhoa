'use client';

import { useState } from 'react';

const brands = [
  '/brands/tran-phu.png',
  '/brands/sino-vanlock-electric.png',
  '/brands/sino-plastic.png',
  '/brands/rang-dong.png',
  '/brands/panasonic.png',
  '/brands/taesung.png',
  '/brands/cadi-sun.png',
  '/brands/dobo.png',
  '/brands/viet-han.png',
  '/brands/nanoco.png',
  '/brands/tien-phong.png',
  '/brands/dismy.png',
  '/brands/levia.png',
  '/brands/hathaco.png',
  '/brands/taijaan.png',
  '/brands/kangaroo.png',
  '/brands/swirls.png',
  '/brands/senko.png',
  '/brands/tachicable.png',
  '/brands/tachiko.png',
  '/brands/hoatung.png',
  '/brands/kashing.png',
  '/brands/nishan.png',
  '/brands/inax.png',
  '/brands/goodman.png',
  '/brands/arc-jk.png',
  '/brands/treslaz.png',
  '/brands/jasic.png',
  '/brands/dck.png',
  '/brands/vinawind.png',
  '/brands/hukan.png',
  '/brands/ariston.png',
  '/brands/wilo.png',
  '/brands/kumho.png',
  '/brands/vesbo.png',
  '/brands/minh-hoa.png',
  '/brands/vonta.png',
  '/brands/hanil.png',
  '/brands/kingled.png',
  '/brands/ominsu.png',
  '/brands/ls-electric.png',
  '/brands/sanwa.png',
];

// Grid is 8 columns wide. Each logo cell is 16:9, but logos themselves are
// square, so the center block spans 3 rows (not 2) to give a roughly
// square footprint for the logo to sit in — object-contain still lets it
// flow naturally at its own ratio rather than being stretched to fit.
const COLUMNS = 6;
const CENTER_COL_START = 1; // 1-indexed, spans cols 3–4 of 6 (visually centered)
const CENTER_ROW_START = 1; // spans rows 2–4

function nameFromPath(path: string): string {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.[^/.]+$/, '');
  return base
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

interface LogoCellProps {
  src: string;
  alt: string;
}

function LogoCell({ src, alt }: LogoCellProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative flex justify-center items-center bg-white p-4 aspect-video">
      {errored ? (
        <span className="font-medium text-[11px] text-neutral-400 text-center tracking-wide">
          {alt}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="opacity-85 max-w-full max-h-full object-contain"
        />
      )}
    </div>
  );
}

interface BrandGridProps {
  centerLogoSrc?: string;
  centerLogoAlt?: string;
}

export default function BrandGrid({
  centerLogoSrc = '/duyhoa-logo.png',
  centerLogoAlt = 'Duy Hòa',
}: BrandGridProps) {
  return (
    <section className="px-4 sm:px-8 py-16 sm:py-24">
      <div className="gap-14 grid grid-cols-[4fr_7fr]">
        <div className="flex flex-col justify-between items-start">
          <img src="/duyhoa-logo.png" className="mb-10 h-20" />
          <div>
            <div className="bg-foreground mb-4 p-1 px-2 w-fit font-mono text-primary uppercase tracking-widest">
              duyhoa.vn
            </div>
            <h2 className="sm:mb-8 font-heading font-semibold text-foreground text-5xl leading-[1.3]">
              Tổng kho phân phối thiết bị{' '}
              <span className="text-primary">điện – nước – vệ sinh</span> chính
              hãng
            </h2>
          </div>
        </div>

        <div
          className="gap-px grid bg-neutral-200 mx-auto overflow-hidden translate-y-10 container"
          style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}
        >
          {brands.map((src) => (
            <LogoCell key={src} src={src} alt={nameFromPath(src)} />
          ))}

          {/* Larger center logo, placed on top of the grid via explicit placement */}
          <div
            className="relative flex justify-center items-center bg-background/40 p-10"
            style={{
              gridColumn: `${CENTER_COL_START} / span 2`,
              gridRow: `${CENTER_ROW_START} / span 3`,
            }}
          >
            <span
              className="top-0 left-0 absolute border-primary border-t-4 border-l-4 size-6"
              aria-hidden="true"
            />
            <span
              className="top-0 right-0 absolute border-primary border-t-4 border-r-4 size-6"
              aria-hidden="true"
            />
            <span
              className="bottom-0 left-0 absolute border-primary border-b-4 border-l-4 size-6"
              aria-hidden="true"
            />
            <span
              className="right-0 bottom-0 absolute border-primary border-r-4 border-b-4 size-6"
              aria-hidden="true"
            />
            <img
              src={centerLogoSrc}
              alt={centerLogoAlt}
              className="max-h-35 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
