import React from 'react';
import { Metadata } from 'next';
import HeaderBanner from '@/components/HeaderBanner';
import HeroSection from '@/components/HeroSection';
import QuickLinks from '@/components/QuickLinks';
import Footer from '@/components/Footer';
import MainDashboardContainer from '@/components/MainDashboardContainer';
import { AGENT_CONFIG } from '@/config/agent';

// CẤU HÌNH METADATA CHUẨN SEO GOOGLE & ZALO
export const metadata: Metadata = {
  title: AGENT_CONFIG.seo.homeTitle,
  description: AGENT_CONFIG.seo.homeDesc,
  alternates: {
    canonical: AGENT_CONFIG.contact.website,
  },
  openGraph: {
    title: AGENT_CONFIG.seo.homeTitle,
    description: AGENT_CONFIG.seo.homeDesc,
    url: AGENT_CONFIG.contact.website,
    siteName: `Đại lý BHXH BHYT Hồ Thị Thắm`,
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function BHYTLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <HeaderBanner />
        <HeroSection />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
          <QuickLinks />
          <MainDashboardContainer />
        </main>
      </div>
      <Footer />
    </div>
  );
}
