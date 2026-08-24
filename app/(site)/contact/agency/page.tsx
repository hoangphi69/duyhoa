import { Breadcrumbs } from '@/components/breadcrumb';
import { siteConfig } from '@/config/site';
import { createMetadata, formatPhoneNumber } from '@/lib/utils';
import { BadgePercent, Megaphone, ShieldCheck, Truck } from 'lucide-react';
import AgencyForm from './form';

const AGENCY_PRIVILEGES = [
  {
    icon: BadgePercent,
    title: 'Chiết khấu hấp dẫn',
    desc: 'Đảm bảo biên độ lợi nhuận tốt, thưởng doanh số rõ ràng.',
  },
  {
    icon: Megaphone,
    title: 'Hỗ trợ Marketing',
    desc: 'Tài trợ biển bảng, giá kệ trưng bày, catalogue tại khu vực.',
  },
  {
    icon: ShieldCheck,
    title: 'Bảo vệ điểm bán',
    desc: 'Chính sách độc quyền hoặc bảo vệ khu vực bán hàng nghiêm ngặt.',
  },
  {
    icon: Truck,
    title: 'Hàng hóa ổn định',
    desc: 'Kho bãi quy mô lớn, xe tải giao hàng tận nơi nhanh chóng trong 24h.',
  },
];

export const metadata = createMetadata({
  title: 'Đăng ký làm đại lý',
  description:
    'Đăng ký hợp tác làm đại lý thiết bị điện – nước – vệ sinh tại Quảng Ninh, Hải Phòng, Hải Dương: giá tận gốc từ nhà phân phối cấp 1, giao hàng theo tuyến cố định.',
  path: '/contact/agency',
  keywords: [
    'đăng ký đại lý thiết bị điện',
    'tìm nhà phân phối vật liệu điện nước',
    'mở cửa hàng điện nước',
    'lấy hàng tận gốc nhà phân phối cấp 1',
    'chính sách đại lý Duy Hoà 68',
  ],
  // image: '/og/og-agency.png',
});

export default function AgencyContactPage() {
  return (
    <div className="bg-background pb-20 min-h-screen overflow-x-hidden">
      <Breadcrumbs
        items={[{ name: 'Đăng ký đại lý', href: '/contact/agency' }]}
      />

      {/* Page Header */}
      <section className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center self-start gap-2 bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              contact
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-tight tracking-tight">
              Đăng ký Đại lý
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Hợp tác phân phối cùng Duy Hoà 68 để nhận chính sách chiết khấu
              tốt nhất, hỗ trợ marketing toàn diện và nguồn hàng ổn định.
            </p>
          </div>
        </div>
      </section>

      {/* Page Content Layout */}
      <main className="mx-auto mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 pb-10 lg:pb-24 container">
        {/* Form & Aside Grid (Sử dụng hệ thống 12 cột chuẩn của Tailwind) */}
        <div className="items-start gap-8 lg:gap-10 grid grid-cols-1 lg:grid-cols-12">
          {/* Main Form (Chiếm 8 cột) */}
          <AgencyForm />

          {/* Aside Information (Chiếm 4 cột) */}
          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="bg-card p-6 border border-border">
              <div className="mb-6 font-mono text-muted-foreground text-xs uppercase tracking-wider">
                Đặc quyền đại lý
              </div>

              {AGENCY_PRIVILEGES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 mb-6 last:mb-0">
                    <div className="pt-1 text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block mb-1 font-heading text-foreground text-sm">
                        {item.title}
                      </b>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-card p-6 border border-border">
              <div className="mb-4 font-mono text-muted-foreground text-xs uppercase tracking-wider">
                Liên hệ trực tiếp
              </div>
              <div className="flex justify-between py-3 border-muted-foreground border-b border-dashed text-sm">
                <span className="text-muted-foreground">Hotline</span>
                <span className="font-mono font-medium text-foreground">
                  {formatPhoneNumber(siteConfig.contact.hotline)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-muted-foreground border-b border-dashed text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-mono font-medium text-foreground">
                  {siteConfig.contact.email}
                </span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted-foreground">Giờ làm việc</span>
                <span className="font-mono font-medium text-foreground">
                  {siteConfig.contact.workingHours}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
