import { NextResponse } from 'next/server';

const WP_GRAPHQL_MUTATION = `
  mutation RegisterBhytReminder($input: RegisterBhytReminderInput!) {
    registerBhytReminder(input: $input) {
      clientMutationId
      success
      message
      record {
        id
        fullName: hoTen
        createdAt
      }
    }
  }
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, birthDate, bhxhCccd, phoneNumber, cardExpiryHint } = body;

    if (!fullName || !birthDate || !bhxhCccd || !phoneNumber) {
      return NextResponse.json({ errors: [{ message: 'Thiếu dữ liệu bắt buộc.' }] }, { status: 400 });
    }

    const targetEndpoint = process.env.WORDPRESS_GRAPHQL_URL || 'https://hotham.vn/wordpress/rYkOy1HCCRD0JZZcrshVYaUR39QfcG15QWUC437BMM5Pk3gNLu';
    const targetToken = process.env.WORDPRESS_AUTH_TOKEN;

    const headers: Record<string, string> = { 'Content-Type': 'application/json', 'lws-hotham-secret-token' : 'f4e18c5d6c2645e5981a837904c7b8d3' };
    if (targetToken) headers['Authorization'] = targetToken;

    const wpResponse = await fetch(targetEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: WP_GRAPHQL_MUTATION,
        variables: {
          input: {
            clientMutationId: `bhyt_${Date.now()}`,
            fullName: fullName.trim(),
            birthDate,
            bhxhCccd: bhxhCccd.replace(/\s+/g, ''),
            phoneNumber: phoneNumber.replace(/\s+/g, ''),
            cardExpiryHint,
            notes: 'Đăng ký tại Landing Page Đại lý Hồ Thị Thắm',
          },
        },
      }),
    });

    const wpResult = await wpResponse.json();
    if (!wpResponse.ok || wpResult.errors) {
      return NextResponse.json({ errors: wpResult.errors || [{ message: 'Lỗi đồng bộ WordPress.' }] }, { status: 500 });
    }

    return NextResponse.json(wpResult);
  } catch {
    return NextResponse.json({ errors: [{ message: 'Lỗi kết nối mạng nội bộ hệ thống.' }] }, { status: 500 });
  }
}
