import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bath, Droplets, Wrench, Zap } from 'lucide-react';
import { Marquee } from './marquee';

const categories = [
  {
    title: 'Thiết bị Điện',
    desc: 'Dây cáp, thiết bị điện, chiếu sáng chính hãng cho mọi công trình.',
    icon: Zap,
    brands: [
      '/brands/tran-phu.png',
      '/brands/sino-vanlock-electric.png',
      '/brands/rang-dong.png',
      '/brands/panasonic.png',
      '/brands/taesung.png',
      '/brands/cadi-sun.png',
      '/brands/tachicable.png',
      '/brands/dobo.png',
      '/brands/viet-han.png',
      '/brands/nanoco.png',
    ],
  },
  {
    title: 'Vật tư Nước',
    desc: 'Ống nhựa, phụ kiện cấp thoát nước bền chắc, đầy đủ kích cỡ.',
    icon: Droplets,
    brands: [
      '/brands/tien-phong.png',
      '/brands/dismy.png',
      '/brands/levia.png',
      '/brands/hathaco.png',
      '/brands/taijaan.png',
      '/brands/sino-plastic.png',
    ],
  },
  {
    title: 'Thiết bị Vệ sinh',
    desc: 'Bồn cầu, thiết bị vệ sinh cao cấp, chính hãng — bảo hành rõ ràng.',
    icon: Bath,
    brands: [
      '/brands/kangaroo.png',
      '/brands/inax.png',
      '/brands/goodman.png',
      '/brands/arc-jk.png',
      '/brands/treslaz.png',
    ],
  },
  {
    title: 'Dụng cụ Cầm tay',
    desc: 'Máy khoan, cắt, đồ nghề',
    icon: Wrench,
    brands: [
      '/brands/jasic.png',
      '/brands/senko.png',
      '/brands/dck.png',
      '/brands/vinawind.png',
      '/brands/hukan.png',
    ],
  },
];

export default function ProductsSection() {
  return (
    <section className="py-10 md:py-20">
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <div className="self-start bg-foreground p-1 px-2 font-mono text-primary uppercase tracking-widest">
            product lines
          </div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl">
            Hệ Sinh Thái Sản Phẩm Đa Dạng
          </h2>
        </div>
        <p className="max-w-[33ch] text-muted-foreground text-lg">
          Cung cấp toàn diện vật tư cho mọi công trình, từ dân dụng đến công
          nghiệp.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="lg:gap-6 grid sm:grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {categories.map((cat, idx) => (
            <Card
              key={idx}
              className="group relative flex flex-col gap-0 bg-muted/20 pt-0 h-full overflow-hidden transition-all duration-300"
            >
              <div className="z-20 absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />
              {/* 2. Top-Left Number Box (Wide) */}
              <div className="flex justify-between items-center bg-background border-b w-full h-16">
                <div className="content-center px-6 sm:px-8 border-r h-full grow">
                  <span className="font-mono text-primary text-sm tracking-widest">
                    0{idx + 1}
                  </span>
                </div>
                <div className="content-center px-6 sm:px-8 h-full">
                  <cat.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              <div className="flex flex-col bg-muted/10 border-b">
                {/* Row 1: Moves Left */}
                <Marquee
                  className="border-border border-b"
                  fastDuration={20}
                  slowDuration={45}
                >
                  <div className="flex items-center">
                    {cat.brands.map((brandSrc, i) => (
                      <div
                        key={`r1-${i}`}
                        className="group relative flex justify-center items-center bg-muted/20 hover:bg-background p-4 border-border border-r min-w-50 sm:min-w-60 h-24 sm:h-32 transition-colors duration-300 cursor-pointer"
                      >
                        <img
                          src={brandSrc}
                          alt="Brand Logo"
                          className="opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 w-auto h-10 sm:h-12 object-contain transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </Marquee>

                {/* Row 2: Moves Right */}
                <Marquee direction="right" fastDuration={20} slowDuration={45}>
                  <div className="flex items-center">
                    {cat.brands.map((brandSrc, i) => (
                      <div
                        key={`r2-${i}`}
                        className="group relative flex justify-center items-center bg-muted/20 hover:bg-background p-4 border-border border-r min-w-50 sm:min-w-60 h-24 sm:h-32 transition-colors duration-300 cursor-pointer"
                      >
                        <img
                          src={brandSrc}
                          alt="Brand Logo"
                          className="opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 w-auto h-10 sm:h-12 object-contain transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>

              <CardHeader className="p-6 lg:p-8 grow">
                <CardTitle className="text-2xl">
                  <span>{cat.title}</span>
                </CardTitle>

                <CardDescription>
                  <span className="text-sm">{cat.desc}</span>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="px-4 lg:px-8 py-4 border-y">
          <div className="content-center grid grid-cols-3 font-mono text-muted-foreground tracking-widest">
            <span className="text-xs uppercase">duyhoa</span>
            <span className="text-xs uppercase">sản phẩm</span>
            <span className="text-xs text-right uppercase">thương hiệu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
