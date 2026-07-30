import { Marquee } from '@/components/marquee'; // Assuming you saved the new component here

export default function BrandsSection() {
  // Using the image paths from your Ecosystem section
  const row1 = [
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
    '/brands/tien-phong.png',
  ];

  const row2 = [
    '/brands/dismy.png',
    '/brands/levia.png',
    '/brands/hathaco.png',
    '/brands/taijaan.png',
    '/brands/sino-plastic.png',
    '/brands/kangaroo.png',
    '/brands/inax.png',
    '/brands/goodman.png',
    '/brands/arc-jk.png',
    '/brands/treslaz.png',
    '/brands/jasic.png',
    '/brands/senko.png',
    '/brands/dck.png',
    '/brands/vinawind.png',
    '/brands/hukan.png',
  ];

  return (
    <section className="py-10 md:py-20 container">
      {/* Centered Header Area */}
      <div className="flex xl:flex-row flex-col justify-between gap-4 xl:gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <div className="self-start bg-foreground p-1 px-2 font-mono text-primary uppercase tracking-widest">
            partners
          </div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl">
            Đối tác chiến lược
          </h2>
        </div>
        <p className="max-w-[33ch] text-muted-foreground text-lg">
          Hợp tác chặt chẽ cùng các thương hiệu hàng đầu, mang đến sản phẩm chất
          lượng chuẩn quốc tế cho mọi công trình.
        </p>
      </div>

      {/* Full Width Marquee Grid */}
      <div className="flex flex-col bg-muted/10 border-y">
        {/* Row 1: Moves Left */}
        <Marquee
          className="border-border border-b"
          fastDuration={20}
          slowDuration={45}
        >
          <div className="flex items-center">
            {row1.map((brandSrc, i) => (
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
            {row2.map((brandSrc, i) => (
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
    </section>
  );
}
