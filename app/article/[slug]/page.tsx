import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Link2,
  ListMinus,
  MapPin,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- MÔ PHỎNG FETCH DỮ LIỆU TỪ SANITY CMS ---
// Trong thực tế, bạn sẽ dùng Sanity Client fetch qua `slug`
async function getArticle(slug: string) {
  return {
    _type: 'guide', // Có thể là 'news', 'event', 'guide'
    id: 'cach-chon-tiet-dien-day-dien-nha-o',
    title: 'Cách chọn tiết diện dây điện cho nhà ở (Bảng tra theo công suất)',
    slug: 'cach-chon-tiet-dien-day-dien-nha-o',
    category: 'Kiến thức',
    datePublished: '2026-07-31T08:00:00+07:00',
    dateModified: '2026-08-01T08:00:00+07:00',
    displayDate: '31/07/2026',
    author: 'Đội ngũ Duy Hoà',
    readTime: 5,
    image: 'https://picsum.photos/1200/600?random=101',
    excerpt:
      'Bảng tra tiết diện dây điện theo công suất cho nhà ở: dây tổng, ổ cắm, chiếu sáng, điều hoà, bình nóng lạnh. Hướng dẫn từ Duy Hoà 68 — tổng kho dây cáp điện Quảng Ninh.',
    keywords: [
      'chọn tiết diện dây điện nhà ở',
      'dây điện 2.5 chịu được bao nhiêu kw',
      'nhà 2 tầng dùng dây điện bao nhiêu',
      'bảng tra tiết diện dây dẫn',
    ],
    summary:
      'Nhà ở dân dụng thông thường dùng bốn cỡ dây: 1,5mm² cho chiếu sáng, 2,5mm² cho ổ cắm, 4–6mm² cho điều hoà và bình nóng lạnh, 10–16mm² cho dây nguồn tổng. Nguyên tắc tính nhanh: dây đồng đi trong ống âm tường chịu được khoảng 5–6 ampe trên mỗi mm² tiết diện. Lấy tổng công suất thiết bị chia cho 220V ra số ampe, rồi chia tiếp cho 5 để ra tiết diện tối thiểu.',
    // Các trường dành riêng cho Sự Kiện (sẽ null ở bài Kiến thức)
    eventDate: null,
    location: null,
    toc: [
      { id: 'cong-thuc', text: 'Công thức tính tiết diện dây điện' },
      { id: 'bang-tra', text: 'Bảng tra tiết diện dây điện theo công suất' },
      { id: 'nha-2-3-tang', text: 'Nhà 2 tầng, 3 tầng nên đi dây bao nhiêu?' },
      { id: 'ba-loi', text: 'Ba lỗi làm hỏng hệ thống điện nhà ở' },
      { id: 'hang-nao', text: 'Nên dùng dây đồng của hãng nào?' },
    ],
    content: `
      <h2 id="cong-thuc">Công thức tính tiết diện dây điện</h2>
      <p>Ba bước:</p>
      <ol>
        <li><strong>Tính dòng điện:</strong> I = P ÷ (U × cosφ). Nhà ở dùng điện 1 pha 220V, lấy gọn <strong>I = P ÷ 220</strong> (đơn vị P là W).</li>
        <li><strong>Chọn mật độ dòng:</strong> dây đồng đi trong ống nhựa âm tường lấy <strong>J = 5 A/mm²</strong> (đi nổi thoáng khí có thể lấy 6). Đây là con số an toàn cho khí hậu nóng ẩm miền Bắc.</li>
        <li><strong>Tiết diện tối thiểu:</strong> S = I ÷ J. Sau đó <strong>làm tròn lên</strong> cỡ dây thương mại gần nhất và cộng thêm dự phòng 20–30% cho việc lắp thêm thiết bị sau này.</li>
      </ol>
      <p>Ví dụ: một tầng có tổng thiết bị 5.500W → I = 5.500 ÷ 220 = 25A → S = 25 ÷ 5 = 5mm² → chọn dây <strong>6mm²</strong>.</p>
      
      <h2 id="bang-tra">Bảng tra tiết diện dây điện theo công suất</h2>
      <table>
        <thead>
          <tr>
            <th>Tiết diện (mm²)</th>
            <th>Dòng cho phép (A)</th>
            <th>Công suất tối đa 220V</th>
            <th>Dùng cho</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1,0</td><td>~5–6 A</td><td>~1,2 kW</td><td>Đèn lẻ, công tắc</td></tr>
          <tr><td><strong>1,5</strong></td><td>~8–10 A</td><td>~2,0 kW</td><td>Nhánh chiếu sáng</td></tr>
          <tr><td><strong>2,5</strong></td><td>~14–16 A</td><td>~3,3 kW</td><td>Nhánh ổ cắm</td></tr>
          <tr><td><strong>4,0</strong></td><td>~22–25 A</td><td>~5,0 kW</td><td>Điều hoà 12.000–18.000 BTU, bếp từ đơn</td></tr>
          <tr><td><strong>6,0</strong></td><td>~32–36 A</td><td>~7,5 kW</td><td>Bình nóng lạnh trực tiếp, bếp từ đôi, dây trục tầng</td></tr>
          <tr><td>10</td><td>~50–55 A</td><td>~12 kW</td><td>Dây tổng nhà 2 tầng</td></tr>
          <tr><td>16</td><td>~70–80 A</td><td>~17 kW</td><td>Dây tổng nhà 3–4 tầng, nhà có nhiều điều hoà</td></tr>
        </tbody>
      </table>
      <p><em>*Bảng tính cho dây đồng ruột nhiều sợi, cách điện PVC, đi trong ống luồn âm tường, nhiệt độ môi trường 35°C. Dây đi trong máng thoáng hoặc đi nổi có thể chịu tải cao hơn 15–20%.</em></p>

      <h2 id="nha-2-3-tang">Nhà 2 tầng, 3 tầng nên đi dây bao nhiêu?</h2>
      <p>Cấu hình Công ty TNHH TM Duy Hoà 68 — tổng kho vật tư điện nước tại Uông Bí, Quảng Ninh gặp nhiều nhất khi cấp vật tư cho nhà phố tại Quảng Ninh – Hải Phòng – Hải Dương:</p>
      <table>
        <thead>
          <tr>
            <th>Loại nhà</th>
            <th>Dây tổng vào nhà</th>
            <th>Dây trục lên tầng</th>
            <th>Ổ cắm</th>
            <th>Chiếu sáng</th>
            <th>Điều hoà</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Nhà cấp 4 (~70m²)</td><td>10mm²</td><td>—</td><td>2,5mm²</td><td>1,5mm²</td><td>4mm²</td></tr>
          <tr><td>Nhà 2 tầng (~100m²)</td><td>10–16mm²</td><td>6mm²</td><td>2,5mm²</td><td>1,5mm²</td><td>4mm²</td></tr>
          <tr><td>Nhà 3 tầng (~120m²)</td><td>16mm²</td><td>6–10mm²</td><td>2,5mm²</td><td>1,5mm²</td><td>4mm²</td></tr>
          <tr><td>Nhà 4–5 tầng cho thuê</td><td>25mm²</td><td>10mm²</td><td>2,5mm²</td><td>1,5mm²</td><td>4mm²</td></tr>
        </tbody>
      </table>

      <h2 id="ba-loi">Ba lỗi làm hỏng hệ thống điện nhà ở</h2>
      <ol>
        <li><strong>Dùng chung một cỡ dây cho cả nhà.</strong> Đi hết 2,5mm² tưởng là an toàn nhưng dây tổng 2,5mm² sẽ quá tải ngay khi bật đồng thời điều hoà và bình nóng lạnh.</li>
        <li><strong>Không tách riêng lộ bình nóng lạnh và điều hoà.</strong> Hai thiết bị này phải có aptomat và dây riêng kéo thẳng từ tủ điện.</li>
        <li><strong>Nhồi quá nhiều dây vào một ống luồn.</strong> Tổng tiết diện dây không được vượt quá <strong>40% tiết diện trong lòng ống</strong> — nhồi chặt khiến dây không thoát nhiệt và giảm tuổi thọ cách điện.</li>
      </ol>

      <h2 id="hang-nao">Nên dùng dây đồng của hãng nào?</h2>
      <p>Yếu tố quyết định không phải thương hiệu mà là <strong>độ tinh khiết đồng và độ đủ tiết diện</strong>. Dây đạt chuẩn có đồng nguyên chất từ 99,95% trở lên và tiết diện thực đúng bằng tiết diện ghi trên vỏ. Dây trôi nổi thường bị "ăn bớt" ruột — ghi 2,5mm² nhưng thực tế chỉ 2,0–2,2mm², dẫn tới nóng dây khi tải đầy.</p>
      <p>Công ty TNHH TM Duy Hoà 68 là nhà phân phối cấp 1 dây cáp điện <strong>Trần Phú</strong> và <strong>Cadisun</strong> tại khu vực Quảng Ninh – Hải Phòng – Hải Dương. Cách phân biệt hàng chính hãng xem tại bài <em>"Cách nhận biết dây điện Trần Phú, Cadisun chính hãng"</em>.</p>
    `,
    faqs: [
      {
        q: 'Dây điện 2,5mm² chịu được bao nhiêu kW?',
        a: 'Khoảng 3,3kW ở điện 220V, tương ứng dòng 14–16A khi đi trong ống âm tường. Đủ cho một nhánh ổ cắm thông thường nhưng không đủ cho bình nóng lạnh trực tiếp.',
      },
      {
        q: 'Điều hoà 9000 BTU dùng dây mấy?',
        a: 'Dây 2,5mm² là đủ về mặt tải, nhưng nên đi 4mm² và aptomat riêng để dự phòng nâng cấp máy công suất lớn hơn về sau.',
      },
      {
        q: 'Bình nóng lạnh trực tiếp dùng dây bao nhiêu?',
        a: 'Máy 4,5kW cần tối thiểu dây 4mm², khuyến nghị 6mm² kèm aptomat chống giật RCBO 30mA đi riêng từ tủ điện.',
      },
      {
        q: 'Có nên dùng dây nhôm cho nhà ở không?',
        a: 'Không. Nhôm dẫn điện kém hơn đồng khoảng 40%, dễ gãy tại điểm đấu nối và bị oxy hoá gây phát nhiệt. Nhà ở dân dụng nên dùng hoàn toàn dây đồng.',
      },
      {
        q: 'Đi dây âm tường hay đi nổi tốt hơn?',
        a: 'Âm tường thẩm mỹ hơn và được dùng phổ biến, bắt buộc phải luồn trong ống bảo vệ để có thể thay dây sau này. Đi nổi thoát nhiệt tốt hơn và dễ sửa chữa, phù hợp nhà xưởng, nhà tạm.',
      },
    ],
  };
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = await getArticle(params.slug);

  return {
    title: `${article.title} | Duy Hoà 68`,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://duyhoa.vn/articles/${article.slug}`,
      siteName: 'Duy Hoà 68',
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'vi_VN',
      type: 'article',
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  // JSON-LD Generation
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': article._type === 'news' ? 'NewsArticle' : 'Article',
    headline: article.title,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Organization', // Sử dụng Organization vì tác giả là "Đội ngũ Duy Hoà"
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Công ty TNHH Thương mại Duy Hoà 68',
      logo: {
        '@type': 'ImageObject',
        url: 'https://duyhoa.vn/logo.png',
      },
    },
    description: article.excerpt,
  };

  const faqJsonLd =
    article.faqs && article.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }
      : null;

  const eventJsonLd =
    article._type === 'event'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: article.title,
          startDate: article.eventDate,
          location: {
            '@type': 'Place',
            name: article.location,
            address: article.location,
          },
          image: article.image,
          description: article.excerpt,
        }
      : null;

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden scroll-smooth">
      {/* Inject GEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}

      {/* Breadcrumb Header */}
      <header className="bg-muted/10 py-6 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/news" className="hover:text-primary transition-colors">
              {article.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="max-w-[200px] sm:max-w-none font-bold text-foreground truncate">
              {article.title}
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 container">
        {/* Article Header (Title & Meta) */}
        <div className="flex flex-col gap-6 mx-auto mb-12 max-w-4xl text-center">
          <div className="bg-foreground mx-auto p-1 px-2 w-fit font-mono text-primary text-xs uppercase tracking-widest">
            {article.category}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-4 py-4 border-border border-y font-mono text-muted-foreground text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {article.displayDate}
            </span>
            <span className="hidden sm:block text-border">|</span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {article.author}
            </span>
            <span className="hidden sm:block text-border">|</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {article.readTime} phút đọc
            </span>
          </div>

          {/* Conditional Rendering for Events */}
          {article._type === 'event' && (
            <div className="flex sm:flex-row flex-col justify-center gap-4 mt-2 font-mono font-bold text-primary">
              <span className="flex justify-center items-center gap-2 bg-primary/10 px-4 py-2 border border-primary/20">
                <CalendarDays className="w-4 h-4" /> {article.eventDate}
              </span>
              <span className="flex justify-center items-center gap-2 bg-primary/10 px-4 py-2 border border-primary/20">
                <MapPin className="w-4 h-4" /> {article.location}
              </span>
            </div>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative bg-muted/5 mb-12 border border-border w-full aspect-video md:aspect-[21/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content & Sidebar Rigid Grid */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-4 bg-border border border-border w-full">
          {/* LEFT: Sidebar (TOC & Share) */}
          <aside className="flex flex-col lg:col-span-1 bg-background border-border border-b lg:border-b-0 h-full">
            <div className="lg:top-24 lg:sticky flex flex-col w-full h-full lg:h-[calc(100vh-6rem)]">
              <div className="flex items-center gap-2 bg-muted/10 p-6 border-border border-b shrink-0">
                <ListMinus className="w-5 h-5 text-primary" />
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest">
                  Nội dung bài viết
                </h3>
              </div>

              {/* Scrollable TOC */}
              <nav className="flex flex-col gap-4 p-6 overflow-y-auto scrollbar-hide grow">
                {article.toc.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`#${item.id}`}
                    className="font-medium text-muted-foreground hover:text-primary text-sm leading-relaxed transition-colors"
                  >
                    {idx + 1}. {item.text}
                  </Link>
                ))}
                {article.faqs && article.faqs.length > 0 && (
                  <Link
                    href="#faq"
                    className="font-medium text-muted-foreground hover:text-primary text-sm leading-relaxed transition-colors"
                  >
                    Câu hỏi thường gặp (FAQ)
                  </Link>
                )}
              </nav>

              <div className="mt-auto p-6 border-border border-t shrink-0">
                <span className="block mb-4 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                  Chia sẻ bài viết
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border rounded-none hover:text-primary"
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border rounded-none hover:text-primary"
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border rounded-none hover:text-primary"
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Main Content Body */}
          <div className="flex flex-col lg:col-span-3 bg-card p-8 md:p-12 lg:p-16">
            {/* SEO/GEO Answer Box */}
            <div className="bg-muted/20 mb-12 p-6 border-primary border-l-4 font-medium text-lg leading-relaxed answer-box">
              {article.summary}
            </div>

            {/* Prose Content */}
            <article
              className="prose-th:bg-muted/10 dark:prose-invert prose-h2:mt-12 prose-h2:mb-6 prose-td:p-4 prose-th:p-4 prose-h2:pb-4 prose-table:border prose-td:border prose-th:border prose-h2:border-border prose-table:border-border prose-td:border-border prose-th:border-border prose-h2:border-b prose-table:w-full max-w-none prose-h2:font-heading prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-lg prose-p:text-lg prose-h2:text-3xl prose-th:text-left prose-h2:uppercase prose-p:leading-relaxed prose-h2:tracking-tight scroll-smooth prose-table:border-collapse prose prose-zinc"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* GEO Optimized FAQ Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div id="faq" className="mt-16 pt-12 border-border border-t">
                <h2 className="mb-8 font-heading text-3xl uppercase tracking-tight">
                  Câu hỏi thường gặp
                </h2>
                <div className="flex flex-col gap-px bg-border border border-border w-full">
                  {article.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-background hover:bg-muted/5 p-6 transition-colors"
                    >
                      <h3 className="mb-2 font-bold text-foreground text-lg">
                        {faq.q}
                      </h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Block */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-6 bg-primary mt-12 p-8 md:p-12 border border-border text-primary-foreground">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight">
              Cần tư vấn vật tư cho công trình?
            </h3>
            <p className="opacity-90">
              Liên hệ ngay để nhận báo giá đại lý tốt nhất khu vực Quảng Ninh -
              Hải Phòng - Hải Dương.
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-background hover:bg-muted px-8 rounded-none h-14 font-mono font-bold text-foreground uppercase tracking-widest shrink-0"
          >
            Liên hệ ngay
          </Button>
        </div>
      </main>
    </div>
  );
}
