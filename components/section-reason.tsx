import { ShieldCheck, Truck, Percent, Package } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const reasons = [
  {
    title: '100% Hàng Chính Hãng',
    desc: 'Cam kết chất lượng tuyệt đối. Mọi sản phẩm xuất kho đều có đầy đủ hoá đơn, chứng từ, bảo hành chính hãng từ nhà sản xuất.',
    icon: ShieldCheck,
  },
  {
    title: 'Giá & Chiết khấu Tốt nhất',
    desc: 'Là nhà phân phối cấp 1 của nhiều thương hiệu lớn, chúng tôi mang đến bảng giá cạnh tranh và tỷ lệ chiết khấu hấp dẫn nhất khu vực.',
    icon: Percent,
  },
  {
    title: 'Kho hàng 2.000m² — Luôn Đủ Hàng',
    desc: 'Không lo đứt gãy nguồn cung. Năng lực lưu trữ lớn giúp chúng tôi đáp ứng ngay lập tức các đơn hàng quy mô từ nhỏ đến lớn.',
    icon: Package,
  },
  {
    title: 'Giao Hàng Thần Tốc',
    desc: 'Đội xe tải hùng hậu 50+ chiếc sẵn sàng xuất phát. Cam kết thời gian giao hàng chuẩn xác, hỗ trợ bốc xếp tận nơi.',
    icon: Truck,
  },
];

export default function ReasonsSection() {
  return (
    <section className="py-10 md:py-20 container">
      <div className="items-start gap-8 lg:gap-12 grid lg:grid-cols-3">
        {/* Left Column: Sticky Title & Subtitle */}
        <div className="lg:top-24 flex flex-col justify-between self-stretch gap-4 lg:col-span-1">
          <div className="flex flex-col gap-4">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary uppercase tracking-widest">
              privileges
            </div>
            <h2 className="lg:max-w-[15ch] font-heading text-foreground text-3xl sm:text-4xl leading-[1.3] grow">
              Lý do đại lý chọn Duy Hoà
            </h2>
          </div>
          <p className="max-w-[35ch] text-muted-foreground text-lg">
            Chúng tôi không chỉ bán hàng, chúng tôi xây dựng sự thịnh vượng cùng
            đối tác.
          </p>
        </div>

        {/* Right Column: Gapless Grid */}
        <div className="flex flex-col lg:col-span-2">
          <div className="lg:gap-6 grid sm:grid-cols-2 overflow-hidden">
            {reasons.map((reason, idx) => (
              <Card
                key={idx}
                className="group relative flex flex-col bg-muted/20 border-0 h-full"
              >
                {/* 1. Subtle Primary Glow Overlay (Triggers on hover) */}
                <div className="z-20 absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

                {/* 2. Top-Left Number Box (Wide) */}
                <div className="top-0 left-0 absolute flex justify-between items-center bg-background border-b w-full h-16">
                  <div className="content-center px-6 sm:px-8 border-r h-full grow">
                    <span className="font-mono text-primary text-sm tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="content-center px-6 sm:px-8 h-full">
                    <reason.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <CardHeader className="flex flex-col justify-end px-6 lg:px-8 pt-20 pb-8 grow">
                  <CardTitle className="mb-4 text-2xl">
                    <span>{reason.title}</span>
                  </CardTitle>

                  <CardDescription className="flex flex-col text-base">
                    <span className="leading-relaxed">{reason.desc}</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="px-4 lg:px-8 py-4 border-y">
            <div className="content-center grid grid-cols-3 font-mono text-muted-foreground tracking-widest">
              <span className="text-xs uppercase">cam kết</span>
              <span className="text-xs uppercase">uy tín</span>
              <span className="text-xs text-right uppercase">chất lượng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
