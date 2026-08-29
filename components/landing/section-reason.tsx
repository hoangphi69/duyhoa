'use client';

const reasons = [
  {
    title: 'Hàng chính hãng, rõ nguồn gốc',
    desc: 'Uỷ quyền cấp 1 trực tiếp từ hãng. Đầy đủ CO/CQ, hoá đơn VAT cho mọi đơn hàng.',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Có người phục vụ tận nơi',
    desc: 'Đội sale thị trường ghé tận cửa hàng theo tuyến định kỳ. Đội telesales chốt đơn trong ngày. Đại lý không phải tự đi tìm hàng — Duy Hoà đến tìm đại lý.',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Một đầu mối cho 4 ngành hàng',
    desc: 'Một đơn hàng, một chuyến xe, một công nợ. Đơn giản hóa tối đa quy trình nhập hàng của bạn.',
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Chính sách công nợ linh hoạt',
    desc: 'Hạn mức công nợ được thiết lập theo lịch sử hợp tác và đánh giá xét lại định kỳ.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Hỗ trợ trưng bày & biển hiệu',
    desc: 'Duy Hoà hỗ trợ đại lý làm biển hiệu, kệ trưng bày, vật phẩm quảng cáo trực tiếp tại điểm bán.',
    image:
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Chương trình thưởng & tri ân',
    desc: 'Chiết khấu theo sản lượng, chương trình thưởng theo quý, hội nghị và du lịch đại lý thường niên.',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&auto=format&fit=crop',
  },
];

export default function ReasonsSection() {
  return (
    <section className="py-16 md:py-24 container">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center gap-4 mb-12 md:mb-16 text-center">
        <div className="bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
          why choose us
        </div>
        <h2 className="max-w-2xl font-heading text-foreground text-3xl sm:text-4xl leading-[1.1] tracking-tight">
          Vì sao chọn Duy Hoà?
        </h2>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          Chúng tôi không chỉ bán hàng, chúng tôi xây dựng sự thịnh vượng cùng
          đối tác.
        </p>
      </div>

      {/* 3-Column Image Grid */}
      <div className="gap-3 md:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="group relative aspect-4/3 overflow-hidden transition-transform hover:-translate-y-1"
          >
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
            />

            {/* Default dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />

            {/* Grain texture overlay */}
            <svg className="absolute size-0" aria-hidden="true">
              <filter id={`reason-grain-${idx}`}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </svg>
            <div
              className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
              style={{ filter: `url(#reason-grain-${idx})` }}
            />

            {/* Top-left Title */}
            <div className="top-0 left-0 z-10 absolute flex gap-4 p-5 md:p-6">
              <span className="block mt-1 font-mono text-white/50 text-xs tracking-widest">
                0{idx + 1}
              </span>
              <h3 className="max-w-50 font-heading text-white text-lg md:text-xl leading-snug tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* Bottom Description — revealed on hover */}
            <div className="bottom-0 left-0 z-10 absolute opacity-0 group-hover:opacity-100 p-5 md:p-6 w-full transition-all translate-y-full group-hover:translate-y-0 duration-300 ease-out">
              <div className="bg-primary/90 mb-3 w-8 h-px" />
              <p className="text-white/90 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Bottom gradient — stronger on hover to make text readable */}
            <div className="bottom-0 absolute inset-x-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 h-2/3 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
