import { MetadataRoute } from 'next';
import { AGENT_CONFIG } from '@/config/agent';

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Tên đầy đủ hiển thị dưới dạng nhãn ứng dụng khi cài đặt
    name: `Đại Lý BHXH BHYT Hồ Thị Thắm`,
    
    // Tên viết tắt hiển thị ngay bên dưới icon ở màn hình chính (Màn hình điện thoại)
    short_name: `Bảo Hiểm Chị Thắm`,
    
    description: `Cổng số hóa dịch vụ công ích và tra cứu an sinh xã hội: Nhắc hạn thẻ BHYT tự động, dự toán phí bảo hiểm hộ gia đình và tính lương hưu trọn đời tại xã Tiến Thắng.`,
    
    // Tuyến đường mặc định mở ra khi bà con bấm vào icon ứng dụng
    start_url: '/',
    
    // Chế độ hiển thị: standalone giúp ẩn thanh công cụ của trình duyệt, ứng dụng mở lên toàn màn hình như App tải từ CH Play/App Store
    display: 'standalone',
    
    // Định hướng màn hình: Ưu tiên hiển thị dọc theo màn hình điện thoại di động
    orientation: 'portrait',
    
    // Màu nền của màn hình chờ (Splash Screen) khi ứng dụng đang khởi chạy
    background_color: '#f8fafc', // Màu slate-50 trùng với màu nền website
    
    // Màu sắc của thanh trạng thái (Thanh pin, đồng hồ) ở mép trên điện thoại
    theme_color: '#f59e0b', // Màu amber-500 chuẩn thương hiệu Bưu điện VNPost
    
    // Danh mục icon hiển thị trên màn hình ứng dụng sau khi cài đặt
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable', // Icon hỗ trợ bo góc tự động trên các hệ điều hành Android mới
      },
    ],
  };
}
