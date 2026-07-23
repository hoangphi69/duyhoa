'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  fastDuration?: number; // Speed when not hovered
  slowDuration?: number; // Speed when hovered
  className?: string;
}

export function Marquee({
  children,
  direction = 'left',
  fastDuration = 15,
  slowDuration = 40,
  className = '',
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex w-full overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center w-max"
        // Translating exactly 50% ensures a flawless loop with no lag/stutter
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: isHovered ? slowDuration : fastDuration,
        }}
      >
        {/* 
          Render children 4 times. 
          Why? It ensures the track is wide enough for ultra-wide screens, 
          and 50% of 4 blocks is exactly 2 blocks, making the loop mathematically seamless.
        */}
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
