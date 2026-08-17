'use client';

import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { cn, formatPhoneNumber } from '@/lib/utils';
import Facebook from '@/public/facebook.svg';
import Zalo from '@/public/zalo.svg';
import { siteConfig } from '@/config/site';

export default function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="right-6 bottom-6 z-50 fixed flex flex-col-reverse items-end gap-4">
      {/* Main Toggle Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center bg-primary shadow-xl hover:shadow-2xl rounded-full w-14 h-14 text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Liên hệ"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-in spin-in-90" />
        ) : (
          <MessageCircle className="w-6 h-6 animate-in zoom-in" />
        )}
      </button>

      {/* Expandable Links */}
      <div
        className={cn(
          'flex flex-col items-end gap-3 origin-bottom transition-all duration-150',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-8 pointer-events-none',
        )}
      >
        {/* 1. Hotline (Pill Shape) */}
        <Link
          href={`tel:${siteConfig.contact.hotline}`}
          className="flex items-center gap-2 bg-primary shadow-lg hover:shadow-xl px-5 py-3 rounded-full text-primary-foreground transition-transform hover:-translate-x-1"
        >
          <Phone className="w-5 h-5" />
          <span className="font-mono text-base tracking-wide">
            {formatPhoneNumber(siteConfig.contact.hotline)}
          </span>
        </Link>

        {/* 2. Zalo (Bubble) */}
        <Link
          href={siteConfig.links.social[1].href}
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center bg-[#0068FF] shadow-lg hover:shadow-xl rounded-full w-14 h-14 text-white transition-transform hover:-translate-x-1"
          title="Nhắn Zalo"
        >
          {/* Custom Zalo Icon (Text-based standard fallback) */}
          <Zalo className="fill-current stroke-none w-6 h-6" />
        </Link>

        {/* 3. Facebook Fanpage (Bubble) */}
        <Link
          href={siteConfig.links.social[0].href}
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center bg-[#0866FF] shadow-lg hover:shadow-xl rounded-full w-14 h-14 text-white transition-transform hover:-translate-x-1"
          title="Fanpage Facebook"
        >
          <Facebook className="fill-current stroke-none w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
