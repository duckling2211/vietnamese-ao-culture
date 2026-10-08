import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, mimeType = 'image/jpeg', costumeId, apiKey } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp hình ảnh chân dung của bạn.' },
        { status: 400 }
      );
    }

    if (!costumeId) {
      return NextResponse.json(
        { error: 'Vui lòng chọn bộ cổ phục bạn muốn mặc thử.' },
        { status: 400 }
      );
    }

    const result = await generateVirtualTryOn(image, mimeType, costumeId, apiKey);

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error('API /api/studio/try-on error:', error);
    const message = error instanceof Error ? error.message : 'Lỗi khi tạo ảnh cổ phục.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
