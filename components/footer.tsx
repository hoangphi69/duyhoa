'use client';

import { siteConfig } from '@/config/site';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/public/duyhoa-logo.png';
import { formatPhoneNumber } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();

  // Ẩn khối này nếu đang ở các trang liên hệ
  const isContactPage = pathname?.startsWith('/contact');

  return (
    <>
      {/* Khối CTA sẽ tự động quản lý trạng thái hiển thị của nó */}
      {!isContactPage && (
        <section className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="items-start gap-6 md:gap-4 grid grid-cols-1 md:grid-cols-4 my-10 md:my-20">
            <p className="text-muted-foreground">
              Cần báo giá đại lý
              <br /> và công trình?
            </p>
            <h3 className="md:col-span-2 max-w-xl font-heading font-medium text-3xl sm:text-4xl md:text-5xl decoration-3 decoration-primary underline leading-[1.3] tracking-tight">
              Liên hệ
              <br /> với Duy Hoà ngay
            </h3>
            <Link
              href="/contact/agency"
              className="flex justify-between items-center gap-2 bg-primary hover:bg-primary/80 px-6 md:px-8 py-4 border border-background w-full md:w-auto font-mono text-foreground text-sm uppercase tracking-wide transition-colors shrink-0"
            >
              Trở thành đại lý <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Main Footer */}
      <footer className="z-10 relative bg-foreground pt-16 pb-8 border-border border-t text-background/90">
        <div className="space-y-10 mx-auto px-4 sm:px-6 lg:px-8 container">
          {/* Top Section */}
          <div className="gap-y-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="flex flex-col items-start gap-6">
              <Link href="/">
                <Image
                  src={logo}
                  priority
                  alt="Duy Hoà Logo"
                  className="w-full h-28 object-contain"
                />
              </Link>
              <p className="mb-5 max-w-3xs font-heading font-semibold text-background/65 text-base">
                {siteConfig.brand.positioning}
              </p>
            </div>

            {/* Sitemap Column */}
            <div className="flex flex-col">
              <div className="mb-4 font-mono text-primary text-xs uppercase tracking-widest">
                Liên kết
              </div>
              <nav className="flex flex-col gap-2">
                {siteConfig.links.sitemap.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="font-medium text-background/75 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col">
              <div className="mb-4 font-mono text-primary text-xs uppercase tracking-widest">
                Liên hệ
              </div>
              <nav className="flex flex-col gap-3">
                {siteConfig.links.contact.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="font-medium text-background/75 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Follow Column */}
            <div className="flex flex-col">
              <div className="mb-4 font-mono text-primary text-xs uppercase tracking-widest">
                Theo dõi chúng tôi
              </div>
              <nav className="flex flex-col gap-3">
                <Link
                  href={siteConfig.links.social[0].href}
                  target="_blank"
                  className="font-medium text-background/75 hover:text-primary text-sm transition-colors"
                >
                  Facebook
                </Link>
                <Link
                  href={siteConfig.links.social[1].href}
                  className="font-medium text-background/75 hover:text-primary text-sm transition-colors"
                >
                  Zalo OA
                </Link>
              </nav>
            </div>
          </div>

          {/* Middle Section */}
          <div className="gap-3 md:gap-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 font-mono text-background/60 text-xs leading-relaxed">
            <div>Email. {siteConfig.contact.email}</div>
            <div>Hotline. {formatPhoneNumber(siteConfig.contact.hotline)}</div>
            <div className="sm:col-span-2">{siteConfig.contact.address}</div>
          </div>

          {/* Bottom Section */}
          <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-6 border-background/15 border-t font-mono text-background/50 text-xs tracking-wider">
            <div className="uppercase">
              &copy; {new Date().getFullYear()} Công ty TNHH Thương mại Duy Hoà
              68
            </div>

            <div className="flex sm:flex-row flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                {siteConfig.links.legal.map((link, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="hover:text-primary uppercase transition-colors"
                    >
                      {link.name}
                    </Link>
                    {idx < siteConfig.links.legal.length - 1 && <span>·</span>}
                  </span>
                ))}
              </div>
              <div className="px-3 py-1 border border-background/25 uppercase tracking-widest">
                REV. 08.2026
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
