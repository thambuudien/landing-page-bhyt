'use html';
'use client';
import React, { useState } from 'react';
import HeaderBanner from '@/components/HeaderBanner';
import HeroSection from '@/components/HeroSection';
import QuickLinks from '@/components/QuickLinks'; // 1. Nạp thêm khối liên kết nhanh
import RegistrationForm from '@/components/RegistrationForm';
import CostCalculator from '@/components/CostCalculator';
import RisksSection from '@/components/RisksSection';
import LookupPanel from '@/components/LookupPanel';
import AgentInfoPanel from '@/components/AgentInfoPanel';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function BHYTLandingPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleRefreshLookup = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <HeaderBanner />
        <HeroSection />
        
        {/* CONTAINER CHÍNH */}
        <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
          
          {/* 2. CHÈN KHỐI TIỆN ÍCH LÊN ĐẦU TRANG CHỦ */}
          <QuickLinks />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <RegistrationForm onSuccess={handleRefreshLookup} />
              <CostCalculator />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <RisksSection />
              <LookupPanel refreshTrigger={refreshTrigger} />
              <AgentInfoPanel />
              <FaqSection />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
