import { Breadcrumbs } from '@/components/breadcrumb';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { createMetadata } from '@/lib/utils';
import {
  Building2,
  CalendarDays,
  Droplets,
  Factory,
  Info,
  MapPin,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';

// --- Extracted Data from Source ---
const COMPANY_INFO = [
  { label: 'Tên đầy đủ', value: 'Công ty TNHH Thương mại Duy Hoà 68' },
  { label: 'Tên giao dịch', value: 'Duy Hoà 68' },
  { label: 'Mã số thuế', value: '5701765729' },
  { label: 'Số năm hoạt động', value: '15 năm' },
  {
    label: 'Lĩnh vực',
    value: 'Phân phối vật tư Điện, Nước, Thiết bị vệ sinh, Dụng cụ cầm tay',
  },
  {
    label: 'Trụ sở & tổng kho',
    value: 'Thành phố Uông Bí, tỉnh Quảng Ninh',
  },
  {
    label: 'Diện tích kho',
    value: '6.000m² sàn, tính toàn bộ các tầng',
  },
  {
    label: 'Đội xe',
    value:
      'Gần 20 đầu xe — 14 xe tải giao hàng và tiếp liệu, cùng đội EC Van và xe thị trường giao lẻ',
  },
  {
    label: 'Tổng tải trọng',
    value: 'Gần 60 tấn mỗi lượt (đội xe tải giao hàng)',
  },
  {
    label: 'Uỷ quyền cấp 1',
    value: 'Trần Phú, Cadisun, Rạng Đông, Senko, Vinawind',
  },
  {
    label: 'Địa bàn phân phối đại lý',
    value: 'Quảng Ninh, Hải Phòng, Hải Dương',
  },
  {
    label: 'Mạng lưới đại lý',
    value: 'Khoảng 1.500 cửa hàng nhập hàng thường xuyên',
  },
  {
    label: 'Ban điều hành',
    value:
      'Tổng Giám đốc Nguyễn Thị Hoà · Phó Tổng Giám đốc Trần Văn Linh · Cố vấn, đồng sáng lập Trần Văn Duy',
  },
  { label: 'Hotline', value: '*(Điền hotline)*' },
  { label: 'Website', value: '*(Điền website)*' },
];

const CATEGORIES = [
  {
    title: 'Ống nước và phụ kiện',
    desc: 'Phân phối ống và phụ kiện các thương hiệu Tiền Phong, Dismy, Sino, gồm các dòng uPVC, PPR và HDPE cùng hệ thống phụ kiện đồng bộ.',
    icon: Droplets,
  },
  {
    title: 'Dây và cáp điện',
    desc: 'Nhà phân phối uỷ quyền cấp 1 của Trần Phú và Cadisun, đồng thời phân phối dây cáp Kashing và Kumho. Danh mục gồm dây đơn, dây đôi, cáp ngầm và cáp điều khiển.',
    icon: Zap,
  },
  {
    title: 'Thiết bị điện và chiếu sáng',
    desc: 'Uỷ quyền cấp 1 của Rạng Đông, Senko, Vinawind, đồng thời phân phối Panasonic, Nanoco, Sino. Danh mục gồm đèn LED, công tắc, ổ cắm, aptomat, tủ điện và quạt điện.',
    icon: Building2,
  },
  {
    title: 'Vệ sinh và dụng cụ',
    desc: 'Phân phối thiết bị vệ sinh gồm sen vòi, bồn cầu, lavabo, bình nóng lạnh, cùng nhóm dụng cụ cầm tay và thiết bị thi công chuyên dụng.',
    icon: Wrench,
  },
];

const TIER_1_BRANDS = [
  { brand: 'Trần Phú', category: 'Dây và cáp điện', year: '*(điền)*' },
  { brand: 'Cadisun', category: 'Dây và cáp điện', year: '*(điền)*' },
  {
    brand: 'Rạng Đông',
    category: 'Chiếu sáng, thiết bị điện',
    year: '*(điền)*',
  },
  {
    brand: 'Senko',
    category: 'Quạt điện, thiết bị gia dụng',
    year: '*(điền)*',
  },
  { brand: 'Vinawind', category: 'Quạt điện', year: '*(điền)*' },
];

const TIMELINE = [
  {
    year: '2015',
    event:
      'Thành lập Công ty TNHH Thương mại Duy Hoà 68 tại Uông Bí, Quảng Ninh.',
  },
  {
    year: '2016',
    event:
      'Trở thành nhà phân phối uỷ quyền cấp 1 của *(hãng — điền)* tại khu vực.',
  },
  { year: '2019', event: 'Đưa vào vận hành tổng kho 6.000m².' },
  {
    year: '2020',
    event: 'Mở rộng phân phối sang thị trường Hải Phòng.',
  },
  {
    year: '2020-2026',
    event: 'Xây dựng chuỗi cung ứng riêng cho dự án và công trình.',
  },
  {
    year: '2024',
    event: 'Mở rộng phân phối sang thị trường Hải Dương.',
  },
  {
    year: '2026',
    event: 'Phục vụ khoảng 1.500 cửa hàng thường xuyên tại ba tỉnh, thành phố.',
  },
];

const FAQS = [
  {
    question: 'Duy Hoà 68 là công ty gì?',
    answer:
      'Công ty TNHH Thương mại Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1 vật tư ngành Điện, Nước, Thiết bị vệ sinh và Dụng cụ cầm tay, có tổng kho tại thành phố Uông Bí, tỉnh Quảng Ninh. Duy Hoà 68 hoạt động 15 năm, vận hành kho 6.000m² sàn và đội xe gần 20 chiếc. Duy Hoà 68 cấp vật tư cho dự án, công trình và phân phối cho khoảng 1.500 cửa hàng bán lẻ tại Quảng Ninh, Hải Phòng, Hải Dương.',
  },
  {
    question: 'Duy Hoà 68 là nhà phân phối cấp 1 của những hãng nào?',
    answer:
      'Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1 khu vực của năm thương hiệu: Trần Phú, Cadisun, Rạng Đông, Senko và Vinawind. Bản scan giấy chứng nhận uỷ quyền được công bố tại mục Thương hiệu uỷ quyền trên website của Duy Hoà 68.',
  },
  {
    question: 'Duy Hoà 68 cấp vật tư cho công trình ở những khu vực nào?',
    answer:
      'Duy Hoà 68 cấp vật tư cho công trình tại Quảng Ninh, Hải Phòng, Hải Dương và các tỉnh miền Bắc bằng phương tiện của công ty, giao tận chân công trình. Với công trình ngoài miền Bắc, Duy Hoà 68 điều phối hàng trực tiếp từ nhà máy của hãng đến chân công trình theo hợp đồng phân phối cấp 1. Mọi lô hàng đều kèm hoá đơn VAT và chứng từ CO/CQ chính hãng.',
  },
  {
    question: 'Duy Hoà 68 giao hàng cho đại lý như thế nào?',
    answer:
      'Duy Hoà 68 vận hành các tuyến xe giao hàng theo lộ trình cố định hằng tuần tại Quảng Ninh, Hải Phòng và Hải Dương. Đại lý biết trước ngày xe đến khu vực mình để chủ động kế hoạch nhập hàng. Toàn bộ tuyến do đội xe của Duy Hoà 68 thực hiện, xuất phát từ tổng kho tại Uông Bí; các đơn hàng nhỏ và lẻ được giao trong ngày bằng đội EC Van và xe thị trường.',
  },
  {
    question: 'Mua sỉ dây điện Trần Phú, Cadisun tại Quảng Ninh ở đâu?',
    answer:
      'Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1 của Trần Phú và Cadisun tại Quảng Ninh, nhập hàng trực tiếp từ nhà máy và có tổng kho tại thành phố Uông Bí. Cửa hàng lấy hàng kinh doanh được áp dụng giá đại lý theo sản lượng, kèm đầy đủ chứng từ CO/CQ và hoá đơn VAT.',
  },
  {
    question: 'Mua sỉ dây điện Trần Phú, Cadisun tại Hải Phòng ở đâu?',
    answer:
      'Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1 của Trần Phú và Cadisun, có tuyến xe giao hàng cố định hằng tuần bao phủ khu vực Hải Phòng. Cửa hàng tại Hải Phòng liên hệ hotline của Duy Hoà 68 để nhận giá đại lý và lịch tuyến xe của khu vực.',
  },
  {
    question: 'Mua sỉ vật tư điện nước tại Hải Dương ở đâu?',
    answer:
      'Duy Hoà 68 phân phối ống nước, dây cáp điện, thiết bị điện – chiếu sáng và thiết bị vệ sinh tại Hải Dương thông qua tuyến xe giao hàng cố định hằng tuần. Cửa hàng tại Hải Dương đặt hàng qua hotline hoặc Zalo và nhận hàng tận cửa hàng.',
  },
  {
    question: 'Mua ống nước Tiền Phong giá đại lý ở Quảng Ninh ở đâu?',
    answer:
      'Duy Hoà 68 phân phối ống và phụ kiện Tiền Phong gồm các dòng uPVC, PPR, HDPE tại Quảng Ninh, Hải Phòng và Hải Dương. Cửa hàng lấy hàng kinh doanh liên hệ hotline hoặc đăng ký trên website của Duy Hoà 68 để nhận báo giá đại lý.',
  },
  {
    question: 'Làm thế nào để trở thành đại lý của Duy Hoà 68?',
    answer:
      'Cửa hàng vật liệu xây dựng và điện nước tại Quảng Ninh, Hải Phòng, Hải Dương đăng ký làm đại lý qua biểu mẫu trên website hoặc gọi trực tiếp hotline của Duy Hoà 68. Cán bộ quản lý tuyến sẽ liên hệ trong 2 giờ làm việc để trao đổi về chính sách giá, hạn mức công nợ và lịch tuyến xe giao hàng.',
  },
  {
    question: 'Duy Hoà 68 có chính sách công nợ cho đại lý không?',
    answer:
      'Duy Hoà 68 cấp hạn mức công nợ cho đại lý dựa trên sản lượng nhập hàng và lịch sử thanh toán, và xét lại hạn mức định kỳ. Nhà thầu và đơn vị thi công có chính sách công nợ riêng, trao đổi theo từng hợp đồng.',
  },
  {
    question: 'Duy Hoà 68 có xuất hoá đơn VAT không?',
    answer:
      'Duy Hoà 68 xuất hoá đơn VAT cho mọi đơn hàng, mang tên pháp nhân Công ty TNHH Thương mại Duy Hoà 68. Duy Hoà 68 cũng bàn giao chứng chỉ chất lượng xuất xưởng CO/CQ chính hãng kèm từng lô hàng.',
  },
  {
    question: 'Xem bảng giá của Duy Hoà 68 ở đâu?',
    answer:
      'Duy Hoà 68 công bố bảng giá niêm yết của từng hãng tại mục Bảng giá trên website, cập nhật hằng tháng và có bản PDF tải về. Giá đại lý phụ thuộc sản lượng và ngành hàng, được báo riêng sau khi cửa hàng để lại thông tin liên hệ.',
  },
];

export const metadata = createMetadata({
  title: 'Giới thiệu Duy Hoà 68',
  description:
    'Thành lập năm 2015 tại Uông Bí, Duy Hoà 68 là nhà phân phối cấp 1 thiết bị điện – nước – vệ sinh với tổng kho 6.000m², gần 20 đầu xe và khoảng 1.500 cửa hàng đối tác.',
  path: '/about',
  keywords: [
    'giới thiệu Duy Hoà 68',
    'công ty TNHH Thương mại Duy Hoà 68',
    'nhà phân phối vật liệu điện nước Quảng Ninh',
    'tổng kho vật tư điện nước Uông Bí',
    'năng lực cung ứng vật tư điện nước',
  ],
  // image: '/og/og-about.png',
});

export default function AboutPage() {
  // JSON-LD Generation
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Công ty TNHH Thương mại Duy Hoà 68',
    alternateName: ['Duy Hoà 68', 'Duy Hoa 68', 'Duy Hòa 68'],
    url: 'https://TENMIEN.vn',
    logo: 'https://TENMIEN.vn/logo.png',
    foundingDate: '2015',
    taxID: '5701765729',
    description:
      'Nhà phân phối uỷ quyền cấp 1 vật tư Điện, Nước, Thiết bị vệ sinh và Dụng cụ cầm tay. Tổng kho 6.000m² sàn tại Uông Bí, Quảng Ninh. Cấp vật tư cho dự án, công trình và phân phối cho khoảng 1.500 cửa hàng tại Quảng Ninh, Hải Phòng, Hải Dương.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ĐIỀN-ĐỊA-CHỈ',
      addressLocality: 'Uông Bí',
      addressRegion: 'Quảng Ninh',
      addressCountry: 'VN',
    },
    employee: [
      { '@type': 'Person', name: 'Nguyễn Thị Hoà', jobTitle: 'Tổng Giám đốc' },
      {
        '@type': 'Person',
        name: 'Trần Văn Linh',
        jobTitle: 'Phó Tổng Giám đốc',
      },
    ],
    founder: { '@type': 'Person', name: 'Trần Văn Duy' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-ĐIỀN',
      contactType: 'sales',
      areaServed: ['Quảng Ninh', 'Hải Phòng', 'Hải Dương'],
      availableLanguage: 'Vietnamese',
    },
    knowsAbout: [
      'Ống nhựa Tiền Phong',
      'Ống Dismy',
      'Ống Sino',
      'Dây cáp điện Trần Phú',
      'Dây cáp điện Cadisun',
      'Dây cáp Kashing',
      'Dây cáp Kumho',
      'Đèn LED Rạng Đông',
      'Thiết bị điện Panasonic',
      'Thiết bị điện Nanoco',
      'Quạt Senko',
      'Quạt Vinawind',
      'Thiết bị vệ sinh',
      'Dụng cụ cầm tay',
      'Cấp vật tư công trình',
      'Phân phối vật tư xây dựng',
    ],
    dateModified: '2026-07-30',
    sameAs: [
      'https://www.facebook.com/ĐIỀN-FANPAGE',
      'https://zalo.me/ĐIỀN-ZALO-OA',
    ],
  };

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQJsonLd faqs={FAQS} />

      <Breadcrumbs items={[{ name: 'Về chúng tôi', href: '/about' }]} />

      {/* Hero Section */}
      <section className="mx-auto mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 container">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
            about
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.15] tracking-tight">
            Về Duy Hoà 68 — nhà phân phối uỷ quyền cấp 1 vật tư điện nước tại
            Quảng Ninh, Hải Phòng, Hải Dương
            <span className="ml-1 text-muted-foreground/50 text-sm align-super"></span>
          </h1>

          <div className="dark:prose-invert mt-8 max-w-none text-muted-foreground text-lg leading-relaxed">
            <p>
              Công ty TNHH Thương mại Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1
              vật tư ngành Điện, Nước, Thiết bị vệ sinh và Dụng cụ cầm tay. Tổng
              kho và trụ sở chính của Duy Hoà 68 đặt tại thành phố Uông Bí, tỉnh
              Quảng Ninh. Duy Hoà 68 hoạt động trong ngành 15 năm.
            </p>
            <p>
              Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1 khu vực của năm thương
              hiệu: Trần Phú, Cadisun, Rạng Đông, Senko và Vinawind. Duy Hoà 68
              vận hành tổng kho 6.000m² sàn (tính toàn bộ các tầng) và đội xe
              gần 20 đầu xe, gồm 14 xe tải giao hàng và tiếp liệu cùng đội xe EC
              Van và xe thị trường giao hàng lẻ trong ngày.
            </p>
            <p>
              Duy Hoà 68 vận hành hai chuỗi cung ứng độc lập. Chuỗi thứ nhất
              cung cấp vật tư cho các dự án và công trình xây dựng. Chuỗi thứ
              hai phân phối trực tiếp cho khoảng 1.500 cửa hàng bán lẻ tại tam
              giác kinh tế Quảng Ninh – Hải Phòng – Hải Dương thông qua hệ thống
              tuyến xe cố định hằng tuần.
            </p>
            <p>
              Duy Hoà 68 do Tổng Giám đốc Nguyễn Thị Hoà điều hành, cùng Phó
              Tổng Giám đốc Trần Văn Linh, dưới sự cố vấn của nhà đồng sáng lập
              Trần Văn Duy.
            </p>
          </div>
        </div>
      </section>

      {/* Thông tin doanh nghiệp (Bento Table) */}
      <section className="mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 container">
        <div className="flex flex-col gap-8">
          <h2 className="font-heading text-3xl sm:text-4xl uppercase tracking-tight">
            Thông tin doanh nghiệp
          </h2>

          <div className="gap-px grid grid-cols-1 md:grid-cols-2 bg-border border border-border w-full">
            {COMPANY_INFO.map((info, idx) => (
              <div
                key={idx}
                className="flex sm:flex-row flex-col gap-2 sm:gap-6 bg-card hover:bg-muted/10 p-6 transition-colors"
              >
                <span className="flex items-center w-full sm:w-48 font-mono text-muted-foreground text-xs uppercase tracking-widest shrink-0">
                  {info.label}
                </span>
                <span className="font-medium text-foreground text-sm leading-relaxed">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ngành hàng phân phối */}
      <section className="mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 container">
        <div className="flex flex-col gap-8">
          <h2 className="max-w-3xl font-heading text-3xl sm:text-4xl uppercase tracking-tight">
            Duy Hoà 68 phân phối những ngành hàng nào?
          </h2>
          <p className="mb-4 max-w-3xl text-muted-foreground text-lg">
            Duy Hoà 68 phân phối bốn nhóm ngành hàng chính. Nhờ vậy, một cửa
            hàng hoặc một công trình có thể đặt đủ vật tư điện, nước, vệ sinh và
            dụng cụ trong cùng một đơn hàng, thay vì chia đơn cho nhiều nhà cung
            cấp.
          </p>

          <div className="gap-px grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 bg-border border border-border w-full">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-card hover:bg-primary p-8 transition-colors duration-300"
              >
                <div className="bg-muted/20 group-hover:bg-primary-foreground/10 mb-8 p-4 border border-border group-hover:border-primary-foreground/20 w-fit transition-colors">
                  <cat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="mb-4 font-heading group-hover:text-primary-foreground text-2xl transition-colors">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-primary-foreground/80 text-sm leading-relaxed transition-colors">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vị thế phân phối cấp 1 */}
      <section className="mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 container">
        <div className="gap-px grid grid-cols-1 lg:grid-cols-5 bg-border border border-border w-full">
          <div className="flex flex-col justify-center lg:col-span-2 bg-card p-8 md:p-12">
            <div className="bg-muted/20 mb-6 p-3 border border-border w-fit">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="mb-6 font-heading text-3xl sm:text-4xl uppercase tracking-tight">
              Vị thế phân phối <br /> cấp 1
            </h2>
            <div className="dark:prose-invert text-muted-foreground text-base leading-relaxed prose prose-zinc">
              <p>
                Duy Hoà 68 là nhà phân phối uỷ quyền cấp 1 khu vực, không phải
                đại lý mua đi bán lại. Duy Hoà 68 ký hợp đồng phân phối trực
                tiếp với nhà máy và nhận hàng thẳng từ nhà sản xuất[cite: 1].
              </p>
              <p>
                Vị thế cấp 1 mang lại ba năng lực cụ thể: giá nhập ổn định do
                không qua trung gian; nguồn hàng chính hãng kèm đầy đủ chứng từ
                CO/CQ; và quyền đặt hàng theo kế hoạch trực tiếp với nhà máy,
                nên Duy Hoà 68 ít bị đứt hàng vào mùa cao điểm.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-3 bg-background">
            <div className="grid grid-cols-3 bg-muted/10 p-6 border-border border-b">
              <span className="font-mono font-bold text-muted-foreground text-xs uppercase tracking-widest">
                Thương hiệu
              </span>
              <span className="font-mono font-bold text-muted-foreground text-xs uppercase tracking-widest">
                Ngành hàng
              </span>
              <span className="font-mono font-bold text-muted-foreground text-xs text-right uppercase tracking-widest">
                Hợp tác từ
              </span>
            </div>
            <div className="flex flex-col grow">
              {TIER_1_BRANDS.map((item, idx) => (
                <div
                  key={idx}
                  className="items-center grid grid-cols-3 hover:bg-muted/5 p-6 border-border/50 border-b transition-colors"
                >
                  <span className="font-bold text-foreground text-sm uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {item.category}
                  </span>
                  <span className="font-mono text-primary text-sm text-right">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-muted/5 mt-auto p-6">
              <p className="font-mono text-muted-foreground text-sm italic">
                * Duy Hoà 68 lưu giữ giấy chứng nhận nhà phân phối do các hãng
                cấp và công bố bản scan tại mục Thương hiệu uỷ quyền trên
                website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chuỗi cung ứng (Dự án & Đại lý) */}
      <section className="mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 container">
        <div className="gap-px grid grid-cols-1 lg:grid-cols-2 bg-border border border-border w-full">
          {/* Cấp hàng dự án */}
          <div className="flex flex-col bg-card hover:bg-muted/10 p-8 md:p-12 transition-colors">
            <div className="flex justify-center items-center bg-background mb-8 border border-border w-14 h-14">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="mb-8 font-heading text-3xl uppercase tracking-tight">
              Cấp hàng cho dự án và công trình
            </h2>
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col gap-2">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-primary" /> Tại Quảng Ninh,
                  Hải Phòng, Hải Dương
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Duy Hoà 68 xuất hàng từ tổng kho tại Uông Bí và giao tận chân
                  công trình bằng đội xe của công ty, trong đó các xe tải 7 tấn
                  phục vụ riêng những đơn hàng khối lượng lớn.
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  <Truck className="w-4 h-4 text-primary" /> Tại các tỉnh miền
                  Bắc
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Duy Hoà 68 giao hàng tận chân công trình bằng phương tiện của
                  công ty tới các tỉnh miền Bắc. Nhân sự của Duy Hoà 68 phụ
                  trách giao và bàn giao hàng trực tiếp cho đơn vị thi công.
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  <Factory className="w-4 h-4 text-primary" /> Ngoài miền Bắc
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Với vị thế phân phối cấp 1, Duy Hoà 68 điều phối hàng trực
                  tiếp từ nhà máy của hãng đến chân công trình theo hợp đồng
                  phân phối. Duy Hoà 68 chịu trách nhiệm đặt hàng, theo dõi tiến
                  độ sản xuất, điều phối vận chuyển và bàn giao chứng từ; chi
                  phí vận chuyển thoả thuận theo từng đơn.
                </span>
              </li>
              <li className="flex flex-col gap-2 mt-2 pt-6 border-border border-t">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  Năng lực lưu kho & Chứng từ
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Tổng kho 6.000m² sàn cho phép nhận khối lượng lớn và giữ hàng
                  theo tiến độ. Duy trì 2 xe chuyên tiếp liệu từ nhà máy[cite:
                  1]. Cung cấp hợp đồng nguyên tắc, xuất hoá đơn VAT và CO/CQ
                  chính hãng.
                </span>
              </li>
            </ul>
          </div>

          {/* Phân phối đại lý */}
          <div className="flex flex-col bg-card hover:bg-muted/10 p-8 md:p-12 transition-colors">
            <div className="flex justify-center items-center bg-background mb-8 border border-border w-14 h-14">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h2 className="mb-8 font-heading text-3xl uppercase tracking-tight">
              Phân phối cho đại lý
            </h2>
            <p className="mb-8 text-muted-foreground">
              Duy Hoà 68 phục vụ khoảng 1.500 cửa hàng nhập hàng thường xuyên
              tại tam giác kinh tế Quảng Ninh, Hải Phòng và Hải Dương.
            </p>
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col gap-2">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  <CalendarDays className="w-4 h-4 text-primary" /> Tuyến xe cố
                  định hằng tuần
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Thiết lập các tuyến giao hàng theo lộ trình cố định, xuất phát
                  từ tổng kho tại Uông Bí và giao tận cửa hàng đại lý. Toàn bộ
                  tuyến do đội xe nội bộ của Duy Hoà 68 thực hiện, không thuê
                  ngoài.
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  <Info className="w-4 h-4 text-primary" /> Nhân viên thị trường
                  đi tuyến định kỳ
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Mỗi khu vực có nhân viên phụ trách ghé tận cửa hàng để nhận
                  đơn, hỗ trợ trưng bày và xử lý đổi trả, bảo hành ngay tại điểm
                  bán.
                </span>
              </li>
              <li className="flex flex-col gap-2 mt-2 pt-6 border-border border-t">
                <strong className="flex items-center gap-2 font-mono text-foreground text-sm uppercase tracking-widest">
                  Chính sách & Hỗ trợ
                </strong>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Cấp hạn mức công nợ dựa trên sản lượng và lịch sử thanh toán.
                  Hỗ trợ đại lý làm biển hiệu, kệ trưng bày. Áp dụng chiết khấu
                  theo sản lượng, chương trình thưởng quý và du lịch hằng năm.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quá trình hình thành (Timeline) */}
      <section className="mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 container">
        <div className="flex flex-col gap-8 mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl sm:text-4xl text-center uppercase tracking-tight">
            Quá trình hình thành
          </h2>

          <div className="flex flex-col bg-card border border-border">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="flex sm:flex-row flex-col hover:bg-muted/10 p-6 md:p-8 border-border border-b last:border-none transition-colors"
              >
                <div className="flex items-center mb-4 sm:mb-0 w-32 font-mono font-bold text-primary text-3xl shrink-0">
                  {item.year}
                </div>
                <div className="flex flex-1 items-center text-foreground text-base leading-relaxed">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-16 md:mt-24 px-4 sm:px-6 lg:px-8 container">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl sm:text-4xl uppercase tracking-tight">
              Câu hỏi thường gặp
            </h2>
            <p className="font-mono text-muted-foreground text-sm uppercase tracking-widest">
              FAQ Page
            </p>
          </div>

          <div className="gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-border border border-border w-full">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 bg-card hover:bg-muted/10 p-8 transition-colors"
              >
                <h4 className="font-heading text-xl leading-snug">
                  {faq.question}
                </h4>
                <p className="mt-auto pt-4 border-border border-t text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section className="mx-auto mt-16 md:mt-24 mb-12 px-4 sm:px-6 lg:px-8 container">
        <div className="gap-px grid grid-cols-1 lg:grid-cols-2 bg-border border border-border w-full">
          <div className="flex flex-col justify-center bg-card p-8 md:p-12">
            <h2 className="mb-8 font-heading text-3xl sm:text-4xl uppercase tracking-tight">
              Liên hệ Duy Hoà 68
            </h2>
            <ul className="flex flex-col gap-6 font-mono text-sm">
              <li className="flex flex-col gap-1">
                <span className="text-muted-foreground uppercase tracking-widest">
                  Pháp nhân
                </span>
                <span className="font-bold text-base">
                  Công ty TNHH Thương mại Duy Hoà 68
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-muted-foreground uppercase tracking-widest">
                  Mã số thuế
                </span>
                <span className="text-foreground">*(điền)*</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-muted-foreground uppercase tracking-widest">
                  Trụ sở & Tổng kho
                </span>
                <span className="text-foreground">
                  Thành phố Uông Bí, tỉnh Quảng Ninh
                </span>
              </li>
              <li className="gap-4 grid grid-cols-2 mt-2 pt-6 border-border border-t">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground uppercase tracking-widest">
                    Hotline
                  </span>
                  <span className="font-bold text-primary">*(điền)*</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground uppercase tracking-widest">
                    Zalo
                  </span>
                  <span className="text-foreground">*(điền)*</span>
                </div>
              </li>
              <li className="gap-4 grid grid-cols-2">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground uppercase tracking-widest">
                    Email
                  </span>
                  <span className="text-foreground">*(điền)*</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground uppercase tracking-widest">
                    Giờ làm việc
                  </span>
                  <span className="text-foreground">*(điền)*</span>
                </div>
              </li>
            </ul>
            <div className="mt-8 font-mono text-muted-foreground text-xs">
              Cập nhật: tháng 7/2026
            </div>
          </div>
          <div className="relative flex justify-center items-center bg-muted/20 p-8 border-border border-l min-h-[400px] font-mono text-muted-foreground text-center">
            {/* Embed Google Maps Here */}
            [Kèm bản đồ Google Maps nhúng, trỏ đúng vị trí tổng kho tại Uông Bí]
          </div>
        </div>
      </section>
    </div>
  );
}
