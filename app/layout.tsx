import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist_Mono, Inter, Merriweather } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';

const merriweatherHeading = Merriweather({
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'My Website',
  description: 'Trang web doanh nghiệp',
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
        className={`${inter.className} min-h-screen flex flex-col mx-auto selection:bg-primary selection:text-primary-foreground`}
      >
        <Navbar />
        <main className="mx-auto w-full grow">{children}</main>
      </body>
    </html>
  );
}
