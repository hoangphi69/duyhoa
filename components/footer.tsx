'use client';

import { siteConfig } from '@/config/site';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/public/duyhoa.png';
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
          <div className="flex md:flex-row flex-col justify-between items-center gap-6 bg-primary my-20 p-8 md:p-12 border border-border text-foreground">
            <div className="flex flex-col gap-2">
              <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight">
                Cần tư vấn vật tư cho công trình?
              </h3>
              <p className="opacity-90">
                Liên hệ ngay để nhận báo giá đại lý tốt nhất khu vực Quảng Ninh
                - Hải Phòng - Hải Dương.
              </p>
            </div>
            <Link
              href="/contact/agency"
              className="flex items-center gap-2 bg-background hover:bg-muted px-8 py-4 border border-background font-mono font-medium text-foreground text-sm uppercase tracking-wide transition-colors shrink-0"
            >
              Liên hệ ngay <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Main Footer */}
      <footer className="z-10 relative bg-foreground pt-16 pb-8 border-border border-t text-background/90">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          {/* Top Section */}
          <div className="gap-10 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 pb-12">
            {/* Brand Column */}
            <div className="flex flex-col md:col-span-2">
              <div className="flex items-center gap-6 mb-4">
                <Link href="/">
                  <Image
                    src={logo}
                    priority
                    alt="Duy Hoà Logo"
                    className="w-full h-28 object-contain"
                  />
                </Link>
              </div>
              <p className="mb-5 max-w-md font-heading font-semibold text-background/65 text-base">
                Nhà phân phối uỷ quyền cấp 1 vật tư ngành Điện, Nước, Thiết bị
                vệ sinh và Dụng cụ cầm tay.
              </p>
              <div className="mt-4 font-mono text-background/60 text-xs leading-relaxed">
                <div>{siteConfig.contact.address}</div>
                <div className="mt-1">{siteConfig.contact.workingHours}</div>
                <div className="mt-1">
                  Hotline. {formatPhoneNumber(siteConfig.contact.hotline)}
                </div>
                <div className="mt-1">Email. {siteConfig.contact.email}</div>
              </div>
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
                    className="font-semibold text-background/75 hover:text-primary transition-colors"
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
              <nav className="flex flex-col gap-3 mb-5">
                {siteConfig.links.contact.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="font-semibold text-background/75 hover:text-primary transition-colors"
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
              <nav className="flex flex-col gap-3 mb-5">
                <Link
                  href={siteConfig.links.social[0].href}
                  target="_blank"
                  className="font-semibold text-background/75 hover:text-primary transition-colors"
                >
                  Facebook
                </Link>
                <Link
                  href={siteConfig.links.social[1].href}
                  className="font-semibold text-background/75 hover:text-primary transition-colors"
                >
                  Zalo OA
                </Link>
              </nav>
            </div>
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
