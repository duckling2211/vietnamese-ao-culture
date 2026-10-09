import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/gemini';
import { compositeUserOnCostume } from '@/lib/tryon-composite';

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

    // 1. Analyze user face, detect bounding box & generate personalized stylist commentary
    const result = await generateVirtualTryOn(image, mimeType, costumeId, apiKey);

    // 2. Perform seamless face-to-costume fusion compositing
    try {
      const compositeDataUrl = await compositeUserOnCostume(image, costumeId, result.faceBox);
      if (compositeDataUrl && compositeDataUrl.startsWith('data:image/')) {
        result.generatedImageUrl = compositeDataUrl;
        result.userFaceDetected = true;
      }
    } catch (compositeError) {
      console.warn('TryOn face compositing error, fallback to template:', compositeError);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error('API /api/studio/try-on error:', error);
    const message = error instanceof Error ? error.message : 'Lỗi khi tạo ảnh cổ phục.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
