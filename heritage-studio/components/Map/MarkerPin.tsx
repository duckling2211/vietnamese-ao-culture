'use client';

import React from 'react';

interface MarkerPinProps {
  cx: number;
  cy: number;
  id: string;
  label: string;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function MarkerPin({ cx, cy, id, label, isActive, onSelect }: MarkerPinProps) {
  return (
    <g 
      className="cursor-pointer group outline-none"
      onClick={() => onSelect(id)}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(id)}
    >
      {/* Pulse effect for active state */}
      {isActive && (
        <circle 
          cx={cx} 
          cy={cy} 
          r="12" 
          className="fill-emerald-500/30 animate-ping"
        />
      )}
      
      {/* Outer Halo on Hover */}
      <circle 
        cx={cx} 
        cy={cy} 
        r="8" 
        className={`transition-all duration-300 ${
          isActive 
            ? 'fill-emerald-500/50' 
            : 'fill-transparent group-hover:fill-emerald-400/30'
        }`}
      />
      
      {/* Core Pin */}
      <circle 
        cx={cx} 
        cy={cy} 
        r="4" 
        className={`transition-colors duration-300 ${
          isActive 
            ? 'fill-emerald-600 dark:fill-emerald-400' 
            : 'fill-stone-600 dark:fill-stone-400 group-hover:fill-emerald-500'
        }`}
      />
      
      {/* Tooltip Label (Visible on hover or active) */}
      <text 
        x={cx + 15} 
        y={cy + 4} 
        className={`text-xs font-semibold select-none pointer-events-none transition-opacity duration-200 ${
          isActive 
            ? 'opacity-100 fill-emerald-800 dark:fill-emerald-300' 
            : 'opacity-0 group-hover:opacity-100 fill-stone-700 dark:fill-stone-300'
        }`}
      >
        {label}
      </text>
    </g>
  );
}