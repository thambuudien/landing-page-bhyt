'use html';
'use client';

import React, { useState } from 'react';
import BhxhCalculatorInput from '@/components/BhxhCalculatorInput';
import BhxhResultTable from '@/components/BhxhResultTable';

const POVERTY_LINE = 1500000;  // Căn cứ chuẩn nghèo nông thôn để tính tiền chiết khấu hỗ trợ
const BASE_SALARY = 2530000;   // Hằng số mức lương cơ sở mới nhất hiện hành
const ADJUSTMENT_FACTOR = 1.452; // Hệ số trượt giá áp dụng theo yêu cầu nâng cấp nghiệp vụ

export default function BhxhCalculatorContainer() {
  // Mức cao nhất: Bằng 20 lần mức lương cơ sở (2.530.000 đ * 20 = 50.600.000 đ)
  const maxIncomeLimit = BASE_SALARY * 20; 

  // Mặc định khởi tạo từ mức thu nhập thấp nhất (1.500.000 đ) khi vừa vào trang
  const [incomeChoice, setIncomeChoice] = useState<number>(1500000); 
  const [gender, setGender] = useState<'nam' | 'nu'>('nu');
  
  // Mặc định tích chọn nhóm đối tượng khác đông đảo nhất (Hỗ trợ kép 40%)
  const [supportType, setSupportType] = useState<'chinh_sach_100' | 'uu_dai_50' | 'doi_tuong_40'>('doi_tuong_40');
  const [copied, setCopied] = useState(false);

  const calculateBhxhMetrics = () => {
    // 1. Phí đóng gốc ban đầu chưa giảm trừ = 22% thu nhập căn cứ đóng hằng tháng
    const baseCost = incomeChoice * 0.22;

    // 2. LOGIC TÍNH TỶ LỆ HỖ TRỢ THEO CÁC NGHỊ QUYẾT ĐẶC THÙ CỦA TP. HÀ NỘI
    let totalSupportRatio = 0.40; // Đối tượng khác hỗ trợ kép 40% (20% Trung ương + 20% Hà Nội)
    
    if (supportType === 'chinh_sach_100') {
      totalSupportRatio = 1.0; // Hộ nghèo & cận nghèo tại Hà Nội hỗ trợ trọn gói 100%
    } else if (supportType === 'uu_dai_50') {
      totalSupportRatio = 0.50; // CCB, Cựu quân nhân, TNXP thuộc CLB hỗ trợ 50%
    }

    // Tiền giảm trừ được ngân sách Trung ương và ngân sách Thành phố Hà Nội chi trả bù
    const discount = POVERTY_LINE * 0.22 * totalSupportRatio;

    // Số tiền thực tế bà con cần nộp hằng tháng tại Điểm bưu điện chị Thắm
    const netPay = Math.max(0, Math.round(baseCost - discount));

    // 3. DỰ TOÁN MỨC LƯƠNG HƯU TRỌN ĐỜI CÓ ÁP DỤNG HỆ SỐ TRƯỢT GIÁ 1.452
    // Thu nhập sau trượt giá = Thu nhập lựa chọn ban đầu * 1.452
    const adjustedIncome = incomeChoice * ADJUSTMENT_FACTOR;
    
    // Tỷ lệ hưởng lương hưu quy định ở mốc đóng 15 năm tối thiểu: Nam đạt mốc 40%, Nữ đạt mốc 45%
    const pensionRatio = gender === 'nam' ? 0.4 : 0.45;
    const pension = Math.round(adjustedIncome * pensionRatio);

    return { baseCost, discount, netPay, pension };
  };

  const metrics = calculateBhxhMetrics();

  const formatVnd = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + ' đ';
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Khối Client Input nhận thông số đầu vào từ bà con */}
        <div className="md:col-span-5">
          <BhxhCalculatorInput 
            incomeChoice={incomeChoice}
            setIncomeChoice={setIncomeChoice}
            gender={gender}
            setGender={setGender}
            supportType={supportType}
            setSupportType={setSupportType}
            netPayload={metrics}
            formatVnd={formatVnd}
            copied={copied}
            setCopied={setCopied}
          />
        </div>

        {/* Khối Thẻ bảng hiển thị kết quả trực quan kèm ghi chú hệ số trượt giá */}
        <div className="md:col-span-7">
          <BhxhResultTable 
            incomeChoice={incomeChoice}
            baseCost={metrics.baseCost}
            discount={metrics.discount}
            netPay={metrics.netPay}
            pension={metrics.pension}
            formatVnd={formatVnd}
          />
        </div>
        
      </div>
    </main>
  );
}
