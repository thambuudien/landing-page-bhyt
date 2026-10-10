'use client';
import React from 'react';
import Link from 'next/link';
import { Calculator, Award, ArrowRight } from 'lucide-react';

export default function QuickLinks() {
  const tools = [
    {
      href: '/tinh-muc-dong-bhyt',
      title: 'Tính Phí BHYT Hộ Gia Đình',
      description:
        'Tự động tính mức tiền đóng 3 tháng, 6 tháng, 12 tháng và số tiền được giảm trừ công ích.',
      icon: <Calculator className="w-6 h-6 text-amber-500" />,
      bg: 'hover:border-amber-200 hover:bg-amber-50/20',
      textAction: 'Tính phí ngay',
    },
    {
      href: '/tinh-luong-huu-bhxh',
      title: 'Dự Tính Tiền Lương Hưu BHXH',
      description:
        'Áp dụng Luật mới đóng 15 năm tối thiểu. Dự toán mức lương hưu trọn đời nhận được hằng tháng.',
      icon: <Award className="w-6 h-6 text-blue-500" />,
      bg: 'hover:border-blue-200 hover:bg-blue-50/20',
      textAction: 'Tính lương hưu',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className={`p-5 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-200 flex gap-4 items-start group ${tool.bg}`}
        >
          <div className="p-3 bg-slate-50 border rounded-xl group-hover:bg-white transition-colors shrink-0">
            {tool.icon}
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-1 group-hover:text-blue-700 transition-colors">
              {tool.title}
            </h4>
            <p className="text-slate-500 leading-relaxed font-light">
              {tool.description}
            </p>
            <div className="pt-2 text-blue-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[11px]">
              <span>{tool.textAction}</span>{' '}
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
