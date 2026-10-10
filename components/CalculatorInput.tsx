'use html';
'use client';

import React from 'react';
import { Calculator, Users, Calendar, UserCheck, Plus, Minus } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';

interface DetailedRateItem {
  order: number;
  label: string;
  discountText: string;
  cost: number;
}

interface CalculatorInputProps {
  memberCount: number;
  setMemberCount: (count: number) => void;
  alreadyRenewedCount: number;
  setAlreadyRenewedCount: (count: number) => void;
  durationMonths: 3 | 6 | 12;
  setDurationMonths: (months: 3 | 6 | 12) => void;
  detailedRates: DetailedRateItem;
  grandTotal: number;
  formatVnd: (val: number) => string;
  copiedLink: boolean;
  setCopiedLink: (copied: boolean) => void;
}

export default function CalculatorInput({
  memberCount,
  setMemberCount,
  alreadyRenewedCount,
  setAlreadyRenewedCount,
  durationMonths,
  setDurationMonths,
  detailedRates,
  grandTotal,
  formatVnd,
  copiedLink,
  setCopiedLink,
}: CalculatorInputProps) {
  
  // Tác vụ cụm nút 1: Tự động khóa ngầm mốc từ 1 đến 15 người
  const handleMemberIncrement = () => {
    setMemberCount((prev) => (prev < 15 ? prev + 1 : prev));
  };
  const handleMemberDecrement = () => {
    setMemberCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Tác vụ cụm nút 2: Tự động khóa ngầm mốc từ 0 đến 10 người đóng trước
  const handleAlreadyIncrement = () => {
    setAlreadyRenewedCount((prev) => (prev < 10 ? prev + 1 : prev));
  };
  const handleAlreadyDecrement = () => {
    setAlreadyRenewedCount((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const copyToClipboard = () => {
    let memberDetailsText = "";
    detailedRates.forEach((item) => {
      memberDetailsText += `+ ${item.label} (${item.discountText}): ${formatVnd(item.cost)}\n`;
    });

    const dynamicShareUrl = `${AGENT_CONFIG.contact.website}/tinh-muc-dong-bhyt?tongNguoi=${memberCount}&daCoBHYT=${alreadyRenewedCount}&thoiHan=${durationMonths}`;

    const text = `Dự toán phí BHYT Hộ gia đình từ Đại lý bưu điện chị Hồ Thị Thắm:\n- Số người gia hạn đợt này: ${memberCount} người\n- Số người đã đóng trước trong năm: ${alreadyRenewedCount} người\n- Thời hạn đóng: ${durationMonths} tháng\n\n📌 Chi tiết từng thành viên:\n${memberDetailsText}\n👉 Tổng số tiền cần nộp đợt này: ${formatVnd(grandTotal)}\n\n👉 Bạn có thể xem trực tiếp hoặc tự tính lại tại đây:\n${dynamicShareUrl}\n\nLiên hệ làm thủ tục gia hạn trực tuyến qua Zalo chị Thắm: ${AGENT_CONFIG.contact.phoneDisplay}`;
    
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5 font-sans text-xs">
      <div className="flex items-center gap-2 border-b pb-2 text-indigo-800 font-bold text-sm uppercase tracking-wide">
        <Calculator className="w-4 h-4" />
        <h5>Thông số tính toán đợt này</h5>
      </div>

      {/* CỤM NÚT 1: LUÔN HIỆN SẮC NÉT */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide text-xs">
          <Users className="w-3.5 h-3.5 text-slate-400" /> Số người gia hạn đợt này:
        </label>
        
        <div className="flex items-center max-w-[180px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-1">
          <button
            type="button"
            onClick={handleMemberDecrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-600 active:scale-95 transition-all focus:outline-none"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input 
            type="number" 
            value={memberCount}
            className="w-full text-center bg-transparent border-none font-mono font-black text-lg text-slate-900 focus:outline-none pointer-events-none"
            readOnly
          />
          
          <button
            type="button"
            onClick={handleMemberIncrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-600 active:scale-95 transition-all focus:outline-none"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CỤM NÚT 2: LUÔN HIỆN SẮC NÉT */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 font-bold text-amber-700 uppercase tracking-wide text-xs">
          <UserCheck className="w-3.5 h-3.5 text-amber-500" /> Số người ĐÃ GIA HẠN TRƯỚC (nếu có):
        </label>
        
        <div className="flex items-center max-w-[180px] bg-amber-50/10 border border-amber-200/60 rounded-xl overflow-hidden p-1">
          <button
            type="button"
            onClick={handleAlreadyDecrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-600 active:scale-95 transition-all focus:outline-none"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input 
            type="number" 
            value={alreadyRenewedCount}
            className="w-full text-center bg-transparent border-none font-mono font-black text-lg text-amber-700 focus:outline-none pointer-events-none"
            readOnly
          />
          
          <button
            type="button"
            onClick={handleAlreadyIncrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-600 active:scale-95 transition-all focus:outline-none"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thời gian đóng đợt này */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> Thời gian đóng đợt này:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['3', '6', '12'] as const).map((months) => {
            const parsedMonths = parseInt(months) as 3 | 6 | 12;
            return (
              <button
                key={months}
                type="button"
                onClick={() => setDurationMonths(parsedMonths)}
                className={`py-2.5 px-1 text-center font-bold border rounded-xl transition text-xs ${
                  durationMonths === parsedMonths 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/10' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {months} Tháng
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={copyToClipboard}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
      >
        {copiedLink ? '✓ Đã sao chép thành công' : '📋 Sao chép kết quả gửi Zalo'}
      </button>
    </div>
  );
}
