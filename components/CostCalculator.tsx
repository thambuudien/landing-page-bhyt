'use client';
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const BASE_SALARY = 2340000;
const FULL_ANNUAL_BHYT = BASE_SALARY * 0.045 * 12;

const HOUSEHOLD_RATES = [
  { order: 1, label: 'Người thứ 1', ratio: 1.0, text: '100% mức chuẩn' },
  { order: 2, label: 'Người thứ 2', ratio: 0.7, text: '70% (Giảm 30%)' },
  { order: 3, label: 'Người thứ 3', ratio: 0.6, text: '60% (Giảm 40%)' },
  { order: 4, label: 'Người thứ 4', ratio: 0.5, text: '50% (Giảm 50%)' },
];

export default function CostCalculator() {
  const [memberCount, setMemberCount] = useState<number>(1);

  const calculateTotal = () => {
    let total = 0;
    for (let i = 1; i <= memberCount; i++) {
      const rate = HOUSEHOLD_RATES[Math.min(i - 1, HOUSEHOLD_RATES.length - 1)];
      total += FULL_ANNUAL_BHYT * (rate?.ratio || 0.4);
    }
    return new Intl.NumberFormat('vi-VN').format(Math.round(total)) + ' đ';
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold"><Calculator className="w-5 h-5 text-indigo-600" /> Dự toán đóng tiền BHYT Hộ Gia Đình</div>
      <div className="mb-4 text-xs">
        <label className="block font-semibold text-slate-600 mb-1">Số thành viên cùng tham gia:</label>
        <input type="number" min="1" max="10" value={memberCount} onChange={(e) => setMemberCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-3 py-1.5 rounded-lg border focus:outline-none" />
      </div>
      <div className="bg-slate-900 text-white p-4 rounded-xl text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Tổng kinh phí đóng tiền (12 Tháng):</p>
        <p className="text-xl font-black text-amber-400 mt-1">{calculateTotal()}</p>
      </div>
    </div>
  );
}
