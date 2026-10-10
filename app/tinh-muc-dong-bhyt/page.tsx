import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HeaderBanner from '@/components/HeaderBanner';
import Footer from '@/components/Footer';
import BhytCalculatorContainer from '@/components/BhytCalculatorContainer';
import { AGENT_CONFIG } from '@/config/agent';

export const metadata: Metadata = {
  title: AGENT_CONFIG.seo.bhytTitle,
  description: AGENT_CONFIG.seo.bhytDesc,
  alternates: {
    canonical: `${AGENT_CONFIG.contact.website}/tinh-muc-dong-bhyt`,
  },
  openGraph: {
    title: AGENT_CONFIG.seo.bhytTitle,
    description: AGENT_CONFIG.seo.bhytDesc,
    url: `${AGENT_CONFIG.contact.website}/tinh-muc-dong-bhyt`,
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function TinhPhyBHYTPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <HeaderBanner />
        <section className="bg-gradient-to-br from-indigo-800 to-slate-900 text-white py-10 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-3">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white transition-colors mb-2 border border-indigo-700/60 bg-indigo-950/40 px-3 py-1 rounded-full font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Trang chủ Nhắc Hạn
            </Link>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Bảng Dự Toán Đối Chiếu Phí BHYT Hộ Gia Đình
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Tự động tính toán theo mức lương cơ sở hiện hành <span className="text-amber-400 font-bold">2.530.000 đ/tháng</span> giúp bà con thôn Phú Mỹ đối chiếu chuẩn xác kinh phí trước khi nộp.
            </p>
          </div>
        </section>
        <BhytCalculatorContainer baseSalary={2530000} />
      </div>
      <Footer />
    </div>
  );
}
