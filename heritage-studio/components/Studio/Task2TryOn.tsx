'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  Download, 
  RotateCcw, 
  AlertCircle, 
  Check, 
  ImageIcon, 
  Wand2, 
  Info,
  X,
  Eye,
  Shirt
} from 'lucide-react';
import rawCostumes from '@/costume.json';
import { TryOnResult } from '@/lib/gemini';
import CostumeSvgSilhouette from '@/components/Categories/CostumeSvgSilhouette';

// Sample portraits for users to test immediately
const SAMPLE_PORTRAITS = [
  {
    id: 'portrait-1',
    label: 'Chân dung Bạn Nữ (Nụ cười duyên)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'portrait-2',
    label: 'Chân dung Bạn Nam (Thanh lịch)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'portrait-3',
    label: 'Chân dung Nghệ Thuật (Góc nghiêng)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
];

interface Task2TryOnProps {
  apiKey?: string;
}

export default function Task2TryOn({ apiKey }: Task2TryOnProps) {
  const [selectedCostumeId, setSelectedCostumeId] = useState<string>('nhat_binh');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TryOnResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activeDisplay, setActiveDisplay] = useState<'tryOn' | 'compare' | 'reference'>('tryOn');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Direct safe download for generated HD portrait
  const handleDownload = async () => {
    if (!result) return;
    const targetUrl = activeDisplay === 'reference' ? result.referenceCostumeUrl : result.generatedImageUrl;
    if (!targetUrl) return;
    try {
      const response = await fetch(targetUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `heritage-${result.costume.id}-${activeDisplay}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const a = document.createElement('a');
      a.href = targetUrl;
      a.download = `heritage-${result.costume.id}-${activeDisplay}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Categories filter for costume list
  const categories = useMemo(() => [
    { id: 'all', label: 'Tất cả (12 cổ phục)' },
    { id: 'hoang_gia', label: 'Hoàng gia / Cung đình', match: 'Hoàng gia' },
    { id: 'le_phuc', label: 'Lễ phục truyền thống', match: 'Lễ phục' },
    { id: 'thuong_phuc', label: 'Thường phục & Tiền thân', match: 'Thường phục' },
    { id: 'dan_gian', label: 'Dân gian & Lao động', match: 'Dân gian' },
    { id: 'quoc_phuc', label: 'Quốc phục hiện đại', match: 'Quốc phục' },
  ], []);

  // Filtered costumes from costume.json
  const filteredCostumes = useMemo(() => {
    if (selectedCategory === 'all') return rawCostumes;
    const cat = categories.find((c) => c.id === selectedCategory);
    if (!cat || !cat.match) return rawCostumes;
    return rawCostumes.filter((c) =>
      c.category.toLowerCase().includes(cat.match.toLowerCase())
    );
  }, [selectedCategory, categories]);

  // Selected costume object
  const currentCostume = useMemo(() => {
    return rawCostumes.find((c) => c.id === selectedCostumeId) || rawCostumes[0];
  }, [selectedCostumeId]);

  // Handle local image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn một tệp hình ảnh hợp lệ.');
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

  // Choose sample portrait
  const handleSelectSample = async (sample: typeof SAMPLE_PORTRAITS[0]) => {
    setError(null);
    try {
      setLoading(true);
      setLoadingStep('Đang chuẩn bị ảnh chân dung...');
      const response = await fetch(sample.url);
      const blob = await response.blob();
      setMimeType(blob.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch {
      setSelectedImage(sample.url);
      setMimeType('image/jpeg');
      setLoading(false);
    }
  };

  // Generate Try-On
  const handleGenerateTryOn = async () => {
    if (!selectedImage) {
      setError('Vui lòng tải lên ảnh chân dung của bạn hoặc chọn ảnh mẫu.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    setLoadingStep('1/3: AI đang phân tích đường nét gương mặt và phong thái...');

    setTimeout(() => {
      setLoadingStep(`2/3: Đang kết hợp phom dáng và hoa văn ${currentCostume.name}...`);
    }, 1500);

    setTimeout(() => {
      setLoadingStep('3/3: Hệ thống AI đang kết xuất hình ảnh chân dung cổ phục...');
    }, 3200);

    try {
      const res = await fetch('/api/studio/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          mimeType,
          costumeId: selectedCostumeId,
          apiKey,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Có lỗi xảy ra khi tạo ảnh cổ phục.');
      }

      setResult(resData.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối máy chủ AI.';
      setError(msg);
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Task Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-teal-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nhiệm vụ 2 • AI Thử Đồ Cổ Phục Ảo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Hóa Thân Vào Cổ Phục & Tạo Ảnh Chân Dung Lịch Sử
          </h2>
          <p className="text-sm text-stone-300 font-light leading-relaxed">
            Chọn một trong <strong>12 dạng thức cổ phục tiêu biểu</strong> trong kho tàng lịch sử (từ <code>costume.json</code>), 
            sau đó gửi ảnh chân dung của bạn để AI tiến hành mặc thử và xuất ảnh bạn diện bộ cổ phục quý phái chuẩn xác từng đường kim mũi chỉ.
          </p>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-col space-y-8">
        {/* Step 1: Costume Selector */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
                <Shirt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Bước 1: Chọn Cổ Phục Bạn Muốn Mặc Thử</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Dữ liệu chuẩn từ thư viện di sản y phục (12 dạng thức y phục Đại Việt & đương đại).
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none flex-wrap gap-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Costumes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredCostumes.map((costume) => {
              const isSelected = selectedCostumeId === costume.id;
              return (
                <div
                  key={costume.id}
                  onClick={() => setSelectedCostumeId(costume.id)}
                  className={`group relative p-3.5 rounded-2xl cursor-pointer transition-all flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-white dark:hover:bg-stone-800'
                  }`}
                >
                  {/* Selected Checkmark Badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Silhouette Icon Thumbnail */}
                  <div className="w-full h-24 mb-2 rounded-xl bg-gradient-to-br from-stone-200/60 to-stone-100 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center p-2 overflow-hidden shadow-inner">
                    <CostumeSvgSilhouette id={costume.id} className="w-full h-full max-h-20" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-white line-clamp-1 mb-0.5">
                      {costume.name}
                    </h4>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium block truncate mb-1">
                      {costume.collar_type}
                    </span>
                    <span className="text-[9px] text-stone-500 dark:text-stone-400 block truncate">
                      {costume.era}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Costume Detail Ribbon */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                ✓
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                    Đang chọn: {currentCostume.name}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-200 dark:border-emerald-800">
                    {currentCostume.category}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-1 mt-0.5">
                  <strong>Cổ áo:</strong> {currentCostume.collar_type} • <strong>Thời kỳ:</strong> {currentCostume.era} • <strong>Đặc điểm:</strong> {currentCostume.key_features}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 & 3: Upload Image & Generate Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* User Photo Input Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1 flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Bước 2: Tải Lên Ảnh Chân Dung Của Bạn</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                Ảnh chân dung rõ mặt, nhìn thẳng hoặc góc nghiêng nhẹ để AI ghép trang phục chuẩn nhất.
              </p>

              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />

              {/* Selected Image Preview or Upload Dropzone */}
              {selectedImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 group">
                  <img 
                    src={selectedImage} 
                    alt="Chân dung người dùng" 
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
                    <span className="truncate">Đã sẵn sàng tạo ảnh</span>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-teal-300 font-semibold text-[11px] hover:underline flex-shrink-0 ml-2"
                    >
                      Đổi ảnh
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-72 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-teal-500 dark:hover:border-teal-500 bg-stone-50/50 dark:bg-stone-800/40 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-1">
                    Tải ảnh chân dung của bạn
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mb-3">
                    Ảnh selfie hoặc chân dung rõ khuôn mặt (PNG, JPG, WEBP).
                  </p>
                  <span className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition">
                    Chọn tệp từ máy
                  </span>
                </div>
              )}

              {/* Sample portraits */}
              <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block mb-2">
                  Hoặc chọn nhanh ảnh chân dung mẫu:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_PORTRAITS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectSample(p)}
                      className="flex flex-col items-center p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-teal-500 bg-stone-50 dark:bg-stone-800/50 hover:bg-teal-50/30 text-left transition group"
                    >
                      <img 
                        src={p.url} 
                        alt={p.label}
                        className="w-full h-16 object-cover rounded-lg mb-1 group-hover:opacity-90"
                      />
                      <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 truncate w-full text-center">
                        {p.label.split('(')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error notice */}
              {error && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-5 flex items-center space-x-3">
                <button
                  onClick={handleGenerateTryOn}
                  disabled={!selectedImage || loading}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:from-stone-300 disabled:to-stone-400 dark:disabled:from-stone-800 dark:disabled:to-stone-800 text-white rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Wand2 className="w-4 h-4 animate-spin" />
                      <span>Đang Tạo Ảnh Cổ Phục AI...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Hóa Thân Mặc {currentCostume.name}</span>
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

          {/* Result Column: Generated Image & Side-by-Side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {loading && (
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center min-h-[480px] text-center">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-teal-500/30 animate-ping" />
                  <div className="w-20 h-20 rounded-full border-4 border-teal-600 border-t-transparent animate-spin flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                  AI Đang Vẽ Bức Họa Cổ Phục Cho Bạn
                </h4>
                <p className="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2 animate-pulse">
                  {loadingStep || 'Đang chuẩn bị mô hình điện ảnh...'}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-6 leading-relaxed">
                  Trang phục: <strong>{currentCostume.name}</strong> • Kiểu cổ: <strong>{currentCostume.collar_type}</strong>. 
                  Quá trình có thể mất từ 5-15 giây để tạo ra bức ảnh có độ phân giải cao và chân thực nhất.
                </p>
              </div>
            )}

            {!loading && !result && (
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center min-h-[480px] text-center">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-4 shadow-inner">
                  <Wand2 className="w-8 h-8 text-teal-500" />
                </div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                  Chân Dung Mặc Thử Cổ Phục Sẽ Xuất Hiện Tại Đây
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mb-6 leading-relaxed">
                  Hãy chọn bộ cổ phục ưng ý ở Bước 1 (như <em>{currentCostume.name}</em>) và tải lên bức ảnh chân dung ở Bước 2. AI sẽ tự động biến hóa bạn thành nhân vật thời xưa với xiêm y cổ phục lộng lẫy!
                </p>
                <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 max-w-md text-left text-xs text-teal-900 dark:text-teal-200 flex items-start space-x-2.5">
                  <Info className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Hệ thống sẽ giữ trọn đường nét khuôn mặt, ánh mắt và thần thái của bạn, đồng thời khoác lên mình y phục vải gấm truyền thống chuẩn xác từng chi tiết cổ áo.
                  </span>
                </div>
              </div>
            )}

            {!loading && result && (
              <div className="flex flex-col space-y-6">
                {/* Reference Status & Mode Switcher Bar */}
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-xs text-emerald-900 dark:text-emerald-200 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>
                      {result.userFaceDetected
                        ? `AI đã lấy khuôn mặt từ ảnh của bạn làm tham chiếu và tạo thành công ảnh bạn mặc ${result.costume.name}`
                        : `Ảnh mặc thử ${result.costume.name} đã được tạo thành công`}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 bg-stone-200/80 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
                    <button
                      onClick={() => setActiveDisplay('tryOn')}
                      className={`px-3 py-1 rounded-lg transition ${
                        activeDisplay === 'tryOn'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'
                      }`}
                    >
                      Ảnh bạn mặc thử AI
                    </button>
                    <button
                      onClick={() => setActiveDisplay('compare')}
                      className={`px-3 py-1 rounded-lg transition ${
                        activeDisplay === 'compare'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'
                      }`}
                    >
                      So sánh trước / sau
                    </button>
                    <button
                      onClick={() => setActiveDisplay('reference')}
                      className={`px-3 py-1 rounded-lg transition ${
                        activeDisplay === 'reference'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'
                      }`}
                    >
                      Mẫu gốc cung đình
                    </button>
                  </div>
                </div>

                {/* Main Visual Display Based on Active View */}
                {activeDisplay === 'compare' ? (
                  /* Side-by-side view */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Original Image Card */}
                    <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col">
                      <span className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-2 flex items-center space-x-1.5">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>1. Ảnh gốc của bạn (Dữ liệu tham chiếu)</span>
                      </span>
                      <div className="w-full h-80 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                        <img 
                          src={selectedImage || ''} 
                          alt="Ảnh gốc" 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* AI Try-On Result Card */}
                    <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 border-2 border-emerald-500 shadow-md flex flex-col relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>2. Ảnh bạn mặc {result.costume.name}</span>
                        </span>
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition active:scale-95"
                          title="Tải ảnh về máy"
                        >
                          <Download className="w-3 h-3" />
                          <span>Tải ảnh HD</span>
                        </button>
                      </div>
                      <div 
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-full h-80 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative group cursor-pointer"
                        title="Nhấn để xem toàn màn hình"
                      >
                        <img 
                          src={result.generatedImageUrl} 
                          alt={result.costume.name} 
                          className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
                        />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLightboxOpen(true);
                          }}
                          className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur transition shadow flex items-center space-x-1 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem toàn màn hình</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : activeDisplay === 'reference' ? (
                  /* Heritage Reference Stock Card */
                  <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-600 dark:text-stone-300 flex items-center space-x-1.5">
                        <Shirt className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Bản mẫu nguyên bản lịch sử: {result.costume.name}</span>
                      </span>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-stone-700 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-sm transition active:scale-95"
                      >
                        <Download className="w-3 h-3" />
                        <span>Tải ảnh mẫu</span>
                      </button>
                    </div>
                    <div 
                      onClick={() => setIsLightboxOpen(true)}
                      className="w-full h-96 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative group cursor-pointer"
                    >
                      <img 
                        src={result.referenceCostumeUrl} 
                        alt={result.costume.name} 
                        className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur transition shadow flex items-center space-x-1 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem toàn màn hình</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Focused Primary AI Try-On Card */
                  <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 border-2 border-emerald-500 dark:border-emerald-500/80 shadow-lg flex flex-col relative">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Chân Dung Bạn Mặc {result.costume.name} (AI Sinh Từ Ảnh Tham Chiếu)</span>
                        </span>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          Đã tự động căn chỉnh ngũ quan từ ảnh chân dung của bạn vào cổ áo {result.costume.collar_type}
                        </p>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition active:scale-95"
                        title="Tải ảnh về máy"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải ảnh bạn mặc HD</span>
                      </button>
                    </div>
                    <div 
                      onClick={() => setIsLightboxOpen(true)}
                      className="w-full h-96 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative group cursor-pointer"
                      title="Nhấn để xem toàn màn hình"
                    >
                      <img 
                        src={result.generatedImageUrl} 
                        alt={result.costume.name} 
                        className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur transition shadow flex items-center space-x-1 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem toàn màn hình</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Stylist Commentary & Heritage Card */}
                <div className="bg-gradient-to-br from-emerald-900/90 to-teal-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-500/30">
                  <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Lời Bình Từ AI Heritage Stylist</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    Bạn Trong Trang Phục {result.costume.name}
                  </h3>
                  <p className="text-sm text-stone-200 leading-relaxed font-light mb-4">
                    {result.stylistCommentary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-emerald-300 font-semibold block mb-0.5">Kiểu cổ áo & Phom dáng:</span>
                      <span className="text-stone-300">{result.costume.collar_type}</span>
                    </div>
                    <div>
                      <span className="text-emerald-300 font-semibold block mb-0.5">Thời kỳ lịch sử:</span>
                      <span className="text-stone-300">{result.costume.era}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && result && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar with costume title & close button */}
          <div 
            className="w-full max-w-4xl flex items-center justify-between pb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h4 className="text-base sm:text-lg font-bold flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{result.costume.name} ({result.costume.era})</span>
              </h4>
              <p className="text-xs text-stone-300 font-light">
                Kiểu cổ: {result.costume.collar_type}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải ảnh HD</span>
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full-res Image Container */}
          <div 
            className="relative max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeDisplay === 'reference' ? result.referenceCostumeUrl : result.generatedImageUrl} 
              alt={result.costume.name}
              className="max-h-[80vh] w-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
