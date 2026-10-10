'use html';
'use client';

import React from 'react';
import { Calculator, Users, Calendar, UserCheck } from 'lucide-react';
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
  detailedRates: DetailedRateItem[]; // Nhận thêm danh sách chi tiết từ container
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
  
  const copyToClipboard = () => {
    // 1. Tạo chuỗi danh sách chi tiết từng thành viên
    let memberDetailsText = "";
    detailedRates.forEach((item) => {
      memberDetailsText += `+ ${item.label} (${item.discountText}): ${formatVnd(item.cost)}\n`;
    });

    // 2. Tạo đường link động chứa toàn bộ tham số trạng thái hiện tại
    const dynamicShareUrl = `${AGENT_CONFIG.contact.website}/tinh-muc-dong-bhyt?tongNguoi=${memberCount}&daCoBHYT=${alreadyRenewedCount}&thoiHan=${durationMonths}`;

    // 3. Ghép nối thành một tin nhắn Zalo thuyết phục, đầy đủ thông tin
    const text = `Dự toán phí BHYT Hộ gia đình từ Đại lý bưu điện chị Hồ Thị Thắm:\n- Số người gia hạn đợt này: ${memberCount} người\n- Số người đã đóng trước trong năm: ${alreadyRenewedCount} người\n- Thời hạn đóng: ${durationMonths} tháng\n\n📌 Chi tiết từng thành viên:\n${memberDetailsText}\n👉 Tổng số tiền cần nộp đợt này: ${formatVnd(grandTotal)}\n\n👉 Bạn có thể xem trực tiếp hoặc tự tính lại tại đây:\n${dynamicShareUrl}\n\nLiên hệ làm thủ tục gia hạn trực tuyến qua Zalo chị Thắm: ${AGENT_CONFIG.contact.phoneDisplay}`;
    
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4 font-sans text-xs">
      <div className="flex items-center gap-2 border-b pb-2 text-indigo-800 font-bold text-sm uppercase tracking-wide">
        <Calculator className="w-4 h-4" />
        <h5>Thông số tính toán đợt này</h5>
      </div>

      {/* Số người gia hạn đợt này */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide">
          <Users className="w-3.5 h-3.5 text-slate-400" /> Số người gia hạn đợt này:
        </label>
        <input 
          type="number" 
          min="1" 
          max="15"
          value={memberCount}
          onChange={(e) => setMemberCount(Math.min(15, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm text-slate-900"
        />
      </div>

      {/* Số người đã đóng trước trong năm tài chính */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide text-amber-700">
          <UserCheck className="w-3.5 h-3.5 text-amber-500" /> Số người ĐÃ GIA HẠN TRƯỚC (nếu có):
        </label>
        <input 
          type="number" 
          min="0" 
          max="10"
          value={alreadyRenewedCount}
          onChange={(e) => setAlreadyRenewedCount(Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
          className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-1 focus:ring-amber-500 border-amber-200 bg-amber-50/20 focus:outline-none text-sm text-slate-900"
        />
      </div>

      {/* Thời gian đóng đợt này */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> Thời gian đóng đợt này:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([3, 6, 12] as const).map((months) => (
            <button
              key={months}
              type="button"
              onClick={() => setDurationMonths(months)}
              className={`py-2 px-1 text-center font-bold border rounded-xl transition text-[11px] ${
                durationMonths === months 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {months} Tháng
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={copyToClipboard}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
      >
        {copiedLink ? '✓ Đã sao chép' : '📋 Sao chép kết quả gửi Zalo'}
      </button>
    </div>
  );
}
