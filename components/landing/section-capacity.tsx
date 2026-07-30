import { Layers, Clock, Factory, CalendarClock } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const commitments = [
  {
    title: 'Ðủ quy cách, không thiếu cỡ',
    desc: 'Duy Hoà giữ tồn thường trực toàn bộ quy cách thông dụng theo catalogue của hãng. Ðại lý không phải nhận đơn rồi đi tìm cỡ thiếu ở nơi khác.',
    icon: Layers,
  },
  {
    title: 'Có hàng trong ngày',
    desc: 'Ðơn đặt trước 10h sáng — giao trong ngày tại Quảng Ninh. Các mã đặc chủng ngoài danh mục thường trực: xác nhận thời gian có hàng trong vòng 2 giờ.',
    icon: Clock,
  },
  {
    title: 'Nhập trực tiếp từ nhà máy',
    desc: 'Là NPP cấp 1, Duy Hoà đặt hàng thẳng nhà máy theo kế hoạch tháng. Không phụ thuộc tồn kho của bên trung gian, không đứt hàng vào mùa cao điểm.',
    icon: Factory,
  },
  {
    title: 'Cấp hàng theo tiến độ công trình',
    desc: 'Nhận đặt hàng theo giai đoạn thi công, giữ hàng cho công trình, giao đúng lịch.',
    icon: CalendarClock,
  },
];

export default function SupplyCapacitySection() {
  return (
    <section className="py-10 md:py-20 container">
      <div className="items-start gap-8 lg:gap-12 grid lg:grid-cols-3">
        {/* Left Column: Sticky Title & Subtitle */}
        <div className="lg:top-24 flex flex-col justify-between self-stretch gap-4 lg:col-span-1">
          <div className="flex flex-col gap-4">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              supply capacity
            </div>
            <h2 className="lg:max-w-[15ch] font-heading text-foreground text-3xl sm:text-4xl leading-[1.3] grow">
              Gọi là có hàng
            </h2>
          </div>
          <p className="max-w-[35ch] text-muted-foreground text-lg">
            Câu hỏi của đại lý không phải “kho anh có bao nhiêu hàng”, mà “gọi
            anh thì bao lâu có hàng”.
          </p>
        </div>

        {/* Right Column: Gapless Grid */}
        <div className="flex flex-col lg:col-span-2">
          <div className="grid sm:grid-cols-2 overflow-hidden">
            {commitments.map((item, idx) => (
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
                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <CardHeader className="flex flex-col justify-end px-6 lg:px-8 pt-20 pb-8 grow">
                  <CardTitle className="mb-4 text-2xl">
                    <span>{item.title}</span>
                  </CardTitle>

                  <CardDescription className="flex flex-col text-base">
                    <span className="leading-relaxed">{item.desc}</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="px-4 lg:px-8 py-4 border-y">
            <div className="content-center grid grid-cols-3 font-mono text-muted-foreground tracking-widest">
              <span className="text-xs uppercase">tốc độ</span>
              <span className="text-xs uppercase">ổn định</span>
              <span className="text-xs text-right uppercase">tiến độ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
