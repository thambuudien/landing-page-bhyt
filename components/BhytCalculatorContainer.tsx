'use html';
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CalculatorInput from '@/components/CalculatorInput';
import CostDetailsTable from '@/components/CostDetailsTable';

interface BhytCalculatorContainerProps {
  baseSalary: number;
}

const HOUSEHOLD_DECREASE_RATES = [
  { order: 1, ratio: 1.0, discount: 'Mức gốc (100%)', label: 'Thành viên thứ 1' },
  { order: 2, ratio: 0.7, discount: 'Giảm 30% (Còn 70%)', label: 'Thành viên thứ 2' },
  { order: 3, ratio: 0.6, discount: 'Giảm 40% (Còn 60%)', label: 'Thành viên thứ 3' },
  { order: 4, ratio: 0.5, discount: 'Giảm 50% (Còn 50%)', label: 'Thành viên thứ 4' },
  { order: 5, ratio: 0.4, discount: 'Giảm 60% (Còn 40%)', label: 'Thành viên thứ 5 trở đi' },
];

function BhytCalculatorRuntime({ baseSalary }: BhytCalculatorContainerProps) {
  // Bóc tách tham số từ đường dẫn URL
  const searchParams = useSearchParams();
  const urlTongNguoi = searchParams.get('tongNguoi');
  const urlDaCoBHYT = searchParams.get('daCoBHYT');
  const urlThoiHan = searchParams.get('thoiHan');

  // Khởi tạo các React State động
  const [memberCount, setMemberCount] = useState<number>(3); 
  const [alreadyRenewedCount, setAlreadyRenewedCount] = useState<number>(0); 
  const [durationMonths, setDurationMonths] = useState<3 | 6 | 12>(12);
  const [copiedLink, setCopiedLink] = useState(false);

  // Tự động kiểm tra và đồng bộ hóa số liệu từ URL khi trang được nạp
  useEffect(() => {
    if (urlTongNguoi) {
      const parsed = parseInt(urlTongNguoi);
      if (!isNaN(parsed)) setMemberCount(Math.min(15, Math.max(1, parsed)));
    }
    if (urlDaCoBHYT) {
      const parsed = parseInt(urlDaCoBHYT);
      if (!isNaN(parsed)) setAlreadyRenewedCount(Math.min(10, Math.max(0, parsed)));
    }
    if (urlThoiHan) {
      const parsed = parseInt(urlThoiHan);
      if (parsed === 3 || parsed === 6 || parsed === 12) setDurationMonths(parsed);
    }
  }, [urlTongNguoi, urlDaCoBHYT, urlThoiHan]);

  const bhytYearlyStandard = baseSalary * 0.045 * 12; // Lương cơ sở mới 2.530.000đ

  const calculateDetailedRates = () => {
    let totals = [];
    const durationRatio = durationMonths / 12;

    for (let i = 1; i <= memberCount; i++) {
      const currentFamilyOrder = alreadyRenewedCount + i;
      const configIndex = Math.min(currentFamilyOrder - 1, HOUSEHOLD_DECREASE_RATES.length - 1);
      const rateConfig = HOUSEHOLD_DECREASE_RATES[configIndex];
      const finalCost = bhytYearlyStandard * rateConfig.ratio * durationRatio;

      totals.push({
        order: i,
        label: `Thành viên thứ ${i} (Thứ tự hộ: ${currentFamilyOrder})`,
        discountText: rateConfig.discount,
        cost: Math.round(finalCost),
      });
    }
    return totals;
  };

  const detailedRates = calculateDetailedRates();
  const grandTotal = detailedRates.reduce((sum, item) => sum + item.cost, 0);

  const formatVnd = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + ' đ';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-5">
        <CalculatorInput 
          memberCount={memberCount}
          setMemberCount={setMemberCount}
          alreadyRenewedCount={alreadyRenewedCount}
          setAlreadyRenewedCount={setAlreadyRenewedCount}
          durationMonths={durationMonths}
          setDurationMonths={setDurationMonths}
          detailedRates={detailedRates} // Truyền danh sách mảng xuống khối copy
          grandTotal={grandTotal}
          formatVnd={formatVnd}
          copiedLink={copiedLink}
          setCopiedLink={setCopiedLink}
        />
      </div>
      <div className="md:col-span-7">
        <CostDetailsTable 
          durationMonths={durationMonths}
          detailedRates={detailedRates}
          grandTotal={grandTotal}
          formatVnd={formatVnd}
        />
      </div>
    </div>
  );
}

// COMPONENT ĐẦU CUỐI BỌC KHỐI SUSPENSE ĐỂ TRÁNH LỖI BIÊN DỊCH NEXT.JS
export default function BhytCalculatorContainer({ baseSalary }: BhytCalculatorContainerProps) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Suspense fallback={
        <div className="p-8 text-center text-slate-400 font-sans text-xs">
          Đang khởi tạo cấu trúc bảng tính phí BHYT...
        </div>
      }>
        <BhytCalculatorRuntime baseSalary={baseSalary} />
      </Suspense>
    </main>
  );
}
