'use html';
import React from 'react';
import { Package, User } from 'lucide-react';
import { TrackingData } from '@/types/tracking';

interface TrackingInfoCardProps {
  info: TrackingData['TBL_INFO'];
}

export default function TrackingInfoCard({ info }: TrackingInfoCardProps) {
  // Hàm bảo mật làm mờ địa chỉ công dân
  const maskText = (text: string) => {
    if (!text || text.length < 6) return text;
    return text.slice(0, 3) + 'xxx' + text.slice(-3);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3.5 font-sans text-xs">
      <div className="border-b pb-2 flex justify-between items-center text-slate-900 font-bold">
        <h4 className="text-sm uppercase tracking-wide flex items-center gap-1.5">
          <Package className="w-4 h-4 text-blue-600" /> Thông tin bưu gửi tổng quan
        </h4>
        <span className="font-mono bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md">
          {info.MAE1}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-medium">
        <div className="space-y-1.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <p className="text-slate-400 font-normal flex items-center gap-1"><User className="w-3.5 h-3.5" /> Người gửi:</p>
          <p className="text-slate-900 uppercase font-bold">{info.HO_TEN_GUI || 'Bưu điện VNPost'}</p>
          <p className="text-[11px] text-slate-500 font-light truncate">{maskText(info.DIA_CHI_GUI)}</p>
        </div>
        <div className="space-y-1.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
          <p className="text-slate-400 font-normal flex items-center gap-1"><User className="w-3.5 h-3.5" /> Người nhận:</p>
          <p className="text-slate-900 uppercase font-bold">{info.HO_TEN_NHAN || '*****'}</p>
          <p className="text-[11px] text-slate-500 font-light truncate">{info.DIA_CHI_NHAN}</p>
        </div>
      </div>

      <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-[11px] text-slate-600">
        <p>Khối lượng: <span className="text-slate-900 font-bold">{info.KHOI_LUONG} gram</span></p>
        <p>Bưu cục phát: <span className="text-slate-900 font-bold">{info.BC_PHAT}</span></p>
        <p className="col-span-2 sm:col-span-1">Trạng thái hiện tại: <span className="text-blue-700 font-bold font-sans text-xs">{info.TRANG_THAI}</span></p>
      </div>
    </div>
  );
}
