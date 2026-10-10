'use client';
import React from 'react';
import { ShieldAlert, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export default function RisksSection() {
  const risks = [
    {
      icon: <TrendingUp className="w-6 h-6 text-red-600" />,
      title: 'Gánh Nặng Viện Phí Đột Xuất',
      description:
        'Nếu chẳng may đổ bệnh vào những ngày thẻ hết hạn, bạn sẽ mất hoàn toàn quyền lợi được quỹ bảo hiểm hỗ trợ 80% - 100% chi phí. Mọi khoản tiền thuốc men, giường bệnh, phẫu thuật... bạn phải tự chi trả hoàn toàn, có thể lên tới hàng chục triệu đồng.',
      badge: 'Rủi ro tài chính lớn',
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-orange-600" />,
      title: "Mất Mốc '5 Năm Liên Tục'",
      description:
        'Đây là thiệt thòi lớn nhất. Luật quy định nếu để thẻ quá hạn trên 3 tháng, toàn bộ thời gian tích lũy tham gia trước đó của bạn sẽ bị xóa bỏ. Bạn phải đóng lại từ đầu và chờ đợi thêm 5 năm nữa để được hưởng quyền lợi tối đa của thẻ liên tục.',
      badge: 'Mất quyền lợi tích lũy',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: 'Thời Gian Chờ Đợi 30 Ngày',
      description:
        "Thẻ BHYT đóng muộn sau khi đã hết hạn sẽ không có giá trị sử dụng ngay. Bạn phải mất tới 30 ngày gián đoạn chờ đợi hệ thống phê duyệt thì thẻ mới có hiệu lực trở lại. Trong 30 ngày 'trống' này, gia đình bạn hoàn toàn không được bảo vệ.",
      badge: 'Thẻ không có tác dụng ngay',
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
          <AlertTriangle className="w-5 h-5 animate-bounce" />
          <h3 className="text-sm uppercase tracking-wide">
            Cảnh báo từ Đại lý Bưu điện
          </h3>
        </div>
        <h4 className="text-lg font-black text-slate-900 tracking-tight">
          3 Hậu Quả Nghiêm Trọng Khi Để Thẻ BHYT Hết Hạn
        </h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Đa số người dân tại địa bàn Tiến Thắng thường không để ý ngày hết hạn
          in trên thẻ giấy cũ, dẫn đến những thiệt thòi đáng tiếc về quyền lợi
          an sinh:
        </p>
      </div>

      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-red-50/30 hover:border-red-100 transition-all duration-200 flex flex-col sm:flex-row gap-3.5 items-start"
          >
            <div className="p-2.5 bg-white rounded-lg border border-slate-200/60 shadow-sm shrink-0 group-hover:border-red-200">
              {risk.icon}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h5 className="text-sm font-bold text-slate-900 group-hover:text-red-900 transition-colors">
                  {index + 1}. {risk.title}
                </h5>
                <span className="text-[10px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 group-hover:border-red-100 group-hover:text-red-700">
                  {risk.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {risk.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-blue-50/60 border border-blue-100 p-3.5 rounded-xl text-center">
        <p className="text-xs text-blue-900 font-medium">
          💡 Hãy để hệ thống của chúng tôi ghi nhớ thay bạn! Đăng ký ngay phiếu
          bên cạnh để bảo vệ dòng đóng liên tục của cả gia đình.
        </p>
      </div>
    </section>
  );
}
