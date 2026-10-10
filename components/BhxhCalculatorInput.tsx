'use html';
'use client';

import React from 'react';
import { Calculator, User, Users, Wallet, Copy, Check } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';

interface BhxhCalculatorInputProps {
  incomeChoice: number;
  setIncomeChoice: (val: number) => void;
  gender: 'nam' | 'nu';
  setGender: (g: 'nam' | 'nu') => void;
  supportType: 'chinh_sach_100' | 'uu_dai_50' | 'doi_tuong_40';
  setSupportType: (t: 'chinh_sach_100' | 'uu_dai_50' | 'doi_tuong_40') => void;
  netPayload: { netPay: number; pension: number };
  formatVnd: (val: number) => string;
  copied: boolean;
  setCopied: (c: boolean) => void;
}

export default function BhxhCalculatorInput({
  incomeChoice,
  setIncomeChoice,
  gender,
  setGender,
  supportType,
  setSupportType,
  netPayload,
  formatVnd,
  copied,
  setCopied,
}: BhxhCalculatorInputProps) {

  const handleCopy = () => {
    const supportText = 
      supportType === 'chinh_sach_100' 
        ? 'Hộ nghèo / Cận nghèo tại Hà Nội (Được hỗ trợ 100%)' 
        : supportType === 'uu_dai_50' 
          ? 'Cựu chiến binh, Cựu quân nhân/CAND/TNXP tại Hà Nội (Được hỗ trợ 50%)' 
          : 'Đối tượng khác tại Hà Nội (Nhà nước 20% + TP hỗ trợ 20% = Hỗ trợ 40%)';

    const text = `Dự tính BHXH Tự Nguyện - Chị Hồ Thị Thắm gửi bạn:\n- Mức thu nhập lựa chọn: ${formatVnd(incomeChoice)}/tháng\n- Nhóm đối tượng ưu đãi: ${supportText}\n- Số tiền nộp thực tế đợt này: ${formatVnd(netPayload.netPay)}/tháng\nLiên hệ tư vấn đóng tiếp BHXH tự nguyện trực tuyến qua Zalo chị Thắm: ${AGENT_CONFIG.contact.phoneDisplay}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-5 font-sans text-xs">
      <div className="flex items-center gap-2 border-b pb-2 text-blue-800 font-bold text-sm uppercase tracking-wide">
        <Calculator className="w-4 h-4 shrink-0" />
        <h5>Thông số tham gia BHXH</h5>
      </div>

      {/* 1. THANH TRƯỢT CHỌN THU NHẬP ĐÓNG ĐỘNG */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide">
            <Wallet className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Mức thu nhập căn cứ đóng:
          </label>
          <span className="font-mono font-bold text-sm text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
            {formatVnd(incomeChoice)} / tháng
          </span>
        </div>
        
        <input 
          type="range"
          min="1500000"
          max="20000000"
          step="500000"
          value={incomeChoice}
          onChange={(e) => setIncomeChoice(parseInt(e.target.value) || 1500000)}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>Thấp nhất: {formatVnd(1500000)}</span>
          <span>Tối đa: {formatVnd(20000000)}</span>
        </div>
      </div>

      {/* 2. CHỌN GIỚI TÍNH TÍNH TỶ LỆ HƯỞNG LƯƠNG HƯU CHUẨN LUẬT MỚI */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide">
          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Giới tính người tham gia:
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['nam', 'nu'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`py-2 rounded-xl font-bold border transition text-[11px] ${
                gender === g 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {g === 'nam' ? 'Nam (Hưởng từ 40%)' : 'Nữ (Hưởng từ 45%)'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PHÂN LOẠI 3 NHÓM ĐỐI TƯỢNG ƯU ĐÃI ĐẶC THÙ THEO CHÍNH SÁCH HÀ NỘI */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wide">
          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Nhóm ưu đãi chính sách đặc thù Hà Nội:
        </label>
        <div className="space-y-2">
          {[
            { id: 'chinh_sach_100', label: 'Hộ nghèo & Hộ cận nghèo (Hỗ trợ tối đa 100%)' },
            { id: 'uu_dai_50', label: 'CCB, Cựu quân nhân, CAND, TNXP thuộc CLB (Hỗ trợ 50%)' },
            { id: 'doi_tuong_40', label: 'Các đối tượng khác cư trú tại Hà Nội (Hỗ trợ kép 40%)' },
          ].map((item) => {
            const isChecked = supportType === item.id;
            return (
              <label 
                key={item.id} 
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition select-none ${
                  isChecked 
                    ? 'bg-blue-50/50 border-blue-200 font-semibold text-blue-900 shadow-sm' 
                    : 'border-slate-100 bg-slate-50/30 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input 
                  type="radio" 
                  name="supportType" 
                  checked={isChecked} 
                  onChange={() => setSupportType(item.id as any)} 
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 bg-white"
                />
                <span className="text-[11px] leading-tight">{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. NÚT SAO CHÉP KẾT QUẢ GỬI ZALO */}
      <button
        type="button"
        onClick={handleCopy}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl uppercase tracking-wider transition shadow-sm mt-3 flex items-center justify-center gap-1.5"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Đã sao chép kết quả thành công</span>
          </>
        ) : (
          <>
            <Calculator className="w-3.5 h-3.5" />
            <span>Sao chép bảng tính gửi Zalo bà con</span>
          </>
        )}
      </button>
    </div>
  );
}
