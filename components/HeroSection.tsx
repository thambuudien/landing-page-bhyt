'use client';
import React from 'react';
import { AGENT_CONFIG } from '@/config/agent';
import { ShieldCheck, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-14 px-4 text-center relative overflow-hidden font-sans">
      {/* Visual background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1.5 mb-5">
          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{' '}
          {AGENT_CONFIG.branding.heroTag}
        </span>

        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
          {AGENT_CONFIG.branding.heroTitle}
        </h2>

        <p className="text-sm md:text-base text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
          {AGENT_CONFIG.branding.heroSubtitle}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Đại lý thu BHXH, BHYT Bưu điện VHX Tự Lập
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Thủ tục Online 5
            phút
          </div>
        </div>
      </div>
    </section>
  );
}
