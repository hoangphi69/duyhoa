import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist_Mono, Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

const merriweatherHeading = Merriweather({
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  // Bắt buộc: giúp Next tự resolve URL tương đối trong OG/canonical
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.brand.shortName} – ${siteConfig.brand.positioning}`,
    template: `%s | ${siteConfig.brand.shortName}`, // E.g: "Đăng ký Đại lý | Duy Hoà 68"
  },

  description: siteConfig.brand.description,

  applicationName: siteConfig.brand.shortName,
  category: 'Vật liệu xây dựng',

  keywords: [
    'vật liệu xây dựng',
    'thiết bị điện nước',
    'thiết bị vệ sinh',
    'phân phối dự án',
    'đại lý',
    'Duy Hoà 68',

    'nhà phân phối thiết bị điện Quảng Ninh',
    'tổng kho điện nước Uông Bí',
    'đại lý dây cáp điện Trần Phú',
    'phân phối ống nhựa Tiền Phong',
    'vật tư điện nước công trình Hải Phòng',
    'nhà phân phối cấp 1 Hải Dương',
  ],

  authors: [{ name: siteConfig.brand.fullName, url: siteConfig.url }],
  creator: siteConfig.brand.shortName,
  publisher: siteConfig.brand.fullName,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.brand.shortName} – ${siteConfig.brand.positioning}`,
    description: siteConfig.brand.shortDescription,
    siteName: siteConfig.brand.fullName,
    images: [
      {
        url: '/og/og-default.jpg', // 1200x630, đặt trong /public/og/
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.fullName} – ${siteConfig.brand.positioning}`,
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand.shortName} – ${siteConfig.brand.positioning}`,
    description: siteConfig.brand.shortDescription,
    images: ['/og/og-default.jpg'],
  },

  // Điều khiển index & snippet (quan trọng cho SEO/GEO)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',

  // Tránh iOS tự biến số/địa chỉ thành link xanh phá layout
  formatDetection: { telephone: false, address: false, email: false },

  verification: {
    google: siteConfig.verification.google || undefined,
    other: siteConfig.verification.bing
      ? { 'msvalidate.01': siteConfig.verification.bing }
      : undefined,
  },

  // Meta doanh nghiệp – hữu ích cho AI search & tìm kiếm địa phương
  other: {
    'business:contact_data:street_address': siteConfig.contact.address,
    'business:contact_data:locality': siteConfig.contact.addressRegion,
    'business:contact_data:country_name': 'Việt Nam',
    'business:contact_data:phone_number': siteConfig.contact.hotline,
    'business:contact_data:website': siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={cn(
        'font-sans',
        inter.variable,
        merriweatherHeading.variable,
        geistMono.variable,
      )}
    >
      <body
        className={`${inter.className} min-h-screen flex flex-col mx-auto selection:bg-primary selection:text-primary-foreground scroll-smooth`}
      >
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
