'use client';

import Link from 'next/link';
import { MapPin, Building2, ChevronRight, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- Data extracted from DuyHoa_Projects_Data.xlsx ---
const PROJECTS_DATA = [
  {
    id: 1,
    name: 'Green Diamond Hạ Long',
    location: 'TP. Hạ Long, Quảng Ninh',
    type: 'Tổ hợp Căn hộ cao cấp & Tòa nhà Văn phòng',
    supply:
      'Phân phối đồng bộ thiết bị vệ sinh INAX cao cấp cho khối căn hộ; cung cấp toàn bộ hệ thống cáp điện lực hạ thế trung tâm, dây điện dân dụng cho từng tầng và giải pháp đèn LED chiếu sáng mặt đứng (Facade Lighting).',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],
  },
  {
    id: 2,
    name: 'The Dragon Castle Hạ Long',
    location: 'TP. Hạ Long, Quảng Ninh',
    type: 'Tổ hợp Căn hộ chung cư phong cách Hàn Quốc',
    supply:
      'Cung cấp giải pháp dây điện an toàn, cáp điện trục đứng, hệ thống đèn chiếu sáng hành lang sinh hoạt chung và lắp đặt thiết bị vệ sinh INAX thẩm mỹ, hiện đại cho hàng ngàn căn hộ.',
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/400/300?random=5',
      'https://picsum.photos/400/300?random=6',
    ],
  },
  {
    id: 3,
    name: 'Icon40 Hạ Long',
    location: 'TP. Hạ Long, Quảng Ninh',
    type: 'Tòa tháp Thương mại & Căn hộ cao cấp (40 tầng)',
    supply:
      'Tư vấn và cung cấp cáp điện nguồn công suất lớn, dây điện âm tường chống cháy lan; hệ thống chiếu sáng LED âm trần thông minh và trọn bộ thiết bị vệ sinh INAX tiết kiệm nước cho khối dịch vụ.',
    images: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/400/300?random=8',
      'https://picsum.photos/400/300?random=9',
    ],
  },
  {
    id: 4,
    name: 'The Holiday Ha Long',
    location: 'TP. Hạ Long, Quảng Ninh',
    type: 'Tổ hợp Khách sạn & Căn hộ Du lịch 5 sao',
    supply:
      'Trang bị dòng thiết bị vệ sinh INAX chuẩn resort; cung ứng cáp tín hiệu, cáp điện lực chống cháy cho PCCC và thiết bị chiếu sáng LED nhiệt độ màu chuẩn 3000K-4000K tạo không gian sang trọng.',
    images: [
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/400/300?random=11',
      'https://picsum.photos/400/300?random=12',
    ],
  },
  {
    id: 5,
    name: 'Crystal Holidays Harbour Vân Đồn',
    location: 'Vân Đồn, Quảng Ninh',
    type: 'Tổ hợp Khách sạn, Resort & Căn hộ du lịch thương mại',
    supply:
      'Cung cấp dây cáp điện chịu môi trường biển, đèn chiếu sáng cảnh quan ngoài trời IP66/IP67 và hệ thống thiết bị vệ sinh INAX kháng khuẩn, chống bám bẩn cho khu vực phòng nghỉ dưỡng.',
    images: [
      'https://picsum.photos/800/600?random=13',
      'https://picsum.photos/400/300?random=14',
      'https://picsum.photos/400/300?random=15',
    ],
  },
  {
    id: 6,
    name: 'The Ruby Hạ Long',
    location: 'TP. Hạ Long, Quảng Ninh',
    type: 'Chung cư cao tầng & Thương mại Dịch vụ',
    supply:
      'Phân phối thiết bị vệ sinh INAX đồng bộ cho cư dân; hệ thống cáp ngầm, dây cáp điện trục đứng (Riser Cable) và thiết bị chiếu sáng an toàn khu vực tầng hầm, kỹ thuật.',
    images: [
      'https://picsum.photos/800/600?random=16',
      'https://picsum.photos/400/300?random=17',
      'https://picsum.photos/400/300?random=18',
    ],
  },
  {
    id: 7,
    name: 'Trường Quốc tế Singapore - SIS',
    location: 'TP. Hạ Long, Quảng Ninh',
    type: 'Hạ tầng Giáo dục & Trường học Liên cấp Quốc tế',
    supply:
      'Cung cấp thiết bị vệ sinh INAX tiêu chuẩn giáo dục (an toàn, dễ vệ sinh); hệ thống dây điện không chì (RoHS) và đèn LED chiếu sáng học đường chống lóa, bảo vệ thị lực.',
    images: [
      'https://picsum.photos/800/600?random=19',
      'https://picsum.photos/400/300?random=20',
      'https://picsum.photos/400/300?random=21',
    ],
  },
  {
    id: 8,
    name: 'Khu đô thị Promexco Móng Cái',
    location: 'TP. Móng Cái, Quảng Ninh',
    type: 'Khu đô thị Thương mại & Shophouse Biên giới',
    supply:
      'Cấp cáp điện ngầm cho hạ tầng đô thị, dây điện sinh hoạt cho các khu shophouse; thiết bị chiếu sáng đường phố (Street LED) và các gói thiết bị vệ sinh INAX cho nhà ở thương mại liền kề.',
    images: [
      'https://picsum.photos/800/600?random=22',
      'https://picsum.photos/400/300?random=23',
      'https://picsum.photos/400/300?random=24',
    ],
  },
  {
    id: 9,
    name: 'Hoàng Huy Grand Tower',
    location: 'Q. Hồng Bàng, Hải Phòng',
    type: 'Tòa nhà Văn phòng Hạng A & Chung cư (37 tầng)',
    supply:
      'Phân phối các mã thiết bị vệ sinh INAX tự động cho khối văn phòng; cung cấp hệ thống cáp điện lực chống cháy, dây điện tín hiệu và đèn LED panel văn phòng chuẩn độ rọi.',
    images: [
      'https://picsum.photos/800/600?random=25',
      'https://picsum.photos/400/300?random=26',
      'https://picsum.photos/400/300?random=27',
    ],
  },
  {
    id: 10,
    name: 'Hoàng Huy Commerce',
    location: 'Q. Lê Chân, Hải Phòng',
    type: 'Tổ hợp Trung tâm Thương mại & Căn hộ Cao cấp',
    supply:
      'Cung cấp hàng loạt thiết bị vệ sinh INAX sang trọng cho các căn hộ; vật tư cáp điện động lực cho hệ thống HVAC, dây điện điều khiển và thiết bị chiếu sáng trang trí khu vực đại sảnh TTTM.',
    images: [
      'https://picsum.photos/800/600?random=28',
      'https://picsum.photos/400/300?random=29',
      'https://picsum.photos/400/300?random=30',
    ],
  },
  {
    id: 11,
    name: 'The Minato Residence',
    location: 'Q. Lê Chân, Hải Phòng',
    type: 'Căn hộ cao cấp tiêu chuẩn Nhật Bản',
    supply:
      'Đáp ứng tiêu chuẩn Nhật Bản khắt khe với các bộ thiết bị vệ sinh INAX; cung ứng hệ thống dây cáp điện bền bỉ, tiết kiệm năng lượng và đèn LED âm trần tuổi thọ cao.',
    images: [
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/400/300?random=32',
      'https://picsum.photos/400/300?random=33',
    ],
  },
  {
    id: 12,
    name: 'Apec Aqua Park',
    location: 'TP. Bắc Giang',
    type: 'Tổ hợp Căn hộ Khách sạn & Văn phòng Cao cấp',
    supply:
      'Trang bị trọn gói thiết bị vệ sinh INAX cho phòng khách sạn; cấp cáp điện nguồn chịu tải cao, dây điện nội thất và giải pháp chiếu sáng LED trang trí mặt ngoài tòa nhà.',
    images: [
      'https://picsum.photos/800/600?random=34',
      'https://picsum.photos/400/300?random=35',
      'https://picsum.photos/400/300?random=36',
    ],
  },
  {
    id: 13,
    name: 'Saigontel Central Park',
    location: 'TP. Bắc Giang',
    type: 'Tòa nhà Văn phòng Dịch vụ & Căn hộ Đô thị',
    supply:
      'Phân phối cáp điện hạ thế, dây điện lõi đồng nguyên chất; thiết bị chiếu sáng mỏng phẳng cho không gian làm việc và thiết bị vệ sinh INAX bền bỉ cho khu vực công cộng.',
    images: [
      'https://picsum.photos/800/600?random=37',
      'https://picsum.photos/400/300?random=38',
      'https://picsum.photos/400/300?random=39',
    ],
  },
  {
    id: 14,
    name: 'Tòa nhà Viettel Yên Bái',
    location: 'TP. Yên Bái',
    type: 'Tòa nhà Văn phòng Điều hành & Hành chính Viễn thông',
    supply:
      'Cung cấp cáp điện lực chống nhiễu, dây điện an toàn cho phòng máy chủ (Server); hệ thống thiết bị chiếu sáng tiết kiệm điện và thiết bị vệ sinh INAX thông minh cho khối văn phòng điều hành.',
    images: [
      'https://picsum.photos/800/600?random=40',
      'https://picsum.photos/400/300?random=41',
      'https://picsum.photos/400/300?random=42',
    ],
  },
  {
    id: 15,
    name: 'Golden Field Nghĩa Lộ',
    location: 'Thị xã Nghĩa Lộ, Yên Bái',
    type: 'Khu đô thị & Trung tâm Thương mại Du lịch',
    supply:
      'Giải pháp cáp điện ngầm đô thị, dây cáp chiếu sáng công viên; phân phối sỉ thiết bị vệ sinh INAX cho các căn biệt thự, nhà phố và đèn LED cảnh quan ngoài trời.',
    images: [
      'https://picsum.photos/800/600?random=43',
      'https://picsum.photos/400/300?random=44',
      'https://picsum.photos/400/300?random=45',
    ],
  },
  {
    id: 16,
    name: 'Tòa nhà Sonadezi',
    location: 'KCN Biên Hòa, Đồng Nai',
    type: 'Tòa nhà Văn phòng Điều hành & Trung tâm Quản lý KCN',
    supply:
      'Cung cấp thiết bị vệ sinh INAX tiêu chuẩn công sở; hệ thống dây điện, cáp điện lực phân phối hạ thế và thiết bị chiếu sáng công nghiệp cường độ cao.',
    images: [
      'https://picsum.photos/800/600?random=46',
      'https://picsum.photos/400/300?random=47',
      'https://picsum.photos/400/300?random=48',
    ],
  },
  {
    id: 17,
    name: 'The Emerald Golf View',
    location: 'Thuận An, Bình Dương',
    type: 'Khu Căn hộ Chung cư Cao cấp',
    supply:
      'Trang bị dòng thiết bị vệ sinh INAX thẩm mỹ cao cho căn hộ; cung cấp cáp điện lực tổng, dây điện nhánh và đèn LED chiếu sáng ban công, hành lang.',
    images: [
      'https://picsum.photos/800/600?random=49',
      'https://picsum.photos/400/300?random=50',
      'https://picsum.photos/400/300?random=51',
    ],
  },
  {
    id: 18,
    name: 'Phức hợp Thương mại Astral City',
    location: 'Thuận An, Bình Dương',
    type: 'Đại đô thị Căn hộ & Trung tâm Thương mại (8 tòa tháp)',
    supply:
      'Phân phối khối lượng lớn cáp chống cháy, dây điện dân dụng; hệ thống chiếu sáng tiện ích cảnh quan và thiết bị vệ sinh INAX đồng bộ cho hàng ngàn căn hộ thương mại.',
    images: [
      'https://picsum.photos/800/600?random=52',
      'https://picsum.photos/400/300?random=53',
      'https://picsum.photos/400/300?random=54',
    ],
  },
  {
    id: 19,
    name: 'Vung Tau Centre Point',
    location: 'TP. Vũng Tàu',
    type: 'Khu Căn hộ Thương mại & Tòa nhà Dịch vụ',
    supply:
      'Cung cấp dây điện, cáp điện lực vỏ bọc kháng mặn cho vùng biển; thiết bị chiếu sáng chống ẩm IP65 và thiết bị vệ sinh INAX cao cấp phủ men Aqua Ceramic chống bám bẩn.',
    images: [
      'https://picsum.photos/800/600?random=55',
      'https://picsum.photos/400/300?random=56',
      'https://picsum.photos/400/300?random=57',
    ],
  },
  {
    id: 20,
    name: 'E.town 6',
    location: 'Quận 4, TP. Hồ Chí Minh',
    type: 'Tòa nhà Văn phòng Hạng A (Đạt chứng chỉ Xanh LEED)',
    supply:
      'Đáp ứng tiêu chuẩn xanh với thiết bị vệ sinh INAX công nghệ tiết kiệm nước sinh thái; cung cấp cáp điện lực suy hao thấp, dây điện thân thiện môi trường và đèn LED chỉ số hoàn màu cao (CRI > 90).',
    images: [
      'https://picsum.photos/800/600?random=58',
      'https://picsum.photos/400/300?random=59',
      'https://picsum.photos/400/300?random=60',
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Page Header */}
      <header className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              dự án tiêu biểu
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.1] tracking-tight">
              Dấu ấn cung ứng <br /> trên mọi công trình
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Hơn 15 năm kinh nghiệm, Duy Hoà 68 tự hào là đối tác chiến lược
              cung cấp vật tư toàn diện cho hàng trăm dự án trọng điểm trên cả
              nước.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content: Bento Grid of Projects */}
      <section className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        {/* Responsive Grid System: 1 column on Mobile, 2 columns on Desktop */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-2 bg-border border border-border w-full">
          {PROJECTS_DATA.map((project) => (
            <Link
              href={`#project-${project.id}`}
              key={project.id}
              className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
            >
              {/* Inner Hover Glow */}
              <div className="z-20 absolute inset-0 opacity-0 group-hover/card:opacity-100 shadow-[0_0_30px_-5px] shadow-primary/20 border border-primary transition-opacity duration-300 pointer-events-none" />

              {/* Top: 3-Image Bento Gallery */}
              <div className="gap-px grid grid-cols-3 grid-rows-2 bg-border border-border border-b h-64 sm:h-80 shrink-0">
                {/* Large Main Image */}
                <div className="relative col-span-2 row-span-2 bg-muted/5 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={`${project.name} - 1`}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Small Stacked Image 1 */}
                <div className="relative col-span-1 row-span-1 bg-muted/5 overflow-hidden">
                  <img
                    src={project.images[1]}
                    alt={`${project.name} - 2`}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Small Stacked Image 2 */}
                <div className="relative col-span-1 row-span-1 bg-muted/5 overflow-hidden">
                  <img
                    src={project.images[2]}
                    alt={`${project.name} - 3`}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Bottom: Info Block */}
              <div className="flex flex-col justify-between p-6 sm:p-8 grow">
                <div className="flex flex-col gap-4">
                  {/* Meta Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 bg-muted/30 group-hover/card:bg-transparent px-2 py-1 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted/30 group-hover/card:bg-transparent px-2 py-1 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                      <Building2 className="w-3 h-3" /> {project.type}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading group-hover/card:text-primary-foreground text-2xl lg:text-3xl line-clamp-2 leading-snug transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-muted-foreground group-hover/card:text-primary-foreground/80 text-sm line-clamp-3 leading-relaxed transition-colors">
                    {project.supply}
                  </p>
                </div>

                {/* Fake Link interaction element at bottom */}
                <div className="flex items-center gap-2 mt-8 font-mono font-bold text-primary group-hover/card:text-primary-foreground text-xs uppercase tracking-widest transition-colors">
                  <PackageCheck className="w-4 h-4" /> Xem chi tiết hạng mục{' '}
                  <ChevronRight className="ml-auto w-4 h-4 transition-transform group-hover/card:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}

          {/* Footer of the grid: Load More Button */}
          <div className="flex justify-center col-span-1 lg:col-span-2 bg-card p-8 border-border">
            <Button
              variant="outline"
              className="group hover:bg-primary px-8 rounded-none h-12 font-mono font-bold hover:text-primary-foreground uppercase tracking-widest transition-colors"
            >
              Tải thêm dự án
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
