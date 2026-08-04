'use client';

import SupplyCapacitySection from '@/components/landing/section-capacity';
import ContactSection from '@/components/landing/section-contact';
import DistributionSection from '@/components/landing/section-distribution';
import HeroSection from '@/components/landing/section-hero';
import ProductsSection from '@/components/landing/section-products';
import ReasonsSection from '@/components/landing/section-reason';
import StatisticsSection from '@/components/landing/section-statistics';

export default function LandingPage() {
  return (
    <div className="*:mx-auto *:lg:px-8 *:px-4 *:sm:px-6 *:container">
      <HeroSection />

      <StatisticsSection />

      <ProductsSection />

      <SupplyCapacitySection />

      <DistributionSection />

      <ReasonsSection />

      <ContactSection />
    </div>
  );
}
