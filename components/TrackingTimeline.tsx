'use html';
import React from 'react';
import { Truck, Calendar, MapPin, Phone } from 'lucide-react';
import { TrackingData } from '@/types/tracking';

interface TrackingTimelineProps {
  timeline: TrackingData['List_TBL_DINH_VI'];
}

export default function TrackingTimeline({ timeline }: TrackingTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 font-sans text-xs">
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900 border-b pb-2 mb-4 flex items-center gap-1.5">
        <Truck className="w-4 h-4 text-amber-500" /> Nhật ký lộ trình di chuyển bưu gửi
      </h4>
      
      <div className="relative pl-4 border-l border-slate-200/80 ml-2 space-y-5">
        {timeline.map((item, index) => {
          const isLatest = index === 0;
          return (
            <div key={index} className="relative">
              <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white ${
                isLatest ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-300'
              }`} />
              
              <div className={`p-3 rounded-xl border transition-all ${
                isLatest ? 'bg-blue-50/30 border-blue-100' : 'bg-white border-slate-100'
              }`}>
                <div className="flex justify-between items-center flex-wrap gap-1 mb-1">
                  <span className={`font-bold flex items-center gap-1 ${isLatest ? 'text-blue-900 text-xs' : 'text-slate-800'}`}>
                    {item.TRANG_THAI}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1 font-light">
                    <Calendar className="w-3 h-3" /> {item.NGAY} - {item.GIO}
                  </span>
                </div>
                <p className="text-slate-600 font-light flex items-center gap-1 leading-normal text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Vị trí bưu phẩm: <span className="font-medium text-slate-800">{item.VI_TRI}</span>
                </p>
                {item.DIEN_THOAI && (
                  <p className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Hotline bưu cục: {item.DIEN_THOAI}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
