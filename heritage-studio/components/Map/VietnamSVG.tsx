'use client';

import React from 'react';
import MarkerPin from './MarkerPin';

// Mock data for cultural regions
export const REGIONS = [
  { id: 'north-sapa', label: 'Sa Pa', cx: 120, cy: 150 },
  { id: 'north-hanoi', label: 'Hà Nội', cx: 180, cy: 220 },
  { id: 'central-hue', label: 'Huế', cx: 220, cy: 450 },
  { id: 'central-hoian', label: 'Hội An', cx: 250, cy: 510 },
  { id: 'south-saigon', label: 'Ho Chi Minh City', cx: 170, cy: 700 },
  { id: 'south-cantho', label: 'Cần Thơ', cx: 140, cy: 750 },
];

interface VietnamSVGProps {
  selectedRegionId?: string | null;
  onSelectRegion?: (id: string) => void;
}

export default function VietnamSVG({ selectedRegionId, onSelectRegion }: VietnamSVGProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg 
        viewBox="0 0 400 900" 
        className="w-full h-full max-h-[80vh] drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Base Map SVG Group (Simplified representation of Vietnam's S-shape) */}
        <g className="stroke-stone-300 dark:stroke-stone-700 stroke-2">
          {/* North */}
          <path 
            d="M 100 100 Q 150 50, 200 120 T 150 300 Q 180 350, 220 400" 
            className="fill-stone-200 dark:fill-stone-800 transition-colors hover:fill-stone-300 dark:hover:fill-stone-700" 
          />
          {/* Central */}
          <path 
            d="M 220 400 Q 260 450, 260 550 T 200 650" 
            className="fill-stone-200 dark:fill-stone-800 transition-colors hover:fill-stone-300 dark:hover:fill-stone-700" 
          />
          {/* South */}
          <path 
            d="M 200 650 Q 180 750, 100 800 T 120 700 Q 150 680, 200 650" 
            className="fill-stone-200 dark:fill-stone-800 transition-colors hover:fill-stone-300 dark:hover:fill-stone-700" 
          />
        </g>

        {/* Region Markers */}
        {REGIONS.map((region) => (
          <MarkerPin
            key={region.id}
            id={region.id}
            label={region.label}
            cx={region.cx}
            cy={region.cy}
            isActive={selectedRegionId === region.id}
            onSelect={onSelectRegion || (() => {})}
          />
        ))}
      </svg>
    </div>
  );
}