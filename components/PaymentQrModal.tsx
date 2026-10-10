'use html';
'use client';

import React, { useState } from 'react';
import { QrCode, X, Copy, Check, ShieldCheck, Landmark } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';

interface PaymentQrModalProps {
  amount?: number; // Cho phép truyền số tiền động từ bộ tính toán phí sang
  purpose?: string; // Nội dung chuyển khoản động (Ví dụ: BHYT NGUYEN VAN A)
}

export default function PaymentQrModal({ amount = 0, purpose = "" }: PaymentQrModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Thông tin cấu hình tài khoản Vietcombank của chị Thắm
  const BANK_CONFIG = {
    bin: "970436", // Mã BIN chuẩn của Ngân hàng Vietcombank
    accountNumber: "0711000234239",
    accountName: "HO THI THAM",
  };

  // Làm sạch nội dung chuyển khoản tiếng Việt không dấu để chuẩn hóa chuỗi VietQR
  const cleanPurpose = purpose
    ? purpose
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toUpperCase()
    : `GIA HAN BH`;

  // Khởi tạo đường dẫn ảnh mã QR theo chuẩn Quick Link chính xác của VietQR
  // Cú pháp đúng: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.jpg?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>
  const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bin}-${BANK_CONFIG.accountNumber}-qr_only.jpg?amount=${amount}&addInfo=${encodeURIComponent(cleanPurpose)}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;
  const handleCopyStk = () => {
    navigator.clipboard.writeText(BANK_CONFIG.accountNumber);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="font-sans text-xs">
      {/* NÚT BẤM MỞ MÃ QR THANH TOÁN */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 px-4 rounded-xl shadow transition duration-150 flex items-center justify-center gap-1.5 uppercase tracking-wider text-[11px]"
      >
        <QrCode className="w-4 h-4 shrink-0" /> Quét mã QR nộp tiền nhanh
      </button>

      {/* GIAO DIỆN MODAL HỘP THOẠI (POPUP) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col relative">
            
            {/* TIÊU ĐỀ HỘP THOẠI */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-slate-900">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs uppercase tracking-wide">Kênh Nộp Phí Công Ích Trực Tuyến</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* THÂN CONTAINER CHỨA MÃ QR */}
            <div className="p-5 flex flex-col items-center text-center space-y-4">
              <p className="text-[11px] text-slate-500 leading-normal">
                Bà con mở ứng dụng Ngân hàng trên điện thoại, quét mã QR dưới đây để điền tự động thông tin nộp phí an sinh.
              </p>

              {/* KHUNG HIỂN THỊ MÃ QR */}
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-inner relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={qrUrl} 
                  alt="Mã QR Chuyển Khoản Vietcombank Hồ Thị Thắm" 
                  className="w-48 h-48 object-contain rounded-lg select-none"
                  loading="lazy"
                />
              </div>

              {/* THÔNG TIN CHI TIẾT TÀI KHOẢN ĐỐI CHIẾU */}
              <div className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-left space-y-1.5 font-mono text-[11px]">
                <p className="text-slate-500">Ngân hàng: <span className="text-slate-900 font-bold font-sans text-xs">Vietcombank</span></p>
                <p className="text-slate-500">Chủ tài khoản: <span className="text-slate-900 font-bold uppercase">{BANK_CONFIG.accountName}</span></p>
                
                <div className="flex justify-between items-center text-slate-500">
                  <span>Số tài khoản: <span className="text-slate-900 font-bold">{BANK_CONFIG.accountNumber}</span></span>
                  <button
                    type="button"
                    onClick={handleCopyStk}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded border border-transparent transition-all"
                    title="Sao chép số tài khoản"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {amount > 0 && (
                  <p className="text-slate-500 border-t pt-1.5 border-dashed mt-1.5">
                    Số tiền đợt này: <span className="text-red-600 font-black text-xs font-mono">{new Intl.NumberFormat('vi-VN').format(amount)} đ</span>
                  </p>
                )}
                {purpose && (
                  <p className="text-slate-500 truncate">
                    Nội dung ghi chú: <span className="text-blue-700 font-bold">{cleanPurpose}</span>
                  </p>
                )}
              </div>

              <div className="w-full bg-blue-50/50 border border-blue-100 p-2.5 rounded-xl flex gap-1.5 items-start text-left text-[10px] text-slate-600 leading-normal">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Hệ thống VietQR bảo mật, tiền chuyển khoản được bưu điện ghi nhận lập tức và cấp biên lai điện tử ngay cho bà con qua số điện thoại Zalo của chị Thắm.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
