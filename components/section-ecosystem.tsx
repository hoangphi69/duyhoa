import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bath, Droplets, Wrench, Zap } from 'lucide-react';
import { useState } from 'react';
import { Marquee } from './marquee';

const categories = [
  {
    title: 'Thiết bị Điện',
    desc: 'Dây cáp, thiết bị điện, chiếu sáng chính hãng cho mọi công trình.',
    icon: Zap,
    brands: [
      '/cadisun.png',
      '/tran-phu.png',
      '/panasonic.png',
      '/sino.png',
      '/rang-dong.png',
    ],
  },
  {
    title: 'Vật tư Nước',
    desc: 'Ống nhựa, phụ kiện cấp thoát nước bền chắc, đầy đủ kích cỡ.',
    icon: Droplets,
    brands: [
      '/tien-phong.png',
      '/dekko.png',
      '/binh-minh.png',
      '/hanil.png',
      '/wilo.png',
    ],
  },
  {
    title: 'Thiết bị Vệ sinh',
    desc: 'Bồn cầu, thiết bị vệ sinh cao cấp, chính hãng — bảo hành rõ ràng.',
    icon: Bath,
    brands: [
      '/inax.png',
      '/toto.png',
      '/viglacera.png',
      '/ariston.png',
      '/ferroli.png',
    ],
  },
  {
    title: 'Dụng cụ Cầm tay',
    desc: 'Máy khoan, cắt, đồ nghề',
    icon: Wrench,
    brands: [
      '/makita.png',
      '/bosch.png',
      '/dewalt.png',
      '/stanley.png',
      '/total.png',
    ],
  },
];

export default function EcosystemSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-20">
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8 mb-12">
        <h2 className="font-heading text-foreground text-3xl sm:text-4xl">
          Hệ Sinh Thái Sản Phẩm Đa Dạng
        </h2>
        <p className="max-w-[30ch] text-muted-foreground text-lg">
          Cung cấp toàn diện vật tư cho mọi công trình, từ dân dụng đến công
          nghiệp.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="lg:gap-6 grid sm:grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {categories.map((cat, idx) => (
            <Card
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative flex flex-col bg-muted/20 h-full overflow-hidden transition-all duration-300"
            >
              <div className="z-20 absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />
              <Marquee
                className={`pt-6 transition-all duration-700 ${
                  hoveredIdx === idx
                    ? 'grayscale-0 opacity-100'
                    : 'grayscale opacity-60'
                }`}
                fastDuration={12}
                slowDuration={30}
              >
                {/* The Gap MUST be defined here inside the wrapper so the duplication spacing is perfect */}
                <div className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  {cat.brands.map((src, i) => (
                    <img
                      key={`brand-${i}`}
                      src={src}
                      alt="[brand logo]"
                      className="h-16 object-contain"
                    />
                  ))}
                </div>
              </Marquee>
              <Marquee
                className={`pb-6 border-b transition-all duration-700 ${
                  hoveredIdx === idx
                    ? 'grayscale-0 opacity-100'
                    : 'grayscale opacity-60'
                }`}
                direction="right"
                fastDuration={12}
                slowDuration={30}
              >
                {/* The Gap MUST be defined here inside the wrapper so the duplication spacing is perfect */}
                <div className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  {cat.brands.map((src, i) => (
                    <img
                      key={`brand-${i}`}
                      src={src}
                      alt="[brand logo]"
                      className="h-16 object-contain"
                    />
                  ))}
                </div>
              </Marquee>

              <CardHeader className="grow">
                <CardTitle className="text-lg">
                  <span>{cat.title}</span>
                </CardTitle>

                <CardDescription className="flex justify-between">
                  <span>{cat.desc}</span>

                  <span className="font-mono text-primary text-sm">
                    0{idx + 1}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="px-4 lg:px-8 py-4 border-y">
          <div className="content-center grid grid-cols-3 text-muted-foreground tracking-widest">
            <span className="text-xs uppercase">duyhoa</span>
            <span className="text-xs uppercase">brands</span>
            <span className="text-xs text-right uppercase">products</span>
          </div>
        </div>
      </div>
    </section>
  );
}
