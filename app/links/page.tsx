import React from 'react';
import { Metadata } from 'next';
import { Bell, Calculator, Award, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';

export const metadata: Metadata = {
  title: AGENT_CONFIG.seo.linksTitle,
  description: AGENT_CONFIG.seo.linksDesc,
  alternates: {
    canonical: `${AGENT_CONFIG.contact.website}/links`,
  },
  openGraph: {
    title: AGENT_CONFIG.seo.linksTitle,
    description: AGENT_CONFIG.seo.linksDesc,
    url: `${AGENT_CONFIG.contact.website}/links`,
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function LinkInBioPage() {
  const actionLinks = [
    {
      href: '/',
      title: 'Đăng Ký Nhắc Hạn Thẻ BHYT',
      subtitle: 'Để lại thông tin, hệ thống tự động nhắn tin nhắc hẹn khi sắp hết hạn thẻ.',
      icon: <Bell className="w-6 h-6 text-amber-500 fill-amber-500/10" />,
      colorBorder: 'hover:border-amber-500/50 focus:ring-amber-500',
    },
    {
      href: '/tinh-muc-dong-bhyt',
      title: 'Tính Tiền Đóng BHYT Gia Đình',
      subtitle: 'Tự toán mức đóng tiền 3 - 6 - 12 tháng theo lương cơ sở 2.530.000 đ.',
      icon: <Calculator className="w-6 h-6 text-emerald-500" />,
      colorBorder: 'hover:border-emerald-500/50 focus:ring-emerald-500',
    },
    {
      href: '/tinh-luong-huu-bhxh',
      title: 'Dự Tính Tiền Lương Hưu BHXH',
      subtitle: 'Áp dụng Luật mới đóng 15 năm tối thiểu. Tính lương hưu trọn đời hằng tháng.',
      icon: <Award className="w-6 h-6 text-blue-500" />,
      colorBorder: 'hover:border-blue-500/50 focus:ring-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 text-slate-200 font-sans flex flex-col justify-between antialiased">
      <main className="w-full max-w-md mx-auto px-4 pt-12 pb-6 flex-1 flex flex-col justify-center items-center">
        <div className="text-center space-y-2.5 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-amber-500/20 mx-auto tracking-tight select-none">
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
            Cổng tiện ích tra cứu và số hóa dịch vụ an sinh xã hội trực tuyến phục vụ bà con nhân dân tại địa bàn {AGENT_CONFIG.serviceArea}.
          </p>
        </div>

        <div className="w-full space-y-3.5">
          {actionLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3.5 items-start text-left transition-all duration-150 hover:bg-white/10 hover:border-white/20 group focus:outline-none focus:ring-2 ${link.colorBorder}`}
            >
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                {link.icon}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <h3 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors tracking-wide uppercase">
                  {link.title}
                </h3>
                <p className="text-[10.5px] text-slate-400 leading-normal font-light">
                  {link.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="w-full mt-6 pt-5 border-t border-white/5 space-y-3">
          <a
            href={`https://zalo.me{AGENT_CONFIG.contact.zaloNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10 transition duration-150"
          >
            <Phone className="w-3.5 h-3.5 fill-white" /> Liên hệ hỗ trợ qua Zalo
          </a>
          <div className="text-[10px] text-slate-500 space-y-1.5 px-1 font-light">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" /> Địa bàn phục vụ: {AGENT_CONFIG.serviceArea}
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" /> Điểm thu bảo hiểm công ích được cấp quyền thuộc VNPost
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-[10px] text-slate-600 border-t border-white/5 bg-black/10">
        <p className="mb-0.5">© 2026 Đại lý BHYT Hồ Thị Thắm</p>
        <p>
          Thiết kế website bởi{' '}
          <a
            href="https://longwebstudio.io.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-amber-400 font-medium underline transition-colors"
          >
            Long Web Studio
          </a>
        </p>
      </footer>
    </div>
  );
}
