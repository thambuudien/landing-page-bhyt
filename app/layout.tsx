import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { AGENT_CONFIG } from "@/config/agent";
import { GoogleAnalytics } from '@next/third-parties/google';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  metadataBase: new URL(AGENT_CONFIG.contact.website || 'https://www.hotham.vn'),
  title: {
    default: AGENT_CONFIG.seo.homeTitle,
    template: `%s | Đại Lý Bưu Điện ${AGENT_CONFIG.agentName}`
  },
  description: AGENT_CONFIG.seo.homeDesc,
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
  // Lấy mã Tracking ID từ biến môi trường (.env)
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-T9ZBGCYC48';
  return (
    <html lang="vi">
      {/* CẬP NHẬT: Thêm text-base và font-medium vào body để phóng to chữ nền */}
      <body className={`${beVietnamPro.variable} font-sans text-[15px] md:text-[16px] font-medium leading-relaxed antialiased bg-slate-50`}>
        {children}
      </body>
      {/* Tự động nhúng Google Analytics mà không gây block luồng render chính */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
