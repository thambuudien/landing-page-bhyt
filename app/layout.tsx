import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
});

// Cập nhật cấu hình metadata trong file src/app/layout.tsx
export const metadata: Metadata = {
  title: "Đăng Ký Nhắc Hạn Thẻ BHYT - Đại Lý Bưu Điện Hồ Thị Thắm",
  description: "Cổng đăng ký nhắc hẹn gia hạn bảo hiểm y tế hộ gia đình miễn phí tại xã Tiến Thắng, Hà Nội.",
  
  // MỚI: Bổ sung các thẻ khai báo cấu hình hỗ trợ Apple PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bảo Hiểm Chị Thắm',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} font-sans antialiased bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}
