import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HeaderBanner from '@/components/HeaderBanner';
import Footer from '@/components/Footer';
import BhxhCalculatorContainer from '@/components/BhxhCalculatorContainer';
import { AGENT_CONFIG } from '@/config/agent';

export const metadata: Metadata = {
  title: AGENT_CONFIG.seo.bhxhTitle,
  description: AGENT_CONFIG.seo.bhxhDesc,
  alternates: {
    canonical: `${AGENT_CONFIG.contact.website}/tinh-luong-huu-bhxh`,
  },
  openGraph: {
    title: AGENT_CONFIG.seo.bhxhTitle,
    description: AGENT_CONFIG.seo.bhxhDesc,
    url: `${AGENT_CONFIG.contact.website}/tinh-luong-huu-bhxh`,
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function TinhBhxhTuNguyenPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <HeaderBanner />
        <section className="bg-gradient-to-br from-blue-800 to-slate-900 text-white py-10 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-3">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white transition-colors mb-2 border border-blue-700/60 bg-blue-950/40 px-3 py-1 rounded-full font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Trang chủ Nhắc Hạn
            </Link>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Công Cụ Tính Mức Đóng & Dự Tính Lương Hưu BHXH Tự Nguyện
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Hệ thống áp dụng mốc đóng tối thiểu **15 năm** để hưởng lương hưu trọn đời theo quy định pháp luật mới nhất, gieo mầm an sinh tuổi già bền vững.
            </p>
          </div>
        </section>
        <BhxhCalculatorContainer />
      </div>
      <Footer />
    </div>
  );
}
