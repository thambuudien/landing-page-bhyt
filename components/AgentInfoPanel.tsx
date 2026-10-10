'use client';
import React from 'react';
import { Phone, Mail, MapPin, UserCheck, ShieldCheck } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agent';

export default function AgentInfoPanel() {
  return (
    <div className="space-y-4 font-sans">
      {/* DANH THIẾP THƯƠNG HIỆU */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 p-6 rounded-2xl shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-700/60 pb-3">
          <UserCheck className="w-5 h-5 text-amber-400" />
          <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">Đại diện điểm thu bưu điện ủy quyền</h3>
        </div>
        
        <div>
          <p className="text-xl font-black text-white tracking-wide">CHỊ: {AGENT_CONFIG.agentName}</p>
          <p className="text-xs text-amber-400 font-medium mt-0.5">{AGENT_CONFIG.agentTitle}</p>
          <p className="text-[10px] text-slate-500 font-mono mt-1">Mã nhân viên thu: {AGENT_CONFIG.agentCode}</p>
        </div>

        <div className="pt-2 space-y-2.5 text-xs text-slate-400">
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-400 shrink-0" /> 
            Số Zalo hỗ trợ bà con: <a href={`https://zalo.me{AGENT_CONFIG.contact.zaloNumber}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-white font-bold text-sm">{AGENT_CONFIG.contact.phoneDisplay}</a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400 shrink-0" /> 
            Hòm thư điện tử: <a href={`mailto:${AGENT_CONFIG.contact.email}`} className="hover:underline text-white">{AGENT_CONFIG.contact.email}</a>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" /> 
            Địa bàn phục vụ: <span className="text-slate-200 font-medium">{AGENT_CONFIG.serviceArea}</span>
          </p>
        </div>
      </div>

      {/* CAM KẾT UY TÍN TỪ CHỊ THẮM */}
      <div className="bg-blue-50/70 border border-blue-200/80 p-4 rounded-xl text-slate-800 text-[11px] space-y-2">
        <div className="flex items-center gap-1.5 text-blue-800 font-bold">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>3 Cam Kết Vàng Từ Đại Lý Hồ Thị Thắm:</span>
        </div>
        <ul className="list-disc pl-4 space-y-1 text-slate-600 font-light">
          <li><strong>Minh bạch biên lai:</strong> Ngay sau khi gia hạn thành công qua Zalo, bà con sẽ nhận ngay mã biên lai điện tử chuẩn hệ thống VNPost gửi về máy.</li>
          <li><strong>Chính xác tuyệt đối:</strong> Thông tin gia hạn thẻ được cập nhật trực tuyến lên hệ thống BHXH Việt Nam, không lo thất lạc hồ sơ.</li>
          <li><strong>Bảo mật thông tin:</strong> Số CCCD, số điện thoại đăng ký được bảo mật nghiêm ngặt qua cổng API an toàn, cam kết chỉ dùng cho mục đích nhắc hạn thẻ BHYT.</li>
        </ul>
      </div>
    </div>
  );
}
