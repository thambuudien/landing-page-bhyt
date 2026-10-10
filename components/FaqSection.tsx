'use client';
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question:
        "Quyền lợi '5 năm liên tục' là gì và tại sao không được để thẻ quá hạn?",
      answer:
        'Khi tham gia BHYT đủ 5 năm liên tục trở lên và có số tiền cùng chi trả chi phí khám chữa bệnh trong năm lớn hơn 6 tháng lương cơ sở, bạn sẽ được quỹ BHYT thanh toán 100% chi phí khám chữa bệnh đúng tuyến. Nếu bạn để thẻ quá hạn trên 3 tháng (90 ngày), chuỗi thời gian liên tục này sẽ bị ngắt và phải tích lũy lại từ đầu.',
    },
    {
      question:
        'Đăng ký nhắc hạn ở đây có mất phí không? Tôi gia hạn online bằng cách nào?',
      answer:
        'Dịch vụ đăng ký nhắc lịch và tra cứu hoàn toàn miễn phí vì đây là cổng công ích của Đại lý bưu điện xã Tiến Thắng. Khi nhận được thông báo sắp hết hạn, bạn chỉ cần gửi ảnh chụp thẻ cũ hoặc CCCD qua Zalo chị Thắm (0978333963), chuyển khoản học phí đóng bảo hiểm và nhận biên lai bưu điện gửi về tận nhà mà không cần đi lại.',
    },
    {
      question:
        'Mức giảm trừ đóng tiền BHYT theo Hộ gia đình hiện nay được tính như thế nào?',
      answer:
        'Mức đóng được tính giảm dần dựa trên mức lương cơ sở hiện hành. Người thứ nhất đóng 100% mức chuẩn (1.263.600 đ/năm). Người thứ hai đóng 70% mức người thứ nhất. Người thứ ba đóng 60%. Người thứ tư đóng 50%. Từ người thứ năm trở đi chỉ còn đóng 40% mức chuẩn, giúp tiết kiệm tối đa kinh phí cho cả nhà.',
    },
    {
      question:
        'Nếu thẻ BHYT của tôi đã lỡ hết hạn, đóng tiền muộn thì bao lâu mới dùng lại được?',
      answer:
        'Nếu thẻ đã quá hạn, khi bạn đóng tiền gia hạn muộn thì thẻ BHYT sẽ không có giá trị sử dụng ngay lập tức. Theo quy định, thẻ của bạn sẽ phải chờ đợi đúng 30 ngày kể từ ngày đóng tiền bưu điện cập nhật hệ thống thì mới có giá trị khám chữa bệnh trở lại.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
      <div className="border-b pb-3 mb-4">
        <div className="flex items-center gap-2 text-indigo-700 font-bold mb-0.5">
          <HelpCircle className="w-5 h-5" />
          <h3 className="text-sm uppercase tracking-wide">Giải đáp thắc mắc</h3>
        </div>
        <h4 className="text-base font-black text-slate-900 tracking-tight">
          Hỏi Đáp Nhanh Về Bảo Hiểm Y Tế Hộ Gia Đình
        </h4>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-3.5 text-left flex justify-between items-start gap-3 font-semibold text-xs text-slate-800 hover:text-blue-700 transition-colors focus:outline-none"
              >
                <span>
                  {index + 1}. {faq.question}
                </span>
                <span className="shrink-0 mt-0.5 text-slate-400">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-[11px] text-slate-600 leading-relaxed font-light border-t border-slate-100 pt-2.5 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
