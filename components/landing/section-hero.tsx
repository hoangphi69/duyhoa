import Link from 'next/link';
import { Phone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-between py-10 md:py-20 min-h-[80vh] overflow-hidden">
      {/* Top Content & Central Image Container */}
      <div className="z-10 relative flex flex-col grow">
        {/* Text and Buttons */}
        <div className="flex-none">
          <h1 className="font-heading text-foreground text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.3] tracking-tight">
            Nhà phân phối uỷ quyền cấp 1
          </h1>

          <div className="flex xl:flex-row flex-col gap-6 md:gap-8 pt-8">
            <div className="flex sm:flex-row flex-col gap-4 pt-2">
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'gap-2 px-8 w-full sm:w-auto group h-12 font-mono text-sm',
                )}
              >
                <Phone className="size-4 group-hover:-rotate-12 transition-transform" />
                Đăng ký làm đại lý
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'gap-2 px-8 w-full sm:w-auto group h-12 font-mono text-sm',
                )}
              >
                Xem bảng giá
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="max-w-xl text-muted-foreground text-lg sm:text-xl leading-relaxed">
              15 năm cung ứng Ðiện – Nước – Thiết bị vệ sinh – Dụng cụ cầm tay
              cho 1.500 cửa hàng vật liệu xây dựng khu vực Ðông Bắc.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center mt-12 md:mt-24 w-full min-h-[300px] grow">
          {/* Expanded Ambient Background Glow */}
          <div className="top-1/2 left-1/2 absolute bg-foreground/10 blur-[120px] w-full max-w-5xl h-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Full-width Image */}
          <img
            src="https://picsum.photos/1920/900"
            alt="hero image"
            className="z-10 relative drop-shadow-2xl w-full max-h-[600px] object-cover"
          />
        </div>
      </div>

      {/* Logo Cloud (Anchored to the bottom) */}
      <div className="z-10 flex flex-wrap justify-center sm:justify-between items-center gap-8 md:gap-12 mt-8 pt-8 w-full">
        {[
          { name: 'Tiền Phong', src: '/brands/tien-phong.png' },
          { name: 'Trần Phú', src: '/brands/tran-phu.png' },
          { name: 'Cadi-sun', src: '/brands/cadi-sun.png' },
          { name: 'Rạng Đông', src: '/brands/rang-dong.png' },
          { name: 'Senko', src: '/brands/senko.png' },
          { name: 'Vinawind', src: '/brands/vinawind.png' },
        ].map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.name}
            className="hover:opacity-100 h-6 xl:h-12 object-contain transition-all duration-300"
          />
        ))}
      </div>
    </section>
  );
}
