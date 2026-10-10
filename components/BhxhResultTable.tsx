'use html';
'use client';

import React, { useState } from 'react';
import { PhoneCall, ShieldCheck, CheckCircle2, Award, QrCode } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';
import PaymentQrModal from '@/components/PaymentQrModal'; // Sử dụng lại cấu phần VietQR đã tạo

interface BhxhResultTableProps {
  incomeChoice: number;
  baseCost: number;
  discount: number;
  netPay: number;
  pension: number;
  formatVnd: (val: number) => string;
}

export default function BhxhResultTable({
  incomeChoice,
  baseCost,
  discount,
  netPay,
  pension,
  formatVnd,
}: BhxhResultTableProps) {
  // Trạng thái lưu chu kỳ đóng dồn do bà con lựa chọn (mặc định là đóng hằng tháng - 1 tháng)
  const [paymentPeriod, setPaymentPeriod] = useState<1 | 3 | 6 | 12>(1);

  // Tính tổng số tiền thực nộp dồn theo chu kỳ tương ứng
  const totalPeriodCost = netPay * paymentPeriod;

  // Định dạng chuỗi ghi chú chuyển khoản VietQR chuẩn hóa không dấu
  const getQrPurpose = () => {
    return `NOP PHI BHXH ${paymentPeriod} THANG`;
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* KHỐI BẢNG HIỂN THỊ CHI TIẾT KẾT QUẢ ĐỐI CHIẾU */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 text-slate-900 font-bold text-sm uppercase tracking-wide">
          <Award className="w-4 h-4 text-amber-500 shrink-0" />
          <h5>Kết quả dự tính lương hưu (Đóng 15 năm)</h5>
        </div>
        
        <div className="space-y-2.5">
          {/* Mức thu nhập lựa chọn làm căn cứ */}
          <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50/60 border border-slate-100">
            <span className="text-slate-600">Thu nhập đăng ký làm căn cứ đóng:</span>
            <span className="font-mono font-bold text-slate-900">{formatVnd(incomeChoice)}</span>
          </div>

          {/* Mức đóng gốc quy định */}
          <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50/60 border border-slate-100">
            <span className="text-slate-600">Mức đóng quy định gốc (22%):</span>
            <span className="font-mono font-bold text-slate-900">{formatVnd(baseCost)}</span>
          </div>

          {/* Số tiền được Nhà nước và TP. Hà Nội ưu đãi */}
          <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-emerald-900">
            <span className="font-medium">Tiền Ngân sách Nhà nước & TP hỗ trợ:</span>
            <span className="font-mono font-bold text-emerald-700">- {formatVnd(discount)}</span>
          </div>

          {/* Số tiền thực tế bà con cần nộp hằng tháng */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 font-bold text-sm">
            <span>Số tiền bà con thực nộp hằng tháng:</span>
            <span className="font-mono text-base font-black text-blue-700">{formatVnd(netPay)} / tháng</span>
          </div>

          {/* Mức lương hưu dự kiến nhận về sau trượt giá */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">
            <div>
              <p className="text-amber-900 font-black">Lương hưu dự kiến nhận lại:</p>
              <p className="text-[10px] text-amber-700 font-normal mt-0.5">
                * Đã nhân hệ số trượt giá <strong className="text-amber-900">1.452</strong> bảo vệ giá trị đồng tiền
              </p>
            </div>
            <span className="font-mono text-base font-black text-amber-600 shrink-0">{formatVnd(pension)} / tháng</span>
          </div>
        </div>

        {/* CÁC QUYỀN LỢI AN SINH ĐI KÈM KHI NHẬN LƯƠNG HƯU */}
        <div className="mt-2 pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Quyền lợi an sinh đi kèm trọn đời:</span>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Được cấp **thẻ BHYT miễn phí trọn đời** suốt thời gian hưởng lương hưu, quỹ BHYT chi trả lên đến 95% viện phí khi đi khám chữa bệnh.</span>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Chế độ tử tuất và trợ cấp mai táng bằng 10 tháng lương cơ sở, tương đương **25.300.000 đ** tại thời điểm từ trần.</span>
          </div>
        </div>
      </div>

      {/* KHỐI MỚI: CHỌN CHU KỲ ĐÓNG DỒN ĐỂ ĐẨY SỐ TIỀN SANG MÃ QR */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700 uppercase tracking-wide">
            Chọn phương thức / chu kỳ đóng dồn đợt này:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {([1, 3, 6, 12] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setPaymentPeriod(period)}
                className={`py-2 px-1 text-center font-bold border rounded-xl transition text-[11px] ${
                  paymentPeriod === period
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {period === 1 ? '1 Tháng' : `${period} Tháng`}
              </button>
            ))}
          </div>
        </div>

        {/* Khung tổng hợp kinh phí đóng dồn theo chu kỳ */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-slate-900 font-medium">
          <span>Tổng số tiền đóng đợt này ({paymentPeriod} tháng):</span>
          <span className="font-mono font-black text-sm text-blue-700">{formatVnd(totalPeriodCost)}</span>
        </div>

        {/* NÚT KÍCH HOẠT QUÉT MÃ VIETQR THANH TOÁN ĐỘNG */}
        <PaymentQrModal 
          amount={totalPeriodCost} 
          purpose={getQrPurpose()} 
        />
      </div>

      {/* DANH THIẾP LIÊN HỆ ĐĂNG KÝ ONLINE QUA ZALO CHỊ THẮM */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-0.5">
          <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">Tư vấn lập sổ bảo hiểm trực tuyến</p>
          <h4 className="text-base font-black">Lập sổ an sinh cùng chị Thắm</h4>
          <p className="text-[11px] text-amber-400 font-light">{AGENT_CONFIG.serviceArea}</p>
        </div>
        <a
          href={`https://zalo.me/${AGENT_CONFIG.contact.zaloNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow transition shrink-0 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <PhoneCall className="w-3.5 h-3.5 fill-slate-950" /> Liên hệ làm sổ ngay
        </a>
      </div>
    </div>
  );
}
