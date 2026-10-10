import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "Đăng Ký Nhắc Hạn Thẻ BHYT - Đại Lý Bưu Điện Hồ Thị Thắm",
  description: "Cổng đăng ký nhắc hẹn gia hạn bảo hiểm y tế hộ gia đình miễn phí tại xã Tiến Thắng, Mê Linh, Hà Nội.",
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
