import { MetadataRoute } from 'next';
import { AGENT_CONFIG } from '@/config/agent';

export default function robots(): MetadataRoute.Robots {
  // Lấy địa chỉ trang web gốc từ file cấu hình tập trung (Ví dụ: https://hotham.vn)
  const baseUrl = AGENT_CONFIG.contact.website || 'https://wwww.hotham.vn/';

  return {
    rules: {
      userAgent: '*', // Áp dụng quy tắc cho tất cả các công cụ tìm kiếm
      allow: [
        '/',                      // Cho phép quét Trang chủ nhắc hạn thẻ BHYT
        '/tinh-muc-dong-bhyt',    // Cho phép quét Trang tính phí BHYT hộ gia đình
        '/tinh-luong-huu-bhxh',   // Cho phép quét Trang tính lương hưu BHXH tự nguyện
        '/links',                 // Cho phép quét Trang danh mục lối tắt điều hướng tổng
      ],
      disallow: [
        '/tra-cuu-van-don',
        '/api/',                  // Chặn quét các tuyến API bảo mật nội bộ (/api/register, /api/graphql)
        '/*?*',                   // Chặn quét các URL chứa tham số động để tránh trùng lặp nội dung (Ví dụ: các link chia sẻ chứa ?tongNguoi=...)
      ],
    },
    // Khai báo đường dẫn sơ đồ trang web giúp Google lập chỉ mục nhanh hơn
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
