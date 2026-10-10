'use client';
import React from 'react';
import { AGENT_CONFIG } from '@/config/agent';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-[11px] py-6 border-t border-slate-800 text-center space-y-3 font-sans">
      {/* Khối thông tin bản quyền của Đại lý */}
      <div className="space-y-1">
        <p className="font-medium text-slate-300">
          {AGENT_CONFIG.branding.copyright}
        </p>
        <p className="text-slate-500">
          Điểm phục vụ chính thức: {AGENT_CONFIG.serviceArea}.
        </p>
      </div>

      {/* Khối ghi nhận đơn vị thiết kế website độc quyền */}
      <div className="longwebstudio-credit text-slate-500 text-[10px] pt-2.5 border-t border-slate-800/80 max-w-sm mx-auto flex items-center justify-center gap-1">
        <span>Thiết kế website bởi</span>
        <a
          href="https://www.longwebstudio.io.vn/"
          target="_blank"
          rel="noopener noreferrer"
          title="Long Web Studio - Thiết kế website cho nhân viên thu BHXH, BHYT"
          className="text-slate-400 hover:text-amber-400 font-medium underline underline-offset-2 transition-colors duration-150 inline-flex items-center gap-0.5"
        >
          Long Web Studio <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </footer>
  );
}
