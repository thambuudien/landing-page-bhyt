'use html';
'use client';

import React from 'react';
import { Bell, Calculator, Award, Phone, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';

export default function LinkInBioPage() {
  // Cấu hình danh sách 3 nút bấm cốt lõi điều hướng dịch vụ công ích
  const actionLinks = [
    {
      href: '/',
      title: 'Đăng Ký Nhắc Hạn Thẻ BHYT',
      subtitle: 'Để lại thông tin, hệ thống tự động nhắn tin nhắc hẹn trước 15 ngày.',
      icon: <Bell className="w-6 h-6 text-amber-500 fill-amber-500/10" />,
      colorBorder: 'hover:border-amber-400 focus:ring-amber-500',
    },
    {
      href: '/tinh-muc-dong-bhyt',
      title: 'Tính Tiền Đóng BHYT Gia Đình',
      subtitle: 'Tự tính mức đóng tiền 3 - 6 - 12 tháng và số tiền được giảm trừ công ích.',
      icon: <Calculator className="w-6 h-6 text-emerald-500" />,
      colorBorder: 'hover:border-emerald-400 focus:ring-emerald-500',
    },
    {
      href: '/tinh-luong-huu-bhxh',
      title: 'Dự Tính Tiền Lương Hưu BHXH',
      subtitle: 'Áp dụng Luật mới đóng 15 năm tối thiểu. Tính lương hưu trọn đời hằng tháng.',
      icon: <Award className="w-6 h-6 text-blue-500" />,
      colorBorder: 'hover:border-blue-400 focus:ring-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 text-slate-200 font-sans flex flex-col justify-between antialiased">
      
      {/* THÂN TRANG BIỂU MẪU ĐIỀU HƯỚNG CHÍNH */}
      <main className="w-full max-w-md mx-auto px-4 pt-10 pb-6 flex-1 flex flex-col justify-center items-center">
        
        {/* KHỐI NHẬN DIỆN THƯƠNG HIỆU CHỊ HỒ THỊ THẮM */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-amber-500/20 mx-auto tracking-tight">
            T
          </div>
          <div className="space-y-0.5">
            <h2 className="text-lg font-black tracking-tight text-white uppercase">
              ĐẠI LÝ BƯU ĐIỆN {AGENT_CONFIG.agentName}
            </h2>
            <p className="text-[11px] text-amber-400 font-medium tracking-wide">
              {AGENT_CONFIG.agentTitle}
            </p>
          </div>
          <p className="text-[10px] text-slate-400 max-w-xs mx-auto font-light leading-relaxed pt-1">
            Cổng tiện ích tra cứu và số hóa dịch vụ an sinh xã hội trực tuyến dành riêng cho bà con nhân dân xã Tiến Thắng.
          </p>
        </div>

        {/* KHỐI 3 NÚT BẤM TIỆN ÍCH CHUYỂN TRANG */}
        <div className="w-full space-y-3.5">
          {actionLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3.5 items-start text-left transition-all duration-200 hover:bg-white/10 group active:scale-[0.99] focus:outline-none focus:ring-2 ${link.colorBorder}`}
            >
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                {link.icon}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <h3 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors tracking-wide uppercase">
                  {link.title}
                </h3>
                <p className="text-[10.5px] text-slate-400 leading-normal font-light truncate-2-lines">
                  {link.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* LIÊN HỆ GIA HẠN TRỰC TIẾP QUA ZALO */}
        <div className="w-full mt-6 pt-5 border-t border-white/5 space-y-3">
          <a
            href={`https://zalo.me{AGENT_CONFIG.contact.zaloNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10 transition"
          >
            <Phone className="w-3.5 h-3.5 fill-white" /> Liên hệ hỗ trợ qua Zalo
          </a>

          {/* THÔNG TIN KHÁC */}
          <div className="text-[10px] text-slate-500 space-y-1.5 px-1 font-light">
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" /> {AGENT_CONFIG.serviceArea}</p>
            <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" /> Điểm thu bảo hiểm ủy quyền chính thức bưu điện</p>
          </div>
        </div>

      </main>

      {/* CHÂN TRANG ĐƯỢC TÍCH HỢP ĐỒNG BỘ ĐỐI TÁC THIẾT KẾ LONG WEB STUDIO */}
      <footer className="w-full py-4 text-center text-[10px] text-slate-600 border-t border-white/5 bg-black/10">
        <p className="mb-0.5">© 2026 Đại lý BHYT Hồ Thị Thắm</p>
        <p>
          Thiết kế hệ thống văn phòng số bởi{' '}
          <a
            href="https://longwebstudio.io.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-amber-400 underline transition-colors"
          >
            Long Web Studio
          </a>
        </p>
      </footer>

    </div>
  );
}
