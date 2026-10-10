import { MetadataRoute } from 'next';
import { AGENT_CONFIG } from '@/config/agent';

export default function sitemap(): MetadataRoute.Sitemap {
  // Lấy địa chỉ trang web gốc từ cấu hình tập trung (Mặc định: https://hotham.vn)
  const baseUrl = AGENT_CONFIG.contact.website || 'https://www.hotham.vn';
  const currentDate = new Date();

  // Khai báo danh mục các trang Landing Page an sinh công ích
  const routes = [
    {
      url: '', // Trang chủ: Đăng ký nhắc hạn thẻ BHYT Tiến Thắng
      changeFrequency: 'daily' as const, // Tần suất quét: Hằng ngày (vì có bảng tra cứu cập nhật liên tục)
      priority: 1.0, // Mức độ ưu tiên cao nhất
    },
    {
      url: '/tinh-muc-dong-bhyt', // Trang tính tiền đóng BHYT gia đình lương cơ sở 2.530.000đ
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: '/tinh-luong-huu-bhxh', // Trang dự tính lương hưu BHXH tự nguyện chính sách Hà Nội 100%
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: '/links', // Trang bio chứa mã QR lối tắt tổng đặt tại quầy giao dịch
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate, // Tự động cập nhật ngày sửa đổi mới nhất khi Google quét trang
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
