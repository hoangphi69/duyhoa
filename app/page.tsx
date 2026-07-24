'use client';

import Footer from '@/components/footer';
import ContactSection from '@/components/section-contact';
import ProductsSection from '@/components/section-products';
import MapSection from '@/components/section-map';
import PartnersSection from '@/components/section-partners';
import ReasonsSection from '@/components/section-reason';
import { Button } from '@/components/ui/button';
import { ChevronRight, Phone } from 'lucide-react';

export default function LandingPage() {
  return (
    <>
      <div className="*:mx-auto *:sm:px-6 *:lg:px-8 *:px-4 *:container">
        <section className="relative flex flex-col justify-between py-10 md:py-20 min-h-[80vh]">
          <div className="z-10 relative content-center grow">
            <h1 className="font-heading text-foreground text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.3] tracking-tight">
              Tổng kho phân phối chính hãng miền Bắc
            </h1>

            <div className="flex xl:flex-row flex-col gap-6 md:gap-8 pt-8">
              <div className="flex sm:flex-row flex-col gap-4 pt-2">
                <Button
                  size="lg"
                  className="gap-2 px-8 w-full sm:w-auto h-12 text-sm"
                >
                  <Phone className="w-5 h-5" />
                  Liên hệ nhập hàng ngay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8 w-full sm:w-auto h-12 text-sm"
                >
                  Tìm hiểu các dự án
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="max-w-xl text-muted-foreground text-lg sm:text-xl leading-relaxed">
                Gần 15 năm phân phối chính hãng, hơn 1.200 đại lý tin tưởng. Một
                cuộc gọi — đủ cả Điện, Nước, Thiết bị vệ sinh, Dụng cụ cầm tay,
                giao tận cửa hàng.
              </p>
            </div>
          </div>

          <div className="z-10 relative flex flex-col lg:justify-between items-start lg:items-end self-end gap-8 lg:gap-0 mt-8 lg:mt-0">
            <div className="gap-px grid grid-cols-2 lg:grid-cols-4 bg-border border border-border w-full">
              <div className="flex flex-col gap-1 bg-card p-6">
                <span className="font-mono font-medium text-primary text-3xl">
                  15 <span className="text-2xl">năm</span>
                </span>
                <span className="font-medium text-muted-foreground text-xs sm:text-sm leading-tight">
                  Kinh nghiệm thị trường
                </span>
              </div>

              <div className="flex flex-col gap-1 bg-card p-6">
                <span className="font-mono font-medium text-primary text-3xl">
                  1.200+
                </span>
                <span className="font-medium text-muted-foreground text-xs sm:text-sm leading-tight">
                  Đại lý đang đồng hành
                </span>
              </div>

              <div className="flex flex-col gap-1 bg-card p-6">
                <span className="font-mono font-medium text-primary text-3xl">
                  2.000 <span className="text-2xl">m²</span>
                </span>
                <span className="font-medium text-muted-foreground text-xs sm:text-sm leading-tight">
                  Tổng kho, luôn sẵn hàng
                </span>
              </div>

              <div className="flex flex-col gap-1 bg-card p-6">
                <span className="font-mono font-medium text-primary text-3xl">
                  50
                </span>
                <span className="font-medium text-muted-foreground text-xs sm:text-sm leading-tight">
                  Nhân sự & đội xe giao hàng
                </span>
              </div>
            </div>
          </div>
        </section>

        <ProductsSection />

        <MapSection />

        <ReasonsSection />

        <PartnersSection />

        <ContactSection />
      </div>

      <Footer />
    </>
  );
}
