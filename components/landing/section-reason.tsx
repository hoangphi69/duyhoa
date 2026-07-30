import { FileCheck2, MapPin, Layers, Wallet, Store, Gift } from 'lucide-react';

const reasons = [
  {
    title: 'Hàng chính hãng, rõ nguồn gốc',
    desc: 'Uỷ quyền cấp 1 trực tiếp từ hãng. Ðầy đủ CO/CQ, hoá đơn VAT cho mọi đơn hàng.',
    icon: FileCheck2,
  },
  {
    title: 'Có người phục vụ tận nơi',
    desc: 'Ðội sale thị trường ghé tận cửa hàng theo tuyến định kỳ. Ðội telesales chốt đơn trong ngày. Ðại lý không phải tự đi tìm hàng — Duy Hoà đến tìm đại lý.',
    icon: MapPin,
  },
  {
    title: 'Một đầu mối cho 4 ngành hàng',
    desc: 'Một đơn hàng, một chuyến xe, một công nợ. Đơn giản hóa tối đa quy trình nhập hàng của bạn.',
    icon: Layers,
  },
  {
    title: 'Chính sách công nợ linh hoạt',
    desc: 'Hạn mức công nợ được thiết lập theo lịch sử hợp tác và đánh giá xét lại định kỳ.',
    icon: Wallet,
  },
  {
    title: 'Hỗ trợ trưng bày & biển hiệu',
    desc: 'Duy Hoà hỗ trợ đại lý làm biển hiệu, kệ trưng bày, vật phẩm quảng cáo trực tiếp tại điểm bán.',
    icon: Store,
  },
  {
    title: 'Chương trình thưởng & tri ân',
    desc: 'Chiết khấu theo sản lượng, chương trình thưởng theo quý, hội nghị và du lịch đại lý thường niên.',
    icon: Gift,
  },
];

export default function ReasonsSection() {
  return (
    <section className="py-10 md:py-20 max-w-[100vw] overflow-hidden container">
      {/* Outer Grid Wrapper to maintain the sharp borders */}
      <div className="flex lg:flex-row flex-col gap-px bg-border border border-border border-l-0 w-full">
        {/* LEFT COLUMN: Header & Context */}
        <div className="flex flex-col justify-between bg-card p-8 lg:p-12 pl-0 lg:pl-0 lg:w-[350px] xl:w-[450px] shrink-0">
          <div className="top-24 sticky flex flex-col gap-6">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              core values
            </div>
            <h2 className="font-heading text-foreground text-4xl sm:text-5xl leading-[1.1] tracking-tight">
              Vì sao chọn <br />
              Duy Hoà?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Chúng tôi không chỉ bán hàng, chúng tôi xây dựng sự thịnh vượng
              cùng đối tác.
            </p>
          </div>

          {/* Decorative block for the bottom of the left column (visible on large screens) */}
          <div className="hidden lg:block mt-24">
            <svg
              className="w-16 h-16 text-muted-foreground/20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="35"
                height="35"
                stroke="currentColor"
                strokeWidth="4"
              />
              <rect x="55" y="10" width="35" height="35" fill="currentColor" />
              <rect x="10" y="55" width="35" height="35" fill="currentColor" />
              <rect
                x="55"
                y="55"
                width="35"
                height="35"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: 6 Reasons Grid */}
        <div className="flex-grow gap-px grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 bg-border">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col bg-background hover:bg-card/80 p-8 min-h-[280px] transition-colors duration-300"
            >
              {/* Top: Number & Icon */}
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-muted-foreground/40 group-hover:text-primary text-4xl transition-colors duration-300">
                  0{idx + 1}
                </span>
                <div className="bg-muted/30 p-3 border border-border group-hover:border-primary/50 transition-colors duration-300">
                  <item.icon className="stroke-[1.5] w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>

              {/* Bottom: Title & Desc */}
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="font-heading text-xl md:text-2xl leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
