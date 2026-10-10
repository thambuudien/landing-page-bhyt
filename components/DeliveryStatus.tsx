'use html';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TrackingData } from '@/types/tracking';

interface DeliveryStatusProps {
  deliveryList: TrackingData['List_TBL_DELIVERY'];
}

export default function DeliveryStatus({ deliveryList }: DeliveryStatusProps) {
  if (!deliveryList || deliveryList.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-2xl border border-emerald-100/80 shadow-sm space-y-3 font-sans text-xs">
      <h4 className="text-sm font-bold uppercase tracking-wide text-emerald-900 flex items-center gap-1.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kết quả giao phát bưu phẩm
      </h4>
      
      <div className="divide-y divide-emerald-100/60 text-[11px] text-emerald-900 font-medium">
        {deliveryList.map((delivery, index) => (
          <div key={index} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
            <p>Trạng thái phát: <span className="text-emerald-700 font-bold">{delivery.TRANG_THAI}</span></p>
            <p className="font-light">Vị trí cập nhật cuối: <span className="font-medium text-slate-800">{delivery.VI_TRI}</span></p>
            <p className="font-mono text-[10px] text-slate-400 font-light">Thời gian phát: {delivery.NGAY_TRANG_THAI} - {delivery.GIO_TRANG_THAI}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
