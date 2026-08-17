import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ProjectForm from './form';
import { siteConfig } from '@/config/site';
import { formatPhoneNumber } from '@/lib/utils';

const PROJECT_PROCESS_STEPS = [
  {
    stepNumber: '01',
    title: 'Tiếp nhận yêu cầu',
    desc: 'Đội ngũ kỹ thuật liên hệ xác nhận trong 24h.',
  },
  {
    stepNumber: '02',
    title: 'Khảo sát & báo giá',
    desc: 'Đọc khối lượng BOQ, đề xuất giải pháp vật tư thay thế và báo giá chi tiết.',
  },
  {
    stepNumber: '03',
    title: 'Ký hợp đồng',
    desc: 'Thống nhất tiến độ giao hàng theo từng giai đoạn thực tế của công trình.',
  },
  {
    stepNumber: '04',
    title: 'Giao hàng & hỗ trợ',
    desc: 'Đồng hành cung cấp hồ sơ, chứng chỉ chất lượng cho đến khi nghiệm thu.',
  },
];

export default function ProjectContactPage() {
  return (
    <div className="bg-background pb-20 min-h-screen overflow-x-hidden">
      {/* Breadcrumb Header */}
      <header className="bg-muted/10 py-6 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-foreground">Báo giá Dự án</span>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center self-start gap-2 bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              contact
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-tight tracking-tight">
              Báo giá Dự án
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Giải pháp & cung ứng vật tư cơ điện, thiết bị vệ sinh chuyên
              nghiệp, đảm bảo khắt khe về chất lượng và tiến độ cho các công
              trình trọng điểm.
            </p>
          </div>
        </div>
      </section>

      {/* Page Content Layout */}
      <main className="mx-auto mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 pb-10 lg:pb-24 container">
        {/* Form & Aside Grid - Reversed order on Desktop using standard col-span */}
        <div className="items-start gap-8 lg:gap-10 grid grid-cols-1 lg:grid-cols-12">
          {/* Main Form (Chiếm 8 cột, đổi sang đứng thứ 2 trên Desktop) */}
          <ProjectForm />

          {/* Aside Information (Chiếm 4 cột, đổi sang đứng thứ 1 trên Desktop) */}
          <aside className="flex flex-col gap-6 lg:order-1 lg:col-span-4">
            <div className="bg-card p-6 border border-border">
              <div className="mb-6 font-mono text-muted-foreground text-xs uppercase tracking-wider">
                Quy trình làm việc
              </div>

              {PROJECT_PROCESS_STEPS.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-6 last:mb-0">
                  <div className="pt-0.5 font-mono text-primary text-sm shrink-0">
                    {item.stepNumber}
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
              ))}
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
