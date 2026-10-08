'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Lightbulb, 
  RotateCcw, 
  ImageIcon,
  Send,
  Loader2,
  X
} from 'lucide-react';
import { EvaluateResult } from '@/lib/gemini';

// Sample presets for quick testing
const SAMPLE_PRESETS = [
  {
    id: 'sample-1',
    title: 'Áo Tấc & Sneaker Trắng',
    subtitle: 'Streetwear Lễ Hội',
    userNote: 'Mình phối Áo Tấc tay thụng sắc xanh với giày sneaker trắng và kính râm dạo phố đi bộ.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample-2',
    title: 'Áo Dài Cách Tân Pastel',
    subtitle: 'Gen Z Dạo Phố',
    userNote: 'Áo dài tà lửng cổ tròn phối cùng quần culottes và túi kẹp nách modern chic.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample-3',
    title: 'Áo Nhật Bình Hiện Đại',
    subtitle: 'Dạ Hội Cung Đình',
    userNote: 'Áo Nhật Bình sắc đỏ thêu hoa văn ngũ sắc phối khuyên tai ngọc trai và bốt da cao cổ.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  },
];

interface Task1EvaluatorProps {
  apiKey?: string;
}

export default function Task1Evaluator({ apiKey }: Task1EvaluatorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [userNote, setUserNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluateResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn một tệp hình ảnh hợp lệ (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Kích thước ảnh quá lớn (vui lòng chọn ảnh dưới 8MB).');
      return;
    }

    setError(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Select sample preset
  const handleSelectPreset = async (preset: typeof SAMPLE_PRESETS[0]) => {
    setError(null);
    setUserNote(preset.userNote);
    try {
      setLoading(true);
      // Fetch sample image and convert to data URL
      const response = await fetch(preset.imageUrl);
      const blob = await response.blob();
      setMimeType(blob.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch {
      setSelectedImage(preset.imageUrl);
      setMimeType('image/jpeg');
      setLoading(false);
    }
  };

  // Submit to evaluation API
  const handleEvaluate = async () => {
    if (!selectedImage) {
      setError('Vui lòng tải lên ảnh hoặc chọn một mẫu ảnh có sẵn.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/studio/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          mimeType,
          userNote,
          apiKey,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Có lỗi xảy ra khi thẩm định trang phục.');
      }

      setResult(resData.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể kết nối đến máy chủ AI.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setUserNote('');
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Task Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nhiệm vụ 1 • AI Thẩm Định Trang Phục</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Đánh Giá Chuẩn Mực Cổ Phục & Phong Cách Thời Thượng Gen Z
          </h2>
          <p className="text-sm text-stone-300 font-light leading-relaxed">
            Tải lên bức ảnh bạn đang diện trang phục để AI đánh giá 2 tiêu chí cốt lõi: 
            <strong> Độ chuẩn mực tôn trọng văn hóa Việt Nam</strong> (phom dáng, cổ áo, tà áo, hoa văn) 
            và <strong> Phong cách thời thượng, phá cách chuẩn gu Gen Z</strong> (mix-match, phụ kiện, thần thái).
          </p>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Input & Notes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1 flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>1. Tải Lên Ảnh Outfit Của Bạn</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
              Ảnh toàn thân hoặc nửa người rõ trang phục bạn đang mặc.
            </p>

            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            {/* Image Preview / Upload Box */}
            {selectedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 group">
                <img 
                  src={selectedImage} 
                  alt="Ảnh người mặc" 
                  className="w-full h-80 object-cover object-top"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur transition shadow-md"
                  title="Xóa ảnh"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl flex items-center justify-between">
                  <span className="truncate">Ảnh đã sẵn sàng thẩm định</span>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-emerald-300 font-semibold text-[11px] hover:underline flex-shrink-0 ml-2"
                  >
                    Đổi ảnh
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-72 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-stone-50/50 dark:bg-stone-800/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-1">
                  Kéo thả hoặc nhấn để tải ảnh
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mb-3">
                  Hỗ trợ định dạng PNG, JPG, JPEG, WEBP (tối đa 8MB).
                </p>
                <span className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition">
                  Chọn ảnh từ máy
                </span>
              </div>
            )}

            {/* Quick Sample Presets */}
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block mb-2">
                Hoặc thử nhanh với mẫu có sẵn:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="flex flex-col items-center p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-emerald-500 bg-stone-50 dark:bg-stone-800/60 hover:bg-emerald-50/40 text-left transition group"
                  >
                    <img 
                      src={preset.imageUrl} 
                      alt={preset.title}
                      className="w-full h-16 object-cover rounded-lg mb-1.5 group-hover:opacity-90"
                    />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200 line-clamp-1 w-full text-center">
                      {preset.title}
                    </span>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 truncate w-full text-center">
                      {preset.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Outfit Note */}
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                2. Ghi chú thêm về outfit (Không bắt buộc):
              </label>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Ví dụ: Áo Tấc Đàng Trong phối cùng quần tây đen và giày Converse dự prom tốt nghiệp..."
                className="w-full h-20 p-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              />
            </div>

            {/* Error notice */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Submit Button */}
            <div className="mt-5 flex items-center space-x-3">
              <button
                onClick={handleEvaluate}
                disabled={!selectedImage || loading}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 dark:disabled:bg-stone-800 disabled:text-stone-500 text-white rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI Stylist Đang Thẩm Định...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Thẩm Định Outfit Ngay</span>
                  </>
                )}
              </button>

              {result && (
                <button
                  onClick={handleReset}
                  className="p-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-2xl text-xs font-semibold transition"
                  title="Đặt lại"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Evaluation Result (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {loading && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center min-h-[460px] text-center">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mb-4" />
              <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                AI Stylist Đang Soi Chi Tiết Bộ Đồ Của Bạn
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-4 leading-relaxed">
                Đang quét phom dáng cổ áo, nếp vạt, hoa văn truyền thống Đại Việt kết hợp phân tích năng lượng, phong cách thời thượng và độ slay chuẩn gu Gen Z...
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Gemini Multimodal Engine</span>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center min-h-[460px] text-center">
              <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                Bảng Thẩm Định Đang Chờ Ảnh Của Bạn
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mb-6 leading-relaxed">
                Hãy tải lên bức ảnh bạn mặc cổ phục (hoặc cách tân dạo phố) ở cột bên trái. Hệ thống sẽ phân tích điểm số văn hóa, độ bắt trend Gen Z và đưa ra gợi ý nâng tầm outfit tức thì!
              </p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 text-left">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                    🏛️ Tiêu chí 1: Văn Hóa
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Phom dáng cổ áo, cách khép vạt, màu sắc, hoa văn đúng tinh thần di sản Việt.
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 text-left">
                  <span className="text-xs font-bold text-pink-600 dark:text-pink-400 block mb-1">
                    ⚡ Tiêu chí 2: Gu Gen Z
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Sự phá cách, năng lượng trẻ, mix-match phụ kiện, giày, mắt kính, thần thái.
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="flex flex-col space-y-6">
              {/* Badge & Overall Title Card */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-emerald-200 block mb-1">
                      Nhận Diện Outfit
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">
                      {result.outfitIdentified}
                    </h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex flex-col items-center flex-shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
                      Danh Hiệu
                    </span>
                    <span className="text-sm font-extrabold text-white text-center">
                      {result.overallBadge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dual Scores Comparison Meter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Cultural Appropriateness Score */}
                <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center space-x-1">
                        <span>🏛️ Chuẩn Mực Văn Hóa</span>
                      </span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {result.culturalScore}
                        <span className="text-xs font-normal text-stone-400">/100</span>
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mb-3">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, Math.max(0, result.culturalScore))}%` }}
                      />
                    </div>

                    <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-2">
                      {result.culturalTitle}
                    </span>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {result.culturalVerdict}
                    </p>
                  </div>
                </div>

                {/* 2. Gen Z Modern Style Score */}
                <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center space-x-1">
                        <span>⚡ Phong Cách Gen Z</span>
                      </span>
                      <span className="text-2xl font-black text-pink-600 dark:text-pink-400">
                        {result.genZScore}
                        <span className="text-xs font-normal text-stone-400">/100</span>
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mb-3">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, Math.max(0, result.genZScore))}%` }}
                      />
                    </div>

                    <span className="inline-block px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-950/50 text-pink-800 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold mb-2">
                      {result.genZTitle}
                    </span>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {result.genZVerdict}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths & Gen Z Highlights (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cultural Strengths */}
                <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm">
                  <h4 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Điểm Sáng Văn Hóa Cổ Phục</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.culturalStrengths.map((item, idx) => (
                      <li key={idx} className="text-xs text-stone-700 dark:text-stone-300 flex items-start space-x-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gen Z Highlights */}
                <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm">
                  <h4 className="text-xs font-extrabold text-pink-700 dark:text-pink-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <Flame className="w-4 h-4 text-pink-600" />
                    <span>Điểm Nhấn Thời Thượng Gen Z</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.genZHighlights.map((item, idx) => (
                      <li key={idx} className="text-xs text-stone-700 dark:text-stone-300 flex items-start space-x-2">
                        <span className="text-pink-500 font-bold">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pro Styling Recommendations from Stylist */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-stone-900 dark:to-stone-900 rounded-3xl p-5 border border-amber-200/80 dark:border-amber-900/40 shadow-sm">
                <h4 className="text-xs font-extrabold text-amber-900 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Gợi Ý Nâng Tầm Outfit Từ Stylist (Pro Tips)</span>
                </h4>
                <div className="space-y-2.5">
                  {result.recommendations.map((rec, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-stone-800/70 border border-amber-200/50 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 leading-relaxed flex items-start space-x-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
