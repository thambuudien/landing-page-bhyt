'use html';
'use client';
import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { ReminderRecord } from '@/types/bhyt';
import { AGENT_CONFIG } from '@/config/agent';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bhxhCccd, setBhxhCccd] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardExpiryHint, setCardExpiryHint] = useState('Chưa rõ - Nhờ đại lý tra cứu giúp');
  
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ReminderRecord | null>(null);
  const [copiedZaloMsg, setCopiedZaloMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (fullName.trim().length < 2) return setFormError('Vui lòng nhập đầy đủ Họ và tên.');
    if (!birthDate) return setFormError('Vui lòng chọn Ngày sinh.');
    if (!/^\d{12}$/.test(bhxhCccd.replace(/\s+/g, ''))) {
      return setFormError('Mã BHXH (12 số) hoặc CCCD (12 số) không hợp lệ.');
  }
    if (!/^0\d{9}$/.test(phoneNumber.replace(/\s+/g, ''))) return setFormError('Số điện thoại phải gồm 10 chữ số bắt đầu từ số 0.');

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, birthDate, bhxhCccd, phoneNumber, cardExpiryHint }),
      });
      const result = await response.json();

      if (!response.ok || result.errors?.length) {
        setFormError(result.errors?.[0]?.message || 'Có lỗi xảy ra khi lưu dữ liệu.');
        return;
      }

      const resData = result.data?.registerBhytReminder?.record;
      setSubmittedRecord({
        id: resData?.id || Date.now(),
        fullName: fullName.trim(),
        birthDate,
        bhxhCccd,
        phoneNumber,
        createdAt: resData?.createdAt || new Date().toISOString(),
      });
      
      setFullName(''); setBirthDate(''); setBhxhCccd(''); setPhoneNumber('');
      onSuccess();
    } catch {
      setFormError('Lỗi kết nối mạng đến cổng API hệ thống.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareViaZalo = () => {
    if (!submittedRecord) return;
    const msg = `Kính gửi anh/chị ${submittedRecord.fullName}, Đại lý BHYT ${AGENT_CONFIG.agentName} (${AGENT_CONFIG.contact.phoneDisplay}) đã ghi nhận thông tin nhắc hạn thẻ BHYT thành công. Hệ thống sẽ nhắn thông báo khi sắp hết hạn thẻ.`;
    navigator.clipboard.writeText(msg);
    setCopiedZaloMsg(true);
    setTimeout(() => setCopiedZaloMsg(false), 2500);
  };

  if (submittedRecord) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-base"><CheckCircle2 className="w-5 h-5" /> Ghi nhận thành công!</div>
        <div className="bg-white p-4 rounded-xl border border-emerald-100 text-sm space-y-1.5 shadow-inner">
          <p><strong>Công dân:</strong> {submittedRecord.fullName}</p>
          <p><strong>Số định danh:</strong> {submittedRecord.bhxhCccd}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={shareViaZalo} className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs">
            {copiedZaloMsg ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedZaloMsg ? 'Đã copy!' : 'Copy mẫu tin Zalo'}
          </button>
          <button onClick={() => setSubmittedRecord(null)} className="bg-white border text-slate-700 font-bold py-2 px-4 rounded-xl text-xs">Thêm mới</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold text-base border-b pb-2"><Calendar className="w-5 h-5" /> Phiếu Đăng Ký Nhắc Hạn</div>
      {formError && <div className="bg-red-50 border text-red-700 p-3 rounded-xl text-xs flex gap-2 mb-3"><AlertCircle className="w-4 h-4 shrink-0" /> {formError}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold mb-1.5 text-slate-700 text-sm">HỌ VÀ TÊN CÔNG DÂN *</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nhập chữ in hoa có dấu" className="w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-base font-bold text-slate-900 bg-slate-50/50" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1.5 text-slate-700 text-sm">SỐ ĐIỆN THOẠI (ZALO) *</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Số nhận tin" className="w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-base font-mono font-bold text-slate-900 bg-slate-50/50" required />
          </div>
          <div>
            <label className="block font-bold mb-1.5 text-slate-700 text-sm">NGÀY SINH *</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border text-slate-700 focus:outline-none text-base font-medium bg-slate-50/50" required />
          </div>
        </div>
        <div>
          <label className="block font-bold mb-1.5 text-slate-700 text-sm">MÃ SỐ BHXH / CCCD *</label>
          <input type="text" value={bhxhCccd} onChange={(e) => setBhxhCccd(e.target.value)} placeholder="10 số BHXH hoặc 12 số CCCD" className="w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-base font-mono font-bold text-slate-900 bg-slate-50/50" required />
        </div>
        <div>
          <label className="block font-bold mb-1.5 text-slate-700 text-sm">THỜI HẠN HẾT HẠN DỰ KIẾN</label>
          <select value={cardExpiryHint} onChange={(e) => setCardExpiryHint(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none text-sm font-medium text-slate-800">
            <option>Chưa rõ - Nhờ đại lý tra cứu giúp</option>
            <option>Hết hạn vào cuối Tháng 12 năm nay</option>
            <option>Hết hạn vào cuối quý này</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs transition disabled:bg-slate-300 shadow-sm shadow-blue-500/10">
          {isSubmitting ? 'Đang lưu dữ liệu...' : 'Đăng ký nhắc hạn miễn phí'}
        </button>
      </form>
    </div>
  );
}
