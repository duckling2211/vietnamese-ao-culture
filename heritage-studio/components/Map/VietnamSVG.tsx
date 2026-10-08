'use client';

import React, { useState, useMemo } from 'react';
import MarkerPin from './MarkerPin';
import { 
  VIETNAM_PROVINCES, 
  CULTURAL_REGIONS, 
  ProvinceData, 
  CulturalRegion 
} from './vietnamMapData';

// Maintain backwards compatibility for exports
export const REGIONS = CULTURAL_REGIONS;

export interface VietnamSVGProps {
  selectedRegionId?: string | null;
  onSelectRegion?: (id: string) => void;
}

type MacroRegion = 'all' | 'north' | 'central' | 'highlands' | 'south';

export default function VietnamSVG({ selectedRegionId, onSelectRegion }: VietnamSVGProps) {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);
  const [activeFilter, setActiveFilter] = useState<MacroRegion>('all');

  // Find currently selected region (if ID corresponds to a cultural region)
  const currentRegion = useMemo(() => {
    if (!selectedRegionId) return null;
    return (
      CULTURAL_REGIONS.find((r) => r.id === selectedRegionId) ||
      CULTURAL_REGIONS.find((r) => r.provinceId === selectedRegionId) ||
      null
    );
  }, [selectedRegionId]);

  // Determine which province ID is active (either directly or via matched region)
  const activeProvinceId = useMemo(() => {
    if (!selectedRegionId) return null;
    if (currentRegion) return currentRegion.provinceId;
    return selectedRegionId;
  }, [selectedRegionId, currentRegion]);

  // Filtered cultural pins
  const visibleRegions = useMemo(() => {
    if (activeFilter === 'all') return CULTURAL_REGIONS;
    return CULTURAL_REGIONS.filter((r) => r.region === activeFilter);
  }, [activeFilter]);

  const handleProvinceClick = (province: ProvinceData) => {
    // Check if this province corresponds to a cultural pin
    const matchedRegion = CULTURAL_REGIONS.find((r) => r.provinceId === province.id);
    if (matchedRegion) {
      onSelectRegion?.(matchedRegion.id);
    } else {
      onSelectRegion?.(province.id);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between relative select-none">
      {/* Top Filter Bar */}
      <div className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-2 py-1.5 z-10 flex-wrap">
        {[
          { key: 'all', label: 'Toàn quốc' },
          { key: 'north', label: 'Bắc Bộ' },
          { key: 'central', label: 'Trung Bộ' },
          { key: 'highlands', label: 'Tây Nguyên' },
          { key: 'south', label: 'Nam Bộ' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as MacroRegion)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shadow-sm ${
              activeFilter === tab.key
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 font-semibold'
                : 'bg-white/90 dark:bg-stone-800/90 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Map SVG Container */}
      <div className="w-full h-full flex-1 flex items-center justify-center p-2 relative min-h-0">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full max-h-[85vh] drop-shadow-xl overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Bản đồ văn hóa di sản trang phục Việt Nam"
        >
          <defs>
            {/* Active glow filter */}
            <filter id="active-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#059669" floodOpacity="0.45" />
            </filter>
            
            {/* Subtle sea pattern/grid */}
            <pattern id="sea-waves" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 0 20 Q 10 16, 20 20 T 40 20" 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="0.5" 
                strokeOpacity="0.08" 
              />
            </pattern>
          </defs>

          {/* Sea background texture */}
          <rect width="1000" height="1000" fill="url(#sea-waves)" className="pointer-events-none" />

          {/* Cartographic Watermarks & Sea Annotations */}
          <g className="select-none pointer-events-none opacity-40 dark:opacity-30">
            {/* Biển Đông */}
            <text
              x="770"
              y="370"
              textAnchor="middle"
              className="text-[17px] font-bold tracking-[0.4em] fill-sky-800 dark:fill-sky-300 uppercase"
              style={{ letterSpacing: '0.35em' }}
            >
              BIỂN ĐÔNG
            </text>
            <text
              x="770"
              y="392"
              textAnchor="middle"
              className="text-[10px] tracking-widest fill-sky-700 dark:fill-sky-400 font-medium italic"
            >
              (EAST VIETNAM SEA)
            </text>

            {/* Vịnh Bắc Bộ */}
            <text
              x="630"
              y="220"
              textAnchor="middle"
              className="text-[11px] tracking-[0.25em] fill-sky-800 dark:fill-sky-300 font-semibold uppercase"
            >
              VỊNH BẮC BỘ
            </text>

            {/* Vịnh Thái Lan */}
            <text
              x="315"
              y="850"
              textAnchor="middle"
              className="text-[11px] tracking-[0.2em] fill-sky-800 dark:fill-sky-300 font-semibold uppercase"
            >
              VỊNH THÁI LAN
            </text>
          </g>

          {/* Compass Rose */}
          <g transform="translate(890, 110)" className="select-none pointer-events-none opacity-70 dark:opacity-50">
            <circle r="24" fill="none" className="stroke-stone-300 dark:stroke-stone-700 stroke-1" strokeDasharray="2,2" />
            <polygon points="0,-22 4,-5 0,0 -4,-5" className="fill-red-600 dark:fill-red-500" />
            <polygon points="0,22 4,5 0,0 -4,5" className="fill-stone-400 dark:fill-stone-600" />
            <polygon points="22,0 5,4 0,0 5,-4" className="fill-stone-400 dark:fill-stone-600" />
            <polygon points="-22,0 -5,4 0,0 -5,-4" className="fill-stone-400 dark:fill-stone-600" />
            <circle r="3" className="fill-stone-600 dark:fill-stone-400" />
            <text x="0" y="-26" textAnchor="middle" className="text-[10px] font-bold fill-stone-700 dark:fill-stone-300">
              B
            </text>
          </g>

          {/* 63 Provinces Group (from components/vn.svg) */}
          <g id="vietnam-provinces" className="transition-all duration-300">
            {VIETNAM_PROVINCES.map((province) => {
              const isSelected = activeProvinceId === province.id;
              const isDimmed = activeFilter !== 'all' && province.region !== activeFilter;
              const isHovered = hoveredProvince?.id === province.id;

              return (
                <path
                  key={province.id}
                  id={province.id}
                  data-name={province.name}
                  d={province.d}
                  onClick={() => handleProvinceClick(province)}
                  onMouseEnter={() => setHoveredProvince(province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  filter={isSelected ? 'url(#active-glow)' : undefined}
                  className={`cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'fill-emerald-500 dark:fill-emerald-600 stroke-emerald-700 dark:stroke-emerald-300 stroke-[1.8]'
                      : isHovered
                      ? 'fill-emerald-200 dark:fill-emerald-800/80 stroke-emerald-500 dark:stroke-emerald-400 stroke-[1.2]'
                      : isDimmed
                      ? 'fill-stone-200/50 dark:fill-stone-800/40 stroke-stone-300/40 dark:stroke-stone-700/40 stroke-[0.5]'
                      : 'fill-stone-200 dark:fill-stone-800/90 stroke-stone-300 dark:stroke-stone-700 stroke-[0.7] hover:stroke-emerald-400'
                  }`}
                />
              );
            })}
          </g>

          {/* Quần đảo Hoàng Sa (Paracel Islands) - Đà Nẵng */}
          <g 
            id="hoang-sa-islands"
            className="cursor-pointer group"
            onClick={() => onSelectRegion?.('central-danang')}
          >
            {/* Archipelago boundary box */}
            <rect 
              x="780" 
              y="435" 
              width="105" 
              height="85" 
              rx="8" 
              fill="none" 
              className="stroke-stone-300/60 dark:stroke-stone-700/60 stroke-1 stroke-dashed group-hover:stroke-emerald-400/80 transition-colors"
            />
            {/* Island dots */}
            <circle cx="820" cy="455" r="4.5" className="fill-emerald-600 dark:fill-emerald-400 group-hover:scale-125 transition-transform" />
            <circle cx="842" cy="462" r="3.8" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="832" cy="480" r="4.0" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="805" cy="475" r="3.2" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="855" cy="485" r="3.0" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="815" cy="495" r="3.5" className="fill-emerald-600 dark:fill-emerald-400" />
            
            {/* Label */}
            <text 
              x="832" 
              y="534" 
              textAnchor="middle" 
              className="text-[11px] font-bold fill-stone-800 dark:fill-stone-200 group-hover:fill-emerald-600 dark:group-hover:fill-emerald-400 transition-colors select-none"
            >
              Quần đảo Hoàng Sa
            </text>
            <text 
              x="832" 
              y="547" 
              textAnchor="middle" 
              className="text-[9px] font-medium fill-stone-500 dark:fill-stone-400 select-none"
            >
              (TP. Đà Nẵng)
            </text>
          </g>

          {/* Quần đảo Trường Sa (Spratly Islands) - Khánh Hòa */}
          <g 
            id="truong-sa-islands"
            className="cursor-pointer group"
            onClick={() => onSelectRegion?.('VN34')}
          >
            {/* Archipelago boundary box */}
            <rect 
              x="760" 
              y="745" 
              width="125" 
              height="125" 
              rx="8" 
              fill="none" 
              className="stroke-stone-300/60 dark:stroke-stone-700/60 stroke-1 stroke-dashed group-hover:stroke-emerald-400/80 transition-colors"
            />
            {/* Island dots */}
            <circle cx="785" cy="765" r="4.2" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="810" cy="775" r="3.5" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="845" cy="760" r="3.8" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="830" cy="800" r="4.0" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="860" cy="815" r="3.5" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="795" cy="835" r="4.8" className="fill-emerald-600 dark:fill-emerald-400 group-hover:scale-125 transition-transform" />
            <circle cx="825" cy="850" r="3.6" className="fill-emerald-600 dark:fill-emerald-400" />
            <circle cx="850" cy="840" r="3.2" className="fill-emerald-600 dark:fill-emerald-400" />
            
            {/* Label */}
            <text 
              x="822" 
              y="884" 
              textAnchor="middle" 
              className="text-[11px] font-bold fill-stone-800 dark:fill-stone-200 group-hover:fill-emerald-600 dark:group-hover:fill-emerald-400 transition-colors select-none"
            >
              Quần đảo Trường Sa
            </text>
            <text 
              x="822" 
              y="897" 
              textAnchor="middle" 
              className="text-[9px] font-medium fill-stone-500 dark:fill-stone-400 select-none"
            >
              (Tỉnh Khánh Hòa)
            </text>
          </g>

          {/* Region Markers Layer (rendered on top for smooth clicking) */}
          <g id="cultural-region-pins">
            {visibleRegions.map((region: CulturalRegion) => (
              <MarkerPin
                key={region.id}
                id={region.id}
                label={region.label}
                cx={region.cx}
                cy={region.cy}
                isActive={
                  selectedRegionId === region.id ||
                  selectedRegionId === region.provinceId ||
                  currentRegion?.id === region.id
                }
                onSelect={(id) => onSelectRegion?.(id)}
              />
            ))}
          </g>
        </svg>

        {/* Floating Hover Badge */}
        {hoveredProvince && (
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-stone-900/90 text-white dark:bg-stone-100 dark:text-stone-900 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur flex items-center space-x-2 animate-in fade-in zoom-in-95 duration-150">
            <span className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
            <span>{hoveredProvince.name}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase">
              • Nhấp để chọn
            </span>
          </div>
        )}
      </div>

      {/* Subtle Legend / Note Footer */}
      <div className="w-full flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 px-4 py-1 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Địa danh văn hóa</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-stone-300 dark:bg-stone-700 inline-block" />
            <span>63 Tỉnh Thành</span>
          </span>
        </div>
        <span className="hidden sm:inline italic">
          Bản đồ địa lý & hải đảo Việt Nam
        </span>
      </div>
    </div>
  );
}