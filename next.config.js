/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
  async redirects() {
    return [
      // 1. Chuyển hướng trang con: /cua-hang/abc -> /abc
      {
        source: '/cua-hang/:slug*',
        destination: 'https://shop.hotham.vn/:slug*',
        permanent: true,
      },
      // 2. Chuyển hướng trang chính: /cua-hang -> /
      {
        source: '/cua-hang',
        destination: 'https://shop.hotham.vn/',
        permanent: true,
      },
      {
        source: '/tra-cuu-bhyt',
        destination: '/tinh-muc-dong-bhyt',
        permanent: true,
      },
      {
        source: '/tra-cuu-muc-dong-bhyt-ho-gia-dinh',
        destination: '/tinh-muc-dong-bhyt',
        permanent: true,
      },
      {
        source: '/gia-han-bhyt',
        destination: '/tinh-muc-dong-bhyt',
        permanent: true,
      },
      {
        source: '/tu-van-bhxh',
        destination: '/tinh-luong-huu-bhxh',
        permanent: true,
      },
      {
        source: '/tinh-luong-huu',
        destination: '/tinh-luong-huu-bhxh',
        permanent: true,
      },
      {
        source: '/cau-chuyen-that',
        destination: '/links',
        permanent: true,
      },
      {
        source: '/lien-he',
        destination: '/links',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
