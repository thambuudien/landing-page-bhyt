'use html';
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, RefreshCw, AlertCircle } from 'lucide-react';
import { TrackingData } from '@/types/tracking';
import TrackingInfoCard from './TrackingInfoCard';
import TrackingTimeline from './TrackingTimeline';
import DeliveryStatus from './DeliveryStatus';

function TrackingRuntime() {
  // Trích xuất tham số 'q' từ URL Query chính xác theo yêu cầu (?q=MÃ_VẬN_ĐƠN)
  const searchParams = useSearchParams();
  const itemCode = searchParams.get('q')?.trim().toUpperCase();

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      // Nếu không có mã vận đơn trên URL, không thực hiện gọi API bưu chính
      if (!itemCode) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // Gọi trực tiếp đến cổng API MyEMS theo mã vận đơn q thu thập được
        const response = await fetch(
            `https://api.myems.vn/TrackAndTraceItemCode?language=0&itemcode=${itemCode+'EMS'}`
        );
        
        if (!response.ok) {
          throw new Error(`Lỗi hệ thống máy chủ kết nối bưu chính (HTTP ${response.status})`);
        }

        const data = await response.json();
        setTrackingData(data);
      } catch (err: unknown) {
        console.error('Error fetching tracking data:', err);
        setError("Không thể tải thông tin định vị hành trình bưu gửi lúc này. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [itemCode]); // Lắng nghe sự thay đổi của itemCode khi người dân bấm tìm kiếm mã mới

  // TRƯỜNG HỢP 1: KHÔNG CÓ MÃ VẬN ĐƠN TRÊN THANH URL QUERY
  if (!itemCode) {
    return (
      <div className="p-6 text-center text-slate-400 bg-white border border-slate-200/60 rounded-2xl font-sans text-xs">
        <Package className="w-8 h-8 mx-auto mb-2 text-slate-300 animate-pulse" />
        Bà con vui lòng nhập mã vận đơn VNPost vào ô tìm kiếm phía trên để xem lịch trình di chuyển bưu phẩm.
      </div>
    );
  }

  // TRƯỜNG HỢP 2: HỆ THỐNG ĐANG GỌI API TRA CỨU TỪ MYEMS
  if (loading) {
    return (
      <div className="p-12 text-center bg-white border border-slate-200/60 rounded-2xl space-y-3 font-sans text-xs">
        <RefreshCw className="w-7 h-7 animate-spin text-blue-600 mx-auto" />
        <p className="text-slate-600 font-medium">
          Đang truy vấn hành trình bưu gửi <span className="font-mono text-blue-700 font-bold tracking-wide">{itemCode}</span> từ bưu chính...
        </p>
      </div>
    );
  }

  // TRƯỜNG HỢP 3: GẶP LỖI MẠNG HOẶC SAI ĐƯỜNG DẪN GIAO THỨC API
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-start gap-3 font-sans text-xs">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">{error}</p>
          <p className="text-[11px] text-red-700 mt-1">Mẹo: Mã bưu gửi VNPost thường gồm 13 ký tự (Ví dụ: EO108645146VN).</p>
        </div>
      </div>
    );
  }

  // TRƯỜNG HỢP 4: CỔNG API TRẢ VỀ THÔNG BÁO LỖI HOẶC HỒ SƠ RỖNG
  if (!trackingData || trackingData.Message === "An error has occurred." || !trackingData.TBL_INFO) {
    return (
      <div className="p-6 text-center bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl font-sans text-xs">
        Không tìm thấy dữ liệu định vị cho bưu gửi <span className="font-mono font-bold tracking-wide">{itemCode}</span>. Hệ thống bưu chính đang đồng bộ, bà con vui lòng thử lại sau ít phút.
      </div>
    );
  }

  // TRƯỜNG HỢP 5: TRẢ VỀ KẾT QUẢ HÀNH TRÌNH PHÂN LỚP THÀNH CÔNG
  return (
    <div className="space-y-5">
      {/* Thẻ thông tin bưu gửi tổng quan (Người gửi, Người nhận làm mờ bảo mật) */}
      <TrackingInfoCard info={trackingData.TBL_INFO} />

      {/* Dòng thời gian lịch sử các cung chặng di chuyển bưu phẩm */}
      <TrackingTimeline timeline={trackingData.List_TBL_DINH_VI} />

      {/* Trạng thái phát hàng và ký nhận cuối cùng */}
      <DeliveryStatus deliveryList={trackingData.List_TBL_DELIVERY} />
    </div>
  );
}

// COMPONENT ĐẦU CUỐI BỌC KHỐI SUSPENSE ĐỂ ĐẢM BẢO NEXT.JS BIÊN DỊCH SERVER-SIDE KHÔNG BỊ SẬP
export default function TraCuuVanDon() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-slate-400 font-sans text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-slate-300" />
        Đang tải cổng điều hướng định vị bưu gửi...
      </div>
    }>
      <TrackingRuntime />
    </Suspense>
  );
}
