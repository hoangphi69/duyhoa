import { Phone } from 'lucide-react';
import Link from 'next/link';
import { formatPhoneNumber } from '@/lib/utils';
import Zalo from '@/public/brands/zalo.svg';
import { siteConfig } from '@/config/site';

export default function ContactBubble() {
  return (
    <div className="md:top-3/4 right-0 bottom-4 md:bottom-auto z-50 fixed flex flex-row md:flex-col md:-translate-y-1/2">
      {/* Hotline */}
      <Link
        href={`tel:${siteConfig.contact.hotline}`}
        className="group flex md:flex-col items-center gap-2 md:gap-3 hover:bg-primary p-2.5 md:p-3 border-primary-foreground/20 border-r md:border-r-0 md:border-b text-muted-foreground hover:text-foreground transition-colors"
        title="Hotline"
      >
        <Phone className="size-4 group-hover:-rotate-12 transition-transform" />
        <span className="hidden md:block font-mono text-sm tracking-widest [writing-mode:vertical-rl]">
          {formatPhoneNumber(siteConfig.contact.hotline)}
        </span>
      </Link>

      {/* Zalo */}
      <Link
        href={siteConfig.links.social[1].href}
        target="_blank"
        rel="noreferrer"
        className="group flex md:flex-col items-center gap-2 md:gap-3 hover:bg-[#0068FF] p-2.5 md:p-3 text-muted-foreground hover:text-white transition-colors"
        title="Zalo"
      >
        <Zalo className="fill-current stroke-none w-5 h-5 transition-transform" />
      </Link>
    </div>
  );
}
