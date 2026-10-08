'use client';

import React, { useState } from 'react';
import VietnamSVG from '@/components/Map/VietnamSVG';
import HeritagePanel from '@/components/Map/HeritagePanel';
import { Compass, Menu, X } from 'lucide-react';

export default function MapPage() {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>('north-hanoi');
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState<boolean>(false);

  const handleSelectRegion = (id: string) => {
    setSelectedRegionId(id);
    setIsMobilePanelOpen(true);
  };

  const handleClosePanel = () => {
    setSelectedRegionId(null);
    setIsMobilePanelOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden relative bg-stone-100/50 dark:bg-stone-950">
      {/* Left side: Interactive Map Area */}
      <div className="flex-1 relative bg-gradient-to-b from-sky-50/50 via-emerald-50/30 to-amber-50/20 dark:from-stone-950 dark:via-stone-900/90 dark:to-stone-950 flex flex-col items-center justify-center overflow-hidden">
        {/* Floating Header Overlay */}
        <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-stone-900/90 p-3.5 rounded-2xl shadow-lg border border-stone-200/80 dark:border-stone-800 backdrop-blur-md max-w-xs sm:max-w-sm">
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-0.5">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Không Gian Di Sản Việt Nam</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white leading-tight">
            Bản Đồ Văn Hóa Cổ Phục
          </h1>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
            Chạm vào các điểm di sản hoặc 63 tỉnh thành để tìm hiểu trang phục truyền thống qua từng vùng miền.
          </p>
        </div>

        {/* Mobile Toggle Button (when panel is closed) */}
        {!isMobilePanelOpen && selectedRegionId && (
          <button
            onClick={() => setIsMobilePanelOpen(true)}
            className="lg:hidden absolute bottom-4 right-4 z-30 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full shadow-lg font-medium text-xs flex items-center space-x-2 transition-transform active:scale-95"
          >
            <Menu className="w-4 h-4" />
            <span>Xem thông tin di sản</span>
          </button>
        )}
        
        {/* SVG Map Canvas */}
        <div className="w-full h-full relative flex items-center justify-center max-w-4xl pt-16 lg:pt-0">
          <VietnamSVG 
            selectedRegionId={selectedRegionId}
            onSelectRegion={handleSelectRegion}
          />
        </div>
      </div>

      {/* Right side: Desktop Heritage Description Panel */}
      <div className="hidden lg:block w-96 xl:w-[420px] h-full bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl z-20 flex-shrink-0">
        <HeritagePanel 
          selectedRegionId={selectedRegionId}
          onClose={handleClosePanel}
        />
      </div>

      {/* Mobile Drawer Slide-Over Panel */}
      {isMobilePanelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full bg-white dark:bg-stone-900 rounded-t-3xl shadow-2xl max-h-[85vh] h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Drag Bar */}
            <div className="w-full flex items-center justify-between p-3 border-b border-stone-200 dark:border-stone-800">
              <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto" />
              <button
                onClick={() => setIsMobilePanelOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-full"
                aria-label="Đóng bảng di sản"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <HeritagePanel 
                selectedRegionId={selectedRegionId}
                onClose={() => setIsMobilePanelOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}