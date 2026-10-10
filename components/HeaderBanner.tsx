'use html';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook nhận diện trang đang hiển thị
import { AGENT_CONFIG } from '@/config/agent';
import { Phone, Home, Calculator, Award } from 'lucide-react';

export default function HeaderBanner() {
  const pathname = usePathname(); // Lấy đường dẫn URL hiện tại để làm sáng menu tương ứng

  // Khai báo cấu hình mảng định tuyến menu liên kết tập trung
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      {/* 1. DẢI BANNER TIÊU ĐỀ PHỤ THƯƠNG HIỆU BƯU ĐIỆN VÀ ĐỊA BÀN XÃ */}
      <div className="bg-amber-500 text-white text-[11px] py-1.5 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-1">
          <p className="font-bold tracking-wide uppercase">
            {AGENT_CONFIG.subHeader}
          </p>
          <p className="opacity-95 font-light">
            Phục vụ bà con:{' '}
            <span className="font-semibold">{AGENT_CONFIG.serviceArea}</span>
          </p>
        </div>
      </div>

      {/* 2. KHU VỰC ĐIỀU HƯỚNG CHÍNH (MAIN NAVIGATION BAR) */}
      <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LOGO ĐỊNH VỊ ĐẠI LÝ CHỊ THẮM */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0 text-center md:text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            T
          </div>
          <div>
            <h1 className="text-slate-900 font-black text-sm tracking-tight uppercase group-hover:text-blue-700 transition-colors">
              {AGENT_CONFIG.agentName}
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              {AGENT_CONFIG.agentTitle}
            </p>
          </div>
        </Link>

        {/* CẤU HÌNH MENU ROUTE LIÊN KẾT ĐIỀU HƯỚNG DÀNH CHO WEBSITE */}
        <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-xs">
          {navigationRoutes.map((route) => {
            // Kiểm tra xem route có trùng với URL hiện tại để bật trạng thái Active (Làm sáng nút)
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

          {/* NÚT HOTLINE GỌI NHANH KHẨN CẤP HIỂN THỊ TRÊN HEADER */}
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
