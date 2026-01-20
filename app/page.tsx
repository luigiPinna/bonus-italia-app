'use client';

import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { PopularBonuses } from '@/components/landing/popular-bonuses';
import { RecentBonuses } from '@/components/landing/recent-bonuses';
import { CtaSection } from '@/components/landing/cta-section';

export default function HomePage() {
  console.log('release version: 1.2.0');

  return (
    <div className="bg-background">
      <Navbar />
      <HeroSection />
      <PopularBonuses />
      <RecentBonuses />
      <CtaSection />
    </div>
  );
}
