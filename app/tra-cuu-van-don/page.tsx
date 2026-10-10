import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Package, Search, PhoneCall, ShieldCheck } from 'lucide-react';
import HeaderBanner from '@/components/HeaderBanner';
import Footer from '@/components/Footer';
import TraCuuVanDon from '@/components/TraCuuVanDon'; // Nạp thành phần runtime tra cứu MyEMS đã tối ưu
import { AGENT_CONFIG } from '@/config/agent';

// CẤU HÌNH METADATA CHUẨN SEO CHO CỔNG TRA CỨU VẬN ĐƠN BƯU ĐIỆN
export const metadata: Metadata = {
  title: `Định Vị Hành Trình Bưu Gửi EMS VNPost - Đại Lý Hồ Thị Thắm`,
  description: `Cổng tra cứu trực tuyến nhật ký di chuyển bưu gửi chuyển phát nhanh EMS của bưu điện Việt Nam VNPost tại xã Tiến Thắng, TP. Hà Nội.`,
  alternates: {
    canonical: `${AGENT_CONFIG.contact.website}/tra-cuu-van-don`,
  },
  openGraph: {
    title: `Định Vị Hành Trình Bưu Gửi EMS VNPost - Đại Lý Hồ Thị Thắm`,
    description: `Cổng tra cứu trực tuyến nhật ký di chuyển bưu gửi chuyển phát nhanh EMS của bưu điện Việt Nam VNPost tại xã Tiến Thắng, TP. Hà Nội.`,
    url: `${AGENT_CONFIG.contact.website}/tra-cuu-van-don`,
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function TraCuuVanDonPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* Thanh menu điều hướng cố định trên cùng */}
        <HeaderBanner />

        {/* TIÊU ĐỀ TRANG CON ĐỊNH VỊ HÀNH TRÌNH BƯU PHẨM */}
        <section className="bg-gradient-to-br from-slate-800 to-indigo-950 text-white py-10 px-4">
          <div className="container mx-auto max-w-3xl text-center space-y-2">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white transition-colors mb-2 border border-indigo-700/60 bg-indigo-950/40 px-3 py-1 rounded-full font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Trang chủ Nhắc Hạn
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
              <Package className="w-7 h-7 text-amber-400" /> Hệ Thống Tra Cứu Định Vị Vận Đơn VNPost
            </h1>
            <p className="text-xs text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
              Dữ liệu đồng bộ trực tiếp từ cổng bưu chính EMS Việt Nam phục vụ bà con nhân dân tại địa bàn {AGENT_CONFIG.serviceArea}.
            </p>
          </div>
        </section>

        {/* BIỂU MẪU NHẬP MÃ VÀ BẢNG HIỂN THỊ HÀNH TRÌNH ĐỘNG */}
        <main className="container mx-auto px-4 py-8 max-w-2xl space-y-5">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 font-sans text-xs">
            
            {/* Thanh tìm kiếm mã vận đơn nội bộ đẩy tham số lên thanh URL */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 uppercase tracking-wide">
                Mã số bưu gửi cần định vị hành trình đợt này:
              </label>
              <form action="/tra-cuu-van-don" method="GET" className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text"
                    name="q"
                    placeholder="Nhập mã 13 ký tự bưu gửi (Ví dụ: EO108645146VN)"
                    className="w-full pl-3 pr-10 py-2 border rounded-xl font-mono font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none uppercase"
                    required
                  />
                  <Package className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 rounded-xl flex items-center gap-1 transition uppercase tracking-wider text-[11px]"
                >
                  <Search className="w-3.5 h-3.5" /> Tra cứu
                </button>
              </form>
            </div>

            {/* Gọi cấu phần Client Runtime xử lý nạp dữ liệu tracking từ MyEMS API */}
            <TraCuuVanDon />

                        {/* Khối trợ giúp gửi hồ sơ chuyển phát nhanh tại bưu cục địa phương Tiến Thắng */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-slate-600 leading-normal font-sans text-xs">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dịch vụ bưu chính tại Tiến Thắng:</span>
              </div>
              <p className="text-[11px] font-light">
                Gửi chuyển phát nhanh hồ sơ, tài liệu qua điểm Bưu điện VHX Tự Lập, Thôn Phú Mỹ, Xã Tiến Thắng, TP. Hà Nội. Phục vụ tại điểm, chuyến thư đi đầu buổi chiều hàng ngày (trừ chủ nhật và ngày nghỉ lễ).
              </p>
              
              <div className="pt-2.5 border-t border-slate-200 flex justify-between items-center text-[11px] mt-1 text-slate-700">
                <div>
                  <p className="font-bold">Giao dịch viên: CHỊ {AGENT_CONFIG.agentName}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Điểm Bưu điện VHX Tự Lập</p>
                </div>
                <a
                  href={`https://zalo.me/${AGENT_CONFIG.contact.zaloNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow transition tracking-wide text-[10px] uppercase focus:outline-none"
                >
                  <PhoneCall className="w-3 h-3 fill-slate-950" /> Nhắn Zalo
                </a>
              </div>
            </div>

            
          </div>
        </main>
      </div>

      {/* Chân trang tích hợp bản quyền bưu điện và ghi nhận đối tác Long Web Studio */}
      <Footer />
    </div>
  );
}
