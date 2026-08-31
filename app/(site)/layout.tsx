import GoogleAnalytics from '@/components/analytics/google-analytics';
import { WebVitals } from '@/components/analytics/web-vitals';
import ContactBubble from '@/components/contact-bubble';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full grow">{children}</main>
      <ContactBubble />
      <Footer />
      <GoogleAnalytics />
      <WebVitals />
    </>
  );
}
