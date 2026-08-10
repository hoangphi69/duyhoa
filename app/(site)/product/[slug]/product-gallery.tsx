'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  brand: string;
}

export function ProductGallery({ images, brand }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex justify-center items-center bg-muted/10 border-border border-b w-full h-full aspect-square">
        <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
          No Image
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background h-full">
      {/* Main Active Image */}
      <div className="relative flex justify-center items-center bg-card p-8 border-border border-b aspect-square">
        <img
          src={images[activeImage]}
          alt={`${brand} product`}
          className="w-full h-full object-contain mix-blend-multiply"
        />
        <div className="top-4 left-4 absolute flex gap-2">
          <span className="bg-blue-500/10 px-3 py-1 border border-blue-500/30 font-mono font-bold text-blue-500 text-xs uppercase tracking-widest">
            {brand}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gap-px grid grid-cols-4 bg-border shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={cn(
                'relative bg-card aspect-square overflow-hidden transition-all duration-300',
                activeImage === idx
                  ? 'ring-2 ring-primary ring-inset z-10'
                  : 'hover:bg-muted/50 opacity-70 hover:opacity-100',
              )}
            >
              <img
                src={img}
                alt={`thumbnail ${idx + 1}`}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
