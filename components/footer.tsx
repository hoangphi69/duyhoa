import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/duyhoa.png';

export default function Footer() {
  return (
    <footer className="bg-foreground border-border border-t text-slate-300">
      <div className="mx-auto container">
        {/* TOP ROW: 3 Columns with vertical dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-white/10 border-b">
          {/* Col 1: Logo & Contact */}
          <div className="flex flex-col place-content-center p-8 md:p-12 border-white/10 md:border-r border-b md:border-b-0">
            {/* Logo in the first grid item */}
            <Link href="/">
              <Image
                src={logo}
                priority
                alt="Duy Hoà Logo"
                className="w-full h-28 object-contain"
              />
            </Link>
          </div>

          {/* Col 2: Warehouse Address */}
          <div className="flex flex-col p-8 md:p-12 border-white/10 md:border-r border-b md:border-b-0">
            <h4 className="mt-auto md:mt-0 mb-4 font-semibold text-primary text-xs uppercase tracking-widest">
              Địa chỉ tổng kho
            </h4>
            <div className="space-y-1 font-heading font-semibold text-background text-lg md:text-3xl">
              <p>Số 351, Tổ 2 Khu Hợp Thành, Phường Yên Tử, Quảng Ninh</p>
            </div>
          </div>

          {/* Col 3: Opening Times */}
          <div className="flex flex-col p-8 md:p-12">
            <h4 className="mt-auto md:mt-0 mb-4 font-semibold text-primary text-xs uppercase tracking-widest">
              Liên hệ
            </h4>
            <div className="space-y-1 font-heading font-semibold text-background text-lg md:text-3xl">
              <p className="">0333.455.889</p>
              <p>duyhoa@gmail.com</p>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: 4 Columns (No vertical dividers) */}
        <div className="gap-y-8 grid grid-cols-2 md:grid-cols-3 p-8 md:p-12 border-white/10 border-b">
          {/* Categories */}
          <div>
            <h4 className="mb-4 font-semibold text-primary text-xs decoration-primary/50 uppercase tracking-widest">
              Liên kết
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-background transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="hover:text-background transition-colors"
                >
                  Thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-background transition-colors"
                >
                  Dự án
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-primary text-xs decoration-primary/50 uppercase tracking-widest">
              Chính sách
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-background transition-colors"
                >
                  Chính sách đại lý
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-background transition-colors"
                >
                  Chính sách bảo hành & đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-background transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 font-semibold text-primary text-xs decoration-primary/50 uppercase tracking-widest">
              Theo dõi chúng tôi
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link
                  href="https://www.facebook.com/Duyhoaltd/"
                  target="_blank"
                  className="hover:text-background transition-colors"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://zalo.me/0333455889"
                  className="hover:text-background transition-colors"
                >
                  Zalo OA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: Copyright */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 p-8 text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Công ty TNHH TM Duy Hoà 68</p>
          <p>Thiết kế cho thị trường vật tư xây dựng</p>
        </div>
      </div>
    </footer>
  );
}
