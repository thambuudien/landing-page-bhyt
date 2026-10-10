'use client';
import React, { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { LookupResultItem } from '../types/bhyt';

interface LookupPanelProps {
  refreshTrigger: number;
}

export default function LookupPanel({ refreshTrigger }: LookupPanelProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LookupResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLookup = async (text: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bhyt-reminders/lookup?q=${encodeURIComponent(text.trim())}`);
      if (res.ok) {
        const json = await res.json();
        setResults(json.results || []);
        setTotal(json.totalCount || 0);
      }
    } catch {
      // Bỏ qua lỗi
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLookup(query);
  }, [query, refreshTrigger]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Cổng tra cứu Tiến Thắng</h3>
          <p className="text-[11px] text-slate-500">Tổng số hồ sơ: {total}</p>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input type="text" placeholder="Tìm tên hoặc CCCD..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full sm:w-52 pl-8 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none" />
        </div>
      </div>
      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-slate-500 font-medium bg-slate-50">
              <th className="py-2 px-3">Họ và tên</th>
              <th className="py-2 px-3">Định danh</th>
              <th className="py-2 px-3">Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-slate-400">
                  <RefreshCw className="w-3 h-3 animate-spin inline mr-1" /> Đang tải...
                </td>
              </tr>
            ) : results.length === 0 ? (
              <tr><td colSpan={3} className="py-4 text-center text-slate-400">Không tìm thấy bản ghi.</td></tr>
            ) : (
              results.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-slate-800 uppercase">{item.fullName}</td>
                  <td className="py-2 px-3 font-mono text-slate-600">{item.maskedCode}</td>
                  <td className="py-2 px-3 text-amber-700 font-medium">{item.cardExpiryHint}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
