import { NextRequest, NextResponse } from 'next/server';
import { evaluateCostumeOutfit } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, mimeType = 'image/jpeg', userNote, apiKey } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp hình ảnh để đánh giá.' },
        { status: 400 }
      );
    }

    const result = await evaluateCostumeOutfit(image, mimeType, userNote, apiKey);

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error('API /api/studio/evaluate error:', error);
    const message = error instanceof Error ? error.message : 'Lỗi khi xử lý đánh giá trang phục.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
