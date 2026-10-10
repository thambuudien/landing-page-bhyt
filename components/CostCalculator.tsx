'use html';
'use client';

import React, { useState } from 'react';
import { Calculator, Plus, Minus } from 'lucide-react';

const BASE_SALARY = 2530000; 
const FULL_ANNUAL_BHYT = BASE_SALARY * 0.045 * 12; // 1.366.200 đ/năm

const HOUSEHOLD_RATES = [
  { order: 1, ratio: 1.0 },
  { order: 2, ratio: 0.7 },
  { order: 3, ratio: 0.6 },
  { order: 4, ratio: 0.5 },
  { order: 5, ratio: 0.4 },
];

export default function CostCalculator() {
  const [memberCount, setMemberCount] = useState<number>(1);

  // Xử lý tăng an toàn ngầm (Giới hạn tối đa 15 người)
  const handleIncrement = () => {
    setMemberCount((prev) => (prev < 15 ? prev + 1 : prev));
  };

  // Xử lý giảm an toàn ngầm (Giới hạn tối thiểu 1 người)
  const handleDecrement = () => {
    setMemberCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const calculateTotal = () => {
    let total = 0;
    for (let i = 1; i <= memberCount; i++) {
      const rateIndex = Math.min(i - 1, HOUSEHOLD_RATES.length - 1);
      const rate = HOUSEHOLD_RATES[rateIndex];
      total += FULL_ANNUAL_BHYT * (rate?.ratio || 0.4);
    }
    return new Intl.NumberFormat('vi-VN').format(Math.round(total)) + ' đ';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 font-sans text-xs">
      <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm uppercase tracking-wide border-b pb-2">
        <Calculator className="w-5 h-5 text-indigo-600 shrink-0" /> 
        <h2>Dự toán đóng tiền BHYT Hộ Gia Đình</h2>
      </div>
      
      <div className="mb-5 space-y-2">
        <label className="block font-bold text-slate-700 uppercase tracking-wide text-xs">
          Số thành viên cùng tham gia:
        </label>
        
        <div className="flex items-center max-w-[180px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-1">
          {/* NÚT TRỪ: Luôn hiện rõ nét, không bị khóa mờ */}
          <button
            type="button"
            onClick={handleDecrement}
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
          
          {/* NÚT CỘNG: Luôn hiện rõ nét, không bị khóa mờ */}
          <button
            type="button"
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-600 active:scale-95 transition-all focus:outline-none"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-4 rounded-xl text-center shadow-inner">
        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
          Tổng kinh phí đóng tiền đợt này (12 Tháng):
        </p>
        <p className="text-2xl font-mono font-black text-amber-400 mt-1 tracking-tight">
          {calculateTotal()}
        </p>
      </div>
    </div>
  );
}
