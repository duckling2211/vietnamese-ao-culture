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
      className="cursor-pointer group outline-none select-none"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      tabIndex={0}
      role="button"
      aria-label={`Vùng di sản ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(id);
        }
      }}
    >
      {/* Pulse effect for active state */}
      {isActive && (
        <circle 
          cx={cx} 
          cy={cy} 
          r="20" 
          className="fill-emerald-500/40 animate-ping pointer-events-none"
        />
      )}
      
      {/* Outer Halo on Hover/Active */}
      <circle 
        cx={cx} 
        cy={cy} 
        r="14" 
        className={`transition-all duration-300 ${
          isActive 
            ? 'fill-emerald-500/40 stroke-emerald-500 stroke-[1.5]' 
            : 'fill-transparent stroke-transparent group-hover:fill-emerald-400/30 group-hover:stroke-emerald-500/60 group-hover:stroke-1'
        }`}
      />

      {/* Pin Shadow */}
      <circle 
        cx={cx} 
        cy={cy + 1.5} 
        r="7.5" 
        className="fill-black/30 pointer-events-none"
      />
      
      {/* Core Pin */}
      <circle 
        cx={cx} 
        cy={cy} 
        r="7" 
        className={`transition-colors duration-200 stroke-white dark:stroke-stone-900 stroke-[1.5] ${
          isActive 
            ? 'fill-emerald-600 dark:fill-emerald-400' 
            : 'fill-stone-800 dark:fill-stone-200 group-hover:fill-emerald-600 dark:group-hover:fill-emerald-400'
        }`}
      />

      {/* Inner Dot */}
      <circle 
        cx={cx} 
        cy={cy} 
        r="2.5" 
        className="fill-white dark:fill-stone-900 pointer-events-none"
      />
      
      {/* Tooltip Label (Visible with dual outline for high contrast) */}
      <g className={`transition-all duration-200 pointer-events-none select-none ${
        isActive 
          ? 'opacity-100' 
          : 'opacity-85 group-hover:opacity-100'
      }`}>
        <text 
          x={cx + 12} 
          y={cy + 4.5} 
          className="font-bold stroke-white dark:stroke-stone-950 stroke-[4px] fill-transparent"
          style={{ 
            fontSize: '13px',
            strokeLinejoin: 'round', 
            strokeLinecap: 'round' 
          }}
        >
          {label}
        </text>
        <text 
          x={cx + 12} 
          y={cy + 4.5} 
          className={`font-bold ${
            isActive 
              ? 'fill-emerald-900 dark:fill-emerald-300' 
              : 'fill-stone-900 dark:fill-stone-100 group-hover:fill-emerald-700 dark:group-hover:fill-emerald-300'
          }`}
          style={{ fontSize: '13px' }}
        >
          {label}
        </text>
      </g>
    </g>
  );
}