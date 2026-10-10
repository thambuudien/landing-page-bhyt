'use html';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AGENT_CONFIG } from '@/config/agent';
import { Phone, Home, Calculator, Award, Package } from 'lucide-react';

export default function HeaderBanner() {
  const pathname = usePathname();

  const navigationRoutes = [
    {
      path: '/',
      label: 'Trang Chủ Nhắc Hạn',
      icon: <Home className="w-3.5 h-3.5" />,
    },
    {
      path: '/tinh-muc-dong-bhyt',
      label: 'Tính Phí BHYT Gia Đình',
      icon: <Calculator className="w-3.5 h-3.5" />,
    },
    {
      path: '/tinh-luong-huu-bhxh',
      label: 'Tính Lương Hưu BHXH',
      icon: <Award className="w-3.5 h-3.5" />,
    },
  ];

  return (
    /* ĐÃ CẬP NHẬT: Loại bỏ toàn bộ thuộc tính sticky cố định theo yêu cầu của chị */
    <header className="w-full bg-white border-b border-slate-200 font-sans">
      
      {/* 1. DẢI BANNER TIÊU ĐỀ PHỤ THƯƠNG HIỆU BƯU ĐIỆN VÀ ĐỊA BÀN XÃ */}
      <div className="bg-amber-500 text-white text-[11px] py-1.5 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-1">
          <p className="font-bold tracking-wide uppercase">{AGENT_CONFIG.subHeader}</p>
          <p className="opacity-95 font-light">
            Phục vụ bà con: <span className="font-semibold">{AGENT_CONFIG.serviceArea}</span>
          </p>
        </div>
      </div>

      {/* 2. KHU VỰC ĐIỀU HƯỚNG CHÍNH (MAIN NAVIGATION BAR) */}
      <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LOGO ĐỒ HỌA TÍCH HỢP TỆP ẢNH LOGO.PNG */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group shrink-0 text-center md:text-left"
        >
          <div className="relative w-9 h-9 overflow-hidden rounded-xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-150 bg-slate-50 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Logo VNPost" 
              width={36} 
              height={36} 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-slate-900 font-black text-sm tracking-tight uppercase group-hover:text-blue-700 transition-colors">
              ĐẠI LÝ {AGENT_CONFIG.agentName}
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              {AGENT_CONFIG.agentTitle}
            </p>
          </div>
        </Link>

        {/* MENU ĐIỀU HƯỚNG TỰ ĐỘNG CHUYỂN TRANG */}
        <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-xs">
          {navigationRoutes.map((route) => {
            const isActive = pathname === route.path;
            
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {route.icon}
                <span>{route.label}</span>
              </Link>
            );
          })}

          {/* HOTLINE GỌI NHANH */}
          <a
            href={`tel:${AGENT_CONFIG.contact.zaloNumber}`}
            className="md:ml-2 inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-wide py-1.5 px-3 rounded-xl shadow transition duration-150 shrink-0"
          >
            <Phone className="w-3 h-3 animate-pulse" />
            <span>Gọi: {AGENT_CONFIG.contact.phoneDisplay}</span>
          </a>
        </nav>

      </div>
    </header>
  );
}
