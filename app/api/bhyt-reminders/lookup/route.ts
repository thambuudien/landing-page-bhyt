import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Giao diện dữ liệu thô lưu trong tệp JSON (Database Mirror)
interface BhytRawRow {
  id: number;
  full_name: string;
  birth_date: string;
  bhxh_cccd: string;
  phone_number: string;
  card_expiry_hint?: string;
  created_at: string;
  wp_synced?: boolean;
}

// Đường dẫn trỏ tới tệp JSON local lưu trữ bản ghi dữ liệu proxy
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'wp_bhyt_reminders.json');

// Hàm loại bỏ dấu tiếng Việt để tìm kiếm chính xác (Ví dụ: "Thắm" -> "tham")
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase();
}

// Đọc dữ liệu tự động từ tệp JSON local, nếu chưa có sẽ trả về dữ liệu mẫu mặc định
function getLocalRecords(): BhytRawRow[] {
  if (!fs.existsSync(DB_FILE)) {
    // Đảm bảo thư mục lưu trữ tồn tại
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const mockInitialData: BhytRawRow[] = [
      {
        id: 101,
        full_name: 'Nguyễn Văn Hòa',
        birth_date: '1962-05-14',
        bhxh_cccd: '0121456789',
        phone_number: '0912456789',
        card_expiry_hint: 'Tháng 12 hàng năm',
        created_at: '2026-09-18T08:30:00.000Z',
        wp_synced: true,
      },
      {
        id: 102,
        full_name: 'Trần Thị Minh Thu',
        birth_date: '1978-11-20',
        bhxh_cccd: '001178012345',
        phone_number: '0984112233',
        card_expiry_hint: 'Tháng 11 hàng năm',
        created_at: '2026-10-02T14:15:00.000Z',
        wp_synced: true,
      },
    ];
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(mockInitialData, null, 2),
      'utf-8'
    );
    return mockInitialData;
  }

  try {
    const rawData = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(rawData) as BhytRawRow[];
  } catch (error) {
    return [];
  }
}

export async function GET(request: Request) {
  try {
    // Lấy tham số tìm kiếm từ URL Query (?q=...)
    const { searchParams } = new URL(request.url);
    const queryText = (searchParams.get('q') || '').trim().toLowerCase();

    const allRows = getLocalRecords();

    // Trường hợp 1: Người dùng chưa gõ từ khóa -> Trả về 5 bản ghi mới nhất để tối ưu UI/UX
    if (!queryText) {
      const topLatest = allRows.slice(0, 5).map((row) => ({
        id: row.id,
        fullName: row.full_name,
        maskedCode:
          row.bhxh_cccd.length > 6
            ? `${row.bhxh_cccd.slice(0, 3)}xxx${row.bhxh_cccd.slice(-3)}`
            : '***',
        maskedPhone:
          row.phone_number.length > 4
            ? `${row.phone_number.slice(0, 4)}xxx${row.phone_number.slice(-3)}`
            : '***',
        cardExpiryHint: row.card_expiry_hint || 'Chờ tra cứu',
        createdAt: row.created_at,
      }));

      return NextResponse.json({
        success: true,
        totalCount: allRows.length,
        results: topLatest,
      });
    }

    // Trường hợp 2: Lọc tìm kiếm thông minh theo Tên, Số điện thoại hoặc Mã định danh
    const queryCleaned = removeVietnameseTones(queryText);

    const filteredRows = allRows.filter((row) => {
      const nameCleaned = removeVietnameseTones(row.full_name);
      const matchName = nameCleaned.includes(queryCleaned);
      const matchCode = row.bhxh_cccd.includes(queryText);
      const matchPhone = row.phone_number.includes(queryText);

      return matchName || matchCode || matchPhone;
    });

    // Định dạng dữ liệu đầu ra và làm mờ chuỗi ký tự nhạy cảm (Masking Data)
    const formattedResults = filteredRows.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      maskedCode:
        row.bhxh_cccd.length > 6
          ? `${row.bhxh_cccd.slice(0, 3)}xxx${row.bhxh_cccd.slice(-3)}`
          : '***',
      maskedPhone:
        row.phone_number.length > 4
          ? `${row.phone_number.slice(0, 4)}xxx${row.phone_number.slice(-3)}`
          : '***',
      cardExpiryHint: row.card_expiry_hint || 'Chờ tra cứu',
      createdAt: row.created_at,
    }));

    return NextResponse.json({
      success: true,
      totalCount: allRows.length,
      results: formattedResults,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errors: [{ message: 'Lỗi xử lý truy vấn dữ liệu từ bộ nhớ đệm.' }],
      },
      { status: 500 }
    );
  }
}
