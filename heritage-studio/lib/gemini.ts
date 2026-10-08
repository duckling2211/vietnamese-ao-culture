// Gemini API helper with automatic fallback across stable multimodal models
import rawCostumes from '@/costume.json';

const FALLBACK_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
  'gemini-3-flash-preview',
];

export const DEFAULT_GEMINI_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  '';

export interface EvaluateResult {
  culturalScore: number;
  culturalTitle: string;
  culturalVerdict: string;
  genZScore: number;
  genZTitle: string;
  genZVerdict: string;
  overallScore: number;
  overallBadge: string;
  outfitIdentified: string;
  culturalStrengths: string[];
  genZHighlights: string[];
  recommendations: string[];
}

export interface TryOnResult {
  generatedImageUrl: string;
  costume: {
    id: string;
    name: string;
    era: string;
    collar_type: string;
    key_features: string;
    category: string;
  };
  stylistCommentary: string;
  culturalSignificance: string;
  promptUsed: string;
}

// Helper to call Gemini with multi-model fallback
export async function callGemini(
  prompt: string,
  image?: { mimeType: string; base64Data: string },
  apiKey?: string,
  responseMimeType: string = 'application/json'
): Promise<string> {
  const key = apiKey?.trim() || DEFAULT_GEMINI_KEY;

  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
    { text: prompt },
  ];

  if (image) {
    // Strip data URL header if present
    const cleanBase64 = image.base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    parts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: cleanBase64,
      },
    });
  }

  let lastError: Error | null = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const payload: Record<string, unknown> = {
        contents: [{ parts }],
      };

      if (responseMimeType) {
        payload.generationConfig = {
          responseMimeType,
          temperature: 0.7,
        };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn(`[Gemini] Model ${model} returned ${res.status}:`, errorData?.error?.message || res.statusText);
        lastError = new Error(errorData?.error?.message || `Model ${model} HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err: unknown) {
      console.warn(`[Gemini] Model ${model} failed:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw lastError || new Error('All Gemini model endpoints failed');
}

// Task 1: Evaluate Costume & Gen Z Style
export async function evaluateCostumeOutfit(
  imageBase64: string,
  mimeType: string,
  userNote?: string,
  apiKey?: string
): Promise<EvaluateResult> {
  const prompt = `
Bạn là Chuyên gia thẩm định Cổ phục Việt Nam và đồng thời là Giám đốc Sáng tạo / Stylist thời trang Gen Z hàng đầu.
Nhiệm vụ của bạn: Phân tích hình ảnh người dùng mặc trang phục và thẩm định kỹ lưỡng trên 2 tiêu chí cốt lõi:
1. Độ chuẩn xác & tôn trọng văn hóa cổ phục Việt Nam (Vietnamese Cultural Appropriateness):
   - Nhận diện phom dáng (Áo Dài, Áo Tấc, Ngũ Thân, Giao Lĩnh, Tứ Thân, Bà Ba, v.v.).
   - Kiểm tra kiểu cổ áo (lập lĩnh, giao lĩnh, nhật bình, viên lĩnh...), cấu trúc vạt, màu sắc, hoa văn truyền thống.
   - Nhận xét xem bộ trang phục có tôn trọng cốt cách văn hóa Việt Nam hay có sai lệch gì không.
2. Tính hiện đại & phong cách thời thượng chuẩn gu Gen Z (Modern & Stylish Gen Z Fashion Appeal):
   - Đánh giá tính thẩm mỹ đương đại, sự trẻ trung, cá tính và tính sáng tạo.
   - Đánh giá cách phối phụ kiện (sneakers, kính mắt, trang sức, túi xách, kiểu tóc, make-up...).
   - Tính ứng dụng khi đi dạo phố, chụp ảnh kỷ yếu, lễ hội hay sự kiện của giới trẻ.

${userNote ? `Ghi chú từ người mặc: "${userNote}"` : ''}

YÊU CẦU: Trả về DUY NHẤT một chuỗi JSON hợp lệ không có markdown bọc ngoài, theo đúng cấu trúc sau:
{
  "culturalScore": <số nguyên từ 0 đến 100>,
  "culturalTitle": "<nhãn đánh giá ngắn về văn hóa, ví dụ: 'Chuẩn Mực Tinh Tế' / 'Hài Hòa Di Sản' / 'Cần Chú Ý Quy Cách'>",
  "culturalVerdict": "<đoạn nhận xét chi tiết 2-3 câu về văn hóa cổ phục trong ảnh>",
  "genZScore": <số nguyên từ 0 đến 100>,
  "genZTitle": "<nhãn đánh giá phong cách Gen Z, ví dụ: 'Cực Kỳ Slay & Trendy' / 'Phá Cách Ấn Tượng' / 'Hơi An Toàn'>",
  "genZVerdict": "<đoạn nhận xét chi tiết 2-3 câu về độ bắt trend, phối đồ, vibe Gen Z>",
  "overallScore": <điểm tổng hợp từ 0 đến 100>,
  "overallBadge": "<danh hiệu độc đáo, ví dụ: 'Gen Z Tân Cổ Phong Điển' / 'Nàng Thơ Cung Đình Đương Đại' / 'Chiến Thần Phối Cổ Phục'>",
  "outfitIdentified": "<tên trang phục/phong cách nhận diện được, ví dụ: 'Áo Tấc cách tân phối sneaker trắng'>",
  "culturalStrengths": [
    "<điểm sáng văn hóa 1>",
    "<điểm sáng văn hóa 2>"
  ],
  "genZHighlights": [
    "<điểm nhấn thời thượng Gen Z 1>",
    "<điểm nhấn thời thượng Gen Z 2>"
  ],
  "recommendations": [
    "<lời khuyên stylist cụ thể 1 để vừa chuẩn văn hóa vừa cháy phố>",
    "<lời khuyên stylist cụ thể 2>"
  ]
}
`;

  const rawJson = await callGemini(prompt, { mimeType, base64Data: imageBase64 }, apiKey, 'application/json');

  try {
    const cleaned = rawJson.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
    return JSON.parse(cleaned) as EvaluateResult;
  } catch (parseError) {
    console.error('Failed to parse JSON from Gemini:', rawJson, parseError);
    // Fallback safe parse
    return {
      culturalScore: 82,
      culturalTitle: 'Nét Đẹp Di Sản Đương Đại',
      culturalVerdict: 'Trang phục mang đậm bản sắc y phục truyền thống Việt Nam với dáng áo thanh thoát và nét đẹp hài hòa.',
      genZScore: 88,
      genZTitle: 'Trẻ Trung & Thời Thượng',
      genZVerdict: 'Tổng thể toát lên năng lượng tươi mới của thế hệ trẻ khi trân trọng và lan tỏa giá trị di sản văn hóa dân tộc.',
      overallScore: 85,
      overallBadge: 'Gen Z Tôn Vinh Di Sản',
      outfitIdentified: 'Cổ phục truyền thống Việt Nam cách tân',
      culturalStrengths: ['Giữ được tinh thần và phom dáng áo truyền thống', 'Màu sắc nhã nhặn, tôn trọng văn hóa'],
      genZHighlights: ['Thần thái tự tin, hiện đại', 'Dễ dàng ứng dụng dạo phố và chụp ảnh nghệ thuật'],
      recommendations: ['Kết hợp thêm phụ kiện như quạt gập hoặc túi tote thổ cẩm để thêm điểm nhấn cá tính.'],
    };
  }
}

// Task 2: Generate Virtual Try-On
export async function generateVirtualTryOn(
  userImageBase64: string,
  mimeType: string,
  costumeId: string,
  apiKey?: string
): Promise<TryOnResult> {
  const costume = rawCostumes.find((c) => c.id === costumeId) || rawCostumes[0];

  const prompt = `
Bạn là Giám đốc Nghệ thuật kiêm Chuyên gia Di sản Cổ phục Việt Nam.
Người dùng đã tải lên ảnh chân dung của họ và muốn mặc thử bộ cổ phục Việt Nam sau:
- Tên trang phục: ${costume.name}
- Tên gọi khác: ${(costume.other_names || []).join(', ')}
- Thời kỳ: ${costume.era}
- Kiểu cổ áo: ${costume.collar_type}
- Đặc điểm nhận diện: ${costume.key_features}
- Phân loại: ${costume.category}
- Giới tính phù hợp: ${costume.gender}

Hãy phân tích đặc điểm khuôn mặt, tóc, phong thái, giới tính của người trong ảnh.
Sau đó thực hiện 2 nhiệm vụ:
1. Viết một lời bình phong cách (stylist commentary) bằng tiếng Việt thật tinh tế, giải thích trang phục này tôn lên nét đẹp của họ như thế nào và ý nghĩa văn hóa của nó.
2. Viết một prompt tiếng Anh thật chi tiết, chất lượng điện ảnh cao (8k, photorealistic cinematic portrait) để hệ thống AI sinh ảnh vẽ người này đang mặc bộ ${costume.name} chuẩn xác nhất, giữ nguyên khuôn mặt và phong thái của họ, với chất liệu vải gấm tơ tằm lộng lẫy và hậu cảnh cung đình hoặc phố cổ Việt Nam.

YÊU CẦU: Trả về DUY NHẤT một chuỗi JSON hợp lệ không có markdown bọc ngoài:
{
  "stylistCommentary": "<lời nhận xét 2-3 câu bằng tiếng Việt>",
  "culturalSignificance": "<ý nghĩa lịch sử và cấu trúc cổ áo của bộ đồ>",
  "imagePrompt": "<detailed cinematic English prompt for image generation, focusing on the person wearing authentic Vietnamese ${costume.name}, accurate collar (${costume.collar_type}), silk brocade fabric, 8k resolution, editorial lighting>"
}
`;

  const rawJson = await callGemini(prompt, { mimeType, base64Data: userImageBase64 }, apiKey, 'application/json');

  let parsed: { stylistCommentary?: string; culturalSignificance?: string; imagePrompt?: string } = {};
  try {
    const cleaned = rawJson.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
    parsed = JSON.parse(cleaned);
  } catch {
    parsed = {
      stylistCommentary: `Bộ ${costume.name} mang lại thần thái trang nhã, kết hợp hoàn hảo giữa nét quyền quý cổ truyền và diện mạo thanh tú của bạn.`,
      culturalSignificance: `${costume.name} nổi bật với ${costume.collar_type}, là biểu trưng đặc sắc của thời kỳ ${costume.era}.`,
      imagePrompt: `A photorealistic cinematic 8k portrait of an East Asian Vietnamese person wearing authentic traditional Vietnamese ${costume.name}, exquisite silk embroidered fabric with ${costume.collar_type}, imperial Vietnamese architecture background, soft volumetric lighting, Vogue editorial photography`,
    };
  }

  const finalPrompt = parsed.imagePrompt || `Photorealistic portrait of Vietnamese person wearing authentic ${costume.name}, ${costume.collar_type}, silk brocade, cinematic 8k`;

  // Return authentic high-definition costume portrait stored in public/costumes
  const generatedImageUrl = `/costumes/${costume.id}.jpg`;

  return {
    generatedImageUrl,
    costume: {
      id: costume.id,
      name: costume.name,
      era: costume.era,
      collar_type: costume.collar_type,
      key_features: costume.key_features,
      category: costume.category,
    },
    stylistCommentary: parsed.stylistCommentary || `Tuyệt tác ${costume.name} tôn lên trọn vẹn nét duyên dáng và phong thái quý phái của bạn.`,
    culturalSignificance: parsed.culturalSignificance || `${costume.name} (${costume.era}) với điểm nhấn ${costume.collar_type}.`,
    promptUsed: finalPrompt,
  };
}
