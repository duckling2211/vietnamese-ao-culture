'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ExternalLink, Shirt, MapPin, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';
import { CostumeItem } from './costumeTypes';
import CostumeSvgSilhouette from './CostumeSvgSilhouette';

interface CostumeDetailModalProps {
  costume: CostumeItem | null;
  onClose: () => void;
}

export default function CostumeDetailModal({ costume, onClose }: CostumeDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!costume) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="costume-modal-title"
    >
      <div 
        className="w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Area */}
        <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${costume.palette.gradient} text-white flex-shrink-0 overflow-hidden`}>
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-black/40 hover:bg-black/60 active:scale-95 text-white rounded-full backdrop-blur-md transition-all z-20"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex-1 pr-6">
              <div className="flex items-center space-x-2 mb-2 flex-wrap gap-y-1">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {costume.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/30 backdrop-blur-md text-emerald-300 border border-emerald-400/20 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{costume.century}</span>
                </span>
              </div>

              <h2 id="costume-modal-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm mb-1.5">
                {costume.name}
              </h2>

              {costume.other_names.length > 0 && (
                <p className="text-xs sm:text-sm text-stone-200/90 italic mb-2">
                  Tên gọi khác: {costume.other_names.join(', ')}
                </p>
              )}

              <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                {costume.era} • {costume.gender}
              </p>
            </div>

            {/* Silhouette preview badge */}
            <div className="w-24 h-28 sm:w-28 sm:h-32 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-center border border-white/20 flex-shrink-0 self-center sm:self-auto">
              <CostumeSvgSilhouette id={costume.id} className="w-full h-full drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* Cultural Significance Lore */}
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Giá Trị Văn Hóa & Ý Nghĩa Lịch Sử</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800">
              {costume.significance}
            </p>
          </div>

          {/* Structural Anatomy Matrix */}
          <div>
            <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-xs uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Cấu Trúc & Giải Phẫu Y Phục</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  1. Kiểu dáng cổ áo ({costume.collar_type})
                </span>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {costume.anatomy.collar}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  2. Ống tay & Cửa tay
                </span>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {costume.anatomy.sleeves}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  3. Thân áo & Vạt áo
                </span>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {costume.anatomy.panels}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  4. Phụ kiện đi kèm
                </span>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {costume.anatomy.accessories}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Summary */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
              Đặc điểm nhận diện chính
            </span>
            <p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
              {costume.key_features}
            </p>
          </div>

          {/* Dynasty Tags */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-1.5 pt-2">
            <Tag className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium mr-1">Triều đại & thời kỳ:</span>
            {costume.dynasties.map((dyn) => (
              <span key={dyn} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {dyn}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          {costume.wikipedia_url && (
            <a
              href={costume.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center space-x-1.5 py-2 px-3 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
            >
              <span>Xem tài liệu bách khoa toàn thư Wikipedia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Link
              href="/map"
              className="flex-1 sm:flex-none py-2.5 px-4 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center space-x-1.5"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Xem trên Bản Đồ</span>
            </Link>

            <Link
              href="/studio"
              className="flex-1 sm:flex-none py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-emerald-600/30 flex items-center justify-center space-x-2"
            >
              <Shirt className="w-4 h-4" />
              <span>Thử Trong Studio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
