import { NextResponse } from 'next/server';

const GET_BHYT_REMINDERS_QUERY = `
  query GetPublicBhytReminders($search: String) {
    bhytReminders(search: $search) {
      id
      hoTen
      maSoBhxh
      soDienThoaiNhacHan
      tinhTrangHanThe
      createdAt
    }
  }
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryText = (searchParams.get('q') || '').trim();

    const targetEndpoint = process.env.WORDPRESS_GRAPHQL_URL || 'https://hotham.vn/wordpress/rYkOy1HCCRD0JZZcrshVYaUR39QfcG15QWUC437BMM5Pk3gNLu';
    const targetToken = process.env.WORDPRESS_AUTH_TOKEN;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json', 'lws-hotham-secret-token' : 'f4e18c5d6c2645e5981a837904c7b8d3'
    };
    if (targetToken) {
      headers['Authorization'] = targetToken;
    }

    // Gửi GraphQL Query sang WordPress Engine
    const wpResponse = await fetch(targetEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: GET_BHYT_REMINDERS_QUERY,
        variables: {
          search: queryText || null, // Nếu trống thì lấy danh sách tổng, ngược lại thì tìm kiếm lọc
        },
      }),
      next: { revalidate: 10 }, // Lưu bộ nhớ đệm cache 10 giây để bảo vệ tài nguyên máy chủ WordPress
    });

    const wpResult = await wpResponse.json();

    if (!wpResponse.ok || wpResult.errors) {
      return NextResponse.json(
        { success: false, errors: wpResult.errors || [{ message: 'Lỗi máy chủ WordPress.' }] },
        { status: 500 }
      );
    }

    const rawList = wpResult.data?.bhytReminders || [];

    // Bộ lọc định dạng dữ liệu đầu ra và làm mờ an toàn chuỗi ký tự nhạy cảm (Data Masking)
    const formattedResults = rawList.map((row: any) => ({
      id: row.id,
      fullName: row.hoTen,
      // Bảo mật nghiêm ngặt thông tin căn cước/mã số bảo hiểm xã hội và số điện thoại của dân
      maskedCode: row.maSoBhxh.length > 6 
        ? `${row.maSoBhxh.slice(0, 3)}xxx${row.maSoBhxh.slice(-3)}` 
        : '***',
      maskedPhone: row.soDienThoaiNhacHan.length > 4 
        ? `${row.soDienThoaiNhacHan.slice(0, 4)}xxx${row.soDienThoaiNhacHan.slice(-3)}` 
        : '***',
      cardExpiryHint: row.tinhTrangHanThe || 'Chờ tra cứu',
      createdAt: row.createdAt,
    }));

    return NextResponse.json({
      success: true,
      totalCount: formattedResults.length,
      results: formattedResults,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, errors: [{ message: 'Lỗi kết nối đồng bộ cơ sở dữ liệu.' }] },
      { status: 500 }
    );
  }
}
