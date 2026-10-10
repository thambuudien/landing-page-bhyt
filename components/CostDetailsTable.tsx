'use html';
'use client';

import React from 'react';
import { PhoneCall, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';
import PaymentQrModal from '@/components/PaymentQrModal'; // Nạp cổng quét mã VietQR động

interface DetailedRateItem {
  order: number;
  label: string;
  discountText: string;
  cost: number;
}

interface CostDetailsTableProps {
  durationMonths: number;
  detailedRates: DetailedRateItem[];
  grandTotal: number;
  formatVnd: (val: number) => string;
}

export default function CostDetailsTable({
  durationMonths,
  detailedRates,
  grandTotal,
  formatVnd,
}: CostDetailsTableProps) {
  return (
    <div className="space-y-4 font-sans text-xs">
      
      {/* BẢNG PHÂN BỔ KINH PHÍ CHI TIẾT THEO QUY ĐỊNH GIẢM TRỪ */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="border-b pb-2 flex justify-between items-center text-slate-900">
          <h5 className="text-sm font-bold uppercase tracking-wide flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600 shrink-0" />
            Chi tiết bảng phân bổ nộp phí
          </h5>
          <span className="text-[10px] font-mono font-medium bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-md">
            Thời hạn: {durationMonths} Tháng
          </span>
        </div>

        {/* Danh sách phân bổ chi tiết từng thành viên đợt này */}
        <div className="space-y-2">
          {detailedRates.map((item) => (
            <div 
              key={item.order} 
              className="flex justify-between items-center p-2.5 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-800 text-[11px]">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-light">{item.discountText}</p>
              </div>
              <span className="font-mono font-bold text-slate-900 text-xs">{formatVnd(item.cost)}</span>
            </div>
          ))}

          {/* Tổng kết tổng số tiền nộp đợt này */}
          <div className="pt-3.5 border-t border-dashed border-slate-200 flex justify-between items-center text-slate-900 font-bold">
            <span className="text-sm tracking-tight">Tổng kinh phí phải nộp đợt này:</span>
            <span className="text-xl font-black text-red-600 font-mono tracking-tight">{formatVnd(grandTotal)}</span>
          </div>
        </div>

        {/* LỢI ÍCH AN SINH GIA HẠN ĐÚNG HẠN */}
        <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 leading-normal">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Quyền lợi tích lũy khi nộp phí thông qua bưu điện:</span>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Đảm bảo dòng chảy tham gia liên tục, duy trì quyền lợi bảo hiểm chi trả 80% - 100% chi phí điều trị đúng tuyến.</span>
          </div>
        </div>
      </div>

      {/* KÊNH NỘP PHÍ DỘNG CHUYỂN KHOẢN QUA VIETQR CỦA CHỊ THẮM */}
      <div className="space-y-2">
        {/* Truyền trực tiếp tổng số tiền nộp đợt này và nội dung ghi chú sang cổng QR */}
        <PaymentQrModal 
          amount={grandTotal} 
          purpose={`GIA HAN BHYT HOGIADINH`} 
        />
      </div>

      {/* KHỐI LIÊN HỆ TRỰC TIẾP ĐẠI LÝ QUA ZALO */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-0.5">
          <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">Tuyên truyền an sinh xã Tiến Thắng</p>
          <h4 className="text-base font-black">Xử lý thủ tục cùng chị Thắm bưu điện</h4>
          <p className="text-[11px] text-amber-400 font-light">{AGENT_CONFIG.serviceArea}</p>
        </div>
        <a
          href={`https://zalo.me/${AGENT_CONFIG.contact.zaloNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow transition shrink-0 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <PhoneCall className="w-3.5 h-3.5 fill-slate-950" /> Liên hệ gia hạn
        </a>
      </div>

    </div>
  );
}
